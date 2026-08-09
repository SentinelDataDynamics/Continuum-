import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRICING } from "@/lib/constants";

const included = [
  "Unlimited zero-knowledge asset cataloging",
  "Automated WhatsApp & email heartbeat switch",
  "Password-protected Emergency Kit PDF",
  "Granular next-of-kin access rules",
  "Priority support during early access",
];

export function Pricing({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section id="pricing" className="bg-ink py-20 sm:py-28 text-parchment">
      <div className="section-shell">
        <div className="mx-auto max-w-lg text-center">
          <p className="eyebrow mb-4 text-signet-bright">Early access</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Lock in the founding rate
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-md rounded-sm border border-parchment/15 bg-parchment/[0.04] p-8 sm:p-10">
          <div className="flex items-center justify-between border-b border-dashed border-parchment/20 pb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-parchment/50">
              Founders Pass
            </span>
            <span className="rounded-full bg-signet/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-signet-bright">
              {PRICING.discountLabel}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-5xl">
              ₦{PRICING.foundersPassNairaPerYear.toLocaleString()}
            </span>
            <span className="text-parchment/50">/ year</span>
          </div>
          <p className="mt-1.5 text-sm text-parchment/50">
            ≈ ${PRICING.foundersPassUsdPerYear} USD at today&rsquo;s rate · regularly ₦
            {PRICING.standardNairaPerYear.toLocaleString()}/year after early access closes
          </p>

          <ul className="mt-8 space-y-3">
            {included.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-[0.92rem] text-parchment/80">
                <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-signet-bright" />
                {line}
              </li>
            ))}
          </ul>

          <Button size="lg" variant="ghost" className="mt-9 w-full" onClick={onCtaClick}>
            Claim the Founders Pass
          </Button>
          <p className="mt-3 text-center text-[0.78rem] text-parchment/40">
            This is a pre-launch reservation, not an active subscription — your card is charged
            now to lock in the rate, and vault access opens as seats are released.
          </p>
        </div>
      </div>
    </section>
  );
}
