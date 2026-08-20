import { NextResponse } from "next/server";

export const runtime = "nodejs";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EXPECTED_ACTION = "contact_email_reveal";
const DEVELOPMENT_SECRET = "1x0000000000000000000000000000000AA";
const DEFAULT_PRODUCTION_HOSTNAMES = ["chand1012.dev", "www.chand1012.dev"];

type TurnstileResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

function json(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function allowedHostnames() {
  const configured = process.env.TURNSTILE_ALLOWED_HOSTNAMES?.split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (configured?.length) return configured;
  return process.env.NODE_ENV === "production"
    ? DEFAULT_PRODUCTION_HOSTNAMES
    : [];
}

export async function POST(request: Request) {
  const usingDevelopmentSecret =
    !process.env.TURNSTILE_SECRET_KEY && process.env.NODE_ENV !== "production";
  const secret =
    process.env.TURNSTILE_SECRET_KEY ||
    (process.env.NODE_ENV !== "production" ? DEVELOPMENT_SECRET : undefined);
  const email = process.env.PORTFOLIO_CONTACT_EMAIL;

  if (!secret || !email) {
    return json({ error: "Email reveal is not configured." }, 503);
  }

  let token: unknown;
  try {
    ({ token } = (await request.json()) as { token?: unknown });
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return json({ error: "A valid verification token is required." }, 400);
  }

  const remoteIp =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  let result: TurnstileResult;
  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(remoteIp ? { remoteip: remoteIp } : {}),
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return json({ error: "Verification service is unavailable." }, 502);
    }
    result = (await response.json()) as TurnstileResult;
  } catch {
    return json({ error: "Verification service is unavailable." }, 502);
  } finally {
    clearTimeout(timeout);
  }

  if (!result.success) {
    const expired = result["error-codes"]?.includes("timeout-or-duplicate");
    return json(
      {
        error: expired
          ? "Verification expired. Please try again."
          : "Verification failed. Please try again.",
        code: expired ? "expired" : "failed",
      },
      expired ? 410 : 403,
    );
  }

  if (
    result.action !== EXPECTED_ACTION &&
    !(usingDevelopmentSecret && !result.action)
  ) {
    return json({ error: "Verification context did not match." }, 403);
  }

  const hostnameAllowlist = allowedHostnames();
  if (
    hostnameAllowlist.length > 0 &&
    (!result.hostname ||
      !hostnameAllowlist.includes(result.hostname.toLowerCase()))
  ) {
    return json({ error: "Verification host did not match." }, 403);
  }

  return json({ email }, 200);
}
