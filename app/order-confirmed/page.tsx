"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "ELV-000000";

  return (
    <PageTransition>
      <Section>
        <Container className="max-w-3xl">
          <div className="rounded-sm border border-outline bg-surface p-8 text-center sm:p-10">
            <Heading
              eyebrow="Order Confirmed"
              title="Your Order Is Placed"
              description="A confirmation email has been sent with tracking details and delivery estimates."
              align="center"
            />

            <p className="mt-5 font-body text-xs uppercase text-charcoal/70">
              Order Number
            </p>
            <p className="mt-2 font-heading text-5xl leading-none text-foreground">{orderNumber}</p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/shop" className={buttonClassName()}>
                Continue Shopping
              </Link>
              <Link href="/" className={buttonClassName({ variant: "secondary" })}>
                Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
