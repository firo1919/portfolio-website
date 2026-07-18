"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GalleryCard, { GalleryItem } from "@/components/GalleryCard";
import Lightbox from "@/components/Lightbox";
import ScrollReveal from "@/components/ScrollReveal";

export default function GalleryTab() {
  const galleryCards: GalleryItem[] = [
    {
      id: "astu-graduation",
      title: "ASTU Graduation Ceremony",
      description: "I graduated from Adama Science and Technology University with a BSc in Computer Science and Engineering, Class of 2018/2026. The ceremony was a meaningful milestone — a celebration of years of study, collaboration, and growth within one of Ethiopia's top engineering institutions.",
      images: ["/assets/graduation/graduation1.jpg", "/assets/graduation/graduation2.jpg"],
      preview: "/assets/graduation/graduation1.jpg",
    },
    // Add more gallery events here as needed
  ];

  const pageSize = 12; // 3 columns × 4 rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [lightboxCard, setLightboxCard] = useState<GalleryItem | null>(null);

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

  return (
    <div id="gallery-panel" role="tabpanel" className="flex flex-col gap-8 animate-tab-enter relative">
      {/* Title */}
      <ScrollReveal delayMs={50}>
        <section className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
            Moments
            <span className="absolute -bottom-1.5 left-0 w-16 h-1 rounded bg-linear-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </h1>
          <p className="text-xs text-text-muted mt-2">
            Hover for event details. Click to view all photos in fullscreen.
          </p>
        </section>
      </ScrollReveal>

      {/* 3-column grid, 4 rows max per page */}
      <ScrollReveal delayMs={150}>
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {paginatedCards.map((card) => (
              <GalleryCard
                key={card.id}
                card={card}
                onClick={() => setLightboxCard(card)}
                imgErrors={imgErrors}
                onImageError={handleImageError}
              />
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
        </div>
      </ScrollReveal>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={!!lightboxCard}
        onClose={() => setLightboxCard(null)}
        title={lightboxCard?.title || ""}
        description={lightboxCard?.description || ""}
        images={lightboxCard?.images || []}
      />
    </div>
  );
}
