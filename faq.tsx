import { Accordion } from "@/components/ui/accordion";
import { STATS } from "@/lib/constants";

const faqs = [
  {
    question: "Can Continuum, or anyone else, see my banking passwords?",
    answer:
      "No. Data is encrypted on your phone or laptop before it ever reaches our servers, using the same AES-256 standard banks use internally. We never store live banking passwords or card PINs — only the account references and instructions you choose to index.",
  },
  {
    question: "What if someone falsely claims I've died while I'm alive?",
    answer: `Any claim opens a mandatory ${STATS.challengeWindowDays}-day hold and sends urgent alerts across WhatsApp, SMS, and email. A single tap from you cancels it instantly and flags the claim for review.`,
  },
  {
    question: "Does this replace a formal will?",
    answer:
      "No — Continuum organizes and documents what you have so your family and any solicitor can act quickly. It works alongside a will or the legal process that applies to your estate; it isn't a substitute for either, and nothing here is legal advice.",
  },
  {
    question: "What happens to my data if Continuum shuts down?",
    answer:
      "This is the right question to ask of any service like this. We'll publish a clear continuity commitment before taking payment at scale — for now, treat early access as exactly that: early.",
  },
  {
    question: "Which accounts and assets can I add?",
    answer:
      "Traditional bank accounts, fintech vaults, crypto wallets, property titles, insurance policies, and free-text directives for anything else — the early-access version covers the categories people ask for most first.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Before you ask
          </h2>
        </div>
        <div className="mt-12 max-w-2xl">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
