"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Image as ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

export default function GalleryTab() {
  const galleryItems: GalleryItem[] = [
    {
      id: "myself",
      title: "Myself",
      image: "/assets/avatar.png", // Uses the local profile avatar
    },
    {
      id: "tide-trails",
      title: "Tide Trails",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&h=700&q=80",
    },
    {
      id: "wings-motion",
      title: "Wings in Motion",
      image: "https://images.unsplash.com/photo-1480044965905-02098d419e96?auto=format&fit=crop&w=500&h=700&q=80",
    },
    {
      id: "spiritual",
      title: "Spiritual Moments",
      image: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=500&h=700&q=80",
    },
    {
      id: "flora",
      title: "Flora & Peace",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=500&h=700&q=80",
    },
    {
      id: "bites",
      title: "Bites & Plates",
      image: "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?auto=format&fit=crop&w=500&h=700&q=80",
    },
    {
      id: "after-dark",
      title: "After Dark",
      image: "https://images.unsplash.com/photo-1532690650605-0ee47c928191?auto=format&fit=crop&w=500&h=700&q=80",
    },
    {
      id: "above-us",
      title: "Above Us",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=500&h=700&q=80",
    },
  ];

  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div id="gallery-panel" role="tabpanel" className="flex flex-col gap-8 animate-fadeIn">
      {/* Title */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
          Pixels & Passion
          <span className="absolute bottom-[-6px] left-0 w-16 h-1 rounded bg-gradient-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
        </h1>
      </section>

      {/* Grid of photocards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group rounded-xl overflow-hidden border border-mint-primary/10 hover:border-mint-primary/25 bg-bg-base/20 p-2 flex flex-col shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Card Frame */}
            <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-mint-secondary/15 to-bg-base rounded-lg overflow-hidden flex items-center justify-center">
              {!imgErrors[item.id] ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized={item.image.startsWith("https")}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 group-hover:brightness-100"
                  onError={() => handleImageError(item.id)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center gap-1.5">
                  <ImageIcon size={28} className="text-mint-light/40" />
                  <span className="text-[10px] text-text-muted font-semibold">{item.title}</span>
                </div>
              )}

              {/* Ambient overlay details */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Floating photo icon */}
              <div className="absolute top-2 right-2 w-7 h-7 rounded bg-bg-base/80 border border-mint-primary/10 flex items-center justify-center text-mint-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <Camera size={12} />
              </div>

              {/* Text label bottom overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <p className="text-xs md:text-sm font-bold text-white tracking-wide truncate font-heading drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
