"use client";

import Image from "next/image";
import { Award, Briefcase, ChevronRight, Code, ExternalLink } from "lucide-react";
import { useState } from "react";

interface StatItem {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
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
      image: "",
      tags: ["Spring Boot", "Next.js", "PostgreSQL", "Docker"],
      url: "https://github.com/firo1919/Inventory-Management-System",
    },
    {
      id: "remedymate",
      title: "RemedyMate Healthcare Platform",
      description: "Developed the frontend of a healthcare platform connecting patients with doctors using Next.js, featuring secure authentication with NextAuth.",
      image: "/assets/remedymate.png",
      tags: ["Next.js", "NextAuth", "Redux", "APIs"],
      url: "https://github.com/A2SV/g6-remedymate",
    },
  ];

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div id="about-panel" role="tabpanel" className="flex flex-col gap-8 animate-fadeIn">
      {/* Intro Section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
          Digital Identity
          <span className="absolute bottom-[-6px] left-0 w-16 h-1 rounded bg-gradient-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
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

      {/* Highlights & Successes */}
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

      {/* Featured Portfolios */}
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
            <div 
              key={project.id}
              className="group rounded-xl overflow-hidden border border-mint-primary/10 hover:border-mint-primary/25 bg-bg-base/20 hover:bg-bg-base/40 transition-all duration-300 flex flex-col shadow-lg"
            >
              {/* Image Container with Fallback */}
              <div className="relative h-44 w-full bg-gradient-to-br from-mint-secondary/10 to-bg-base flex items-center justify-center overflow-hidden border-b border-mint-primary/10">
                {project.image && !imgErrors[project.id] ? (
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center gap-2">
                    <Code size={36} className="text-mint-light/40" />
                    <span className="text-xs text-text-muted font-medium">Image representation</span>
                  </div>
                )}
                {/* Floating tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-bg-base/80 text-mint-light border border-mint-primary/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-5 flex flex-col flex-1 gap-2">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-mint-light hover:text-mint-primary flex items-center gap-1.5 font-semibold hover:underline underline-offset-2 transition-all duration-200 w-fit"
                >
                  <ExternalLink size={12} />
                  <span>{project.url.replace("https://", "")}</span>
                </a>
                <h3 className="text-lg font-bold text-text-heading group-hover:text-mint-light transition-colors duration-300 font-heading">
                  {project.title}
                </h3>
                <p className="text-xs text-text-body leading-relaxed flex-1">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
