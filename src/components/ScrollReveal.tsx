"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delayMs?: number;
  durationMs?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  threshold = 0.1,
  delayMs = 0,
  durationMs = 1100, // 1.1s for a more premium, slow, and deliberate feel
}: ScrollRevealProps) {
  // Initialize to true if on client and IntersectionObserver is unsupported
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !("IntersectionObserver" in window);
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback handled during state initialization
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? "opacity-100 translate-y-0 filter-none" 
          : "opacity-0 translate-y-8 blur-[2px] pointer-events-none"
      } ${className}`}
    >
      {children}
    </div>
  );
}
