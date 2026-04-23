import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "default" | "muted" | "elevated";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-transparent",
  muted: "bg-surface-alt",
  elevated: "bg-surface border-y border-outline/70",
};

export function Section({ className, tone = "default", ...props }: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24", toneClasses[tone], className)}
      {...props}
    />
  );
}
