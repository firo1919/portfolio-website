"use client";

import Image from "next/image";
import { Mail, MapPin, Phone, FileText } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Sidebar() {
    const [imgError, setImgError] = useState(false);

    return (
        <aside className="w-full md:w-75 shrink-0 bg-glass border-glass rounded-2xl p-6 md:p-8 flex flex-col items-center gap-6 text-center shadow-2xl relative overflow-hidden group hover:border-glass-hover transition-all duration-300">
            {/* Background glow overlay */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-mint-primary/10 rounded-full blur-3xl group-hover:bg-mint-primary/15 transition-all duration-500" />

            {/* Theme Toggle — top-left corner */}
            <div className="absolute top-4 left-4 z-10">
                <ThemeToggle />
            </div>

            {/* Avatar Container with Glow */}
            <div className="relative shrink-0">
                {/* Dual-layer consistent moving glow using high-performance radial gradients (0% CPU blur overhead) */}
                <div
                    className="absolute -inset-10 rounded-full animate-pulse-slow pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0) 70%)",
                    }}
                />
                <div
                    className="absolute -inset-15 rounded-full animate-pulse-slow [animation-delay:4s] pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(5, 150, 105, 0.15) 0%, rgba(5, 150, 105, 0) 70%)",
                    }}
                />

                <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-3 border-mint-primary/25 shadow-xl group-hover:border-mint-primary/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 z-10">
                    {!imgError ? (
                        <Image
                            src="/assets/profile.jpg"
                            alt="Firomsa Assefa Roba"
                            fill
                            sizes="(max-width: 768px) 176px, 224px"
                            priority
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-linear-to-br from-mint-secondary/30 to-bg-base flex items-center justify-center">
                            <span className="text-6xl font-semibold text-mint-primary font-heading">
                                FR
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Info */}
            <div className="flex flex-col gap-2 z-10">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight font-heading text-text-heading text-glow">
                    Firomsa Assefa Roba
                </h2>
                <span className="self-center px-4 py-1.5 rounded-xl text-xs font-semibold bg-mint-primary/10 text-mint-light border border-mint-primary/20 tracking-wider">
                    Software Engineer
                </span>
            </div>

            <hr className="w-full border-mint-primary/10" />

            {/* Contact Information */}
            <div className="w-full flex flex-col gap-3.5 z-10">
                {/* Email */}
                <a
                    href="mailto:firomsassf@gmail.com"
                    className="flex items-center gap-4 p-3 rounded-xl bg-bg-base/40 border border-mint-primary/5 hover:border-mint-primary/25 transition-all duration-300 hover:bg-bg-base/60 group/item"
                >
                    <div className="w-9 h-9 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light group-hover/item:bg-mint-primary/20 transition-all duration-300">
                        <Mail size={16} />
                    </div>
                    <div className="flex flex-col items-start min-w-0 text-left">
                        <span className="text-[9px] uppercase tracking-wider text-text-muted font-medium">
                            Email
                        </span>
                        <span className="text-xs text-text-body font-medium truncate max-w-42.5 group-hover/item:text-mint-light transition-all duration-300">
                            firomsassf@gmail.com
                        </span>
                    </div>
                </a>

                {/* Phone */}
                <a
                    href="tel:+251943102554"
                    className="flex items-center gap-4 p-3 rounded-xl bg-bg-base/40 border border-mint-primary/5 hover:border-mint-primary/25 transition-all duration-300 hover:bg-bg-base/60 group/item"
                >
                    <div className="w-9 h-9 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light group-hover/item:bg-mint-primary/20 transition-all duration-300">
                        <Phone size={16} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <span className="text-[9px] uppercase tracking-wider text-text-muted font-medium">
                            Phone
                        </span>
                        <span className="text-xs text-text-body font-medium group-hover/item:text-mint-light transition-all duration-300">
                            +251 943102554
                        </span>
                    </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-bg-base/40 border border-mint-primary/5 hover:border-mint-primary/20 transition-all duration-300">
                    <div className="w-9 h-9 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light">
                        <MapPin size={16} />
                    </div>
                    <div className="flex flex-col items-start text-left">
                        <span className="text-[9px] uppercase tracking-wider text-text-muted font-medium">
                            Location
                        </span>
                        <span className="text-xs text-text-body font-medium">
                            Bishoftu, Ethiopia
                        </span>
                    </div>
                </div>
            </div>

            <hr className="w-full border-mint-primary/10 mt-auto" />

            {/* Social Links & Resume Download */}
            <div className="flex flex-col gap-4 w-full z-10">
                <div className="flex items-center justify-center gap-3">
                    {/* LinkedIn SVG */}
                    <a
                        href="https://www.linkedin.com/in/firomsa-assefa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="w-10 h-10 rounded-lg bg-bg-base/60 border border-mint-primary/5 hover:border-mint-primary/30 flex items-center justify-center text-text-muted hover:text-mint-light hover:scale-105 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300"
                    >
                        <svg
                            className="w-4.5 h-4.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                        </svg>
                    </a>

                    {/* GitHub SVG */}
                    <a
                        href="https://github.com/firo1919"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="w-10 h-10 rounded-lg bg-bg-base/60 border border-mint-primary/5 hover:border-mint-primary/30 flex items-center justify-center text-text-muted hover:text-mint-light hover:scale-105 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300"
                    >
                        <svg
                            className="w-4.5 h-4.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                    </a>

                    {/* LeetCode SVG */}
                    <a
                        href="https://leetcode.com/firo1919/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LeetCode"
                        className="w-10 h-10 rounded-lg bg-bg-base/60 border border-mint-primary/5 hover:border-mint-primary/30 flex items-center justify-center text-text-muted hover:text-mint-light hover:scale-105 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] transition-all duration-300"
                    >
                        <svg
                            className="w-4.5 h-4.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="M12 6v12M6 12h12" />
                        </svg>
                    </a>
                </div>

                <a
                    href="/resume.pdf"
                    download
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-mint-primary to-mint-secondary text-bg-base font-semibold text-sm hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                >
                    <FileText size={16} />
                    <span>Download CV</span>
                </a>
            </div>
        </aside>
    );
}
