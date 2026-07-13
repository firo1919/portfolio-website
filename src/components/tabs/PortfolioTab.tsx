"use client";

import Image from "next/image";
import { useState } from "react";
import { Code, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

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

  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const totalPages = Math.ceil(projects.length / pageSize);
  const paginatedProjects = projects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div id="portfolio-panel" role="tabpanel" className="flex flex-col gap-8 animate-fadeIn">
      {/* Title */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
          Creative Showcase
          <span className="absolute bottom-[-6px] left-0 w-16 h-1 rounded bg-gradient-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </h1>
      </section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedProjects.map((project) => (
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-mint-primary/5">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className="w-9 h-9 rounded-lg border border-mint-primary/10 flex items-center justify-center text-text-muted hover:text-mint-light hover:border-mint-primary/35 disabled:opacity-30 disabled:hover:text-text-muted disabled:hover:border-mint-primary/10 cursor-pointer disabled:cursor-not-allowed transition-all duration-300 bg-bg-base/20 hover:bg-bg-base/40"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                aria-current={isCurrent ? "page" : undefined}
                className={`w-9 h-9 rounded-lg font-semibold text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? "bg-mint-primary/10 text-mint-light border border-mint-primary/35 shadow-[0_0_8px_rgba(16,185,129,0.08)]"
                    : "bg-bg-base/20 hover:bg-bg-base/40 text-text-muted hover:text-text-body border border-mint-primary/5"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
            className="w-9 h-9 rounded-lg border border-mint-primary/10 flex items-center justify-center text-text-muted hover:text-mint-light hover:border-mint-primary/35 disabled:opacity-30 disabled:hover:text-text-muted disabled:hover:border-mint-primary/10 cursor-pointer disabled:cursor-not-allowed transition-all duration-300 bg-bg-base/20 hover:bg-bg-base/40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
