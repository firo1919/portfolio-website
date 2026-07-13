import { NextResponse } from "next/server";
import { z } from "zod";
import { Redis } from "@upstash/redis";

export const dynamic = "force-dynamic";

// Initialize Redis for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const fileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  type: z.string(),
  content: z.string().min(1, "File content is required"), // Base64 encoded content
}).optional();

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address"),
  phone: z.string().trim().max(30, "Phone number is too long").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  hp_field: z.string().optional(),
  token: z.string().min(1, "CAPTCHA verification is required"),
  file: fileSchema,
});

export async function POST(request: Request) {
  console.log("POST /api/contact - Request received");
  const startTime = Date.now();

  try {
    const body = await request.json();
    
    // 1. Zod input validation
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map((issue) => issue.message).join(", ");
      console.warn("Zod validation failed:", errorMsg);
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, phone, message, hp_field, token, file } = parsed.data;

    console.log("POST /api/contact - Form parsed successfully:", {
      name,
      email,
      phone,
      hp_field: hp_field ? `[FILLED: ${hp_field}]` : "[EMPTY]",
      hasToken: !!token,
      hasFile: !!file,
    });

    // 2. Honeypot check (Bots fill hidden fields)
    if (hp_field && hp_field.trim() !== "") {
      console.warn("Honeypot trigger detected! Request silently ignored. Value:", hp_field);
      return NextResponse.json({ success: true, message: "Message sent successfully!" });
    }

    // Get client IP for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";

    // 3. Upstash Redis Rate Limiting (3 messages/hour)
    console.log("Step 1: Checking Redis rate limit...");
    const redisStart = Date.now();
    const limitKey = `ratelimit:contact:${ip}`;
    let currentCount = 0;
    try {
      currentCount = await redis.incr(limitKey);
      if (currentCount === 1) {
        await redis.expire(limitKey, 3600); // 1 hour sliding window
      }
      console.log(`Redis rate limit check completed in ${Date.now() - redisStart}ms. Count: ${currentCount}/3`);
    } catch (redisErr: any) {
      console.error("Redis rate limit check failed, bypassing to allow submission:", redisErr.message);
    }

    if (currentCount > 3) {
      console.warn(`Rate limit exceeded for IP ${ip}`);
      return NextResponse.json(
        { error: "Too many submissions. Please wait an hour and try again." },
        { status: 429 }
      );
    }

    // 4. Cloudflare Turnstile Verification
    console.log("Step 2: Verifying CAPTCHA token with Cloudflare...");
    const cfStart = Date.now();
    const secretKey = process.env.CF_TURNSTILE_SECRET_KEY!;
    const cfVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    
    const verifyRes = await fetch(cfVerifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}&remoteip=${encodeURIComponent(ip)}`,
      cache: "no-store",
    });
    
    const verifyResult = await verifyRes.json();
    console.log(`Cloudflare verification completed in ${Date.now() - cfStart}ms. Result:`, verifyResult);
    if (!verifyResult.success) {
      console.warn("Turnstile CAPTCHA verification failed.");
      return NextResponse.json({ error: "CAPTCHA verification failed. Please try again." }, { status: 400 });
    }

    // 5. Build Resend Email Payload
    const resendKey = process.env.RESEND_API_KEY!;
    
    const emailPayload: any = {
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "firomsassf@gmail.com",
      reply_to: email,
      subject: `New Message from ${name} (${email})`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #10b981; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          ${file ? `<p><strong>Attachment:</strong> ${file.name} (${(Buffer.from(file.content, 'base64').length / 1024).toFixed(1)} KB)</p>` : ""}
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9fafb; border-left: 4px solid #10b981; padding: 15px; margin-top: 10px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</div>
        </div>
      `,
    };

    if (file) {
      emailPayload.attachments = [
        {
          filename: file.name,
          content: file.content,
        }
      ];
    }

    // Send Email via Resend
    console.log("Step 3: Dispatching email via Resend...");
    const resendStart = Date.now();
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendKey}`,
      },
      body: JSON.stringify(emailPayload),
      cache: "no-store",
    });

    console.log(`Resend response status: ${emailRes.status} (received in ${Date.now() - resendStart}ms)`);
    if (!emailRes.ok) {
      const errText = await emailRes.text();
      console.error("Resend API failed:", errText);
      return NextResponse.json({ error: "Failed to deliver email message." }, { status: 500 });
    }

    // 6. Send Telegram Notification (if Chat ID is configured)
    const botToken = process.env.TELEGRAM_BOT_TOKEN!;
    const chatIdsEnv = process.env.TELEGRAM_CHAT_ID;
    
    if (chatIdsEnv && chatIdsEnv.trim() !== "") {
      let telegramText = `📩 *New Contact Form Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📱 *Phone:* ${phone || "Not provided"}`;
      if (file) {
        telegramText += `\n📎 *Attachment:* ${file.name}`;
      }
      telegramText += `\n\n💬 *Message:*\n${message}`;

      try {
        console.log("Step 4: Dispatching alerts to Telegram (waiting for completion in serverless)...");
        
        // Start text notification dispatch
        const textPromise = fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatIdsEnv.trim(),
            text: telegramText,
            parse_mode: "Markdown",
          }),
          cache: "no-store",
        });

        // Start document dispatch if present
        let docPromise: Promise<Response | null> = Promise.resolve(null);
        if (file) {
          console.log("Step 4: Preparing file attachment for Telegram...");
          const fileBuffer = Buffer.from(file.content, "base64");
          const fileBlob = new Blob([fileBuffer], { type: file.type });
          
          const formData = new FormData();
          formData.append("chat_id", chatIdsEnv.trim());
          formData.append("document", fileBlob, file.name);
          formData.append("caption", `📎 Attachment from ${name}`);

          docPromise = fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: "POST",
            body: formData,
            cache: "no-store",
          });
        }

        // Wait for both Telegram operations to complete (essential for serverless environment)
        const [tgTextRes, tgDocRes] = await Promise.all([textPromise, docPromise]);
        
        console.log("Telegram sendMessage status:", tgTextRes.status);
        if (!tgTextRes.ok) {
          console.error("Telegram sendMessage error:", await tgTextRes.text());
        }

        if (tgDocRes) {
          console.log("Telegram sendDocument status:", tgDocRes.status);
          if (!tgDocRes.ok) {
            console.error("Telegram sendDocument error:", await tgDocRes.text());
          }
        }
      } catch (tgErr) {
        console.error("Telegram delivery failed:", tgErr);
        // Do not block client response if Telegram fails
      }
    } else {
      console.log("Telegram delivery skipped (TELEGRAM_CHAT_ID not configured).");
    }

    console.log(`Contact form processed successfully in ${Date.now() - startTime}ms.`);
    return NextResponse.json({ success: true, message: "Message sent successfully!" });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json({ error: "An unexpected server error occurred." }, { status: 500 });
  }
}
