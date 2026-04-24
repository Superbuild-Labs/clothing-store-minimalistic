import { Suspense } from "react";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";
import { ShopCatalog } from "@/features/products/components/shop-catalog";
import { products } from "@/features/products/data/products";

function SearchCatalogFallback() {
  return <div className="h-[520px] animate-pulse rounded-sm border border-outline bg-surface-alt" />;
}

export default function SearchPage() {
  return (
    <PageTransition>
      <Section>
        <Container>
          <Heading
            eyebrow="Search"
            title="Search the Collection"
            description="Find products by name, category, color, or material with live query-synced filtering."
            className="mb-10"
          />
          <Suspense fallback={<SearchCatalogFallback />}>
            <ShopCatalog
              products={products}
              emptyTitle="No search results yet"
              emptyDescription="Try a different term or broaden your selected filters to see more pieces."
            />
          </Suspense>
        </Container>
      </Section>
    </PageTransition>
  );
}
