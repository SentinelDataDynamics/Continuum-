"use client";

import { SealMark } from "@/components/seal-mark";
import { Button } from "@/components/ui/button";

export function SiteNav({ onWaitlistOpen }: { onWaitlistOpen: () => void }) {
  return (
    <header className="sticky top-0 z-40 border-b border-parchment-line/70 bg-parchment/90 backdrop-blur-sm">
      <div className="section-shell flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 text-ink">
          <SealMark size={28} static className="text-ink" />
          <span className="font-display text-[1.15rem] tracking-tight">Continuum</span>
        </a>
        <nav className="hidden items-center gap-7 text-[0.9rem] text-ink/70 md:flex">
          <a href="#friction" className="hover:text-ink transition-colors">
            Why it matters
          </a>
          <a href="#how-it-works" className="hover:text-ink transition-colors">
            How it works
          </a>
          <a href="#pricing" className="hover:text-ink transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-ink transition-colors">
            FAQ
          </a>
        </nav>
        <Button size="md" onClick={onWaitlistOpen}>
          Get early access
        </Button>
      </div>
    </header>
  );
}
