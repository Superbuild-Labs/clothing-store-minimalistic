import { PropsWithChildren } from "react";
import { cookies } from "next/headers";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { SESSION_COOKIE_NAME, readSession } from "@/lib/auth";
  
export async function SiteShell({ children }: PropsWithChildren) {
  const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = await readSession(sessionToken);

  return (
    <>
      <Navbar isAuthenticated={Boolean(session)} />
      <main className="min-h-screen pt-20 md:pt-24">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
