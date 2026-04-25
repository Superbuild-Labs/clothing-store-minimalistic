import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "subtle";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-charcoal bg-charcoal text-surface hover:-translate-y-px hover:border-accent hover:bg-accent active:translate-y-0",
  secondary:
    "border border-outline bg-transparent text-foreground/90 hover:border-charcoal/80 hover:bg-surface-alt active:bg-surface-soft",
  ghost: "border border-transparent bg-transparent text-foreground hover:bg-surface-alt active:bg-surface-soft",
  subtle:
    "border border-outline bg-surface-alt text-foreground hover:border-charcoal hover:bg-surface-soft active:bg-editorial-highlight",
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
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm font-body font-semibold uppercase transition-all duration-300 ease-editorial focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-45",
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
