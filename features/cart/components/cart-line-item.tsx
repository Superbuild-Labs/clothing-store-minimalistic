import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { CartItem } from "@/store/use-store";

interface CartLineItemProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartLineItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartLineItemProps) {
  return (
    <article className="flex gap-4 border-b border-outline pb-5">
      <div className="relative h-24 w-20 overflow-hidden rounded-sm bg-surface-soft">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-heading text-2xl leading-none tracking-[-0.01em] text-foreground">
              {item.name}
            </h3>
            <p className="mt-2 font-body text-xs text-charcoal/70">
              {[item.color, item.size].filter(Boolean).join(" / ") || "Selected option"}
            </p>
          </div>
          <button
            onClick={onRemove}
            aria-label="Remove item"
            className="text-charcoal/60 transition-colors hover:text-foreground"
          >
            <X size={14} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center rounded-sm border border-outline">
            <button
              onClick={onDecrease}
              aria-label="Decrease quantity"
              className="px-2 py-1 text-charcoal/70 transition-colors hover:text-foreground"
            >
              <Minus size={12} />
            </button>
            <span className="px-3 font-body text-xs">{item.quantity}</span>
            <button
              onClick={onIncrease}
              aria-label="Increase quantity"
              className="px-2 py-1 text-charcoal/70 transition-colors hover:text-foreground"
            >
              <Plus size={12} />
            </button>
          </div>

          <p className="font-body text-sm text-foreground">
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </article>
  );
}
