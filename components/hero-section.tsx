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
    <section className="relative isolate min-h-[80vh] overflow-hidden border-b border-outline">
      <Image
        src={heroImage}
        alt="Model in a minimal alpaca coat"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/58 to-transparent" />

      <Container className="relative z-10 flex min-h-[80vh] items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-4 font-body text-xs uppercase tracking-luxury text-accent">
            Autumn / Winter 24
          </p>
          <h1 className="font-heading text-5xl leading-[0.95] tracking-[-0.02em] text-foreground sm:text-6xl md:text-7xl">
            Quiet Luxury for Daily Rituals
          </h1>
          <p className="mt-6 max-w-lg font-body text-sm leading-relaxed text-charcoal/80 md:text-base">
            A refined wardrobe of tactile knits, sculpted tailoring, and timeless
            essentials designed in an editorial minimal language.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop">
              <Button>Shop Collection</Button>
            </Link>
            <Link href="/shop?category=Outerwear">
              <Button variant="secondary">Explore Outerwear</Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
