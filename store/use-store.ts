"use client";

import { create } from "zustand";

import { Product } from "@/features/products/types";
import { getProductImage } from "@/lib/product-image";

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

interface AddToCartOptions {
  quantity?: number;
  size?: string;
  color?: string;
}

interface ShopStore {
  cartItems: CartItem[];
  isCartOpen: boolean;
  selectedProductId: string | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setSelectedProduct: (productId: string | null) => void;
  addToCart: (product: Product, options?: AddToCartOptions) => void;
  removeFromCart: (key: string) => void;
  updateItemQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const createCartKey = (productId: string, size?: string, color?: string) =>
  [productId, size ?? "no-size", color ?? "no-color"].join("::");

export const useShopStore = create<ShopStore>((set) => ({
  cartItems: [],
  isCartOpen: false,
  selectedProductId: null,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setSelectedProduct: (productId) => set({ selectedProductId: productId }),
  addToCart: (product, options) => {
    const size = options?.size;
    const color = options?.color;
    const quantity = options?.quantity ?? 1;
    const key = createCartKey(product.id, size, color);

    set((state) => {
      const existingItem = state.cartItems.find((item) => item.key === key);

      if (existingItem) {
        return {
          isCartOpen: true,
          cartItems: state.cartItems.map((item) =>
            item.key === key
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          ),
        };
      }

      return {
        isCartOpen: true,
        cartItems: [
          ...state.cartItems,
          {
            key,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: getProductImage(product.images),
            size,
            color,
            quantity,
          },
        ],
      };
    });
  },
  removeFromCart: (key) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.key !== key),
    })),
  updateItemQuantity: (key, quantity) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.key === key ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export const useCartCount = () =>
  useShopStore((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0),
  );

export const useCartSubtotal = () =>
  useShopStore((state) =>
    state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
  );
