This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3030](http://localhost:3030) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Bot-gated email reveal

The contact buttons render Cloudflare Turnstile in the browser, then send its
single-use token to a Next.js Node route. The route validates the token through
Cloudflare Siteverify and only returns the contact address after verification.
The email address and secret key are never included in the client bundle.

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: public widget site key.
- `TURNSTILE_SECRET_KEY`: server-only Siteverify secret.
- `PORTFOLIO_CONTACT_EMAIL`: server-only address returned after verification.
- `TURNSTILE_ALLOWED_HOSTNAMES`: optional comma-separated hostname allowlist.

Create a **Managed** Turnstile widget in the Cloudflare dashboard and allow the
production hostnames `chand1012.dev` and `www.chand1012.dev`. Those are also the
server route's default production allowlist; set `TURNSTILE_ALLOWED_HOSTNAMES`
only if the deployment hostnames change. Arbitrary hostnames are rejected. For
local development, the app automatically uses
Cloudflare's official always-pass test site/secret when the two Turnstile
variables are unset; `PORTFOLIO_CONTACT_EMAIL` is still required. Production
fails closed if any required value is missing.

For GitHub Actions image builds, add a repository **Actions variable** named
exactly `NEXT_PUBLIC_TURNSTILE_SITE_KEY` under **Settings → Secrets and
variables → Actions → Variables**. The Docker workflow passes that public value
to `next build`. Do not add `TURNSTILE_SECRET_KEY` or
`PORTFOLIO_CONTACT_EMAIL` as build variables; provide those only to the running
container.

This is a normal self-hosted Next.js application: build with `npm run build`,
provide the variables to the Node process, and run `npm start`. The route uses
standard Node `fetch`; no Cloudflare Worker or Pages Function is required.

## Deploy

Run the production server behind your existing reverse proxy and pass the
variables above to the Node process. The public Turnstile key is embedded at
build time, so rebuild after changing it; the secret and contact address are
read by the route at runtime.
