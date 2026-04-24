"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { Product } from "@/features/products/types";

export type ProductSort = "newest" | "price-asc" | "price-desc" | "featured";

const DEFAULT_SORT: ProductSort = "newest";

function parseCsv(value: string | null) {
  if (!value) {
    return [];
  }
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function useProductFilters(products: Product[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const maxAvailablePrice = Math.max(...products.map((product) => product.price), 100);

  const category = searchParams.get("category") ?? "All";
  const search = searchParams.get("q") ?? "";
  const minPrice = Number(searchParams.get("minPrice") ?? 100);
  const maxPrice = Number(searchParams.get("maxPrice") ?? maxAvailablePrice);
  const sizes = parseCsv(searchParams.get("sizes"));
  const colors = parseCsv(searchParams.get("colors"));
  const materials = parseCsv(searchParams.get("materials"));
  const sort = (searchParams.get("sort") as ProductSort | null) ?? DEFAULT_SORT;

  const setParams = (updates: Record<string, string | number | string[] | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        params.delete(key);
        return;
      }
      params.set(key, Array.isArray(value) ? value.join(",") : String(value));
    });
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const toggleValue = (values: string[], value: string, key: string) => {
    const exists = values.includes(value);
    const next = exists ? values.filter((item) => item !== value) : [...values, value];
    setParams({ [key]: next });
  };

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      const sizeMatch = sizes.length === 0 || sizes.some((size) => product.sizes.includes(size));
      const colorMatch = colors.length === 0 || colors.some((color) => product.colors.includes(color));
      const materialMatch =
        materials.length === 0 || materials.some((material) => product.material === material);
      const searchMatch =
        normalizedSearch.length === 0 ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch) ||
        product.material.toLowerCase().includes(normalizedSearch) ||
        product.colors.some((color) => color.toLowerCase().includes(normalizedSearch));

      return categoryMatch && priceMatch && sizeMatch && colorMatch && materialMatch && searchMatch;
    });

    switch (sort) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "featured":
        return [...filtered].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
      default:
        return filtered;
    }
  }, [products, category, minPrice, maxPrice, sizes, colors, materials, search, sort]);

  const allSizes = [...new Set(products.flatMap((product) => product.sizes))];
  const allColors = [...new Set(products.flatMap((product) => product.colors))];
  const allMaterials = [...new Set(products.map((product) => product.material))];

  return {
    category,
    setCategory: (value: string) => setParams({ category: value === "All" ? null : value }),
    minPrice,
    setMinPrice: (value: number) => setParams({ minPrice: Math.min(value, maxPrice) }),
    maxPrice,
    setMaxPrice: (value: number) => setParams({ maxPrice: Math.max(value, minPrice) }),
    search,
    setSearch: (value: string) => setParams({ q: value }),
    sizes,
    colors,
    materials,
    sort,
    setSort: (value: ProductSort) => setParams({ sort: value === DEFAULT_SORT ? null : value }),
    toggleSize: (value: string) => toggleValue(sizes, value, "sizes"),
    toggleColor: (value: string) => toggleValue(colors, value, "colors"),
    toggleMaterial: (value: string) => toggleValue(materials, value, "materials"),
    allSizes,
    allColors,
    allMaterials,
    maxAvailablePrice,
    clearAll: () => router.replace(pathname, { scroll: false }),
    filteredProducts,
  };
}
