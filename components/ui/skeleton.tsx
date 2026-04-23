import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-gradient-to-r from-surface-alt via-surface-soft to-surface-alt",
        className,
      )}
    />
  );
}
