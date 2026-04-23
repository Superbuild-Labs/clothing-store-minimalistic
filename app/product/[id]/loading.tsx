import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <Section className="pt-10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="aspect-[3/4] w-full" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
