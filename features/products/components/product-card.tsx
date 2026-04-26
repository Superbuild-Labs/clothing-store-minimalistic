"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatCurrency } from "@/lib/currency";
import { getSafeProductImages } from "@/lib/product-image";
import { Product } from "@/features/products/types";
import { useShopStore } from "@/store/use-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

function ProductCardComponent({ product, priority = false }: ProductCardProps) {
  const addToCart = useShopStore((state) => state.addToCart);
  const setSelectedProduct = useShopStore((state) => state.setSelectedProduct);
  const images = getSafeProductImages(product.images);
  const primaryImage = images[0];
  const secondaryImage = images[1];

  return (
    <article className="group flex h-full flex-col rounded-sm border border-outline/70 bg-surface p-3 sm:p-4">
      <Link
        href={`/product/${product.id}`}
        onClick={() => setSelectedProduct(product.id)}
        className="block rounded-sm focus-visible:outline-focus"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-outline/70 bg-editorial-highlight">
          <motion.div
            whileHover={{ scale: 1.025 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full"
          >
            <FallbackImage
              src={primaryImage}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="editorial-image object-cover transition-opacity duration-500"
            />
            {secondaryImage ? (
              <FallbackImage
                src={secondaryImage}
                alt={`${product.name} alternate`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="editorial-image object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            ) : null}
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-charcoal/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-sm border border-surface/70 bg-surface/90 px-2.5 py-1 font-body text-[10px] uppercase text-charcoal backdrop-blur-[2px]">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>

      <div className="mt-4 flex flex-1 flex-col gap-5">
        <div className="space-y-2">
          <p className="font-heading text-[1.65rem] leading-tight text-foreground md:text-[1.75rem]">
            {product.name}
          </p>
          <p className="font-body text-xs uppercase tracking-wide text-charcoal/70">{product.material}</p>
          <p className="font-body text-sm font-medium text-foreground">
            {formatCurrency(product.price)}
          </p>
        </div>

        <Button
          className="mt-auto w-full"
          aria-label={`Add ${product.name} to bag`}
          onClick={() =>
            addToCart(product, {
              size: product.sizes[0],
              color: product.colors[0],
            })
          }
        >
          Add to Bag
        </Button>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);

ProductCard.displayName = "ProductCard";
