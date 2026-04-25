"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FallbackImage } from "@/components/ui/fallback-image";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHxxPMw5PpqsXUWEA9QfWRPx0WduwLqLexHasbMGVwGpPV20rKDlkKZCZ-a8zsupW_RydmeYzANfL7AeBebd7-c2e9qSV-xutCGt1lD-Wh8lvo4G9c9PtwpUhBkL1_wXYry83LWAi1yu5WpDZ95Z6NZHY7yf3ZtR0HuLkUV3QBbolZXRBUe5n2XBIr9FrzA9jqSKzMySSKy-KO-ZPAnGMNDDL3qnohuaMm8BP4Fy0GT7CW8EWLSIWhPkfm9ojwI1wOjyIjOJckc_I";

export function HeroSection() {
  return (
    <section className="relative isolate -mt-20 min-h-[78svh] overflow-hidden border-b border-surface/20 bg-charcoal pt-20 md:-mt-24 md:pt-24">
      <FallbackImage
        src={heroImage}
        alt="Model wearing an ELEVE alpaca coat in a minimal editorial setting"
        fill
        priority
        sizes="100vw"
        className="editorial-image object-cover object-[center_28%]"
      />
      <div className="absolute inset-0 editorial-overlay" />

      <Container className="relative z-10 flex min-h-[calc(78svh-5rem)] items-end py-12 sm:py-16 md:min-h-[calc(78svh-6rem)] lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="mb-4 font-body text-xs uppercase text-surface/80">
            Current Collection
          </p>
          <h1 className="max-w-[12ch] font-heading text-[3rem] leading-[0.96] text-surface sm:text-[4rem] lg:text-[5.25rem]">
            Quiet Luxury for Daily Rituals
          </h1>
          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-surface/90 sm:text-base">
            A refined wardrobe of tactile knits, sculpted tailoring, and timeless
            essentials designed in an editorial minimal language.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/shop"
              className={buttonClassName({
                className: "border-surface bg-surface text-charcoal hover:border-background hover:bg-background",
              })}
            >
              Shop Collection
            </Link>
            <Link
              href="/shop?category=Outerwear"
              className={buttonClassName({
                variant: "secondary",
                className: "border-surface/70 text-surface hover:border-surface hover:bg-surface/10 hover:text-surface",
              })}
            >
              Explore Outerwear
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-body text-xs text-surface/75">
            <span>Complimentary shipping over $500</span>
            <span>14-day returns</span>
            <span>Traceable natural fibers</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
