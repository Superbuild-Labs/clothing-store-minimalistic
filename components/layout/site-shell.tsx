import { PropsWithChildren } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { NewsletterOverlay } from "@/features/newsletter/components/newsletter-overlay";

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 md:pt-24">{children}</main>
      <Footer />
      <CartDrawer />
      <NewsletterOverlay />
    </>
  );
}
