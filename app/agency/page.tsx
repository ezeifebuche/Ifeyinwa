import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";

import {
  AGENCY_FAQS,
  AGENCY_WHATSAPP,
  FEATURED_CREATORS,
  HOW_IT_WORKS,
  SERVICES,
} from "@/lib/agency";
import Footer from "@/components/Footer";

/* Uses the site theme tokens: bg-ink, text-paper, text-hi, text-brand-red,
   surface / surface-2, --card-title, --ok, font-display. */

const metallic = "text-hi";

/* Headings scale continuously rather than jumping at md. */
const h1Size = "text-[clamp(2.3rem,8.5vw,5.1rem)]";
const h2Size = "text-[clamp(1.75rem,5.5vw,3.25rem)]";
const h2 = `font-display ${h2Size} uppercase leading-none ${metallic}`;

const section = "mx-auto max-w-5xl px-5 py-14 sm:px-6 md:py-24";
const eyebrow =
  "text-[11px] tracking-[0.3em] text-paper/60 sm:text-xs sm:tracking-[0.35em]";

/* White at night, brand red in daylight. */
const cardTitle =
  "font-display uppercase leading-tight text-[var(--card-title)]";

const ctaBase =
  "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-center font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:px-7 sm:py-[15px]";
const ctaSolid = `${ctaBase} bg-brand-red text-white shadow-[0_10px_30px_-12px_rgba(225,27,34,0.9)] hover:brightness-110`;
const ctaGhost = `${ctaBase} border border-paper/15 text-paper hover:bg-paper/5`;

export const metadata: Metadata = {
  title: "Ifeyinwa Agency — hire AI video creators",
  description:
    "Commission product adverts, music videos, faceless-channel content and brand films from AI video creators trained and vetted by Ifeyinwa. No shoot, no crew, no location fee.",
  openGraph: {
    title: "Ifeyinwa Agency — hire AI video creators",
    description:
      "Product ads, music videos, faceless channels and brand films, made by creators trained and vetted by Ifeyinwa.",
    url: "https://ifeyinwa.com/agency",
    siteName: "Ifeyinwa",
    images: [{ url: "/og/agency.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/agency" },
};

function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Ifeyinwa Agency",
    description:
      "AI video production — product adverts, music videos, faceless channel content, kids content and brand films.",
    areaServed: "Worldwide",
    address: { "@type": "PostalAddress", addressCountry: "NG" },
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.title, description: s.body },
    })),
  };
}

export default function AgencyPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-paper">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-paper/10 px-5 pb-12 pt-12 sm:px-6 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className={eyebrow}>FOR BRANDS AND BUSINESSES</p>

          <h1
            className={`mt-4 font-display ${h1Size} uppercase leading-[0.92] sm:mt-5 ${metallic}`}
          >
            Video without
            <br className="hidden sm:inline" /> the film crew
          </h1>

          <p className="mt-5 max-w-[50ch] text-[16px] text-paper/70 sm:text-[17px] md:text-[19px]">
            Adverts, music videos and brand films made with AI by creators we
            trained ourselves. No location fee, no shoot day, no waiting on a
            production calendar — and work that looks like it cost far more than
            it did.
          </p>

          <div className="mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center md:mt-9">
            <Link href="/agency/creators" className={ctaSolid}>
              Find a creator
            </Link>
            <Link href="/agency/brief" className={ctaGhost}>
              Post a brief instead
            </Link>
          </div>

          <p className="mt-4 text-[13.5px] text-paper/50 sm:text-sm">
            Every creator here is an Academy graduate, picked by Ifeyinwa.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- services */}
      <section id="services" className={section}>
        <h2 className={h2}>What you can commission</h2>
        <p className="mt-3 max-w-[52ch] text-[15px] text-paper/55 sm:text-base">
          If it can be storyboarded, it can be made. These are the briefs that
          come up most.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col rounded-2xl border border-paper/10 bg-gradient-to-b from-surface to-surface-2 p-5 transition hover:border-brand-red/40 motion-reduce:transition-none sm:p-6"
            >
              <h3 className={`${cardTitle} text-[18px] sm:text-[20px]`}>
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[14.5px] text-paper/70 sm:text-[15px]">
                {s.body}
              </p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-brand-red">
                {s.deliverable}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ sample work */}
      <section id="work" className={section}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className={h2}>Sample work</h2>
          <Link
            href="/movies"
            className="text-[14px] text-paper/60 underline-offset-4 hover:text-paper hover:underline sm:text-[15px]"
          >
            See the full showcase →
          </Link>
        </div>

        {/* TODO: swap for ShowcaseVideo records (§5.10) — is_featured, limit 6. */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-video overflow-hidden rounded-xl border border-paper/10 bg-gradient-to-br from-surface to-surface-2"
            >
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-11 place-items-center rounded-full border border-paper/30 text-paper/70 transition group-hover:border-brand-red group-hover:text-brand-red motion-reduce:transition-none sm:size-12">
                  ▶
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3">
                <p className="text-[13px] text-paper/80">Project title</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- how it works */}
      <section className={section}>
        <h2 className={h2}>How it works</h2>

        <ol className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8 md:mt-10">
          {HOW_IT_WORKS.map((s) => (
            <li key={s.step} className="border-t-2 border-brand-red pt-4">
              <span className="font-display text-[13px] tracking-[0.18em] text-brand-red">
                {s.step}
              </span>
              <h3 className="mt-1 text-[16px] font-bold text-hi sm:text-[17px]">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-[14.5px] text-paper/55 sm:text-[15px]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* --------------------------------------------------------- creators */}
      <section className={section}>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className={h2}>Featured creators</h2>
          <Link
            href="/agency/creators"
            className="text-[14px] text-paper/60 underline-offset-4 hover:text-paper hover:underline sm:text-[15px]"
          >
            Browse the directory →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-10 lg:grid-cols-3">
          {FEATURED_CREATORS.map((c) => (
            <Link
              key={c.slug}
              href={`/agency/creators/${c.slug}`}
              className="rounded-2xl border border-paper/10 bg-gradient-to-b from-surface to-surface-2 p-4 transition hover:border-brand-red/40 motion-reduce:transition-none sm:p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="size-11 shrink-0 rounded-full bg-paper/10 sm:size-12"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate font-bold text-hi">{c.name}</p>
                  <p className="truncate text-[13px] text-paper/55">
                    {c.batch} graduate
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[14.5px] text-paper/70 sm:text-[15px]">
                {c.headline}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {c.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-paper/15 px-2.5 py-1 text-[11px] text-paper/60"
                  >
                    {s}
                  </span>
                ))}
                <span
                  className={`ml-auto flex items-center gap-1.5 text-[11px] ${
                    c.availability === "available"
                      ? "text-[var(--ok)]"
                      : "text-paper/40"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      c.availability === "available"
                        ? "bg-[var(--ok)]"
                        : "bg-paper/40"
                    }`}
                    aria-hidden="true"
                  />
                  {c.availability === "available" ? "Available" : "Booked"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- faq */}
      <section className={section}>
        <h2 className={h2}>Questions</h2>

        <div className="mt-8 border-t border-paper/10 md:mt-10">
          {AGENCY_FAQS.map((f) => (
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

      {/* -------------------------------------------------------- final cta */}
      <section className="relative overflow-hidden border-t border-paper/10 px-5 py-14 text-center sm:px-6 md:py-24">
        <div className="relative z-10">
          <h2 className={`font-display ${h2Size} uppercase leading-none text-hi`}>
            Tell us what you&apos;re making
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-paper/55 sm:text-base">
            Send the brief with a deadline and a budget range. You&apos;ll get a
            straight answer on whether it can be done, and who should do it.
          </p>
          <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-8">
            <Link href="/agency/brief" className={ctaSolid}>
              Post a brief
            </Link>
            <a
              href={AGENCY_WHATSAPP}
              className={ctaGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}