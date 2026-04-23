"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useScrollState } from "@/hooks/use-scroll-state";
import { useCartCount, useShopStore } from "@/store/use-store";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Outerwear", label: "New Arrivals" },
  { href: "/shop", label: "Collections" },
  { href: "/shop?category=Accessories", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const isScrolled = useScrollState(18);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartCount();
  const openCart = useShopStore((state) => state.openCart);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const transparentState = pathname === "/" && !isScrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-editorial",
        transparentState
          ? "border-transparent bg-transparent"
          : "border-outline bg-background/96 backdrop-blur",
      )}
    >
      <Container className="relative flex h-20 items-center justify-between">
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "font-body text-xs uppercase tracking-luxury transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-charcoal/62 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setIsMenuOpen((value) => !value)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-heading text-3xl tracking-[0.24em] text-foreground"
        >
          ELEVE
        </Link>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden text-foreground/80 hover:text-foreground md:block">
            <Search size={18} />
          </button>
          <button aria-label="Account" className="hidden text-foreground/80 hover:text-foreground md:block">
            <User size={18} />
          </button>
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative text-foreground/85 hover:text-foreground"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-charcoal px-1 font-body text-[10px] text-surface">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-outline bg-surface-alt md:hidden"
          >
            <Container className="space-y-4 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href + "-mobile"}
                  href={link.href}
                  className="block font-body text-xs uppercase tracking-luxury text-charcoal/80"
                >
                  {link.label}
                </Link>
              ))}
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
