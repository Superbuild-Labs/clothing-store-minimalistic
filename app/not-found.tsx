import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section>
      <Container className="flex min-h-[52vh] flex-col items-center justify-center text-center">
        <p className="font-body text-xs uppercase tracking-luxury text-accent">404</p>
        <h1 className="mt-3 font-heading text-6xl tracking-[-0.02em] text-foreground">
          Product not found
        </h1>
        <p className="mt-4 max-w-md font-body text-sm text-charcoal/72">
          The piece you are looking for is no longer in this edit. Browse the full
          collection to discover current releases.
        </p>
        <Link href="/shop" className="mt-7">
          <Button>Go to Shop</Button>
        </Link>
      </Container>
    </Section>
  );
}
