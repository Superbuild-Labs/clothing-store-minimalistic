"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { LogoMark } from "@/components/ui/logo-mark";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Search", href: "/search" },
  { label: "Shipping & Returns", href: "/about#shipping-returns" },
  { label: "Privacy Policy", href: "/about#privacy" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="mt-24 border-t border-outline bg-surface-alt">
      <Container className="grid gap-14 py-16 md:grid-cols-3">
        <div>
          <LogoMark className="w-[116px] text-foreground" />
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-charcoal/70">
            Curating a lifestyle of quiet confidence and artisanal quality for the
            modern minimalist wardrobe.
          </p>
        </div>

        <div className="space-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block font-body text-xs uppercase text-charcoal/75 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="font-body text-xs uppercase text-charcoal/70">
            Newsletter Sign Up
          </p>
          <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3 border-b border-outline pb-2">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
              className="w-full bg-transparent font-body text-sm outline-none focus-visible:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="font-body text-xl leading-none text-foreground transition-opacity hover:opacity-70"
            >
              &gt;
            </button>
          </form>
          <p aria-live="polite" className="mt-3 min-h-5 font-body text-xs text-charcoal/70">
            {isSubmitted ? "Thanks for subscribing." : ""}
          </p>
          <p className="mt-10 font-body text-xs uppercase text-charcoal/60">
            © 2026 ELEVE. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
