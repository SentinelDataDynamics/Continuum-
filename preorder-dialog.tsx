"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PRICING } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

declare global {
  interface Window {
    PaystackPop?: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not reach the payment provider."));
    document.body.appendChild(script);
  });
}

export function PreorderDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function recordPreorder(paystackReference?: string) {
    const res = await fetch("/api/preorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.name,
        email: form.email,
        phone: form.phone,
        amountNaira: PRICING.foundersPassNairaPerYear,
        paystackReference,
        paymentStatus: paystackReference ? "paid" : "pending",
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Something went wrong.");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    trackEvent("preorder_button_clicked");

    try {
      if (!PAYSTACK_PUBLIC_KEY) {
        // Graceful fallback: record the reservation intent so no lead is lost
        // pre-launch, and be upfront that payment isn't live yet.
        await recordPreorder();
        setStatus("success");
        return;
      }

      await loadPaystackScript();
      const handler = window.PaystackPop!.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: form.email,
        amount: PRICING.foundersPassNairaPerYear * 100, // kobo
        currency: "NGN",
        metadata: { full_name: form.name, phone: form.phone },
        callback: (response: { reference: string }) => {
          recordPreorder(response.reference)
            .then(() => {
              trackEvent("payment_completed", { reference: response.reference });
              setStatus("success");
            })
            .catch((err) => {
              setStatus("error");
              setMessage(err instanceof Error ? err.message : "Payment succeeded, but we couldn't save your record — email us the reference.");
            });
        },
        onClose: () => {
          setStatus((s) => (s === "loading" ? "idle" : s));
        },
      });
      handler.openIframe();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", phone: "" });
      setMessage(null);
    }, 200);
  }

  return (
    <Dialog open={open} onClose={handleClose} eyebrow="Founders Pass" title="Reserve your rate">
      {status === "success" ? (
        <div className="py-2">
          <p className="text-[0.95rem] leading-relaxed text-ink/80">
            {PAYSTACK_PUBLIC_KEY
              ? "You're locked in at the founding rate. A receipt is on its way to your email."
              : "You're reserved at the founding rate. We'll email you to collect payment before early access opens — nothing has been charged yet."}
          </p>
          <Button className="mt-6 w-full" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-[0.9rem] leading-relaxed text-ink/65">
            ₦{PRICING.foundersPassNairaPerYear.toLocaleString()}/year, locked in now — regularly ₦
            {PRICING.standardNairaPerYear.toLocaleString()} once early access closes.
          </p>
          <div className="grid gap-3">
            <input
              type="text"
              required
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-sm border border-ink/20 bg-parchment px-4 py-3 text-[0.95rem] text-ink placeholder:text-stone/70 focus:border-signet focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-sm border border-ink/20 bg-parchment px-4 py-3 text-[0.95rem] text-ink placeholder:text-stone/70 focus:border-signet focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number (optional)"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-sm border border-ink/20 bg-parchment px-4 py-3 text-[0.95rem] text-ink placeholder:text-stone/70 focus:border-signet focus:outline-none"
            />
          </div>
          {status === "error" && (
            <p role="alert" className="text-[0.85rem] text-rust">
              {message}
            </p>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
            {status === "loading"
              ? "Processing…"
              : PAYSTACK_PUBLIC_KEY
                ? `Pay ₦${PRICING.foundersPassNairaPerYear.toLocaleString()} to reserve`
                : "Reserve my rate"}
          </Button>
          <p className="text-center text-[0.78rem] text-stone">
            {PAYSTACK_PUBLIC_KEY
              ? "Secure payment via Paystack. You'll get a receipt by email."
              : "Payment isn't live yet — this reserves your rate and we'll follow up directly."}
          </p>
        </form>
      )}
    </Dialog>
  );
}
