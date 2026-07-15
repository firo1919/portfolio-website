"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Eye, ImageIcon } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  preview: string;
}

interface GalleryCardProps {
  card: GalleryItem;
  onClick: () => void;
  imgErrors: Record<string, boolean>;
  onImageError: (path: string) => void;
}

export default function GalleryCard({
  card,
  onClick,
  imgErrors,
  onImageError,
}: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative rounded-xl overflow-visible border border-mint-primary/10 hover:border-mint-primary/25 bg-bg-base/20 p-2 flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer"
    >
      <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-mint-secondary/15 to-bg-base rounded-lg overflow-hidden">
        {!imgErrors[card.preview] ? (
          <Image
            src={card.preview}
            alt={card.title}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95 group-hover:brightness-100"
            onError={() => onImageError(card.preview)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
            <ImageIcon size={32} className="text-mint-light/40" />
            <span className="text-[10px] text-text-muted font-semibold">{card.title}</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Photo count badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-bg-base/80 border border-mint-primary/10 flex items-center gap-1 text-[10px] font-bold text-mint-light backdrop-blur-sm">
          <Camera size={10} />
          <span>{card.images.length}</span>
        </div>

        {/* Inspect icon on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-mint-primary/95 text-bg-base flex items-center justify-center shadow-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-10">
          <Eye size={20} />
        </div>

        {/* Title label */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <p className="text-xs font-bold text-white tracking-wide truncate font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {card.title}
          </p>
        </div>
      </div>

      {/* Tooltip: anchored to top-left of the card, expands to the right */}
      {isHovered && (
        <div className="hidden lg:flex absolute top-0 left-full ml-3 w-[420px] bg-glass border-glass rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-50 gap-4 pointer-events-none">
          {/* Left: maximized preview */}
          <div className="relative w-28 h-40 rounded-lg overflow-hidden flex-shrink-0 border border-mint-primary/10 bg-gradient-to-br from-mint-secondary/15 to-bg-base">
            {!imgErrors[card.preview] ? (
              <Image
                src={card.preview}
                alt={card.title}
                fill
                sizes="112px"
                className="object-cover"
                onError={() => onImageError(card.preview)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon size={20} className="text-mint-light/40" />
              </div>
            )}
          </div>
          {/* Right: title + description */}
          <div className="flex flex-col gap-2 min-w-0">
            <h3 className="text-sm font-bold text-text-heading font-heading border-b border-mint-primary/5 pb-1 leading-tight">
              {card.title}
            </h3>
            <p className="text-xs text-text-body leading-relaxed line-clamp-5">
              {card.description}
            </p>
            <div className="mt-auto flex items-center gap-1.5 text-[10px] text-mint-light font-semibold uppercase tracking-wider">
              <Camera size={10} />
              <span>{card.images.length} photos in this album</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
