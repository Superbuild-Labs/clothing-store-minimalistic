import Link from "next/link";

import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";

export default function AboutPage() {
  return (
    <PageTransition>
      <Section>
        <Container>
          <Heading
            eyebrow="Our Story"
            title="A Quiet Luxury House for Modern Rituals"
            description="ELEVE creates considered essentials that balance tactile comfort, editorial structure, and long-wear craftsmanship."
            className="mb-12"
          />

          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-sm border border-outline bg-surface p-7">
              <p className="font-body text-xs uppercase tracking-luxury text-charcoal/70">Craft Process</p>
              <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/82">
                We build every silhouette from fabric-first studies, then refine drape and proportion
                through repeated fittings. The result is restrained design with quiet structure.
              </p>
            </article>
            <article className="rounded-sm border border-outline bg-surface p-7">
              <p className="font-body text-xs uppercase tracking-luxury text-charcoal/70">Sustainability</p>
              <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/82">
                Natural fibers, slower seasonal cadence, and mindful supplier partnerships guide our
                production decisions. We prioritize quality intended to outlast trend cycles.
              </p>
            </article>
          </div>

          <div className="mt-12 rounded-sm border border-outline bg-surface-alt p-8">
            <p className="font-heading text-4xl leading-none tracking-[-0.01em] text-foreground">
              Designed for the edited wardrobe.
            </p>
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-charcoal/78">
              Explore timeless coats, tailoring, knits, and accessories that pair easily season after season.
            </p>
            <Link href="/shop" className={buttonClassName({ className: "mt-7" })}>
              Shop the Collection
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article id="shipping-returns" className="rounded-sm border border-outline bg-surface p-6">
              <p className="font-body text-xs uppercase tracking-luxury text-charcoal/72">
                Shipping & Returns (Coming Soon)
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/76">
                Full regional shipping windows and return steps will be published here.
              </p>
            </article>
            <article id="privacy" className="rounded-sm border border-outline bg-surface p-6">
              <p className="font-body text-xs uppercase tracking-luxury text-charcoal/72">
                Privacy Policy (Coming Soon)
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/76">
                Our complete privacy and data handling policy will be available shortly.
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
