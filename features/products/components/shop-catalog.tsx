"use client";

import { useEffect } from "react";

import { useProductFilters } from "@/hooks/use-product-filters";
import { Product } from "@/features/products/types";
import { ProductCard } from "@/features/products/components/product-card";
import { ProductFilters } from "@/features/products/components/product-filters";
import { productCategories } from "@/features/products/data/products";

interface ShopCatalogProps {
  products: Product[];
  initialCategory?: string;
}

export function ShopCatalog({ products, initialCategory }: ShopCatalogProps) {
  const {
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    search,
    setSearch,
    filteredProducts,
  } = useProductFilters(products);

  useEffect(() => {
    if (initialCategory && productCategories.includes(initialCategory as (typeof productCategories)[number])) {
      setCategory(initialCategory);
    }
  }, [initialCategory, setCategory]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <ProductFilters
        categoryOptions={productCategories}
        selectedCategory={category}
        maxPrice={maxPrice}
        search={search}
        onCategoryChange={setCategory}
        onPriceChange={setMaxPrice}
        onSearchChange={setSearch}
        products={filteredProducts}
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}
