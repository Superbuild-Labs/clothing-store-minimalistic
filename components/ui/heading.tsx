import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
}

export function Heading({
  title,
  description,
  eyebrow,
  align = "left",
  className,
}: HeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <p className="mb-3 font-body text-xs uppercase tracking-[0.18em] text-accent/90">{eyebrow}</p>
      ) : null}
      <h2 className="font-heading text-4xl leading-tight text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-charcoal/82 md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
