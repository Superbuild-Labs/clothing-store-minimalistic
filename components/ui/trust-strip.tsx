import { cn } from "@/lib/utils";

export interface TrustSignal {
  title: string;
  description: string;
}

interface TrustStripProps {
  signals: TrustSignal[];
  className?: string;
  compact?: boolean;
}

export function TrustStrip({ signals, className, compact = false }: TrustStripProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-outline bg-outline sm:grid-cols-3",
        className,
      )}
    >
      {signals.map((signal) => (
        <div
          key={signal.title}
          className={cn("bg-surface px-4 py-4", compact ? "py-3" : "")}
        >
          <p className="font-body text-[11px] uppercase tracking-wide text-charcoal/70">
            {signal.title}
          </p>
          <p className="mt-1 font-body text-sm text-foreground/90">
            {signal.description}
          </p>
        </div>
      ))}
    </div>
  );
}
