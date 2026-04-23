import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";
import { products } from "@/features/products/data/products";
import { ShopCatalog } from "@/features/products/components/shop-catalog";

interface ShopPageProps {
  searchParams?: {
    category?: string;
  };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  const initialCategory =
    typeof searchParams?.category === "string" ? searchParams.category : undefined;

  return (
    <PageTransition>
      <Section>
        <Container>
          <Heading
            eyebrow="Store"
            title="Ready-to-Wear Collection"
            description="Filter by category, refine by budget, and discover tactile essentials."
            className="mb-10"
          />

          <ShopCatalog products={products} initialCategory={initialCategory} />
        </Container>
      </Section>
    </PageTransition>
  );
}
