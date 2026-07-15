"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  images: string[];
  initialIndex?: number;
}

export default function Lightbox({
  isOpen,
  onClose,
  title,
  description,
  images,
  initialIndex = 0,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Sync index when initialIndex changes or modal opens
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleImageError = useCallback((path: string) => {
    setImgErrors((prev) => ({ ...prev, [path]: true }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        handlePrev();
      } else if (e.key === "ArrowRight" && images.length > 1) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, handlePrev, handleNext, onClose]);

  if (!isOpen || !mounted) return null;

  const currentImage = images[currentIndex];

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 md:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} image gallery`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-colors z-50 border border-white/5"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl flex flex-col gap-4 items-center"
      >
        {/* Title & Description */}
        <div className="text-center max-w-xl px-4">
          <h2 className="text-lg md:text-xl font-bold text-white font-heading">
            {title}
          </h2>
          {description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Image Viewer */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:max-h-[70vh] rounded-xl overflow-hidden bg-zinc-950/60 border border-white/10 flex items-center justify-center">
          {images.length > 0 && !imgErrors[currentImage] ? (
            <Image
              src={currentImage}
              alt={`${title} screenshot ${currentIndex + 1}`}
              fill
              sizes="100vw"
              priority
              className="object-contain"
              onError={() => handleImageError(currentImage)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <ImageIcon size={48} className="text-white/20" />
              <span className="text-xs text-gray-500">Image failed to load</span>
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/5 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex
                    ? "bg-mint-primary scale-110 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    : "bg-white/30"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
