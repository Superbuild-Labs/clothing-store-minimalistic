import { PropsWithChildren } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CartDrawer } from "@/features/cart/components/cart-drawer";

export function SiteShell({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-20 md:pt-24">{children}</div>
      <Footer />
      <CartDrawer />
    </>
  );
}
