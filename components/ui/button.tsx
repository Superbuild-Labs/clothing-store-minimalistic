import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "subtle";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-charcoal text-surface border border-charcoal shadow-[0_6px_18px_rgba(24,24,24,0.16)] hover:-translate-y-0.5 hover:bg-accent hover:border-accent hover:shadow-[0_10px_24px_rgba(24,24,24,0.2)]",
  secondary:
    "bg-transparent text-foreground/92 border border-outline hover:border-charcoal/80 hover:bg-surface-alt",
  ghost: "bg-transparent text-foreground border border-transparent hover:bg-surface-alt",
  subtle:
    "bg-surface-alt text-foreground border border-outline hover:bg-surface-soft hover:border-charcoal",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-xs",
  lg: "h-12 px-8 text-sm",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

interface ButtonClassNameOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: ButtonClassNameOptions = {}) {
  return cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-body font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-45",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonClassName({ variant, size, className })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
