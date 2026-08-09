"use client";

export type ContinuumEvent =
  | "landing_view"
  | "calculator_interacted"
  | "waitlist_opened"
  | "waitlist_email_submitted"
  | "preorder_opened"
  | "preorder_button_clicked"
  | "payment_completed";

/**
 * Fire-and-forget event tracking. Always logs to the console in
 * development; posts to /api/track in the background otherwise, which
 * writes to Supabase if configured and no-ops quietly if not — never
 * throws, never blocks the UI it's called from.
 */
export function trackEvent(event: ContinuumEvent, meta: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[track]", event, meta);
  }

  try {
    const payload = JSON.stringify({ event, meta, path: window.location.pathname });
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Analytics should never break the page.
  }
}
