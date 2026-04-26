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

  const handleLogout = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        setIsPending(false);
        return;
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setIsPending(false);
    }
  };

  return (
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
  );
}
