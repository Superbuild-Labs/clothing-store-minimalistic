"use client";

import { useProductFilters } from "@/hooks/use-product-filters";
import { Product } from "@/features/products/types";
import { ProductCard } from "@/features/products/components/product-card";
import { ProductFilters } from "@/features/products/components/product-filters";
import { productCategories } from "@/features/products/data/products";

interface ShopCatalogProps {
  products: Product[];
  emptyTitle?: string;
  emptyDescription?: string;
}

export function ShopCatalog({
  products,
  emptyTitle = "No products match your filters",
  emptyDescription = "Try broadening your range, clearing filters, or searching with fewer keywords.",
}: ShopCatalogProps) {
  const {
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    search,
    setSearch,
    sizes,
    colors,
    materials,
    toggleSize,
    toggleColor,
    toggleMaterial,
    allSizes,
    allColors,
    allMaterials,
    maxAvailablePrice,
    sort,
    setSort,
    clearAll,
    filteredProducts,
  } = useProductFilters(products);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <ProductFilters
        categoryOptions={productCategories}
        selectedCategory={category}
        minPrice={minPrice}
        maxPrice={maxPrice}
        maxAvailablePrice={maxAvailablePrice}
        search={search}
        selectedSizes={sizes}
        selectedColors={colors}
        selectedMaterials={materials}
        sizeOptions={allSizes}
        colorOptions={allColors}
        materialOptions={allMaterials}
        sort={sort}
        onSortChange={setSort}
        onCategoryChange={setCategory}
        onMinPriceChange={setMinPrice}
        onPriceChange={setMaxPrice}
        onSearchChange={setSearch}
        onToggleSize={toggleSize}
        onToggleColor={toggleColor}
        onToggleMaterial={toggleMaterial}
        onClearAll={clearAll}
        products={filteredProducts}
      />

      <div>
        {filteredProducts.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-sm border border-dashed border-outline bg-surface-alt px-6 text-center">
            <p className="font-heading text-4xl leading-none text-foreground">{emptyTitle}</p>
            <p className="mt-3 max-w-md font-body text-sm text-charcoal/70">{emptyDescription}</p>
            <button
              onClick={clearAll}
              className="mt-6 rounded-sm border border-outline px-4 py-2 font-body text-xs uppercase text-charcoal/80 transition-colors hover:border-charcoal hover:text-foreground"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
