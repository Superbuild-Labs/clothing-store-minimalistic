import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/features/products/components/product-grid-skeleton";

export default function ShopLoading() {
  return (
    <Section>
      <Container>
        <div className="mb-10 space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-12 w-80" />
          <Skeleton className="h-5 w-[32rem] max-w-full" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <div className="space-y-4 rounded-sm border border-outline bg-surface p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-36 w-full" />
          </div>
          <ProductGridSkeleton count={9} />
        </div>
      </Container>
    </Section>
  );
}
