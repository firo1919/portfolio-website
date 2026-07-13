"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navigation, { TabType } from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
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
    <div className="relative min-h-screen flex flex-col items-center justify-between p-3 md:p-5 lg:p-6 overflow-hidden bg-bg-base transition-colors duration-300">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-mint-primary/10 blur-[100px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-mint-secondary/5 blur-[120px] animate-float-slower pointer-events-none" />
      <div className="absolute top-[40%] right-[20%] w-80 h-80 rounded-full bg-mint-light/5 blur-[110px] animate-pulse-slow pointer-events-none" />

      {/* Main Container Wrapper */}
      <main className="w-full max-w-[1320px] flex flex-col md:flex-row gap-5 items-stretch flex-1 z-10">
        
        {/* Sidebar Left Component */}
        <Sidebar />

        {/* Content Container Right */}
        <div className="flex-1 flex flex-col gap-6 bg-glass border-glass rounded-2xl p-5 md:p-7 shadow-2xl relative">
          
          {/* Header containing Theme Toggle and Tab Switcher */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-mint-primary/5 pb-4">
            <ThemeToggle />
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          </header>

          {/* Active Tab Panel Content Area */}
          <div className="flex-1 overflow-y-auto pr-1">
            {renderActiveTab()}
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-3 text-center mt-6 border-t border-mint-primary/5 z-10">
        <p className="text-xs text-gray-500 font-semibold tracking-wider font-heading">
          &copy; {new Date().getFullYear()} Firomsa Assefa Roba | All Rights Reserved
        </p>
      </footer>

    </div>
  );
}
