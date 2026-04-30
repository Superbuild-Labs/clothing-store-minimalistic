import { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  wrapperClassName?: string;
}

export function FormField({
  label,
  id,
  error,
  className,
  wrapperClassName,
  required,
  ...props
}: FormFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <label htmlFor={inputId} className="font-body text-xs uppercase tracking-[0.16em] text-charcoal/82">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "h-11 w-full rounded-sm border bg-surface px-3 font-body text-sm text-foreground shadow-[0_1px_0_rgba(38,37,32,0.02)] transition-colors focus:border-charcoal focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-focus",
          error ? "border-charcoal/70" : "border-outline/90",
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="font-body text-xs text-charcoal/85">
          {error}
        </p>
      ) : null}
    </div>
  );
}
