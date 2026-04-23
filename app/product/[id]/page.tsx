import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";
import {
  getProductById,
  getRelatedProducts,
  products,
} from "@/features/products/data/products";
import { ProductDetailsPanel } from "@/features/products/components/product-details-panel";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductGrid } from "@/features/products/components/product-grid";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id, 4);

  return (
    <PageTransition>
      <Section className="pt-10">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <ProductGallery images={product.images} name={product.name} />
            <ProductDetailsPanel product={product} />
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <Heading
            eyebrow="You may also like"
            title="More from the Collection"
            description="Complimentary silhouettes selected to pair with your chosen piece."
            className="mb-10"
          />
          <ProductGrid products={relatedProducts} />
        </Container>
      </Section>
    </PageTransition>
  );
}
