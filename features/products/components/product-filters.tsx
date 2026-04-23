"use client";

import { Product } from "@/features/products/types";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  categoryOptions: readonly string[];
  selectedCategory: string;
  maxPrice: number;
  search: string;
  onCategoryChange: (category: string) => void;
  onPriceChange: (value: number) => void;
  onSearchChange: (value: string) => void;
  products: Product[];
}

export function ProductFilters({
  categoryOptions,
  selectedCategory,
  maxPrice,
  search,
  onCategoryChange,
  onPriceChange,
  onSearchChange,
  products,
}: ProductFiltersProps) {
  return (
    <aside className="sticky top-28 space-y-8 rounded-sm border border-outline bg-surface p-5">
      <div>
        <p className="mb-3 font-body text-xs uppercase tracking-luxury text-charcoal/75">
          Search
        </p>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          type="search"
          placeholder="Find pieces"
          className="w-full border-b border-outline bg-transparent pb-2 font-body text-sm outline-none placeholder:text-charcoal/50"
        />
      </div>

      <div>
        <p className="mb-3 font-body text-xs uppercase tracking-luxury text-charcoal/75">
          Category
        </p>
        <div className="space-y-2">
          {categoryOptions.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "w-full rounded-sm border px-3 py-2 text-left font-body text-xs uppercase tracking-luxury transition-all",
                selectedCategory === category
                  ? "border-charcoal bg-charcoal text-surface"
                  : "border-outline text-charcoal/70 hover:border-charcoal hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-body text-xs uppercase tracking-luxury text-charcoal/75">
            Price
          </p>
          <p className="font-body text-xs text-charcoal/72">Up to {formatCurrency(maxPrice)}</p>
        </div>

        <input
          type="range"
          min={100}
          max={1300}
          step={25}
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          className="w-full accent-accent"
        />
      </div>

      <p className="font-body text-xs text-charcoal/62">{products.length} products available</p>
    </aside>
  );
}
