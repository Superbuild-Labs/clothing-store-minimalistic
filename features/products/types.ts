export type ProductCategory =
  | "Outerwear"
  | "Knitwear"
  | "Dresses"
  | "Trousers"
  | "Shirts"
  | "Accessories"
  | "Home"
  | "Jewelry";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  material: string;
  sizes: string[];
  colors: string[];
  images: string[];
  featured?: boolean;
  badge?: string;
}
