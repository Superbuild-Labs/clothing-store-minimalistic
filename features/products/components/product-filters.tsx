"use client";

import { FormEvent, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import { Product } from "@/features/products/types";
import { formatCurrency } from "@/lib/currency";
import { cn } from "@/lib/utils";
import { ProductSort } from "@/hooks/use-product-filters";

interface ProductFiltersProps {
  categoryOptions: readonly string[];
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  maxAvailablePrice: number;
  search: string;
  selectedSizes: string[];
  selectedColors: string[];
  selectedMaterials: string[];
  sizeOptions: string[];
  colorOptions: string[];
  materialOptions: string[];
  sort: ProductSort;
  onSortChange: (value: ProductSort) => void;
  onCategoryChange: (category: string) => void;
  onMinPriceChange: (value: number) => void;
  onPriceChange: (value: number) => void;
  onSearchChange: (value: string) => void;
  onToggleSize: (value: string) => void;
  onToggleColor: (value: string) => void;
  onToggleMaterial: (value: string) => void;
  onClearAll: () => void;
  products: Product[];
}

export function ProductFilters({
  categoryOptions,
  selectedCategory,
  minPrice,
  maxPrice,
  maxAvailablePrice,
  search,
  selectedSizes,
  selectedColors,
  selectedMaterials,
  sizeOptions,
  colorOptions,
  materialOptions,
  sort,
  onSortChange,
  onCategoryChange,
  onMinPriceChange,
  onPriceChange,
  onSearchChange,
  onToggleSize,
  onToggleColor,
  onToggleMaterial,
  onClearAll,
  products,
}: ProductFiltersProps) {
  const [searchInput, setSearchInput] = useState(search);
  const [expandedSections, setExpandedSections] = useState({
    sort: false,
    size: false,
    category: false,
    price: false,
    color: false,
    material: false,
  });

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  const toggleSection = (key: keyof typeof expandedSections) => {
    setExpandedSections((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchChange(searchInput.trim());
  };

  const activeFilters = [
    selectedCategory !== "All" ? `Category: ${selectedCategory}` : null,
    selectedSizes.map((value) => `Size: ${value}`),
    selectedColors.map((value) => `Color: ${value}`),
    selectedMaterials.map((value) => `Material: ${value}`),
    search.trim() ? `Search: ${search.trim()}` : null,
    minPrice > 100 ? `Min: ${formatCurrency(minPrice)}` : null,
    maxPrice < maxAvailablePrice ? `Max: ${formatCurrency(maxPrice)}` : null,
    sort !== "newest" ? `Sort: ${sort}` : null,
  ]
    .flat()
    .filter(Boolean) as string[];

  return (
    <aside className="space-y-8 rounded-sm border border-outline bg-surface p-5 lg:sticky lg:top-28">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-body text-xs uppercase text-charcoal/75">
            Search
          </p>
          {activeFilters.length > 0 ? (
            <button
              onClick={onClearAll}
              className="font-body text-xs uppercase text-charcoal/70 underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          ) : null}
        </div>
        <form onSubmit={submitSearch} className="flex items-center gap-2">
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            type="search"
            placeholder="Find pieces"
            className="w-full border-b border-outline bg-transparent pb-2 font-body text-sm outline-none transition-colors focus:border-charcoal focus-visible:outline-none"
          />
          <button
            type="submit"
            className="rounded-sm border border-outline px-3 py-1.5 font-body text-xs uppercase text-charcoal/80 transition-colors hover:border-charcoal hover:text-foreground"
          >
            Search
          </button>
        </form>
      </div>

      {activeFilters.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <span
              key={filter}
              className="rounded-full border border-outline bg-surface-alt px-2.5 py-1 font-body text-xs uppercase text-charcoal/75"
            >
              {filter}
            </span>
          ))}
        </div>
      ) : null}

      <div className="border-t border-outline/60 pt-4 lg:border-0 lg:pt-0">
        <button
          onClick={() => toggleSection("sort")}
          aria-expanded={expandedSections.sort}
          className="flex w-full items-center justify-between text-left lg:pointer-events-none"
        >
          <p className="font-body text-xs uppercase text-charcoal/75">Sort</p>
          <ChevronDown
            size={15}
            className={cn("transition-transform lg:hidden", expandedSections.sort ? "rotate-180" : "rotate-0")}
          />
        </button>
        <div className={cn("pt-3", expandedSections.sort ? "block" : "hidden", "lg:block")}>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as ProductSort)}
            className="w-full rounded-sm border border-outline bg-transparent px-3 py-2 font-body text-xs uppercase text-charcoal/80"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
            <option value="featured">Featured</option>
          </select>
        </div>
      </div>

      <div className="border-t border-outline/60 pt-4 lg:border-0 lg:pt-0">
        <button
          onClick={() => toggleSection("size")}
          aria-expanded={expandedSections.size}
          className="flex w-full items-center justify-between text-left lg:pointer-events-none"
        >
          <p className="font-body text-xs uppercase text-charcoal/75">Size</p>
          <ChevronDown
            size={15}
            className={cn("transition-transform lg:hidden", expandedSections.size ? "rotate-180" : "rotate-0")}
          />
        </button>
        <div className={cn("space-y-2 pt-3", expandedSections.size ? "block" : "hidden", "lg:block")}>
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => onToggleSize(size)}
              className={cn(
                "w-full rounded-sm border px-3 py-2 text-left font-body text-xs uppercase transition-all",
                selectedSizes.includes(size)
                  ? "border-charcoal bg-charcoal text-surface"
                  : "border-outline text-charcoal/70 hover:border-charcoal hover:text-foreground",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-outline/60 pt-4 lg:border-0 lg:pt-0">
        <button
          onClick={() => toggleSection("category")}
          aria-expanded={expandedSections.category}
          className="flex w-full items-center justify-between text-left lg:pointer-events-none"
        >
          <p className="font-body text-xs uppercase text-charcoal/75">Category</p>
          <ChevronDown
            size={15}
            className={cn(
              "transition-transform lg:hidden",
              expandedSections.category ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
        <div className={cn("space-y-2 pt-3", expandedSections.category ? "block" : "hidden", "lg:block")}>
          {categoryOptions.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "w-full rounded-sm border px-3 py-2 text-left font-body text-xs uppercase transition-all",
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

      <div className="border-t border-outline/60 pt-4 lg:border-0 lg:pt-0">
        <button
          onClick={() => toggleSection("price")}
          aria-expanded={expandedSections.price}
          className="flex w-full items-center justify-between text-left lg:pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <p className="font-body text-xs uppercase text-charcoal/75">Price</p>
            <p className="font-body text-[11px] text-charcoal/70">
              {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
            </p>
          </div>
          <ChevronDown
            size={15}
            className={cn("transition-transform lg:hidden", expandedSections.price ? "rotate-180" : "rotate-0")}
          />
        </button>
        <div className={cn("pt-3", expandedSections.price ? "block" : "hidden", "lg:block")}>
          <input
            type="range"
            min={100}
            max={maxAvailablePrice}
            step={25}
            value={minPrice}
            onChange={(event) => onMinPriceChange(Number(event.target.value))}
            className="w-full accent-accent"
          />
          <input
            type="range"
            min={100}
            max={maxAvailablePrice}
            step={25}
            value={maxPrice}
            onChange={(event) => onPriceChange(Number(event.target.value))}
            className="w-full accent-accent"
          />
        </div>
      </div>

      <div className="border-t border-outline/60 pt-4 lg:border-0 lg:pt-0">
        <button
          onClick={() => toggleSection("color")}
          aria-expanded={expandedSections.color}
          className="flex w-full items-center justify-between text-left lg:pointer-events-none"
        >
          <p className="font-body text-xs uppercase text-charcoal/75">Color</p>
          <ChevronDown
            size={15}
            className={cn("transition-transform lg:hidden", expandedSections.color ? "rotate-180" : "rotate-0")}
          />
        </button>
        <div className={cn("flex flex-wrap gap-2 pt-3", expandedSections.color ? "flex" : "hidden", "lg:flex")}>
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => onToggleColor(color)}
              className={cn(
                "rounded-full border px-3 py-1.5 font-body text-xs uppercase",
                selectedColors.includes(color)
                  ? "border-charcoal bg-charcoal text-surface"
                  : "border-outline text-charcoal/75 hover:border-charcoal",
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-outline/60 pt-4 lg:border-0 lg:pt-0">
        <button
          onClick={() => toggleSection("material")}
          aria-expanded={expandedSections.material}
          className="flex w-full items-center justify-between text-left lg:pointer-events-none"
        >
          <p className="font-body text-xs uppercase text-charcoal/75">Material</p>
          <ChevronDown
            size={15}
            className={cn(
              "transition-transform lg:hidden",
              expandedSections.material ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
        <div className={cn("space-y-2 pt-3", expandedSections.material ? "block" : "hidden", "lg:block")}>
          {materialOptions.map((material) => (
            <label key={material} className="flex items-center gap-2 font-body text-xs text-charcoal/80">
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material)}
                onChange={() => onToggleMaterial(material)}
                className="accent-accent"
              />
              <span>{material}</span>
            </label>
          ))}
        </div>
      </div>

      <p className="font-body text-xs text-charcoal/60">{products.length} products available</p>
    </aside>
  );
}
