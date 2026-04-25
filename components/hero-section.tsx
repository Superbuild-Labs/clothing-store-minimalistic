"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDHxxPMw5PpqsXUWEA9QfWRPx0WduwLqLexHasbMGVwGpPV20rKDlkKZCZ-a8zsupW_RydmeYzANfL7AeBebd7-c2e9qSV-xutCGt1lD-Wh8lvo4G9c9PtwpUhBkL1_wXYry83LWAi1yu5WpDZ95Z6NZHY7yf3ZtR0HuLkUV3QBbolZXRBUe5n2XBIr9FrzA9jqSKzMySSKy-KO-ZPAnGMNDDL3qnohuaMm8BP4Fy0GT7CW8EWLSIWhPkfm9ojwI1wOjyIjOJckc_I";

const heroInsetImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvh8yens50JeWtXxObi4oB1RsSWy4a6sBhZtRJrIERPM0y7_SfIjT68UnzqQQfvJunMKFwNR_2dk9MjKHsfaMZ0ZOAmQXe9GBKIAk8aIDuLpGQ2rc3Kgh4z4_aqMC9xY9MSsTKEl28_Gue3vops4-5hasOrfpnIrDhpKjOPikFS6GxqfCJFk6MuLwkakR5dYkgCMHF8p5zP3jYx_vYKm1zCWtDutalakIQMRLNa4XM1NR2uwa9TqYO7BNTHAPtRmnKlqGc3dx2yNE";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-outline bg-gradient-to-b from-surface to-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(232,223,211,0.58)_0%,rgba(232,223,211,0)_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_76%,rgba(240,236,231,0.72)_0%,rgba(240,236,231,0)_44%)]" />

      <Container className="relative z-10 grid items-center gap-8 py-10 sm:py-14 md:gap-10 lg:min-h-[80vh] lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 max-w-2xl rounded-sm border border-outline/70 bg-surface/92 p-6 shadow-[0_14px_34px_rgba(29,29,28,0.08)] backdrop-blur-[1px] sm:p-8 lg:order-1 lg:p-10"
        >
          <p className="mb-4 font-body text-[11px] uppercase tracking-[0.24em] text-accent">
            Autumn / Winter 24
          </p>
          <h1 className="max-w-[13ch] font-heading text-[2.65rem] leading-[0.93] tracking-[-0.02em] text-foreground sm:text-[3.45rem] lg:text-[4.25rem]">
            Quiet Luxury for Daily Rituals
          </h1>
          <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-charcoal/80 sm:text-base">
            A refined wardrobe of tactile knits, sculpted tailoring, and timeless
            essentials designed in an editorial minimal language.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/shop"
              className={buttonClassName({
                className: "shadow-[0_10px_22px_rgba(23,24,23,0.16)]",
              })}
            >
              Shop Collection
            </Link>
            <Link
              href="/shop?category=Outerwear"
              className={buttonClassName({
                variant: "secondary",
                className: "border-outline bg-surface text-charcoal/88 hover:border-charcoal hover:text-foreground",
              })}
            >
              Explore Outerwear
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 relative lg:order-2"
        >
          <div className="relative mx-auto aspect-[5/6] min-h-[360px] max-w-[34rem] overflow-hidden rounded-sm border border-outline/80 bg-surface shadow-[0_20px_40px_rgba(29,29,28,0.12)] sm:aspect-[4/5] sm:min-h-[460px] lg:mx-0 lg:max-w-none lg:aspect-[5/6] lg:min-h-0">
            <Image
              src={heroImage}
              alt="Model in a minimal alpaca coat"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 54vw"
              className="object-cover object-[center_30%] lg:object-[center_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/8 via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none absolute -bottom-6 -left-5 hidden w-44 rounded-sm border border-outline bg-surface p-2 shadow-[0_12px_28px_rgba(22,22,22,0.12)] xl:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Image
                src={heroInsetImage}
                alt="Close-up of alpaca coat texture"
                fill
                sizes="176px"
                className="object-cover object-center"
              />
            </div>
            <p className="mt-2 text-center font-body text-[10px] uppercase tracking-[0.16em] text-charcoal/78">
              Material Story
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
