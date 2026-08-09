"use client";

import { useEffect, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { FrictionSection } from "@/components/friction-section";
import { HowItWorks } from "@/components/how-it-works";
import { RiskCalculator } from "@/components/risk-calculator";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { PreorderDialog } from "@/components/preorder-dialog";
import { trackEvent } from "@/lib/analytics";

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [preorderOpen, setPreorderOpen] = useState(false);

  useEffect(() => {
    trackEvent("landing_view");
  }, []);

  function openWaitlist() {
    trackEvent("waitlist_opened");
    setWaitlistOpen(true);
  }

  function openPreorder() {
    trackEvent("preorder_opened");
    setPreorderOpen(true);
  }

  return (
    <>
      <SiteNav onWaitlistOpen={openWaitlist} />
      <main>
        <Hero onPreorderOpen={openPreorder} onWaitlistOpen={openWaitlist} />
        <FrictionSection />
        <HowItWorks />
        <RiskCalculator onCtaClick={openPreorder} />
        <Pricing onCtaClick={openPreorder} />
        <FAQ />
      </main>
      <SiteFooter />
      <WaitlistDialog open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <PreorderDialog open={preorderOpen} onClose={() => setPreorderOpen(false)} />
    </>
  );
}
