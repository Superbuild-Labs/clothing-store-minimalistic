import Link from "next/link";

import { Container } from "@/components/ui/container";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Search", href: "/search" },
  { label: "Shipping & Returns (Coming Soon)", href: "/about#shipping-returns" },
  { label: "Privacy Policy (Coming Soon)", href: "/about#privacy" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-outline bg-surface-alt">
      <Container className="grid gap-14 py-16 md:grid-cols-3">
        <div>
          <p className="font-heading text-2xl tracking-[0.22em] text-foreground">ELEVE</p>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-charcoal/72">
            Curating a lifestyle of quiet confidence and artisanal quality for the
            modern minimalist wardrobe.
          </p>
        </div>

        <div className="space-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block font-body text-xs uppercase tracking-luxury text-charcoal/76 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="font-body text-xs uppercase tracking-luxury text-charcoal/72">
            Newsletter Sign Up
          </p>
          <div className="mt-4 flex items-center border-b border-outline pb-2">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent font-body text-sm outline-none placeholder:text-charcoal/52"
            />
            <button
              aria-label="Subscribe"
              className="font-body text-xl leading-none text-foreground transition-opacity hover:opacity-70"
            >
              &gt;
            </button>
          </div>
          <p className="mt-10 font-body text-xs uppercase tracking-[0.08em] text-charcoal/65">
            © 2026 ELEVE. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
