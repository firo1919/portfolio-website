"use client";

import Image from "next/image";
import { useState } from "react";
import { Code, ExternalLink, Filter } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "web" | "cli" | "tool";
  image: string;
  tags: string[];
  url: string;
}

export default function PortfolioTab() {
  const projects: ProjectItem[] = [
    {
      id: "inventory-system",
      title: "Inventory Management System",
      description: "A secure, robust warehouse and stock tracking web application. Built scalable REST APIs with Spring Boot and secured endpoints utilizing Spring Security. Created a dynamic Next.js UI, optimized PostgreSQL database queries using Spring Data JPA, containerized components with Docker, and built a CI/CD pipeline.",
      category: "web",
      image: "/assets/project1.jpg",
      tags: ["Spring Boot", "Next.js", "PostgreSQL", "Docker", "CI/CD"],
      url: "https://github.com/firo1919/Inventory-Management-System",
    },
    {
      id: "remedymate",
      title: "RemedyMate Healthcare Platform",
      description: "A comprehensive healthcare platform connecting patients directly with local doctors. Developed the frontend with Next.js, integrated NextAuth for secure authentication, and used Redux to manage consistent data states across real-time interactions.",
      category: "web",
      image: "/assets/project3.jpg",
      tags: ["Next.js", "NextAuth", "Redux", "REST APIs"],
      url: "https://github.com/A2SV/g6-remedymate",
    },
    {
      id: "ecommerce-backend",
      title: "E-commerce Backend Service",
      description: "A high-performance RESTful API for an eCommerce store. Manages products, orders, cart states, and user sessions using Spring Boot. Features JWT authorization, a relational database schema designed with MariaDB, and unit tests validating service integrity.",
      category: "tool",
      image: "/assets/project4.jpg",
      tags: ["Spring Boot", "JWT", "MariaDB", "Unit Testing"],
      url: "https://github.com/firo1919/e-commerce",
    },
  ];

  const categories: { id: "all" | "web" | "cli" | "tool"; label: string }[] = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Applications" },
    { id: "tool", label: "Developer Tools / APIs" },
  ];

  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "cli" | "tool">("all");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div id="portfolio-panel" role="tabpanel" className="flex flex-col gap-8 animate-fadeIn">
      {/* Title */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
          Creative Showcase
          <span className="absolute bottom-[-6px] left-0 w-16 h-1 rounded bg-gradient-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </h1>
      </section>

      {/* Filter Menu */}
      <div className="flex flex-wrap items-center gap-2 border-b border-mint-primary/10 pb-4">
        <div className="text-text-muted flex items-center gap-1.5 mr-2 text-xs font-semibold uppercase tracking-wider">
          <Filter size={14} />
          <span>Filter:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-mint-primary/10 text-mint-light border border-mint-primary/20"
                : "text-text-muted hover:text-text-body border border-transparent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group rounded-xl overflow-hidden border border-mint-primary/10 hover:border-mint-primary/25 bg-bg-base/20 hover:bg-bg-base/40 transition-all duration-300 flex flex-col shadow-lg"
          >
            {/* Image Container with Fallback */}
            <div className="relative h-44 w-full bg-gradient-to-br from-mint-secondary/10 to-bg-base flex items-center justify-center overflow-hidden border-b border-mint-primary/10">
              {!imgErrors[project.id] ? (
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
              {/* Floating category label */}
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-mint-primary/10 text-mint-light border border-mint-primary/20 backdrop-blur-md">
                {project.category}
              </span>
              {/* Tags overlay */}
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-10">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-bg-base/95 text-mint-light border border-mint-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Info details */}
            <div className="p-5 flex flex-col flex-1 gap-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-text-muted hover:text-mint-light flex items-center gap-1 font-semibold uppercase tracking-wider w-fit"
              >
                <span>URL : {project.url.replace("https://", "")}</span>
                <ExternalLink size={10} />
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
    </div>
  );
}
