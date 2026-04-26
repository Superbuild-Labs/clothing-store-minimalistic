"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { FormEvent, useEffect, useId, useState } from "react";

import { LogoutButton } from "@/components/auth/logout-button";
import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo-mark";
import { cn } from "@/lib/utils";
import { useScrollState } from "@/hooks/use-scroll-state";
import { productCategories } from "@/features/products/data/products";
import { useCartCount, useShopStore } from "@/store/use-store";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Outerwear", label: "New Arrivals" },
  { href: "/shop", label: "Collections" },
  { href: "/about", label: "About" },
];

interface NavbarProps {
  isAuthenticated: boolean;
}

export function Navbar({ isAuthenticated }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isScrolled = useScrollState(18);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchPanelId = useId();
  const menuPanelId = useId();
  const cartCount = useCartCount();
  const openCart = useShopStore((state) => state.openCart);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const transparentState = pathname === "/" && !isScrolled;
  const navTextClass = transparentState ? "text-surface/90" : "text-charcoal/70";
  const navHoverClass = transparentState ? "hover:text-surface" : "hover:text-foreground";
  const iconClass = transparentState
    ? "text-surface/90 hover:text-surface"
    : "text-foreground/75 hover:text-foreground";

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = searchQuery.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  };
  const quickCategories = productCategories.filter((category) => category !== "All").slice(0, 6);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-editorial",
        transparentState
          ? "border-transparent bg-charcoal/10 backdrop-blur-[2px]"
          : "border-outline/80 bg-background/95 backdrop-blur-md",
      )}
    >
      <Container className="relative flex h-20 items-center justify-between">
        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          {navLinks.map((link) => {
            const linkPath = link.href.split("?")[0];
            const isActive = pathname === linkPath;
            return (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "relative py-1 font-body text-xs uppercase transition-colors focus-visible:outline-focus",
                  isActive
                      ? cn(
                          transparentState
                            ? "text-surface after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-surface/70"
                            : "text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-foreground/60",
                        )
                      : cn(navTextClass, navHoverClass),
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors md:hidden",
              transparentState
                ? "text-surface hover:text-surface"
                : "text-foreground/90 hover:text-foreground",
            )}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls={menuPanelId}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link
          href="/"
          className={cn(
            "absolute left-1/2 -translate-x-1/2 transition-colors",
            transparentState
              ? "text-surface"
              : "text-foreground",
          )}
          aria-label="ELEVE home"
        >
          <LogoMark className="w-[112px] sm:w-[124px]" tone={transparentState ? "light" : "dark"} />
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          {isAuthenticated ? (
            <LogoutButton
              className={cn(
                "hidden md:inline-flex",
                transparentState
                  ? "border-surface/45 bg-transparent text-surface hover:border-surface hover:bg-surface/10 hover:text-surface"
                  : "",
              )}
            />
          ) : null}
          <button
            type="button"
            aria-label="Search"
            aria-expanded={isSearchOpen}
            aria-controls={searchPanelId}
            onClick={() => {
              if (isSearchOpen) {
                router.push(searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery.trim())}` : "/search");
                return;
              }
              setIsSearchOpen(true);
            }}
              className={cn("inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors", iconClass)}
          >
            <Search size={18} />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
              className={cn(
                "relative inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors",
                transparentState
                  ? "text-surface hover:text-surface"
                  : "text-foreground/90 hover:text-foreground",
              )}
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
        {isSearchOpen ? (
          <motion.div
            id={searchPanelId}
            role="region"
            aria-label="Site search"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-outline bg-background/95 backdrop-blur-md"
          >
            <Container className="py-4 sm:py-5">
              <div className="rounded-sm border border-outline/90 bg-surface p-4 sm:p-5">
                <form onSubmit={submitSearch} className="flex items-center gap-3">
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    type="search"
                    placeholder="Search by product, category, color, or material"
                    className="w-full border-b border-outline bg-transparent pb-2.5 font-body text-base text-foreground outline-none focus-visible:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-sm border border-outline px-3 py-2 font-body text-xs uppercase text-charcoal/90 transition-colors hover:border-charcoal hover:text-foreground"
                  >
                    View
                  </button>
                </form>

                <div className="mt-4 md:hidden">
                  <p className="mb-2 font-body text-xs uppercase text-charcoal/70">
                    Quick Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickCategories.map((category) => (
                      <Link
                        key={`search-quick-${category}`}
                        href={`/shop?category=${encodeURIComponent(category)}`}
                        className="rounded-full border border-outline bg-surface-alt px-3 py-1.5 font-body text-xs uppercase text-charcoal/80 transition-colors hover:border-charcoal hover:text-foreground"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id={menuPanelId}
            role="region"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-outline bg-surface-alt/95 backdrop-blur-sm md:hidden"
          >
            <Container className="space-y-2 py-5">
              <Link
                href="/search"
                className="block rounded-sm px-2 py-3 font-body text-xs uppercase text-charcoal/80 transition-colors hover:bg-surface hover:text-foreground"
              >
                Search
              </Link>
              {isAuthenticated ? (
                <LogoutButton
                  className="w-full justify-start border-outline bg-surface px-3 text-charcoal/80 hover:border-charcoal hover:text-foreground"
                />
              ) : null}
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label + "-mobile"}
                  href={link.href}
                  className="block rounded-sm px-2 py-3 font-body text-xs uppercase text-charcoal/80 transition-colors hover:bg-surface hover:text-foreground"
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
