"use client";

import Image from "next/image";
import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Mail,
    MapPin,
    Phone,
    FileText,
} from "lucide-react";

export default function MobileHeader() {
    const [expanded, setExpanded] = useState(false);
    const [imgError, setImgError] = useState(false);

    return (
        <div className="md:hidden w-full bg-glass border-glass rounded-2xl shadow-xl overflow-hidden z-20">
            {/* Compact strip — always visible */}
            <div className="flex items-center gap-3 p-3 px-4">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-mint-primary/30 shrink-0 shadow-md">
                    {!imgError ? (
                        <Image
                            src="/assets/profile.jpg"
                            alt="Firomsa Assefa Roba"
                            fill
                            sizes="48px"
                            priority
                            className="object-cover"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-linear-to-br from-mint-secondary/30 to-bg-base flex items-center justify-center">
                            <span className="text-sm font-bold text-mint-primary">
                                FR
                            </span>
                        </div>
                    )}
                </div>

                {/* Name & Role */}
                <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-bold text-text-heading font-heading truncate">
                        Firomsa Assefa Roba
                    </h2>
                    <span className="text-[11px] text-mint-light font-medium">
                        Software Engineer
                    </span>
                </div>

                {/* Expand toggle */}
                <button
                    onClick={() => setExpanded((v) => !v)}
                    aria-label={
                        expanded ? "Collapse profile" : "Expand profile"
                    }
                    className="w-8 h-8 rounded-lg bg-bg-base/40 border border-mint-primary/10 flex items-center justify-center text-text-muted hover:text-mint-light transition-colors duration-200 shrink-0 cursor-pointer"
                >
                    <ChevronDown
                        size={16}
                        className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : "rotate-0"}`}
                    />
                </button>
            </div>

            {/* Expanded details (Smooth animated collapse/expand wrapper) */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    expanded
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4 flex flex-col gap-3 border-t border-mint-primary/5 pt-3">
                        {/* Contact info */}
                        <div className="flex flex-col gap-2">
                            <a
                                href="mailto:firomsassf@gmail.com"
                                className="flex items-center gap-3 text-xs text-text-body hover:text-mint-light transition-colors"
                            >
                                <Mail
                                    size={13}
                                    className="text-mint-light shrink-0"
                                />
                                <span className="truncate">
                                    firomsassf@gmail.com
                                </span>
                            </a>
                            <a
                                href="tel:+251943102554"
                                className="flex items-center gap-3 text-xs text-text-body hover:text-mint-light transition-colors"
                            >
                                <Phone
                                    size={13}
                                    className="text-mint-light shrink-0"
                                />
                                <span>+251 943102554</span>
                            </a>
                            <div className="flex items-center gap-3 text-xs text-text-muted">
                                <MapPin
                                    size={13}
                                    className="text-mint-light shrink-0"
                                />
                                <span>Bishoftu, Ethiopia</span>
                            </div>
                        </div>

                        {/* Social links + CV */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/firomsa-assefa/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="w-9 h-9 rounded-lg bg-bg-base/60 border border-mint-primary/10 hover:border-mint-primary/30 flex items-center justify-center text-text-muted hover:text-mint-light transition-all duration-200"
                            >
                                <svg
                                    className="w-4 h-4"
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
                            {/* GitHub */}
                            <a
                                href="https://github.com/firo1919"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="w-9 h-9 rounded-lg bg-bg-base/60 border border-mint-primary/10 hover:border-mint-primary/30 flex items-center justify-center text-text-muted hover:text-mint-light transition-all duration-200"
                            >
                                <svg
                                    className="w-4 h-4"
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
                            {/* LeetCode */}
                            <a
                                href="https://leetcode.com/firo1919/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LeetCode"
                                className="w-9 h-9 rounded-lg bg-bg-base/60 border border-mint-primary/10 hover:border-mint-primary/30 flex items-center justify-center text-text-muted hover:text-mint-light transition-all duration-200"
                            >
                                <svg
                                    className="w-4 h-4"
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

                            {/* Download CV */}
                            <a
                                href="/resume.pdf"
                                download
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-linear-to-r from-mint-primary to-mint-secondary text-bg-base font-semibold text-xs hover:opacity-90 transition-all duration-200 shadow-md"
                            >
                                <FileText size={13} />
                                <span>Download CV</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
