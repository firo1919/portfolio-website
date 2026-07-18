"use client";

import { Award, Briefcase, ChevronRight, Code } from "lucide-react";
import { useState } from "react";
import ProjectCard, { ProjectItem } from "@/components/ProjectCard";
import Lightbox from "@/components/Lightbox";
import ScrollReveal from "@/components/ScrollReveal";

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export default function AboutTab({ onNavigateToTab }: { onNavigateToTab?: (tab: "about" | "resume" | "portfolio" | "contact" | "gallery") => void }) {
  const stats: StatItem[] = [
    { value: "400+", label: "LeetCode Problems", icon: <Award size={20} className="text-mint-light" /> },
    { value: "10+", label: "Projects Completed", icon: <Code size={20} className="text-mint-light" /> },
    { value: "2+", label: "Years Experience", icon: <Briefcase size={20} className="text-mint-light" /> },
  ];

  const featuredProjects: ProjectItem[] = [
    {
      id: "inventory-system",
      title: "Inventory Management System",
      description: "Built scalable REST APIs with Spring Boot, secured endpoints with Spring Security, and developed a Next.js interface for real-time tracking.",
      category: "web",
      image: "/assets/inventory_system/dashboard.png",
      images: [
        "/assets/inventory_system/dashboard.png",
        "/assets/inventory_system/products.png",
        "/assets/inventory_system/audit-log.png"
      ],
      tags: ["Spring Boot", "Next.js", "PostgreSQL", "Docker"],
      url: "https://github.com/firo1919/Inventory-Management-System",
    },
    {
      id: "remedymate",
      title: "RemedyMate Healthcare Platform",
      description: "Developed the frontend of a healthcare platform connecting patients with doctors using Next.js, featuring secure authentication with NextAuth.",
      category: "web",
      image: "/assets/remedymate/remedymate.png",
      images: [
        "/assets/remedymate/remedymate.png",
        "/assets/remedymate/chat.jpg",
        "/assets/remedymate/chat2.jpg"
      ],
      tags: ["Next.js", "NextAuth", "Redux", "APIs"],
      url: "https://github.com/A2SV/g6-remedymate",
    },
  ];

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);

  const handleImageError = (path: string) => {
    setImgErrors((prev) => ({ ...prev, [path]: true }));
  };

  return (
    <div id="about-panel" role="tabpanel" className="flex flex-col gap-12 animate-tab-enter">
      {/* Intro Section */}
      <ScrollReveal delayMs={50}>
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
            Digital Identity
            <span className="absolute -bottom-1.5 left-0 w-16 h-1 rounded bg-linear-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </h1>
          <div className="text-text-body leading-relaxed space-y-4 mt-4 text-sm md:text-base">
            <p>
              I&apos;m <strong className="text-mint-light font-semibold font-heading">Firomsa Assefa Roba</strong>, a driven Software Engineer with hands-on experience in web development using Next.js and Spring Boot.
            </p>
            <p>
              I have a strong foundation in programming, algorithms, and data structures, and a passion for designing efficient, secure, and highly maintainable software solutions. I completed intensive training in Software Development at Africa to Silicon Valley (A2SV), and hold a BSc in Computer Science and Engineering from Adama Science and Technology University.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Highlights & Successes */}
      <ScrollReveal delayMs={150}>
        <section className="flex flex-col gap-4">
          <h2 className="text-lg md:text-xl font-bold font-heading text-text-heading flex items-center gap-2">
            <span>Highlights & Successes</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-bg-base/20 border border-mint-primary/10 hover:border-mint-primary/25 transition-all duration-300 flex flex-col gap-2 group hover:bg-bg-base/40"
              >
                <div className="w-10 h-10 rounded-lg bg-mint-primary/10 flex items-center justify-center group-hover:bg-mint-primary/20 transition-all duration-300">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-text-heading font-heading text-glow">{stat.value}</div>
                  <div className="text-xs text-text-muted font-medium tracking-wide mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Portfolios */}
      <ScrollReveal delayMs={250}>
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold font-heading text-text-heading">Featured Portfolios</h2>
            {onNavigateToTab && (
              <button 
                onClick={() => onNavigateToTab("portfolio")}
                className="text-xs font-semibold text-mint-light hover:text-text-heading flex items-center gap-1 group cursor-pointer transition-colors duration-200"
              >
                <span>View All</span>
                <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setLightboxProject(project)}
                imgErrors={imgErrors}
                onImageError={handleImageError}
              />
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={!!lightboxProject}
        onClose={() => setLightboxProject(null)}
        title={lightboxProject?.title || ""}
        description={lightboxProject?.description || ""}
        images={lightboxProject?.images || []}
      />
    </div>
  );
}
