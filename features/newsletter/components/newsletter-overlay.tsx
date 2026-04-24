"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";

const DISMISS_KEY = "eleve-newsletter-dismissed";
const SCROLL_THRESHOLD = 320;

export function NewsletterOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const wasDismissed = window.localStorage.getItem(DISMISS_KEY) === "true";
    if (wasDismissed) {
      return;
    }

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeOverlay = useCallback(() => {
    setIsVisible(false);
    window.localStorage.setItem(DISMISS_KEY, "true");
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isVisible, closeOverlay]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    window.localStorage.setItem(DISMISS_KEY, "true");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      onClick={closeOverlay}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/50 px-4 backdrop-blur-[1px]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-sm border border-outline bg-surface p-6 shadow-xl sm:p-7"
      >
        <button
          onClick={closeOverlay}
          aria-label="Close newsletter"
          className="absolute right-3 top-3 text-charcoal/70 transition-colors hover:text-foreground"
        >
          <X size={16} />
        </button>

        {isSubmitted ? (
          <div>
            <p className="font-heading text-4xl leading-none text-foreground">You are in.</p>
            <p className="mt-3 font-body text-sm text-charcoal/76">
              Thank you for subscribing. You will receive collection notes and early access updates.
            </p>
            <Button className="mt-5 w-full" onClick={closeOverlay}>
              Continue Browsing
            </Button>
          </div>
        ) : (
          <div>
            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-accent">
              Newsletter
            </p>
            <p className="mt-2 font-heading text-5xl leading-[0.9] text-foreground">
              Join the ELEVE List
            </p>
            <p className="mt-3 font-body text-sm text-charcoal/78">
              Receive editorial drops, material stories, and early collection previews.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                className="w-full rounded-sm border border-outline bg-background px-3 py-2 font-body text-sm outline-none placeholder:text-charcoal/55"
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
