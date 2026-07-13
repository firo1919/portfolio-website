# Professional Developer Portfolio — Firomsa Assefa Roba

A premium, modern, responsive interactive developer portfolio website built with **Next.js**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🚀 Key Features

### 1. Modern Responsive Architecture

- **Desktop Layout:** Dual-pane layout featuring a sticky sidebar containing profile summary, contact details, social links, CV download button, and a page-scrollable main content panel.
- **Mobile Layout:** Compact mobile header with collapsible contact drawer, glassmorphic content cards, and a fixed bottom tab bar for comfortable navigation.
- **Aesthetic & Motion Design:** Customized Montserrat typography, persistent Light/Dark theme toggle (with anti-FOUC prevention), a custom slide-up entrance animation (`settle`) on page load, and spring-like tab transitions.

### 2. Tab Navigation & Content Pages

- **About Tab:** Career focus statement, LeetCode (400+ problems solved) and competitive coding statistics, and featured project callouts.
- **Resume Tab:** Comprehensive timelines detailing engineering history at **Eskalate**, computer science studies at **Adama University**, and training at **A2SV**. Includes interactive hover timeline nodes.
- **Portfolio Tab:** Paginated, clean grid showcase of completed projects with direct clickable external repository links.
- **Moments Gallery:** 3-column paginated photo gallery with first-person descriptions, desktop hover tooltips, and a fullscreen lightbox preview.
- **Contact Tab:** Dynamic Leaflet.js interactive maps centered on Bishoftu in a colored Voyager theme.

### 3. Fully Protected Contact Form

- **Zod Schema Validation:** Full client and server-side request sanitization.
- **Rate-Limiting:** Connected to Upstash Redis to restrict submissions to 3 messages per hour per IP (failsafe enabled).
- **Spam & Bot Defense:** Incorporates invisible honeypot inputs and Cloudflare Turnstile CAPTCHA verification.
- **Dual Notification Delivery:**
    - **Email:** Delivers HTML-formatted messages to your email inbox via Resend.
    - **Telegram:** Forwards text message details and **directly uploads binary file attachments (.pdf)** to your Telegram chat via Bot APIs asynchronously in the background.

### 4. Interactive QR Card & vCard

- **Scan-to-Save QR:** Displays a locally saved contact QR code. Scanning it with a phone camera prompts the user to add "Firomsa Assefa Roba" directly to their address book.
- **vCard Download:** Includes a button inside the modal to download your `.vcf` contact card directly.

---

## 🛠️ Technology Stack

- **Framework:** Next.js (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 & PostCSS
- **Language:** TypeScript
- **Icons:** Lucide React
- **Maps:** Leaflet.js & React Leaflet
- **Validation:** Zod
- **Rate-Limiting:** Upstash Redis
- **Email Dispatch:** Resend HTTP API
- **Alert Notifications:** Telegram Bot API
- **Security Widget:** Cloudflare Turnstile
- **Notifications UI:** Sonner Toasts

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Resend API Credentials
RESEND_API_KEY=re_xxxxxxxxxxxx

# Telegram Bot Credentials
TELEGRAM_BOT_TOKEN=1234567890:AAxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=xxxxxxxxxx

# Cloudflare Turnstile CAPTCHA Keys
NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY=0x4AAAAAAD0-xxxxxxxxxxxxx
CF_TURNSTILE_SECRET_KEY=0x4AAAAAAD0-xxxxxxxxxxxxx

# Upstash Redis Rate Limiting (REST API)
UPSTASH_REDIS_REST_URL=https://xxxxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=gQAAAAAA...
```

---

## 💻 Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

The optimized static page build is outputted directly to the `.next/` directory.
