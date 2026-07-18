"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
    isTab?: boolean;
}

export default function ThemeToggle({ isTab = false }: ThemeToggleProps) {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    // Mount check to avoid SSR hydration mismatches
    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTimeout(() => {
            setTheme(isDark ? "dark" : "light");
            setMounted(true);
        }, 0);
    }, []);

    const toggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);

        document.documentElement.classList.add("theme-transitioning");

        if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        setTimeout(() => {
            document.documentElement.classList.remove("theme-transitioning");
        }, 250);
    };

    if (!mounted) {
        return isTab ? (
            <div className="w-10 h-12 rounded-l-xl bg-glass border-y border-l border-mint-primary/10 shrink-0" />
        ) : (
            <div className="w-10 h-10 rounded-xl bg-bg-base/40 border border-mint-primary/10 shrink-0" />
        );
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className={
                isTab
                    ? "w-10 h-12 rounded-l-xl rounded-r-none bg-glass border-y border-l border-mint-primary/15 hover:border-mint-primary/35 flex items-center justify-center text-mint-light hover:text-mint-primary cursor-pointer active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    : "w-10 h-10 rounded-xl bg-bg-base/40 border border-mint-primary/10 hover:border-mint-primary/25 hover:bg-bg-card/40 flex items-center justify-center text-mint-light hover:text-mint-primary cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
            }
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
