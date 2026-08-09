"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CheckboxRow } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const ITEMS = [
  { id: "banks", label: "Traditional bank accounts (3+)", hint: "GTBank, Access, Zenith, and the rest" },
  { id: "fintech", label: "Fintech vaults", hint: "PiggyVest, Cowrywise, OPay, Moniepoint" },
  { id: "property", label: "Real estate deeds or C of O", hint: "Land titles, Deed of Assent, Governor's Consent" },
  { id: "crypto", label: "Crypto wallets or foreign accounts", hint: "Exchange holdings, Wise, Mercury, self-custody" },
  { id: "insurance", label: "Life insurance policies", hint: "Any policy where a payout exists on paper" },
] as const;

type ItemId = (typeof ITEMS)[number]["id"];

export function RiskCalculator({ onCtaClick }: { onCtaClick: () => void }) {
  const [checked, setChecked] = useState<Record<ItemId, boolean>>({
    banks: false,
    fintech: false,
    property: false,
    crypto: false,
    insurance: false,
  });
  const hasTracked = useRef(false);

  const count = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);

  function toggle(id: ItemId, value: boolean) {
    if (!hasTracked.current) {
      hasTracked.current = true;
      trackEvent("calculator_interacted");
    }
    setChecked((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <section className="bg-parchment-dim py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start lg:gap-16">
        <div>
          <p className="eyebrow mb-4">What&rsquo;s actually at risk</p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Check what applies to you
          </h2>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ink/65">
            Nothing here is saved or sent anywhere — it's just arithmetic, running in your
            browser, to make the risk concrete.
          </p>
          <div className="mt-8 space-y-2.5">
            {ITEMS.map((item) => (
              <CheckboxRow
                key={item.id}
                label={item.label}
                hint={item.hint}
                checked={checked[item.id]}
                onChange={(v) => toggle(item.id, v)}
              />
            ))}
          </div>
        </div>

        <div className="sticky top-24 rounded-sm border border-ink/10 bg-parchment p-8">
          <p className="eyebrow mb-3">Estimated exposure</p>
          <p className="font-display text-4xl text-ink">
            {count === 0 ? "—" : count}
            <span className="ml-2 text-lg font-body font-normal text-ink/50">
              {count === 1 ? "item" : "items"} unindexed
            </span>
          </p>
          <p className="mt-4 text-[0.9rem] leading-relaxed text-ink/65">
            {count === 0
              ? "Tick what applies to you on the left — most people stop at three or four before they've even finished the list."
              : `If something happened to you today, your family would have to find ${count === 1 ? "this on their own" : "all of these on their own"} — with banks that won't volunteer information and a court process measured in months.`}
          </p>
          <Button size="lg" className="mt-7 w-full" onClick={onCtaClick}>
            Lock these in your vault
            <ArrowRight size={16} strokeWidth={2} />
          </Button>
        </div>
      </div>
    </section>
  );
}
