"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { Product } from "@/features/products/types";
import { cn } from "@/lib/utils";
import { useShopStore } from "@/store/use-store";

interface ProductDetailsPanelProps {
  product: Product;
}

const infoSections = [
  {
    title: "Details & Care",
    content:
      "Crafted in limited quantities. Dry clean only. Store folded to preserve shape and material memory.",
  },
  {
    title: "Shipping & Returns",
    content:
      "Complimentary domestic shipping over $500. Returns accepted within 14 days for unworn items.",
  },
  {
    title: "Sustainability",
    content:
      "Produced in small batches with responsible mills and traceable sourcing standards.",
  },
];

export function ProductDetailsPanel({ product }: ProductDetailsPanelProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const addToCart = useShopStore((state) => state.addToCart);

  return (
    <div className="space-y-8 lg:sticky lg:top-28">
      <div>
        <p className="font-body text-xs uppercase tracking-luxury text-accent">{product.category}</p>
        <h1 className="mt-2 font-heading text-5xl leading-[0.94] tracking-[-0.02em] text-foreground">
          {product.name}
        </h1>
        <p className="mt-4 font-heading text-3xl text-foreground">{formatCurrency(product.price)}</p>
        <p className="mt-5 font-body text-sm leading-relaxed text-charcoal/76">
          {product.description}
        </p>
      </div>

      <div>
        <p className="mb-3 font-body text-xs uppercase tracking-luxury text-charcoal/74">Size</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "h-10 min-w-10 rounded-full border px-4 font-body text-xs uppercase tracking-luxury transition-all",
                selectedSize === size
                  ? "border-charcoal bg-charcoal text-surface"
                  : "border-outline text-charcoal/75 hover:border-charcoal hover:text-foreground",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 font-body text-xs uppercase tracking-luxury text-charcoal/74">Color</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "rounded-sm border px-4 py-2 font-body text-xs uppercase tracking-luxury transition-all",
                selectedColor === color
                  ? "border-charcoal bg-charcoal text-surface"
                  : "border-outline text-charcoal/75 hover:border-charcoal hover:text-foreground",
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() =>
          addToCart(product, {
            size: selectedSize,
            color: selectedColor,
          })
        }
      >
        Add to Cart
      </Button>

      <div className="border-t border-outline">
        {infoSections.map((section, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={section.title} className="border-b border-outline">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="font-body text-xs uppercase tracking-luxury text-foreground">
                  {section.title}
                </span>
                <span className="text-lg text-charcoal/70">{isOpen ? "-" : "+"}</span>
              </button>
              {isOpen ? (
                <p className="pb-4 font-body text-sm leading-relaxed text-charcoal/74">
                  {section.content}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
