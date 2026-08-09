import { STATS } from "@/lib/constants";

const steps = [
  {
    n: "01",
    title: "Index your assets",
    time: "~10 minutes",
    body: "Add bank names, fintech handles, property note locations, and phone PIN hints. Everything is encrypted on your device before it's ever saved.",
  },
  {
    n: "02",
    title: "Set your heartbeat switch",
    time: "30, 60, or 90 days",
    body: "Choose a check-in interval. One tap on WhatsApp or email resets your timer — that's the entire ongoing commitment.",
  },
  {
    n: "03",
    title: "Automatic emergency release",
    time: `${STATS.challengeWindowDays}-day hold`,
    body: "Miss your check-ins and don't respond to urgent alerts, and your encrypted Emergency Kit reaches your verified next of kin — no sooner.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">How it works</p>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Three steps. No ongoing effort beyond a tap.
          </h2>
        </div>
        <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => (
            <li key={step.n} className="relative">
              <span className="font-display text-5xl text-parchment-line">{step.n}</span>
              <h3 className="mt-4 font-display text-xl text-ink">{step.title}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-signet">
                {step.time}
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">{step.body}</p>
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="ledger-rule mt-8 hidden sm:block sm:absolute sm:top-6 sm:-right-4 sm:h-px sm:w-8 sm:mt-0"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
