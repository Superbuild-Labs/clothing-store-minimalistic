"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/currency";
import { useCartSubtotal, useShopStore } from "@/store/use-store";
import { CartLineItem } from "@/features/cart/components/cart-line-item";

export function CartDrawer() {
  const isCartOpen = useShopStore((state) => state.isCartOpen);
  const closeCart = useShopStore((state) => state.closeCart);
  const cartItems = useShopStore((state) => state.cartItems);
  const updateItemQuantity = useShopStore((state) => state.updateItemQuantity);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const subtotal = useCartSubtotal();

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [isCartOpen, closeCart]);

  const shipping = subtotal > 500 ? 0 : 15;
  const estimatedTax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + estimatedTax;

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-label="Close cart drawer"
            className="fixed inset-0 z-[70] bg-charcoal/30 backdrop-blur-[1px]"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col border-l border-outline bg-background"
          >
            <header className="flex items-center justify-between border-b border-outline px-6 py-5">
              <h2 className="font-heading text-3xl tracking-[-0.012em] text-foreground">
                Shopping Bag
              </h2>
              <button
                onClick={closeCart}
                className="font-body text-xs uppercase tracking-luxury text-charcoal/76 transition-colors hover:text-foreground"
              >
                Close
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-heading text-3xl text-foreground">Cart is empty</p>
                  <p className="mt-3 max-w-[20rem] font-body text-sm text-charcoal/72">
                    Add curated essentials from the collection to begin your order.
                  </p>
                  <Button className="mt-6" onClick={closeCart}>
                    Continue Browsing
                  </Button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cartItems.map((item) => (
                    <CartLineItem
                      key={item.key}
                      item={item}
                      onIncrease={() => updateItemQuantity(item.key, item.quantity + 1)}
                      onDecrease={() => {
                        if (item.quantity === 1) {
                          removeFromCart(item.key);
                          return;
                        }

                        updateItemQuantity(item.key, item.quantity - 1);
                      }}
                      onRemove={() => removeFromCart(item.key)}
                    />
                  ))}
                </div>
              )}
            </div>

            <footer className="space-y-4 border-t border-outline px-6 py-6">
              <div className="space-y-1 font-body text-sm text-charcoal/80">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Complimentary" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Estimated Tax</span>
                  <span>{formatCurrency(estimatedTax)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-outline pt-4">
                <p className="font-heading text-3xl text-foreground">Total</p>
                <p className="font-heading text-3xl text-foreground">{formatCurrency(total)}</p>
              </div>

              <Button className="w-full">Checkout Coming Soon - Review Bag</Button>
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
