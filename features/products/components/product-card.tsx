"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { Product } from "@/features/products/types";
import { useShopStore } from "@/store/use-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addToCart = useShopStore((state) => state.addToCart);
  const setSelectedProduct = useShopStore((state) => state.setSelectedProduct);

  return (
    <article className="group flex flex-col">
      <Link
        href={`/product/${product.id}`}
        onClick={() => setSelectedProduct(product.id)}
        className="block"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-surface-soft">
          <motion.div
            whileHover={{ scale: 1.045 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-cover"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-charcoal/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {product.badge ? (
            <span className="absolute left-3 top-3 rounded-sm border border-outline bg-background/92 px-2 py-1 font-body text-[10px] uppercase tracking-luxury text-charcoal/82">
              {product.badge}
            </span>
          ) : null}
        </div>
      </Link>

      <div className="mt-4 space-y-3">
        <div className="space-y-1 text-center">
          <p className="font-heading text-3xl leading-none tracking-[-0.01em] text-foreground">
            {product.name}
          </p>
          <p className="font-body text-sm text-charcoal/72">{formatCurrency(product.price)}</p>
        </div>

        <Button
          variant="ghost"
          className="w-full border border-outline"
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
