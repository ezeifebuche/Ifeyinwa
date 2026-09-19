import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import WaitlistForm from "@/components/WaitlistForm";

/* Uses the site theme tokens: bg-ink, text-paper, text-hi, text-brand-red,
   surface / surface-2, --card-title, font-display. */

const metallic = "text-hi";

/* Headings scale continuously rather than jumping at md. */
const h1Size = "text-[clamp(2.5rem,9vw,4.25rem)]";
const h2Size = "text-[clamp(1.75rem,5.5vw,3.25rem)]";
const h2 = `font-display ${h2Size} uppercase leading-none ${metallic}`;

const section = "mx-auto max-w-5xl px-5 py-14 sm:px-6 md:py-24";
const eyebrow =
  "text-[11px] tracking-[0.3em] text-paper/60 sm:text-xs sm:tracking-[0.35em]";

/* White at night, brand red in daylight. */
const cardTitle =
  "font-display uppercase leading-tight text-[color:var(--card-title)]";

const ctaBase =
  "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-center font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:px-7 sm:py-[15px]";
const ctaGhost = `${ctaBase} border border-paper/15 text-paper hover:bg-paper/5`;

export const metadata: Metadata = {
  title: "Community — Ifeyinwa",
  description:
    "Ifeyinwa Community is coming soon — a home for Academy graduates and creators to connect, share work and find opportunities. Join the waiting list.",
  openGraph: {
    title: "Community — Ifeyinwa",
    description:
      "A home for Academy graduates and creators to connect, share work and find opportunities. Join the waiting list.",
    url: "https://ifeyinwa.com/community",
    siteName: "Ifeyinwa",
    images: [{ url: "/og/community.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/community" },
};

const WHAT_TO_EXPECT = [
  {
    title: "A home base for graduates",
    body: "Connect with people from your cohort and other batches, not just for the duration of the course.",
  },
  {
    title: "Work in progress, out loud",
    body: "Share drafts, get feedback, and see how other creators are solving the same problems.",
  },
  {
    title: "Opportunities before they're public",
    body: "First look at agency briefs, collaborations and paid gigs before they go wider.",
  },
];

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-paper">
      <Navbar />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-paper/10 px-5 pb-12 pt-12 sm:px-6 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className={eyebrow}>COMMUNITY</p>

          <h1
            className={`mt-4 font-display ${h1Size} uppercase leading-[0.95] sm:mt-5 ${metallic}`}
          >
            Coming soon
          </h1>

          <p className="mx-auto mt-5 max-w-[46ch] text-[16px] text-paper/70 sm:text-[17px] md:mt-6 md:text-[19px]">
            A space for Academy graduates and creators to connect, share
            work, and hear about opportunities first. Join the waiting list
            and we&apos;ll let you know the moment it opens.
          </p>

          <div className="mt-7 flex justify-center md:mt-9">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ what's coming */}
      <section className={section}>
        <h2 className={`text-center ${h2}`}>What to expect</h2>

        <div className="mt-8 grid gap-4 sm:gap-5 md:mt-10 md:grid-cols-3">
          {WHAT_TO_EXPECT.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-paper/10 bg-gradient-to-b from-surface to-surface-2 p-5 sm:p-6"
            >
              <h3 className={`${cardTitle} text-[18px] sm:text-[20px]`}>
                {item.title}
              </h3>
              <p className="mt-3 text-[14.5px] text-paper/70 sm:text-[15px]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- meanwhile */}
      <section className="relative overflow-hidden border-t border-paper/10 px-5 py-14 text-center sm:px-6 md:py-24">
        <div className="relative z-10">
          <h2 className={`font-display ${h2Size} uppercase leading-none text-hi`}>
            While you wait
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-paper/55 sm:text-base">
            Start with the Academy, or see what graduates are already making
            in the Showcase.
          </p>
          <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-8">
            <Link href="/academy" className={ctaGhost}>
              Explore the Academy
            </Link>
            <Link href="/movies" className={ctaGhost}>
              See the Showcase
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}