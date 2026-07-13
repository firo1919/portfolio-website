"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface GalleryCard {
  id: string;
  title: string;
  description: string;
  images: string[];
}

export default function GalleryTab() {
  const galleryCards: GalleryCard[] = [
    {
      id: "graduation-astu",
      title: "ASTU Graduation Ceremony",
      description: "Firomsa Assefa Roba holding the degree booklet at Adama Science and Technology University. Celebrating a milestone achievement in Computer Science and Engineering, Class of 2018/2026.",
      images: ["/assets/graduation1.jpg", "/assets/graduation2.jpg"],
    },
    {
      id: "academic-portrait",
      title: "Academic Milestone Portraits",
      description: "Official graduation portraits showcasing academic achievement in Computer Science and Engineering, representing ASTU's commitment to innovation and research.",
      images: ["/assets/graduation2.jpg", "/assets/graduation1.jpg"],
    },
  ];

  const [hoveredCard, setHoveredCard] = useState<GalleryCard | null>(null);
  const [activeCard, setActiveCard] = useState<GalleryCard | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (path: string) => {
    setImgErrors((prev) => ({ ...prev, [path]: true }));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeCard) return;
    setActiveImageIdx((prev) => (prev === 0 ? activeCard.images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeCard) return;
    setActiveImageIdx((prev) => (prev === activeCard.images.length - 1 ? 0 : prev + 1));
  };

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveCard(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="gallery-panel" role="tabpanel" className="flex flex-col gap-8 animate-fadeIn relative">
      {/* Title */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
          Pixels & Passion
          <span className="absolute bottom-[-6px] left-0 w-16 h-1 rounded bg-gradient-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </h1>
        <p className="text-xs text-text-muted mt-2">
          Hover for details and description. Click to view all images in fullscreen lightbox.
        </p>
      </section>

      {/* Grid of gallery cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {galleryCards.map((card) => (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => {
              setActiveCard(card);
              setActiveImageIdx(0);
            }}
            className="group rounded-xl overflow-hidden border border-mint-primary/10 hover:border-mint-primary/25 bg-bg-base/20 p-3 flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer relative"
          >
            {/* Image Preview Frame */}
            <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-mint-secondary/15 to-bg-base rounded-lg overflow-hidden flex items-center justify-center">
              {!imgErrors[card.images[0]] ? (
                <Image
                  src={card.images[0]}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                  onError={() => handleImageError(card.images[0])}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center gap-1.5">
                  <ImageIcon size={32} className="text-mint-light/40" />
                  <span className="text-[10px] text-text-muted font-semibold">{card.title}</span>
                </div>
              )}

              {/* Ambient overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Floating photos count indicator */}
              <div className="absolute top-3 right-3 px-2 py-1 rounded bg-bg-base/80 border border-mint-primary/10 flex items-center gap-1 text-[10px] font-bold text-mint-light backdrop-blur-sm shadow-md">
                <Camera size={10} />
                <span>{card.images.length} photos</span>
              </div>

              {/* Eye inspect floating button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-mint-primary/90 text-bg-base flex items-center justify-center shadow-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
                <Eye size={20} />
              </div>

              {/* Text label bottom overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="text-sm font-bold text-white tracking-wide truncate font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {card.title}
                </p>
                <p className="text-[10px] text-mint-light font-medium tracking-wide mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Click to inspect
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hover Tooltip Overlay with Image Maximized & Description Right */}
      {hoveredCard && (
        <div className="hidden lg:flex fixed bottom-6 right-6 w-[560px] bg-glass border-glass rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-40 animate-slideUp gap-4 pointer-events-none">
          {/* Left Side: Maximized Image */}
          <div className="relative w-40 h-52 rounded-lg overflow-hidden flex-shrink-0 border border-mint-primary/10">
            {!imgErrors[hoveredCard.images[0]] ? (
              <Image
                src={hoveredCard.images[0]}
                alt={hoveredCard.title}
                fill
                sizes="160px"
                className="object-cover"
                onError={() => handleImageError(hoveredCard.images[0])}
              />
            ) : (
              <div className="w-full h-full bg-bg-base flex items-center justify-center">
                <ImageIcon size={24} className="text-mint-light/40" />
              </div>
            )}
          </div>

          {/* Right Side: Description and Details */}
          <div className="flex flex-col gap-2 min-w-0">
            <h3 className="text-base font-bold text-text-heading font-heading tracking-wide border-b border-mint-primary/5 pb-1">
              {hoveredCard.title}
            </h3>
            <p className="text-xs text-text-body leading-relaxed">
              {hoveredCard.description}
            </p>
            <div className="mt-auto flex items-center gap-1.5 text-[10px] text-mint-light font-semibold uppercase tracking-wider">
              <Camera size={10} />
              <span>Includes {hoveredCard.images.length} High-Res Photos</span>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activeCard && (
        <div 
          onClick={() => setActiveCard(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveCard(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close Fullscreen"
          >
            <X size={24} />
          </button>

          {/* Lightbox Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl flex flex-col gap-4 items-center justify-center"
          >
            {/* Header info */}
            <div className="text-center w-full max-w-xl px-4">
              <h2 className="text-lg md:text-xl font-bold text-white font-heading truncate">
                {activeCard.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1 md:line-clamp-2">
                {activeCard.description}
              </p>
            </div>

            {/* Slider frame */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:max-h-[70vh] rounded-xl overflow-hidden bg-zinc-950/60 border border-white/10 flex items-center justify-center">
              {!imgErrors[activeCard.images[activeImageIdx]] ? (
                <Image
                  src={activeCard.images[activeImageIdx]}
                  alt={`${activeCard.title} - ${activeImageIdx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onError={() => handleImageError(activeCard.images[activeImageIdx])}
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon size={48} className="text-white/20" />
                  <span className="text-sm text-gray-500">Image representation</span>
                </div>
              )}

              {/* Slider Controls */}
              {activeCard.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Slide Indicators / Thumbnails */}
            <div className="flex items-center gap-2 mt-2">
              {activeCard.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    i === activeImageIdx ? "bg-mint-primary scale-110 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-white/30"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
