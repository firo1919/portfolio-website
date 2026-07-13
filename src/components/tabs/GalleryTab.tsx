"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Camera, Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";

interface PhotoItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function GalleryTab() {
  const photos: PhotoItem[] = [
    {
      id: "grad-1",
      title: "Graduation Booklet",
      description: "I am holding my degree booklet at Adama Science and Technology University. It was a proud moment celebrating the completion of my BSc in Computer Science and Engineering, Class of 2018/2026.",
      image: "/assets/graduation1.jpg",
    },
    {
      id: "grad-2",
      title: "Graduation Portrait",
      description: "My official graduation portrait in my academic gown. This marks the culmination of my hard work and dedication throughout my university years at ASTU.",
      image: "/assets/graduation2.jpg",
    },
  ];

  const pageSize = 12; // 3 columns by 4 rows grid size capacity per page
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredPhoto, setHoveredPhoto] = useState<PhotoItem | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (path: string) => {
    setImgErrors((prev) => ({ ...prev, [path]: true }));
  };

  const totalPages = Math.ceil(photos.length / pageSize);
  const paginatedPhotos = photos.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => (prev === 0 ? photos.length - 1 : (prev ?? 0) - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((prev) => (prev === photos.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhotoIdx(null);
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
          Hover over any photo for first-person descriptions. Click to view in full screen.
        </p>
      </section>

      {/* Grid of gallery photos (3 columns on desktop, max 4 rows = 12 items capacity) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {paginatedPhotos.map((photo, idx) => {
          const absoluteIdx = (currentPage - 1) * pageSize + idx;
          return (
            <div
              key={photo.id}
              onMouseEnter={() => setHoveredPhoto(photo)}
              onMouseLeave={() => setHoveredPhoto(null)}
              onClick={() => setActivePhotoIdx(absoluteIdx)}
              className="group rounded-xl overflow-hidden border border-mint-primary/10 hover:border-mint-primary/25 bg-bg-base/20 p-2 flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer relative"
            >
              {/* Image Preview Frame */}
              <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-mint-secondary/15 to-bg-base rounded-lg overflow-hidden flex items-center justify-center">
                {!imgErrors[photo.image] ? (
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 group-hover:brightness-100"
                    onError={() => handleImageError(photo.image)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center gap-1.5">
                    <ImageIcon size={32} className="text-mint-light/40" />
                    <span className="text-[10px] text-text-muted font-semibold">{photo.title}</span>
                  </div>
                )}

                {/* Ambient overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Eye inspect floating button */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-mint-primary/90 text-bg-base flex items-center justify-center shadow-lg opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
                  <Eye size={20} />
                </div>

                {/* Text label bottom overlay */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <p className="text-xs font-bold text-white tracking-wide truncate font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {photo.title}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
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

      {/* Hover Tooltip Overlay with Image Maximized & Description Right */}
      {hoveredPhoto && (
        <div className="hidden lg:flex fixed bottom-6 right-6 w-[560px] bg-glass border-glass rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-40 animate-slideUp gap-4 pointer-events-none">
          {/* Left Side: Maximized Image */}
          <div className="relative w-40 h-52 rounded-lg overflow-hidden flex-shrink-0 border border-mint-primary/10 bg-gradient-to-br from-mint-secondary/15 to-bg-base flex items-center justify-center">
            {!imgErrors[hoveredPhoto.image] ? (
              <Image
                src={hoveredPhoto.image}
                alt={hoveredPhoto.title}
                fill
                sizes="160px"
                className="object-cover"
                onError={() => handleImageError(hoveredPhoto.image)}
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
              {hoveredPhoto.title}
            </h3>
            <p className="text-xs text-text-body leading-relaxed">
              {hoveredPhoto.description}
            </p>
            <div className="mt-auto flex items-center gap-1.5 text-[10px] text-mint-light font-semibold uppercase tracking-wider">
              <Camera size={10} />
              <span>ASTU Graduation Gallery</span>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div 
          onClick={() => setActivePhotoIdx(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIdx(null)}
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
                {photos[activePhotoIdx].title}
              </h2>
              <p className="text-xs text-gray-400 mt-1 md:line-clamp-2">
                {photos[activePhotoIdx].description}
              </p>
            </div>

            {/* Slider frame */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:max-h-[70vh] rounded-xl overflow-hidden bg-zinc-950/60 border border-white/10 flex items-center justify-center">
              {!imgErrors[photos[activePhotoIdx].image] ? (
                <Image
                  src={photos[activePhotoIdx].image}
                  alt={`${photos[activePhotoIdx].title} - ${activePhotoIdx + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onError={() => handleImageError(photos[activePhotoIdx].image)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <ImageIcon size={48} className="text-white/20" />
                  <span className="text-sm text-gray-500">Image representation</span>
                </div>
              )}

              {/* Slider Controls */}
              {photos.length > 1 && (
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
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    i === activePhotoIdx ? "bg-mint-primary scale-110 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-white/30"
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
