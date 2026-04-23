import Link from "next/link";
import Image from "next/image";

import { HeroSection } from "@/components/hero-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";
import { featuredProducts, products } from "@/features/products/data/products";
import { ProductGrid } from "@/features/products/components/product-grid";

const categoryHighlights = [
  {
    title: "Outerwear",
    subtitle: "Architectural silhouettes in tactile blends",
    href: "/shop?category=Outerwear",
    image: products.find((product) => product.id === "alpaca-coat")?.images[0],
  },
  {
    title: "Knitwear",
    subtitle: "Featherweight warmth for everyday layering",
    href: "/shop?category=Knitwear",
    image: products.find((product) => product.id === "cashmere-ribbed-knit")?.images[0],
  },
  {
    title: "Accessories",
    subtitle: "Objects and leather goods for quiet polish",
    href: "/shop?category=Accessories",
    image: products.find((product) => product.id === "everyday-tote")?.images[0],
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />

      <Section>
        <Container>
          <Heading
            eyebrow="Featured"
            title="Curated Essentials"
            description="A hand-selected edit of signature pieces from the current collection."
            align="center"
            className="mb-12"
          />
          <ProductGrid products={featuredProducts.slice(0, 4)} />
        </Container>
      </Section>

      <Section tone="muted" className="overflow-hidden">
        <Container>
          <Heading
            eyebrow="Categories"
            title="Editorial Chapters"
            description="Navigate the collection by mood and material story."
            className="mb-10"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {categoryHighlights.map((category, index) => (
              <Link
                href={category.href}
                key={category.title}
                className="group relative overflow-hidden rounded-sm border border-outline bg-surface"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 p-5">
                  <p className="font-heading text-3xl tracking-[-0.01em] text-foreground">
                    {category.title}
                  </p>
                  <p className="mt-2 font-body text-sm text-charcoal/74">{category.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-8 rounded-sm border border-outline bg-surface-alt p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
          <div>
            <p className="font-body text-xs uppercase tracking-luxury text-accent">Lookbook Note</p>
            <h2 className="mt-3 max-w-lg font-heading text-5xl leading-[0.96] tracking-[-0.02em] text-foreground">
              Designed to Feel Like a Printed Fashion Editorial
            </h2>
            <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-charcoal/75">
              Spacious layouts, tactile palettes, and restrained motion create a premium
              digital experience inspired by luxury boutiques.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-4">
            <Link href="/shop" className="w-full">
              <Button className="w-full">Browse Full Shop</Button>
            </Link>
            <Link href="/product/alpaca-coat" className="w-full">
              <Button variant="secondary" className="w-full">
                View Signature Piece
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
