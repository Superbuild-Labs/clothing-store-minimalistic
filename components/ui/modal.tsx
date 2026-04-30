"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useId } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

export function Modal({ open, title, children, onClose, className }: ModalProps) {
  const dialogRef = useFocusTrap<HTMLDivElement>({ isOpen: open, onClose });
  const titleId = useId();

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label={`Close ${title}`}
            className="fixed inset-0 z-[90] bg-charcoal/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={cn(
              "fixed left-1/2 top-1/2 z-[100] max-h-[86vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm border border-outline bg-surface p-6 focus:outline-none sm:p-8",
              className,
            )}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-outline pb-4">
              <h2 id={titleId} className="font-heading text-4xl leading-none text-foreground">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={`Close ${title}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-outline text-charcoal/70 transition-colors hover:border-charcoal hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
            <div className="pt-5">{children}</div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
