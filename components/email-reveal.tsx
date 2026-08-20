"use client";

import {
  Check,
  Copy,
  LoaderCircle,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEVELOPMENT_SITE_KEY = "1x00000000000000000000AA";

type Status =
  | "idle"
  | "loading"
  | "challenge"
  | "verifying"
  | "success"
  | "expired"
  | "failed"
  | "copy-failed";

type TurnstileApi = {
  render: (
    element: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "auto";
      size: "flexible";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function EmailReveal({
  variant = "outline",
  className,
}: {
  variant?: "default" | "outline";
  className?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [scriptReady, setScriptReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV !== "production" ? DEVELOPMENT_SITE_KEY : "");

  const copyEmail = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("success");
      setMessage("Verified — email copied to your clipboard.");
    } catch {
      setStatus("copy-failed");
      setMessage(
        "Verified. Clipboard access was denied; copy the email below.",
      );
    }
  }, []);

  const verify = useCallback(
    async (token: string) => {
      setStatus("verifying");
      setMessage("Verification passed. Securely requesting the email…");
      try {
        const response = await fetch("/api/contact/reveal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const body = (await response.json()) as {
          email?: string;
          error?: string;
          code?: string;
        };

        if (!response.ok || !body.email) {
          setStatus(body.code === "expired" ? "expired" : "failed");
          setMessage(body.error || "Verification failed. Please try again.");
          return;
        }

        setEmail(body.email);
        await copyEmail(body.email);
      } catch {
        setStatus("failed");
        setMessage(
          "The verification service could not be reached. Please try again.",
        );
      }
    },
    [copyEmail],
  );

  useEffect(() => {
    if (
      status !== "loading" ||
      !scriptReady ||
      !window.turnstile ||
      !containerRef.current ||
      widgetIdRef.current
    ) {
      return;
    }

    setStatus("challenge");
    setMessage("Complete the privacy-friendly check to reveal the email.");
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: "contact_email_reveal",
      theme: "auto",
      size: "flexible",
      callback: verify,
      "expired-callback": () => {
        setStatus("expired");
        setMessage("The verification expired. Please try again.");
      },
      "error-callback": () => {
        setStatus("failed");
        setMessage(
          "The verification challenge could not load. Please try again.",
        );
      },
    });
  }, [scriptReady, siteKey, status, verify]);

  useEffect(
    () => () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    },
    [],
  );

  const start = () => {
    setEmail(null);
    if (!siteKey) {
      setStatus("failed");
      setMessage("Email reveal is not configured.");
      return;
    }
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setStatus("challenge");
      setMessage("Complete the privacy-friendly check to reveal the email.");
      return;
    }
    if (window.turnstile) setScriptReady(true);
    setStatus("loading");
    setMessage("Loading secure verification…");
  };

  const busy = status === "loading" || status === "verifying";

  return (
    <div className={cn("flex min-w-0 flex-col items-start gap-2", className)}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => {
          setStatus("failed");
          setMessage("Secure verification could not load. Please try again.");
        }}
      />
      {status === "idle" ? (
        <Button size="lg" variant={variant} onClick={start}>
          <Mail className="h-4 w-4" /> Reveal email
        </Button>
      ) : (
        <div className="w-full max-w-sm rounded-lg border bg-background/80 p-3 shadow-sm">
          <div
            ref={containerRef}
            className={status === "challenge" ? "w-full" : "hidden"}
          />
          <output className="flex items-start gap-2 text-sm" aria-live="polite">
            {busy ? (
              <LoaderCircle className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-[var(--accent-blue)]" />
            ) : status === "success" ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-green)]" />
            ) : (
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-blue)]" />
            )}
            <span>{message}</span>
          </output>
          {email && (status === "success" || status === "copy-failed") ? (
            <div className="mt-3 flex min-w-0 items-center gap-2">
              <code className="min-w-0 flex-1 overflow-x-auto rounded bg-muted px-2 py-1 text-xs">
                {email}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyEmail(email)}
              >
                <Copy className="h-3.5 w-3.5" /> Copy
              </Button>
            </div>
          ) : null}
          {(status === "expired" || status === "failed") && (
            <Button
              className="mt-3"
              size="sm"
              variant="outline"
              onClick={start}
            >
              <RefreshCw className="h-3.5 w-3.5" /> Try again
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
