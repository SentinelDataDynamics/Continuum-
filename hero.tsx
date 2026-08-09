"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MapPinned, Zap } from "lucide-react";
import { SealMark } from "@/components/seal-mark";
import { Button } from "@/components/ui/button";
import { STATS } from "@/lib/constants";

const trustPoints = [
  { icon: ShieldCheck, label: "Client-side AES-256 encryption — we never see your passwords or PINs" },
  { icon: MapPinned, label: "Built around Nigerian banks, fintechs, and property records" },
  { icon: Zap, label: "Ten minutes to index. Released only if it's genuinely needed." },
];

export function Hero({
  onPreorderOpen,
  onWaitlistOpen,
}: {
  onPreorderOpen: () => void;
  onWaitlistOpen: () => void;
}) {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="section-shell grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow mb-5">A registry for what you&rsquo;ve built</p>
          <h1 className="font-display text-[2.5rem] leading-[1.08] tracking-tight text-ink sm:text-[3.1rem] lg:text-[3.4rem]">
            If something happened to you this week —{" "}
            <span className="text-signet">would your family know where to look?</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
            <span className="font-semibold text-ink">{STATS.dormantDepositsHeadline}</span>{" "}
            {STATS.dormantDepositsContext} Continuum indexes what you have — encrypted on your
            own device before it ever reaches us — and hands the map to your next of kin only if
            you genuinely go silent.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onPreorderOpen}>
              Secure the Founders Pass
            </Button>
            <Button size="lg" variant="secondary" onClick={onWaitlistOpen}>
              Join free early access
            </Button>
          </div>
          <dl className="mt-11 grid gap-4 border-t border-parchment-line pt-7 sm:grid-cols-3 sm:gap-6">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-start gap-2.5">
                <Icon size={17} strokeWidth={1.6} className="mt-0.5 shrink-0 text-signet" />
                <dt className="sr-only">Trust point</dt>
                <dd className="text-[0.82rem] leading-snug text-ink/65">{label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute h-[22rem] w-[22rem] rounded-full bg-signet/[0.05] blur-3xl" />
          <SealMark size={280} className="relative text-ink" />
        </motion.div>
      </div>
    </section>
  );
}
