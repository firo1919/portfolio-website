"use client";

export type TabType = "about" | "resume" | "portfolio" | "contact" | "gallery";

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs: { id: TabType; label: string }[] = [
    { id: "about", label: "About" },
    { id: "resume", label: "Resume" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
    { id: "gallery", label: "Gallery" },
  ];

  return (
    <nav 
      aria-label="Primary"
      className="bg-bg-base/80 border border-mint-primary/10 rounded-xl p-1 flex flex-wrap gap-1 items-center shadow-lg backdrop-blur-md self-end"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={isActive}
            role="tab"
            aria-controls={`${tab.id}-panel`}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 relative cursor-pointer outline-none select-none ${
              isActive
                ? "bg-mint-primary/10 text-mint-light border border-mint-primary/20 shadow-[0_0_10px_rgba(16,185,129,0.08)]"
                : "text-text-muted hover:text-text-body hover:bg-bg-card/45 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
