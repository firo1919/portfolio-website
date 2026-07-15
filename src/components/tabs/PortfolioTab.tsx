"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard, { ProjectItem } from "@/components/ProjectCard";
import Lightbox from "@/components/Lightbox";

export default function PortfolioTab() {
  const projects: ProjectItem[] = [
    {
      id: "inventory-system",
      title: "Inventory Management System",
      description: "A secure, robust warehouse and stock tracking web application. Built scalable REST APIs with Spring Boot and secured endpoints utilizing Spring Security. Created a dynamic Next.js UI, optimized PostgreSQL database queries using Spring Data JPA, containerized components with Docker, and built a CI/CD pipeline.",
      category: "web",
      image: "/assets/inventory_system/dashboard.png",
      images: [
        "/assets/inventory_system/dashboard.png",
        "/assets/inventory_system/products.png",
        "/assets/inventory_system/audit-log.png"
      ],
      tags: ["Spring Boot", "Next.js", "PostgreSQL", "Docker", "CI/CD"],
      url: "https://github.com/firo1919/Inventory-Management-System",
    },
    {
      id: "remedymate",
      title: "RemedyMate Healthcare Platform",
      description: "A comprehensive healthcare platform connecting patients directly with local doctors. Developed the frontend with Next.js, integrated NextAuth for secure authentication, and used Redux to manage consistent data states across real-time interactions.",
      category: "web",
      image: "/assets/remedymate/remedymate.png",
      images: [
        "/assets/remedymate/remedymate.png",
        "/assets/remedymate/chat.jpg",
        "/assets/remedymate/chat2.jpg"
      ],
      tags: ["Next.js", "NextAuth", "Redux", "REST APIs"],
      url: "https://github.com/A2SV/g6-remedymate",
    },
    {
      id: "ecommerce-backend",
      title: "E-commerce Backend Service",
      description: "A high-performance RESTful API for an eCommerce store. Manages products, orders, cart states, and user sessions using Spring Boot. Features JWT authorization, a relational database schema designed with MariaDB, and unit tests validating service integrity.",
      category: "tool",
      image: "/assets/ecommerce/api-doc.png",
      images: [
        "/assets/ecommerce/api-doc.png"
      ],
      tags: ["Spring Boot", "JWT", "MariaDB", "Unit Testing"],
      url: "https://github.com/firo1919/e-commerce",
    },
  ];

  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);

  const handleImageError = (path: string) => {
    setImgErrors((prev) => ({ ...prev, [path]: true }));
  };

  const totalPages = Math.ceil(projects.length / pageSize);
  const paginatedProjects = projects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div id="portfolio-panel" role="tabpanel" className="flex flex-col gap-8 animate-tab-enter relative">
      {/* Title */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
          Creative Showcase
          <span className="absolute -bottom-1.5 left-0 w-16 h-1 rounded bg-linear-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </h1>
      </section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setLightboxProject(project)}
            imgErrors={imgErrors}
            onImageError={handleImageError}
          />
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
