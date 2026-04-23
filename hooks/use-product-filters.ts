"use client";

import { useMemo, useState } from "react";

import { Product } from "@/features/products/types";

export function useProductFilters(products: Product[]) {
  const [category, setCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(1300);
  const [search, setSearch] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const priceMatch = product.price <= maxPrice;
      const searchMatch =
        search.length === 0 ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [products, category, maxPrice, search]);

  return {
    category,
    setCategory,
    maxPrice,
    setMaxPrice,
    search,
    setSearch,
    filteredProducts,
  };
}
