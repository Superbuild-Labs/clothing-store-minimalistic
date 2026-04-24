"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { FallbackImage } from "@/components/ui/fallback-image";
import { getSafeProductImages } from "@/lib/product-image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const safeImages = getSafeProductImages(images);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = safeImages[activeIndex] ?? safeImages[0];

  return (
    <div className="space-y-3">
      <motion.div
        key={activeImage}
        initial={{ opacity: 0.4, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface-soft"
      >
        <FallbackImage
          src={activeImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 56vw"
          className="object-cover"
        />
      </motion.div>

      {safeImages.length > 1 ? (
        <div className="grid grid-cols-3 gap-3">
          {safeImages.map((image, index) => (
            <button
              key={image}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-[3/4] overflow-hidden rounded-sm border",
                index === activeIndex ? "border-charcoal" : "border-outline",
              )}
            >
              <FallbackImage
                src={image}
                alt={`${name} preview ${index + 1}`}
                fill
                sizes="(max-width: 1024px) 33vw, 12vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
