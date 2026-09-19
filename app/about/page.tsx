import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import { MISSION, WHY_CHOOSE } from "@/lib/about";

/* Uses the site theme tokens: bg-ink, text-paper, text-highlight,
   text-brand-red, surface / surface-2, font-display. */

const metallic = "text-highlight";

/* Headings scale continuously rather than jumping at md. */
const h1Size = "text-[clamp(2.2rem,8vw,4.4rem)]";
const h2Size = "text-[clamp(1.75rem,5.5vw,3.25rem)]";
const h2 = `font-display ${h2Size} uppercase leading-none ${metallic}`;

const section = "mx-auto max-w-5xl px-5 py-14 sm:px-6 md:py-24";
const eyebrow =
  "text-[11px] tracking-[0.3em] text-paper/60 sm:text-xs sm:tracking-[0.35em]";

/* White at night, brand red in daylight — see --card-title in globals.css. */
const cardTitle =
  "font-display text-[17px] uppercase leading-tight text-[var(--card-title)] sm:text-[18px]";

const ctaBase =
  "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-center font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:px-7 sm:py-[15px]";
const ctaSolid = `${ctaBase} bg-brand-red text-white shadow-[0_10px_30px_-12px_rgba(225,27,34,0.9)] hover:brightness-110`;
const ctaGhost = `${ctaBase} border border-paper/15 text-paper hover:bg-paper/5`;

export const metadata: Metadata = {
  title: "About — Ifeyinwa",
  description:
    "Why choose Ifeyinwa Academy — real client work, a path to paid Agency placements, and structured cohorts. See what's included and join the next batch.",
  openGraph: {
    title: "About — Ifeyinwa",
    description:
      "Real client work, a path to paid Agency placements, and structured cohorts — see why creators choose Ifeyinwa.",
    url: "https://ifeyinwa.com/about",
    siteName: "Ifeyinwa",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-paper">
      <Navbar />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-paper/10 px-5 pb-12 pt-12 sm:px-6 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className={eyebrow}>ABOUT IFEYINWA</p>

          <h1
            className={`mt-4 font-display ${h1Size} uppercase leading-[0.95] sm:mt-5 ${metallic}`}
          >
            One creator.
            <br />
            Then a classroom.
          </h1>

          <p className="mt-5 max-w-[52ch] text-[16px] text-paper/70 sm:text-[17px] md:text-[19px]">
            {MISSION}
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- why choose */}
      <section className={section}>
        <h2 className={h2}>Why choose Ifeyinwa</h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10">
          {WHY_CHOOSE.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-paper/10 bg-gradient-to-b from-surface to-surface-2 p-5 sm:p-6"
            >
              <h3 className={cardTitle}>{item.title}</h3>
              <p className="mt-3 text-[14.5px] text-paper/70 sm:text-[15px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------- join next batch */}
      <section className="border-y border-paper/10 px-5 py-14 text-center sm:px-6 md:py-24">
        <p className={eyebrow}>ENROLMENT IS OPEN</p>
        <h2 className={`mt-4 ${h2}`}>Join the next batch</h2>
        <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-paper/55 sm:text-base">
          Pick a package, secure your spot, and start learning inside the
          Academy — no waiting on a fixed intake date for self-paced packages.
        </p>
        <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-8">
          <Link href="/academy" className={ctaSolid}>
            See packages &amp; dates
          </Link>
        </div>
      </section>

      {/* --------------------------------------------------------- final cta */}
      <section className="relative overflow-hidden border-t border-paper/10 px-5 py-14 text-center sm:px-6 md:py-24">
        <div className="relative z-10">
          <h2
            className={`font-display ${h2Size} uppercase leading-none text-highlight`}
          >
            Ready to start?
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-paper/55 sm:text-base">
            Join a cohort, or hire a graduate who already has.
          </p>
          <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-8">
            <Link href="/academy" className={ctaSolid}>
              Join the Academy
            </Link>
            <Link href="/agency" className={ctaGhost}>
              Hire a creator
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}