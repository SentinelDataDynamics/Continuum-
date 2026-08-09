/**
 * Every number on the page reads from here. Two corrections carried over
 * from the vetted Strategic Business Case (v3.0.0) so this landing page
 * doesn't contradict it:
 *
 * 1. PRICING: the original landing-page brief priced the Founders Pass at
 *    ₦5,000/yr while calling it "$10/yr" — that only holds at a pre-2023
 *    exchange rate. At the live Aug 2026 rate (~₦1,400/US$1), ₦5,000 is
 *    closer to $3.50. Priced here at ₦15,000/yr instead: a genuine 50% off
 *    the ₦30,000/yr steady-state price established in the business case,
 *    and it actually delivers the "$10/yr" hook at today's rate.
 *
 * 2. STATS: "Over ₦100 Billion" in the original brief mixed a global
 *    USD figure with a Naira-denominated claim. Replaced with the
 *    Nigeria-specific figure from the business case's research pass —
 *    larger, more defensible, and sourced.
 */

export const PRICING = {
  foundersPassNairaPerYear: 15000,
  foundersPassUsdPerYear: 11,
  standardNairaPerYear: 30000,
  discountLabel: "50% off",
} as const;

export const STATS = {
  dormantDepositsHeadline: "₦1 trillion+",
  dormantDepositsContext:
    "sits in dormant or unreachable Nigerian bank deposits alone — before fintech vaults, crypto, and property are even counted.",
  probateTimeframe: "6–12+ months",
  telcoSimRecycleDays: 90,
  challengeWindowDays: 14,
} as const;

export const VALIDATION_THRESHOLDS = {
  waitlistGreenLight: 500,
  preorderGreenLight: 20,
  sprintDays: 14,
} as const;

export const CHECKIN_INTERVALS = [30, 60, 90] as const;

export const SITE = {
  name: "Continuum",
  tagline: "A registry for what you've built",
  supportEmail: "hello@continuum.app",
} as const;
