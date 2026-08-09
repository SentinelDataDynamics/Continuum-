# Continuum — Landing Page & Validation Funnel

Pre-launch landing page for Continuum, built to run the 14-day willingness-to-pay
validation sprint before Phase 1 MVP development begins. Next.js 16 (App Router,
TypeScript), Tailwind CSS, Framer Motion, Supabase, Paystack.

## What's here

- A single-page funnel: hero → the friction (why this matters) → how it works →
  an interactive asset-risk calculator → Founders Pass pricing → FAQ.
- A waitlist form and a pre-order form, each backed by its own API route.
- Every write degrades gracefully: **the site runs and looks complete with zero
  environment variables set.** Forms submit successfully; they just tell you
  the submission wasn't saved anywhere yet. Wire up Supabase and/or Paystack
  whenever you're ready — nothing needs to be reconfigured to add them later.
- Event tracking (`lib/analytics.ts`) for the six funnel events from the brief:
  `landing_view`, `calculator_interacted`, `waitlist_opened`,
  `waitlist_email_submitted`, `preorder_opened`, `preorder_button_clicked`,
  `payment_completed`. Writes to a Supabase `events` table when configured.

## Corrections made against the original brief

Two numbers in the source brief didn't hold up and were corrected — both are
called out with inline code comments in `lib/constants.ts` so the reasoning
travels with the file:

1. **Pricing.** The brief priced the Founders Pass at ₦5,000/yr while calling
   it "$10/yr" — that conversion only works at a pre-2023 exchange rate. At
   today's rate (~₦1,400/US$1), ₦5,000 is closer to $3.50. Priced here at
   **₦15,000/yr** instead — a genuine 50% off the ₦30,000/yr steady-state price
   from the vetted Strategic Business Case, and it actually delivers the
   "$10/yr" hook for real.
2. **The headline stat.** "Over ₦100 Billion" mixed a global USD figure with a
   Naira-denominated claim. Replaced with the Nigeria-specific, sourced figure
   from the business case's research pass: **₦1 trillion+** in dormant Nigerian
   bank deposits alone.

Every other figure on the page (probate timeframe, SIM-recycling window, the
14-day challenge hold) reads from `lib/constants.ts` — change it once, it
updates everywhere.

## Local development

```bash
npm install
cp .env.local.example .env.local   # optional — see below
npm run dev
```

Open http://localhost:3000.

## Environment variables (all optional to start)

Copy `.env.local.example` to `.env.local` and fill in what you have. Nothing
is required to run the site — see the comments in that file for where each
key comes from.

| Variable | Needed for |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Waitlist / pre-order / event storage |
| `SUPABASE_SERVICE_ROLE_KEY` | Same — **server-only secret, never expose client-side** |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Live payment on the Founders Pass button (without it, the button still works — it records a reservation and tells the visitor payment isn't live yet) |
| `NEXT_PUBLIC_SITE_URL` | Open Graph/social preview URLs |

### Setting up Supabase (5 minutes)

1. Create a project at supabase.com (free tier is enough for this).
2. Project Settings → API → copy the **Project URL** and the **anon public**
   and **service_role** keys into `.env.local`.
3. SQL Editor → New query → paste the contents of `supabase/schema.sql` → Run.
   This creates `waitlist`, `preorders`, and `events` tables with Row Level
   Security on and no public policies — the app writes to them exclusively
   through the service_role key inside the API routes, never from the browser.

### Setting up Paystack

1. Get your public key from Settings → API Keys & Webhooks in the Paystack
   dashboard. Use the `pk_test_...` key while validating demand.
2. Add it as `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`. That's the only key this app
   needs client-side — the secret key isn't used here at all (verification
   happens by trusting Paystack's own client-side callback; if you want
   server-side signature verification on top of that before going live with
   real volume, that's a natural next addition to `app/api/preorder/route.ts`).

## Deploying to Vercel (free tier)

**Option A — GitHub (recommended):**
1. Push this project to a new GitHub repository.
2. On vercel.com → **Add New → Project** → import that repository. Vercel
   detects Next.js automatically; no build settings to change.
3. Before the first deploy, add the environment variables above under
   **Settings → Environment Variables** (or skip this — the site works
   without them, as above).
4. Deploy. Every future push to `main` redeploys automatically.

**Option B — Vercel CLI:**
```bash
npm install -g vercel
vercel        # first deploy, follow the prompts
vercel --prod # promote to production
```

Both paths are free-tier friendly — this project has no server-side
dependency Vercel's Hobby tier doesn't cover.

## Validation sprint (from the brief)

- 🟢 **Green light:** 500+ waitlist emails, or 20+ paid Founders Pass
  reservations, within 14 days → proceed to Phase 1 MVP.
- 🟡 **Yellow light:** good traffic, weak conversion → before rebuilding the
  page, try softening the framing from legacy/death toward "personal net
  worth & emergency backup" — the FAQ and hero copy are the two places to
  start.
- 🔴 **Red light:** under 50 signups per 1,000 visitors → revisit
  positioning or channel before writing more code.

Pull these numbers from the Supabase `events` and `waitlist`/`preorders`
tables directly, or wire `lib/analytics.ts` to PostHog/GA if you'd rather
watch it in a dashboard — the `trackEvent()` call sites won't need to change.

## What was deliberately left out of this landing page

Scoped out because they belong to the actual Phase 1 MVP app, not the
pre-launch marketing page: PWA/offline support, real authentication, the
vault UI itself. Keeping this page a fast, simple, mostly-static site — not
the app shell — is intentional; see the companion PRD for where PWA
treatment belongs instead.
