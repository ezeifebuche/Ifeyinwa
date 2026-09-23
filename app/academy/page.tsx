import type { Metadata } from "next";
import Link from "next/link";

import Countdown from "@/components/Academy/Countdown";
import Navbar from "@/components/Navbar";

import {
  COHORT,
  CURRICULUM,
  FAQS,
  INCLUDED,
  PACKAGES,
  WHATSAPP_LINK,
} from "@/lib/academy";
import Footer from "@/components/Footer";

/* Uses the site's existing theme tokens: bg-ink, text-paper, text-brand-red,
   font-display. Fonts come from layout.tsx — nothing is imported here. */

const metallic = "text-hi";

/* Headings scale continuously instead of jumping at md, so 320px phones and
   1440px laptops both get a size that fits. */
const h1Size = "text-[clamp(2.3rem,8.5vw,5.4rem)]";
const h2Size = "text-[clamp(1.75rem,5.5vw,3.25rem)]";

/* Section rhythm — tighter gutters and vertical space on small screens. */
const section = "mx-auto max-w-5xl px-5 py-14 sm:px-6 md:py-24";

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
  "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-center font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:px-7 sm:py-[15px]";
const ctaSolid = `${ctaBase} bg-brand-red text-white shadow-[0_10px_30px_-12px_rgba(225,27,34,0.9)] hover:brightness-110`;
const ctaGhost = `${ctaBase} border border-paper/15 text-paper hover:bg-paper/5`;

export default function AcademyPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-paper">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative border-b border-paper/10 px-5 pb-12 pt-12 sm:px-6 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <h1
            className={`font-display ${h1Size} uppercase leading-[0.92] [text-wrap:balance] ${metallic}`}
          >
            Ten days to your
            <br className="hidden sm:inline" /> first AI film
          </h1>

          <p className="mt-5 max-w-[46ch] text-[16px] text-paper/70 sm:text-[17px] md:text-[19px]">
            You get the lessons, the assignments, and a House Captain who marks
            your work and stays on it with you until it&apos;s right. By day ten
            you have a finished film, not a folder of clips.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-6 sm:items-start md:mt-10">
            <Countdown target={COHORT.startsAt} label={COHORT.label} />

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
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
      <section id="packages" className={section}>
        <h2 className={`font-display ${h2Size} uppercase leading-none ${metallic}`}>
          Our packages
        </h2>
        <p className="mt-3 max-w-[52ch] text-[15px] text-paper/55 sm:text-base">
          Same curriculum in all four. What changes is how much of it you do
          alone, and how fast you go.
        </p>

        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <article
              key={p.slug}
              className={`flex flex-col gap-3 rounded-2xl border p-4 sm:p-5 ${
                p.featured
                  ? "border-brand-red/55 bg-gradient-to-b from-surface to-surface-2"
                  : "border-paper/10 bg-gradient-to-b from-surface to-surface-2"
              }`}
            >
              {/* price drops below the title on the narrowest screens */}
              <header className="flex flex-wrap items-start gap-2.5 xs:flex-nowrap">
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-red font-display text-base leading-none text-white"
                  aria-hidden="true"
                >
                  {p.index}
                </span>
                <h3 className="min-w-0 flex-1 self-center font-display text-[17px] uppercase leading-tight tracking-[0.02em] text-hi sm:text-[18px]">
                  {p.name}
                </h3>
                <p className="flex items-baseline gap-1.5 whitespace-nowrap rounded-lg bg-brand-red px-2.5 py-1.5 font-display text-[16px] leading-none text-white sm:px-3 sm:text-[18px]">
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
                <div className="rounded-lg border border-paper/10 bg-paper/[0.03] px-3 py-3 sm:px-3.5">
                  <p className="mb-2.5 flex gap-2 text-[13.5px] text-paper/80">
                    <Check />
                    You&apos;ll be assigned to a house
                  </p>
                  <ul>
                    {p.houses.map((h, i) => (
                      <li
                        key={h.name}
                        className={`flex items-center gap-2 py-1 text-[13px] font-semibold sm:text-[13.5px] ${
                          i < p.houses!.length - 1
                            ? "border-b border-paper/10"
                            : ""
                        }`}
                      >
                        <span
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ background: h.dot }}
                          aria-hidden="true"
                        />
                        <span className="truncate" style={{ color: h.dot }}>
                          {h.name}
                        </span>
                        <span className="ml-auto shrink-0 font-normal text-paper/50">
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
                className={`mt-auto rounded-full px-4 py-3 text-center text-[13.5px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none ${
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
      <section className={section}>
        <h2 className={`font-display ${h2Size} uppercase leading-none ${metallic}`}>
          What every package includes
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8 md:mt-10">
          {INCLUDED.map((item) => (
            <div key={item.title} className="border-t-2 border-brand-red pt-4">
              <h3 className="text-[16px] font-bold text-hi sm:text-[17px]">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[40ch] text-[14.5px] text-paper/55 sm:text-[15px]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ curriculum */}
      <section id="curriculum" className={section}>
        <h2 className={`font-display ${h2Size} uppercase leading-none ${metallic}`}>
          The ten days
        </h2>
        <p className="mt-3 max-w-[52ch] text-[15px] text-paper/55 sm:text-base">
          One lesson and one piece of practical work a day. Nothing is
          theoretical — you finish each day with something rendered.
        </p>

        <ol className="mt-8 border-t border-paper/10 md:mt-10">
          {CURRICULUM.map((d) => (
            <li
              key={d.day}
              className="grid gap-1 border-b border-paper/10 py-4 sm:grid-cols-[5.5rem_1fr] sm:gap-6 sm:py-5"
            >
              <span className="font-display text-[13px] uppercase tracking-[0.06em] text-brand-red sm:pt-0.5 sm:text-[15px]">
                {d.day}
              </span>
              <div>
                <h3 className="text-[16px] font-bold text-hi sm:text-[17px]">
                  {d.title}
                </h3>
                <p className="mt-1 max-w-[62ch] text-[14.5px] text-paper/55 sm:text-[15px]">
                  {d.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[62ch] border-l-2 border-brand-red pl-4 text-[14.5px] text-paper/75 sm:text-[15px]">
          The advanced class picks up from here across five days: camera angles,
          AI agents, portfolio, client adverts, and turning the skill into
          income.
        </p>
      </section>

      {/* ------------------------------------------------------------- faq */}
      <section id="faq" className={section}>
        <h2 className={`font-display ${h2Size} uppercase leading-none ${metallic}`}>
          Questions
        </h2>

        <div className="mt-8 border-t border-paper/10 md:mt-10">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-paper/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15.5px] font-bold text-hi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red [&::-webkit-details-marker]:hidden sm:gap-6 sm:text-[17px]">
                <span className="min-w-0">{f.q}</span>
                <span
                  className="relative size-[18px] shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:bg-brand-red after:absolute after:inset-x-0 after:top-1/2 after:h-0.5 after:rotate-90 after:bg-brand-red after:transition-transform group-open:after:rotate-0 motion-reduce:after:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[68ch] pb-5 text-[14.5px] text-paper/55 sm:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- final cta */}
      <section className="relative overflow-hidden border-t border-paper/10 px-5 py-14 text-center sm:px-6 md:py-24">
        <div className="relative z-10">
          <h2
            className={`font-display ${h2Size} uppercase leading-none text-hi`}
          >
            {COHORT.label} starts {COHORT.displayDate}
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-[15px] text-paper/55 sm:text-base">
            Pay once, keep the lessons, and get your work marked by someone who
            makes this for a living.
          </p>
          <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-8">
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
      <Footer/>
    </main>
  );
}