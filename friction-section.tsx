import { Split, Gavel, SmartphoneNfc, KeyRound } from "lucide-react";
import { STATS } from "@/lib/constants";

const cards = [
  {
    tag: "COMMON",
    icon: Split,
    title: "The fragmented fintech trap",
    body: "Your money is split across Moniepoint, OPay, PiggyVest, and two or three traditional banks. If you're not here tomorrow, nobody has the map.",
  },
  {
    tag: "SLOW",
    icon: Gavel,
    title: `${STATS.probateTimeframe} in probate court`,
    body: "Banks freeze accounts the moment they hear of a death. Without a clear index of what exists and where, your family faces a long, expensive court process just to find out what they're owed.",
  },
  {
    tag: "SILENT",
    icon: SmartphoneNfc,
    title: "Recycled telco SIMs",
    body: `Nigerian telcos reassign inactive lines after ${STATS.telcoSimRecycleDays} days. A stranger can inherit your 2FA codes while your own family is still locked out.`,
  },
  {
    tag: "IRREVERSIBLE",
    icon: KeyRound,
    title: "Buried digital credentials",
    body: "Seed phrases and device PINs live in one person's head, or a notebook no one else knows to look for. When that's gone, so is what it protects.",
  },
];

export function FrictionSection() {
  return (
    <section id="friction" className="bg-ink py-20 sm:py-28 text-parchment">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4 text-signet-bright">The hidden friction</p>
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Modern wealth, scattered across a dozen logins
          </h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-sm bg-parchment/10 sm:grid-cols-2">
          {cards.map(({ tag, icon: Icon, title, body }) => (
            <div key={title} className="bg-ink p-7 sm:p-9">
              <div className="mb-6 flex items-center justify-between">
                <Icon size={24} strokeWidth={1.4} className="text-signet-bright" />
                <span className="font-mono text-[10px] tracking-[0.18em] text-parchment/40">
                  {tag}
                </span>
              </div>
              <h3 className="font-display text-xl leading-snug">{title}</h3>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-parchment/65">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
