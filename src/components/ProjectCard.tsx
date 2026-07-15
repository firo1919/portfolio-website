"use client";

import Image from "next/image";
import { ExternalLink, Code, Camera, Eye } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "web" | "cli" | "tool";
  image: string;
  images: string[];
  tags: string[];
  url: string;
}

interface ProjectCardProps {
  project: ProjectItem;
  onClick: () => void;
  imgErrors: Record<string, boolean>;
  onImageError: (path: string) => void;
}

export default function ProjectCard({
  project,
  onClick,
  imgErrors,
  onImageError,
}: ProjectCardProps) {
  const hasImages = project.images && project.images.length > 0;

  return (
    <div
      onClick={onClick}
      className={`group rounded-xl overflow-hidden border border-mint-primary/10 hover:border-mint-primary/25 bg-bg-base/20 hover:bg-bg-base/40 transition-all duration-300 flex flex-col shadow-lg ${
        hasImages ? "cursor-pointer" : ""
      }`}
    >
      {/* Image Container with Fallback */}
      <div className="relative h-44 w-full bg-linear-to-br from-mint-secondary/10 to-bg-base flex items-center justify-center overflow-hidden border-b border-mint-primary/10">
        {project.image && !imgErrors[project.image] ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => onImageError(project.image)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center gap-2">
            <Code size={36} className="text-mint-light/40" />
            <span className="text-xs text-text-muted font-medium">Image representation</span>
          </div>
        )}

        {/* Overlay gradient & Eye icon on hover for image inspection */}
        {hasImages && (
          <>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
              <div className="w-10 h-10 rounded-full bg-mint-primary/95 text-bg-base flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300">
                <Eye size={18} />
              </div>
            </div>

            {/* Photo count badge */}
            <div className="absolute top-3 left-3 px-2 py-1 rounded bg-bg-base/80 border border-mint-primary/10 flex items-center gap-1 text-[10px] font-bold text-mint-light backdrop-blur-sm z-20">
              <Camera size={10} />
              <span>{project.images.length}</span>
            </div>
          </>
        )}

        {/* Floating category label */}
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-mint-primary/10 text-mint-light border border-mint-primary/20 backdrop-blur-md z-20">
          {project.category}
        </span>
        {/* Tags overlay */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-20">
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
  );
}
