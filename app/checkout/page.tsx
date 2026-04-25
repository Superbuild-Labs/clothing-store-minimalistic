"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { buttonClassName, Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";
import { FallbackImage } from "@/components/ui/fallback-image";
import { formatCurrency } from "@/lib/currency";
import { useShopStore } from "@/store/use-store";

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useShopStore((state) => state.cartItems);
  const clearCart = useShopStore((state) => state.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );
  const shipping = cartItems.length > 0 ? (subtotal > 500 ? 0 : 15) : 0;
  const estimatedTax = cartItems.length > 0 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + shipping + estimatedTax;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cartItems.length === 0 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    const orderNumber = `ELV-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    router.push(`/order-confirmed?order=${orderNumber}`);
  };

  return (
    <PageTransition>
      <Section>
        <Container>
          <Heading
            eyebrow="Checkout"
            title="Complete Your Order"
            description="Secure your selection with delivery and contact details below."
            className="mb-10"
          />

          {cartItems.length === 0 ? (
            <div className="mx-auto max-w-xl rounded-sm border border-outline bg-surface p-8 text-center">
              <p className="font-heading text-4xl leading-none text-foreground">Your bag is empty</p>
              <p className="mt-3 font-body text-sm text-charcoal/75">
                Add at least one piece before continuing to checkout.
              </p>
              <Link href="/shop" className={buttonClassName({ className: "mt-6" })}>
                Back to Shop
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <form onSubmit={handleSubmit} className="space-y-6 rounded-sm border border-outline bg-surface p-6 sm:p-8">
                <fieldset className="space-y-4">
                  <legend className="font-body text-xs uppercase tracking-luxury text-charcoal/74">
                    Contact
                  </legend>
                  <input
                    type="text"
                    name="fullName"
                    required
                    autoComplete="name"
                    placeholder="Full name"
                    className="h-11 w-full rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="Email"
                    className="h-11 w-full rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                  />
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="Phone (optional)"
                    className="h-11 w-full rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                  />
                </fieldset>

                <fieldset className="space-y-4">
                  <legend className="font-body text-xs uppercase tracking-luxury text-charcoal/74">
                    Delivery Address
                  </legend>
                  <input
                    type="text"
                    name="addressLine1"
                    required
                    autoComplete="address-line1"
                    placeholder="Address line 1"
                    className="h-11 w-full rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                  />
                  <input
                    type="text"
                    name="addressLine2"
                    autoComplete="address-line2"
                    placeholder="Address line 2 (optional)"
                    className="h-11 w-full rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                  />
                  <div className="grid gap-3 sm:grid-cols-3">
                    <input
                      type="text"
                      name="city"
                      required
                      autoComplete="address-level2"
                      placeholder="City"
                      className="h-11 rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                    />
                    <input
                      type="text"
                      name="state"
                      required
                      autoComplete="address-level1"
                      placeholder="State"
                      className="h-11 rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      required
                      autoComplete="postal-code"
                      placeholder="ZIP"
                      className="h-11 rounded-sm border border-outline bg-background px-3 font-body text-sm outline-none placeholder:text-charcoal/55"
                    />
                  </div>
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="font-body text-xs uppercase tracking-luxury text-charcoal/74">
                    Payment
                  </legend>
                  <p className="rounded-sm border border-outline bg-surface-alt p-3 font-body text-sm text-charcoal/75">
                    Demo mode: no payment is collected. Submitting will place a simulated order.
                  </p>
                </fieldset>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </form>

              <aside className="rounded-sm border border-outline bg-surface p-6 sm:p-8 lg:sticky lg:top-28">
                <p className="font-body text-xs uppercase tracking-luxury text-charcoal/74">Order Summary</p>
                <div className="mt-5 space-y-4">
                  {cartItems.map((item) => (
                    <article key={item.key} className="flex gap-3 border-b border-outline pb-4">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-sm bg-surface-soft">
                        <FallbackImage
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-heading text-2xl leading-none text-foreground">{item.name}</p>
                        <p className="mt-1 font-body text-xs text-charcoal/70">
                          {[item.color, item.size].filter(Boolean).join(" / ") || "Standard"}
                        </p>
                        <p className="mt-2 font-body text-xs uppercase tracking-[0.14em] text-charcoal/72">
                          Qty {item.quantity}
                        </p>
                      </div>
                      <p className="font-body text-sm text-foreground">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-5 space-y-2 border-t border-outline pt-4 font-body text-sm text-charcoal/82">
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
                  <div className="flex items-center justify-between border-t border-outline pt-3">
                    <span className="font-heading text-3xl text-foreground">Total</span>
                    <span className="font-heading text-3xl text-foreground">{formatCurrency(total)}</span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </Container>
      </Section>
    </PageTransition>
  );
}
