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
              <p className="font-body text-xs uppercase text-charcoal/70">Craft Process</p>
              <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/80">
                We build every silhouette from fabric-first studies, then refine drape and proportion
                through repeated fittings. The result is restrained design with quiet structure.
              </p>
            </article>
            <article className="rounded-sm border border-outline bg-surface p-7">
              <p className="font-body text-xs uppercase text-charcoal/70">Sustainability</p>
              <p className="mt-4 font-body text-sm leading-relaxed text-charcoal/80">
                Natural fibers, slower seasonal cadence, and mindful supplier partnerships guide our
                production decisions. We prioritize quality intended to outlast trend cycles.
              </p>
            </article>
          </div>

          <div className="mt-12 rounded-sm border border-outline bg-surface-alt p-8">
            <p className="font-heading text-4xl leading-none text-foreground">
              Designed for the edited wardrobe.
            </p>
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-charcoal/80">
              Explore timeless coats, tailoring, knits, and accessories that pair easily season after season.
            </p>
            <Link href="/shop" className={buttonClassName({ className: "mt-7" })}>
              Shop the Collection
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <article id="shipping-returns" className="rounded-sm border border-outline bg-surface p-6">
              <p className="font-body text-xs uppercase text-charcoal/70">
                Shipping & Returns
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/75">
                Orders ship within 2-3 business days. Domestic shipping is complimentary
                over $500, and unworn pieces with original tags may be returned within 14 days.
              </p>
            </article>
            <article id="privacy" className="rounded-sm border border-outline bg-surface p-6">
              <p className="font-body text-xs uppercase text-charcoal/70">
                Privacy Policy
              </p>
              <p className="mt-3 font-body text-sm text-charcoal/75">
                Customer information is used only to process orders, provide client care,
                and send opted-in communications. Payment data is never stored by ELEVE.
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
