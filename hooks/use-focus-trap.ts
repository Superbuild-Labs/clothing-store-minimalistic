"use client";

import { useEffect, useRef } from "react";

interface UseFocusTrapOptions {
  isOpen: boolean;
  onClose?: () => void;
}

export function useFocusTrap<T extends HTMLElement>({ isOpen, onClose }: UseFocusTrapOptions) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    if (!isOpen) {
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
      if (!elementRef.current) {
        return [] as HTMLElement[];
      }

      return Array.from(
        elementRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true");
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
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
    window.addEventListener("keydown", onKeyDown);

    requestAnimationFrame(() => {
      const focusable = getFocusable();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        elementRef.current?.focus();
      }
    });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  return elementRef;
}
