"use client";

import { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  siteKey: string;
}

export default function TurnstileWidget({ onVerify, siteKey }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);

  // Keep ref updated with the latest callback reference
  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    const scriptId = "cloudflare-turnstile-script";
    
    // Inject Turnstile script if it's not loaded
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    let widgetId: string | null = null;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetId) {
        try {
          widgetId = window.turnstile.render(containerRef.current, {
            sitekey: siteKey,
            callback: (token: string) => {
              onVerifyRef.current(token);
            },
            "expired-callback": () => {
              onVerifyRef.current("");
            },
            "error-callback": () => {
              onVerifyRef.current("");
            },
            theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          });
        } catch (err) {
          console.error("Cloudflare Turnstile render failed:", err);
        }
      }
    };

    // Check for the turnstile global periodically until it loads
    const timer = setInterval(() => {
      if (window.turnstile) {
        renderWidget();
        clearInterval(timer);
      }
    }, 100);

    return () => {
      clearInterval(timer);
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch (e) {}
      }
    };
  }, [siteKey]); // Only re-initialize if the siteKey itself changes

  return <div ref={containerRef} className="my-2 min-h-[65px]" />;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}
