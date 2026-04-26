"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FormField } from "@/components/ui/form-field";
import { Heading } from "@/components/ui/heading";
import { PageTransition } from "@/components/ui/page-transition";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const DEFAULT_ERROR_MESSAGE = "Unable to sign in. Please check your credentials.";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isPending, setIsPending] = useState(false);

  const nextPath = useMemo(() => {
    const candidate = searchParams.get("next");
    if (!candidate || !candidate.startsWith("/")) {
      return "/";
    }

    return candidate;
  }, [searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextFieldErrors: { email?: string; password?: string } = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextFieldErrors.email = "Email is required.";
    }

    if (!password) {
      nextFieldErrors.password = "Password is required.";
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setFieldErrors({});
    setIsPending(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        setErrorMessage(data?.error ?? DEFAULT_ERROR_MESSAGE);
        setIsPending(false);
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setIsPending(false);
    }
  };

  return (
    <PageTransition>
      <Section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto w-full max-w-xl rounded-sm border border-outline bg-surface p-6 sm:p-8">
            <Heading
              eyebrow="Authentication"
              title="Sign in to ELEVE"
              description="Enter your demo credentials to continue into the storefront."
            />

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <FormField
                label="Email"
                id="login-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
                error={fieldErrors.email}
              />

              <FormField
                label="Password"
                id="login-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                error={fieldErrors.password}
              />

              {errorMessage ? (
                <p className="rounded-sm border border-charcoal/25 bg-editorial-highlight px-4 py-3 font-body text-sm text-charcoal/90">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isPending}
                className={cn(buttonClassName({ className: "w-full" }), isPending ? "cursor-not-allowed" : "")}
              >
                {isPending ? "Signing In" : "Sign In"}
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </PageTransition>
  );
}
