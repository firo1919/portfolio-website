"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import Navigation, { TabType } from "@/components/Navigation";
import AboutTab from "@/components/tabs/AboutTab";
import ResumeTab from "@/components/tabs/ResumeTab";
import PortfolioTab from "@/components/tabs/PortfolioTab";
import ContactTab from "@/components/tabs/ContactTab";
import GalleryTab from "@/components/tabs/GalleryTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("about");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "about":
        return <AboutTab onNavigateToTab={(tab) => setActiveTab(tab)} />;
      case "resume":
        return <ResumeTab />;
      case "portfolio":
        return <PortfolioTab />;
      case "contact":
        return <ContactTab />;
      case "gallery":
        return <GalleryTab />;
      default:
        return <AboutTab />;
    }
  };

  return (
    <>
      {/* ── MOBILE LAYOUT (hidden on md+) ── */}
      <div className="md:hidden flex flex-col h-screen bg-bg-base transition-colors duration-300 overflow-hidden relative">
        {/* Ambient orbs */}
        <div className="absolute top-[5%] left-[5%] w-48 h-48 rounded-full bg-mint-primary/10 blur-[80px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[10%] right-[5%] w-64 h-64 rounded-full bg-mint-secondary/5 blur-[90px] animate-float-slower pointer-events-none" />

        {/* Compact mobile profile header */}
        <div className="p-3 z-10 flex-shrink-0">
          <MobileHeader />
        </div>

        {/* Scrollable content panel */}
        <div className="flex-1 overflow-y-auto px-3 pb-2 z-10 min-h-0">
          <div className="bg-glass border-glass rounded-2xl p-4 shadow-xl h-full min-h-0 flex flex-col">
            <div className="flex-1 overflow-y-auto min-h-0">
              {renderActiveTab()}
            </div>
          </div>
        </div>

        {/* Fixed bottom navigation bar */}
        <nav
          aria-label="Primary"
          className="flex-shrink-0 z-20 bg-glass border-t border-mint-primary/10 px-2 py-2 flex items-center justify-around backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
        >
          {(["about", "resume", "portfolio", "contact", "gallery"] as TabType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-selected={isActive}
                role="tab"
                className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-semibold tracking-wide capitalize transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-mint-light bg-mint-primary/10"
                    : "text-text-muted hover:text-text-body"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── DESKTOP LAYOUT (hidden on mobile) ── */}
      <div className="hidden md:flex relative min-h-screen flex-col items-center p-5 lg:p-6 bg-bg-base transition-colors duration-300">
        {/* Ambient orbs */}
        <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-mint-primary/10 blur-[100px] animate-float-slow pointer-events-none" />
        <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-mint-secondary/5 blur-[120px] animate-float-slower pointer-events-none" />
        <div className="absolute top-[40%] right-[20%] w-80 h-80 rounded-full bg-mint-light/5 blur-[110px] animate-pulse-slow pointer-events-none" />

        {/* Main Container */}
        <main className="w-full max-w-[1320px] flex flex-row gap-5 items-start flex-1 z-10">
          {/* Sidebar — sticky, stays in view while page scrolls */}
          <div className="sticky top-5 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Content panel — grows naturally with tab content */}
          <div className="flex-1 flex flex-col gap-6 bg-glass border-glass rounded-2xl p-5 md:p-7 shadow-2xl relative">
            {/* Navigation header */}
            <header className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 border-b border-mint-primary/5 pb-4 flex-shrink-0">
              <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            </header>

            {/* Tab content */}
            <div className="flex-1">
              {renderActiveTab()}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-3 text-center border-t border-mint-primary/5 z-10 flex-shrink-0 mt-6">
          <p className="text-xs text-gray-500 font-semibold tracking-wider font-heading">
            &copy; {new Date().getFullYear()} Firomsa Assefa Roba | All Rights Reserved
          </p>
        </footer>
      </div>
    </>
  );
}
