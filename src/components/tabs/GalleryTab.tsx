"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface GalleryCard {
  id: string;
  title: string;
  description: string;
  images: string[];
  preview: string;
}

export default function GalleryTab() {
  const galleryCards: GalleryCard[] = [
    {
      id: "astu-graduation",
      title: "ASTU Graduation Ceremony",
      description: "I graduated from Adama Science and Technology University with a BSc in Computer Science and Engineering, Class of 2018/2026. The ceremony was a meaningful milestone — a celebration of years of study, collaboration, and growth within one of Ethiopia's top engineering institutions.",
      images: ["/assets/graduation1.jpg", "/assets/graduation2.jpg"],
      preview: "/assets/graduation1.jpg",
    },
    // Add more gallery events here as needed
  ];

  const pageSize = 12; // 3 columns × 4 rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCard, setHoveredCard] = useState<GalleryCard | null>(null);
  const [lightboxCard, setLightboxCard] = useState<GalleryCard | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (path: string) => {
    setImgErrors((prev) => ({ ...prev, [path]: true }));
  };

  const totalPages = Math.ceil(galleryCards.length / pageSize);
  const paginatedCards = galleryCards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const openLightbox = (card: GalleryCard) => {
    setLightboxCard(card);
    setLightboxIdx(0);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxCard) return;
    setLightboxIdx((prev) => (prev === 0 ? lightboxCard.images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxCard) return;
    setLightboxIdx((prev) => (prev === lightboxCard.images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxCard(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div id="gallery-panel" role="tabpanel" className="flex flex-col gap-8 animate-fadeIn relative">
      {/* Title */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
          Moments
          <span className="absolute bottom-[-6px] left-0 w-16 h-1 rounded bg-gradient-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </h1>
        <p className="text-xs text-text-muted mt-2">
          Hover for event details. Click to view all photos in fullscreen.
        </p>
      </section>

      {/* 3-column grid, 4 rows max per page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {paginatedCards.map((card) => (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredCard(card)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => openLightbox(card)}
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
                  onError={() => handleImageError(card.preview)}
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-mint-primary/90 text-bg-base flex items-center justify-center shadow-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
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
            {hoveredCard?.id === card.id && (
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
                      onError={() => handleImageError(card.preview)}
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
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-mint-primary/5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
            className="w-9 h-9 rounded-lg border border-mint-primary/10 flex items-center justify-center text-text-muted hover:text-mint-light hover:border-mint-primary/35 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 bg-bg-base/20 hover:bg-bg-base/40"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`w-9 h-9 rounded-lg font-semibold text-xs transition-all duration-300 cursor-pointer ${
                page === currentPage
                  ? "bg-mint-primary/10 text-mint-light border border-mint-primary/35"
                  : "bg-bg-base/20 hover:bg-bg-base/40 text-text-muted hover:text-text-body border border-mint-primary/5"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
            className="w-9 h-9 rounded-lg border border-mint-primary/10 flex items-center justify-center text-text-muted hover:text-mint-light hover:border-mint-primary/35 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 bg-bg-base/20 hover:bg-bg-base/40"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}


      {/* Fullscreen Lightbox */}
      {lightboxCard && (
        <div
          onClick={() => setLightboxCard(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 md:p-8"
        >
          <button
            onClick={() => setLightboxCard(null)}
            className="absolute top-4 right-4 w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl flex flex-col gap-4 items-center"
          >
            {/* Title & description */}
            <div className="text-center max-w-xl px-4">
              <h2 className="text-lg md:text-xl font-bold text-white font-heading">
                {lightboxCard.title}
              </h2>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                {lightboxCard.description}
              </p>
            </div>

            {/* Image viewer */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:max-h-[70vh] rounded-xl overflow-hidden bg-zinc-950/60 border border-white/10 flex items-center justify-center">
              {!imgErrors[lightboxCard.images[lightboxIdx]] ? (
                <Image
                  src={lightboxCard.images[lightboxIdx]}
                  alt={`${lightboxCard.title} photo ${lightboxIdx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onError={() => handleImageError(lightboxCard.images[lightboxIdx])}
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon size={48} className="text-white/20" />
                </div>
              )}

              {lightboxCard.images.length > 1 && (
                <>
                  <button onClick={handlePrev} className="absolute left-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 cursor-pointer hover:scale-105 active:scale-95 transition-all" aria-label="Previous">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={handleNext} className="absolute right-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 cursor-pointer hover:scale-105 active:scale-95 transition-all" aria-label="Next">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {lightboxCard.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    i === lightboxIdx
                      ? "bg-mint-primary scale-110 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      : "bg-white/30"
                  }`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
