"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      trackEvent("waitlist_email_submitted");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
      setMessage(null);
    }, 200);
  }

  return (
    <Dialog open={open} onClose={handleClose} eyebrow="Free early access" title="Join the waitlist">
      {status === "success" ? (
        <div className="py-2">
          <p className="text-[0.95rem] leading-relaxed text-ink/80">
            You&rsquo;re on the list. We&rsquo;ll email you the moment early access opens for
            your account.
          </p>
          <Button className="mt-6 w-full" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-[0.9rem] leading-relaxed text-ink/65">
            No payment, no commitment — just a note to your inbox when your account is ready.
          </p>
          <div>
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-ink/20 bg-parchment px-4 py-3 text-[0.95rem] text-ink placeholder:text-stone/70 focus:border-signet focus:outline-none"
            />
          </div>
          {status === "error" && (
            <p role="alert" className="text-[0.85rem] text-rust">
              {message}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Joining…" : "Join the waitlist"}
          </Button>
        </form>
      )}
    </Dialog>
  );
}
