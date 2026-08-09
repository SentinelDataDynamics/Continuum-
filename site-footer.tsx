import { SealMark } from "@/components/seal-mark";
import { SITE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-parchment-line bg-parchment py-12">
      <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5 text-ink/70">
          <SealMark size={22} static className="text-ink/50" />
          <span className="font-display text-sm">{SITE.name}</span>
        </div>
        <p className="max-w-xl text-[0.78rem] leading-relaxed text-stone">
          Continuum is in early access and is not a licensed financial, insurance, or legal
          service. It does not provide legal advice and does not adjudicate inheritance disputes.
          Nothing on this page guarantees investment, deposit, or claim outcomes.
        </p>
        <a
          href={`mailto:${SITE.supportEmail}`}
          className="text-[0.82rem] text-ink/70 underline decoration-parchment-line underline-offset-4 hover:text-signet"
        >
          {SITE.supportEmail}
        </a>
      </div>
    </footer>
  );
}
