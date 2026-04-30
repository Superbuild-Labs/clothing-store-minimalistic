"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  className?: string;
  label?: string;
}

export function LogoutButton({ className, label = "Logout" }: LogoutButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        setError("Failed to logout. Please try again.");
        setIsPending(false);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setError("Network error. Please try again.");
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleLogout}
        disabled={isPending}
        aria-busy={isPending}
        className={buttonClassName({
          variant: "secondary",
          size: "sm",
          className: cn("min-w-24", className),
        })}
      >
        {isPending ? "Logging Out" : label}
      </button>
      {error && (
        <p className="font-body text-[10px] text-charcoal/70" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
