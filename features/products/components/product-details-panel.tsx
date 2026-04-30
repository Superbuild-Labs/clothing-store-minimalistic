"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { TrustStrip } from "@/components/ui/trust-strip";
import { formatCurrency } from "@/lib/currency";
import { Product } from "@/features/products/types";
import { cn } from "@/lib/utils";
import { useShopStore } from "@/store/use-store";

interface ProductDetailsPanelProps {
  product: Product;
}

const sizeGuideRows = [
  { size: "XS", chest: "31-33 in", waist: "24-26 in", hip: "34-36 in" },
  { size: "S", chest: "34-36 in", waist: "27-29 in", hip: "37-39 in" },
  { size: "M", chest: "37-39 in", waist: "30-32 in", hip: "40-42 in" },
  { size: "L", chest: "40-42 in", waist: "33-35 in", hip: "43-45 in" },
  { size: "30", chest: "-", waist: "30 in", hip: "38-39 in" },
  { size: "32", chest: "-", waist: "32 in", hip: "40-41 in" },
  { size: "34", chest: "-", waist: "34 in", hip: "42-43 in" },
  { size: "OS", chest: "One size", waist: "One size", hip: "One size" },
];

export function ProductDetailsPanel({ product }: ProductDetailsPanelProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const addToCart = useShopStore((state) => state.addToCart);
  const accordionId = useId();
  const relevantSizeRows = sizeGuideRows.filter((row) => product.sizes.includes(row.size));
  const displayedSizeRows = relevantSizeRows.length > 0 ? relevantSizeRows : sizeGuideRows.slice(0, 4);
  const infoSections = [
    {
      title: "Material Details",
      content: `${product.material}. Selected for a refined handfeel, stable drape, and long-wear performance. Natural fiber pieces may show subtle texture variation, which is part of the garment character.`,
    },
    {
      title: "Shipping & Returns",
      content:
        "Ships within 2-3 business days. Complimentary domestic shipping on orders over $500, with returns accepted within 14 days for unworn pieces with original tags.",
    },
    {
      title: "Size & Fit",
      content:
        product.sizes.includes("OS")
          ? "Designed as a one-size piece with flexible styling. Contact client care for exact dimensions before ordering."
          : "Runs true to size with a relaxed ELEVE fit. Choose your usual size for the intended drape or size down for a closer proportion.",
    },
    {
      title: "Care & Traceability",
      content:
        "Produced in limited batches with responsible mills and atelier partners. Dry clean tailored and knit pieces; store folded where possible to preserve shape.",
    },
  ];

  return (
    <div className="space-y-8 lg:sticky lg:top-28">
      <div>
        <p className="font-body text-xs uppercase text-accent">{product.category}</p>
        <h1 className="mt-2 font-heading text-5xl leading-[0.98] text-foreground">
          {product.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="font-body text-base text-foreground">{formatCurrency(product.price)}</p>
          <p className="font-body text-sm text-charcoal/70">{product.material}</p>
        </div>
        <p className="mt-5 font-body text-sm leading-relaxed text-charcoal/80">
          {product.description}
        </p>
      </div>

      <TrustStrip
        compact
        signals={[
          { title: "Delivery", description: "Ships in 2-3 days" },
          { title: "Returns", description: "14-day returns" },
          { title: "Client Care", description: "Personal fit guidance" },
        ]}
      />

      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="font-body text-xs uppercase text-charcoal/75">Size</p>
          <button
            type="button"
            onClick={() => setIsSizeGuideOpen(true)}
            className="font-body text-xs text-charcoal/75 underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={selectedSize === size}
              className={cn(
                "h-10 min-w-10 rounded-sm border px-4 font-body text-xs uppercase transition-all",
                selectedSize === size
                  ? "border-charcoal bg-charcoal text-surface"
                  : "border-outline bg-surface text-charcoal/75 hover:border-charcoal hover:text-foreground",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 font-body text-xs uppercase text-charcoal/75">Color</p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              aria-pressed={selectedColor === color}
              className={cn(
                "rounded-sm border px-4 py-2 font-body text-xs uppercase transition-all",
                selectedColor === color
                  ? "border-charcoal bg-charcoal text-surface"
                  : "border-outline bg-surface text-charcoal/75 hover:border-charcoal hover:text-foreground",
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        disabled={isAdding}
        onClick={() => {
          setIsAdding(true);
          addToCart(product, {
            size: selectedSize,
            color: selectedColor,
          });
          setTimeout(() => setIsAdding(false), 500);
        }}
      >
        {isAdding ? "Adding..." : "Add to Bag"}
      </Button>
      <p className="-mt-5 font-body text-xs leading-relaxed text-charcoal/70">
        Secure checkout. Duties and delivery timing are confirmed before order placement.
      </p>

      <div className="border-t border-outline">
        {infoSections.map((section, index) => {
          const isOpen = openIndex === index;
          const panelId = `${accordionId}-${index}`;

          return (
            <div key={section.title} className="border-b border-outline">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-body text-xs uppercase text-foreground">
                  {section.title}
                </span>
                <span className="text-charcoal/70">
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              {isOpen ? (
                <p id={panelId} className="pb-4 font-body text-sm leading-relaxed text-charcoal/75">
                  {section.content}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <Modal
        open={isSizeGuideOpen}
        title="Size Guide"
        onClose={() => setIsSizeGuideOpen(false)}
      >
        <p className="max-w-xl font-body text-sm leading-relaxed text-charcoal/75">
          Measurements are body measurements. ELEVE pieces are cut with ease for an editorial drape;
          choose the smaller size if you prefer a closer fit.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse font-body text-sm">
            <thead>
              <tr className="border-b border-outline text-left text-xs uppercase text-charcoal/70">
                <th className="py-3 pr-4 font-medium">Size</th>
                <th className="py-3 pr-4 font-medium">Chest</th>
                <th className="py-3 pr-4 font-medium">Waist</th>
                <th className="py-3 font-medium">Hip</th>
              </tr>
            </thead>
            <tbody>
              {displayedSizeRows.map((row) => (
                <tr key={row.size} className="border-b border-outline/70">
                  <td className="py-3 pr-4 text-foreground">{row.size}</td>
                  <td className="py-3 pr-4 text-charcoal/75">{row.chest}</td>
                  <td className="py-3 pr-4 text-charcoal/75">{row.waist}</td>
                  <td className="py-3 text-charcoal/75">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5 rounded-sm border border-outline bg-surface-alt p-4 font-body text-sm leading-relaxed text-charcoal/75">
          Need help choosing? Select your usual size for {product.name.toLowerCase()}. Client care can
          confirm garment measurements before dispatch.
        </div>
      </Modal>
    </div>
  );
}
