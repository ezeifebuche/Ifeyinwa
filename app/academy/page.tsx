import type { Metadata } from "next";
import Link from "next/link";

import Countdown from "@/components/Academy/Countdown";
import Navbar2 from "@/components/Academy/Navbar2";

import {
  COHORT,
  CURRICULUM,
  FAQS,
  INCLUDED,
  PACKAGES,
  WHATSAPP_LINK,
} from "@/lib/academy";

/* Uses the site's existing theme tokens: bg-ink, text-paper, text-brand-red,
   font-display. Fonts come from layout.tsx — nothing is imported here. */

const metallic =
  "bg-gradient-to-b from-white via-[#c6c9ce] to-[#7c8087] bg-clip-text text-transparent";

export const metadata: Metadata = {
  title: "Ifeyinwa Academy — learn to make AI video in 10 days",
  description:
    "A 10-day bootcamp in AI video: pre-recorded lessons, practical assignments and a House Captain who corrects your work until it's right. Batch 4 starts 14 September.",
  openGraph: {
    title: "Ifeyinwa Academy — learn to make AI video in 10 days",
    description:
      "Pre-recorded lessons, marked assignments and a House Captain who stays on it with you. Batch 4 starts 14 September.",
    url: "https://ifeyinwa.com/academy",
    siteName: "Ifeyinwa",
    images: [{ url: "/og/academy.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/academy" },
};

function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Ifeyinwa Academy AI Video Bootcamp",
    description:
      "A 10-day bootcamp teaching AI video production, from prompting to camera language, sound and editing.",
    provider: { "@type": "Organization", name: "Ifeyinwa Academy" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      startDate: COHORT.startsAt,
      name: `${COHORT.label} — General group bootcamp`,
    },
    offers: {
      "@type": "Offer",
      price: "15000",
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
    },
  };
}

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

function Check() {
  return (
    <span
      className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full bg-brand-red text-white"
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" width="11" height="11">
        <path
          d="M2.5 8.5l3.5 3.5 7.5-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const ctaBase =
  "inline-flex items-center justify-center rounded-full px-7 py-[15px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none";
const ctaSolid = `${ctaBase} bg-brand-red text-white shadow-[0_10px_30px_-12px_rgba(225,27,34,0.9)] hover:brightness-110`;
const ctaGhost = `${ctaBase} border border-paper/15 text-paper hover:bg-paper/5`;

export default function AcademyPage() {
  return (
    <main
      className="relative min-h-screen text-paper"
      style={{ backgroundColor: "#0F0B0A" }}
    >
      <Navbar2/>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative border-b border-paper/10 px-6 pb-14 pt-16 md:pb-20 md:pt-24">

        <div className="relative z-10 mx-auto max-w-5xl">
          <h1
            className={`font-display text-[46px] uppercase leading-[0.92] md:text-[86px] ${metallic}`}
          >
            Ten days to your
            <br />
            first AI film
          </h1>

          <p className="mt-6 max-w-[46ch] text-[17px] text-paper/70 md:text-[19px]">
            You get the lessons, the assignments, and a House Captain who marks
            your work and stays on it with you until it&apos;s right. By day ten
            you have a finished film, not a folder of clips.
          </p>

          <div className="mt-10 flex flex-col items-start gap-6">
            <Countdown target={COHORT.startsAt} label={COHORT.label} />
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/enrol" className={ctaSolid}>
                Enrol in {COHORT.label} — ₦15,000
              </Link>
              <a
                href={WHATSAPP_LINK}
                className={ctaGhost}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask a question on WhatsApp
              </a>
            </div>
            <p className="text-sm text-paper/50">{COHORT.seatsNote}.</p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- packages */}
      <section id="packages" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2
          className={`font-display text-[32px] uppercase leading-none md:text-[52px] ${metallic}`}
        >
          Our packages
        </h2>
        <p className="mt-3 max-w-[52ch] text-paper/55">
          Same curriculum in all four. What changes is how much of it you do
          alone, and how fast you go.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <article
              key={p.slug}
              className={`flex flex-col gap-3 rounded-2xl border p-5 ${
                p.featured
                  ? "border-brand-red/55 bg-gradient-to-b from-[#17110f] to-[#0f0b0a]"
                  : "border-paper/10 bg-gradient-to-b from-[#141010] to-[#0f0b0a]"
              }`}
            >
              <header className="flex flex-wrap items-start gap-2.5">
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-red font-display text-base leading-none text-white"
                  aria-hidden="true"
                >
                  {p.index}
                </span>
                <h3 className="flex-1 self-center font-display text-[18px] uppercase leading-tight tracking-[0.02em] text-white">
                  {p.name}
                </h3>
                <p className="flex items-baseline gap-1.5 whitespace-nowrap rounded-lg bg-brand-red px-3 py-1.5 font-display text-[18px] leading-none text-white">
                  {p.price}
                  {p.priceNote ? (
                    <span className="font-sans text-[10px] font-semibold opacity-90">
                      {p.priceNote}
                    </span>
                  ) : null}
                </p>
              </header>

              <p className="text-[14px] text-paper/75">{p.summary}</p>

              {p.houses ? (
                <div className="rounded-lg border border-paper/10 bg-paper/[0.03] px-3.5 py-3">
                  <p className="mb-2.5 flex gap-2 text-[13.5px] text-paper/80">
                    <Check />
                    You&apos;ll be assigned to a house
                  </p>
                  <ul>
                    {p.houses.map((h, i) => (
                      <li
                        key={h.name}
                        className={`flex items-center gap-2 py-1 text-[13.5px] font-semibold ${
                          i < p.houses!.length - 1
                            ? "border-b border-paper/10"
                            : ""
                        }`}
                      >
                        <span
                          className="size-2.5 rounded-full"
                          style={{ background: h.dot }}
                          aria-hidden="true"
                        />
                        <span style={{ color: h.dot }}>{h.name}</span>
                        <span className="ml-auto font-normal text-paper/50">
                          {h.who}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <ul className="flex flex-col gap-2">
                {p.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-[13.5px] text-paper/80"
                  >
                    <Check />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {p.badge ? (
                <p className="rounded-lg border border-brand-red/40 bg-gradient-to-r from-brand-red/30 to-brand-red/10 px-3.5 py-2.5 text-[13.5px] font-bold">
                  {p.badge}
                </p>
              ) : null}

              <Link
                href={`/enrol?package=${p.slug}`}
                className={`mt-auto rounded-full px-4 py-2.5 text-center text-[13.5px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none ${
                  p.featured
                    ? "bg-brand-red text-white hover:brightness-110"
                    : "border border-paper/15 text-paper hover:bg-paper/5"
                }`}
              >
                Choose this package
                <span className="sr-only"> — {p.name}</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- included */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2
          className={`font-display text-[32px] uppercase leading-none md:text-[52px] ${metallic}`}
        >
          What every package includes
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {INCLUDED.map((item) => (
            <div key={item.title} className="border-t-2 border-brand-red pt-4">
              <h3 className="text-[17px] font-bold text-white">{item.title}</h3>
              <p className="mt-2 max-w-[40ch] text-[15px] text-paper/55">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ curriculum */}
      <section id="curriculum" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2
          className={`font-display text-[32px] uppercase leading-none md:text-[52px] ${metallic}`}
        >
          The ten days
        </h2>
        <p className="mt-3 max-w-[52ch] text-paper/55">
          One lesson and one piece of practical work a day. Nothing is
          theoretical — you finish each day with something rendered.
        </p>

        <ol className="mt-10 border-t border-paper/10">
          {CURRICULUM.map((d) => (
            <li
              key={d.day}
              className="grid gap-1 border-b border-paper/10 py-5 sm:grid-cols-[6rem_1fr] sm:gap-6"
            >
              <span className="pt-0.5 font-display text-[15px] uppercase tracking-[0.06em] text-brand-red">
                {d.day}
              </span>
              <div>
                <h3 className="text-[17px] font-bold text-white">{d.title}</h3>
                <p className="mt-1 max-w-[62ch] text-[15px] text-paper/55">
                  {d.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[62ch] border-l-2 border-brand-red pl-4 text-[15px] text-paper/75">
          The advanced class picks up from here across five days: camera angles,
          AI agents, portfolio, client adverts, and turning the skill into
          income.
        </p>
      </section>

      {/* ------------------------------------------------------------- faq */}
      <section id="faq" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2
          className={`font-display text-[32px] uppercase leading-none md:text-[52px] ${metallic}`}
        >
          Questions
        </h2>

        <div className="mt-10 border-t border-paper/10">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-paper/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4.5 text-[17px] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  className="relative size-[18px] shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:bg-brand-red after:absolute after:inset-x-0 after:top-1/2 after:h-0.5 after:rotate-90 after:bg-brand-red after:transition-transform group-open:after:rotate-0 motion-reduce:after:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[68ch] pb-5 text-paper/55">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- final cta */}
      <section className="relative overflow-hidden border-t border-paper/10 px-6 py-16 text-center md:py-24">
        <div className="relative z-10">
          <h2 className="font-display text-[30px] uppercase leading-none text-white md:text-[52px]">
            {COHORT.label} starts {COHORT.displayDate}
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-paper/55">
            Pay once, keep the lessons, and get your work marked by someone who
            makes this for a living.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/enrol" className={ctaSolid}>
              Enrol now
            </Link>
            <a
              href={WHATSAPP_LINK}
              className={ctaGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to us first
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
