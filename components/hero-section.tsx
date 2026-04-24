"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBfMUqhkrTp9s4OopD1iEEShFXwtw3N06NZUVh0qQkZgMKqM9FDHMonKaHNcdWAlXT2auCjpAhbJqucvfQoqNb_eoPc-Fbw2sxZFbmZDv8YOzCWuf1F-qCrtX76Y8jvvydtpp6hKc9eQvmJMesTSRoSmFOwl6HjuiYvFmwoPe-pSE4-XM3gRnVuXOL4P8XiqPT_dPQe0xR_vLwwYu4Zv21RrTRYYgEym3CVE3ZPes7QmSOz733Eh68Jsa2WsxjbHsCFuV1FlcKDtKs";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[84vh] overflow-hidden border-b border-outline">
      <Image
        src={heroImage}
        alt="Model in a minimal alpaca coat"
        fill
        priority
        sizes="100vw"
        className="scale-[1.015] object-cover object-center"
      />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,24,23,0.6)_0%,rgba(23,24,23,0.35)_35%,rgba(23,24,23,0.08)_70%,rgba(23,24,23,0)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-background/78 via-background/46 to-transparent" />

      <Container className="relative z-10 flex min-h-[84vh] items-center py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl rounded-sm bg-foreground/12 p-6 backdrop-blur-[1px] sm:p-8"
        >
          <p className="mb-5 font-body text-[11px] uppercase tracking-[0.24em] text-[var(--editorial-highlight)]">
            Autumn / Winter 24
          </p>
          <h1 className="max-w-[11ch] font-heading text-5xl leading-[0.9] tracking-[-0.025em] text-surface sm:text-6xl md:text-7xl">
            Quiet Luxury for Daily Rituals
          </h1>
          <p className="mt-7 max-w-xl font-body text-sm leading-relaxed text-surface/92 md:text-base">
            A refined wardrobe of tactile knits, sculpted tailoring, and timeless
            essentials designed in an editorial minimal language.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link href="/shop">
              <Button size="lg" className="shadow-[0_12px_24px_rgba(23,24,23,0.25)]">
                Shop Collection
              </Button>
            </Link>
            <Link href="/shop?category=Outerwear">
              <Button
                variant="secondary"
                className="border-surface/50 bg-surface/8 text-surface/82 hover:border-surface/85 hover:bg-surface/16 hover:text-surface"
              >
                Explore Outerwear
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
