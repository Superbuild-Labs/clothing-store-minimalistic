"use client";

import { FormEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useShopStore } from "@/store/use-store";

const DISMISS_KEY = "eleve-newsletter-dismissed";
const SCROLL_THRESHOLD = 320;

export function NewsletterOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isCartOpen = useShopStore((state) => state.isCartOpen);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const wasDismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    if (wasDismissed) {
      return;
    }

    const onScroll = () => {
      if (!isCartOpen && window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isCartOpen]);

  const closeOverlay = useCallback(() => {
    setIsVisible(false);
    window.localStorage.setItem(DISMISS_KEY, "true");
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      'input:not([disabled]):not([type="hidden"])',
      "select:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");

    const getFocusable = () => {
      if (!dialogRef.current) {
        return [] as HTMLElement[];
      }

      return Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector));
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    requestAnimationFrame(() => {
      const focusable = getFocusable();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        dialogRef.current?.focus();
      }
    });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
      previousActiveElement?.focus();
    };
  }, [isVisible, closeOverlay]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    window.localStorage.setItem(DISMISS_KEY, "true");
  };

  if (!isVisible || isCartOpen) {
    return null;
  }

  return (
    <div
      onClick={closeOverlay}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/50 px-4 backdrop-blur-[1px]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-sm border border-outline bg-surface p-6 focus:outline-none sm:p-7"
      >
        <button
          type="button"
          onClick={closeOverlay}
          aria-label="Close newsletter"
          className="absolute right-3 top-3 rounded-sm p-1 text-charcoal/70 transition-colors hover:text-foreground"
        >
          <X size={16} />
        </button>

        {isSubmitted ? (
          <div>
            <h2 id={titleId} className="font-heading text-4xl leading-none text-foreground">
              You are in.
            </h2>
            <p className="mt-3 font-body text-sm text-charcoal/75">
              Thank you for subscribing. You will receive collection notes and early access updates.
            </p>
            <Button className="mt-5 w-full" onClick={closeOverlay}>
              Continue Browsing
            </Button>
          </div>
        ) : (
          <div>
            <p className="font-body text-xs uppercase text-accent">
              Newsletter
            </p>
            <h2 id={titleId} className="mt-2 font-heading text-5xl leading-[0.9] text-foreground">
              Join the ELEVE List
            </h2>
            <p className="mt-3 font-body text-sm text-charcoal/80">
              Receive editorial drops, material stories, and early collection previews.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="w-full rounded-sm border border-outline bg-background px-3 py-2 font-body text-sm transition-colors focus:border-charcoal focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-focus"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
