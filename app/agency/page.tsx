import type { Metadata } from "next";
import Link from "next/link";

import Navbar2 from "@/components/Academy/Navbar2";

import {
  AGENCY_FAQS,
  AGENCY_WHATSAPP,
  FEATURED_CREATORS,
  HOW_IT_WORKS,
  SERVICES,
} from "@/lib/agency";

/* Uses the site theme tokens: bg-ink, text-paper, text-brand-red, font-display. */

const metallic =
  "bg-gradient-to-b from-white via-[#c6c9ce] to-[#7c8087] bg-clip-text text-transparent";
const h2 = `font-display text-[32px] uppercase leading-none md:text-[52px] ${metallic}`;
const ctaBase =
  "inline-flex items-center justify-center rounded-full px-7 py-[15px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none";
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
    <main className="relative min-h-screen bg-ink text-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd()) }}
      />

      <Navbar2 />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-paper/10 px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.35em] text-paper/60">
            FOR BRANDS AND BUSINESSES
          </p>

          <h1
            className={`mt-5 font-display text-[44px] uppercase leading-[0.92] md:text-[82px] ${metallic}`}
          >
            Video without
            <br />
            the film crew
          </h1>

          <p className="mt-6 max-w-[50ch] text-[17px] text-paper/70 md:text-[19px]">
            Adverts, music videos and brand films made with AI by creators we
            trained ourselves. No location fee, no shoot day, no waiting on a
            production calendar — and work that looks like it cost far more than
            it did.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/agency/creators" className={ctaSolid}>
              Find a creator
            </Link>
            <Link href="/agency/brief" className={ctaGhost}>
              Post a brief instead
            </Link>
          </div>

          <p className="mt-4 text-sm text-paper/50">
            Every creator here is an Academy graduate, picked by Ifeyinwa.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- services */}
      <section id="services" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2 className={h2}>What you can commission</h2>
        <p className="mt-3 max-w-[52ch] text-paper/55">
          If it can be storyboarded, it can be made. These are the briefs that
          come up most.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col rounded-2xl border border-paper/10 bg-gradient-to-b from-[#1a1216] to-[#120c0e] p-6 transition hover:border-brand-red/40 motion-reduce:transition-none"
            >
              <h3 className="font-display text-[20px] uppercase leading-tight text-white">
                {s.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] text-paper/70">{s.body}</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-brand-red">
                {s.deliverable}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------- sample work */}
      <section id="work" className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={h2}>Sample work</h2>
          <Link
            href="/movies"
            className="text-[15px] text-paper/60 underline-offset-4 hover:text-paper hover:underline"
          >
            See the full showcase →
          </Link>
        </div>

        {/* TODO: swap for ShowcaseVideo records (§5.10) — is_featured, limit 6. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="group relative aspect-video overflow-hidden rounded-xl border border-paper/10 bg-gradient-to-br from-[#231519] to-[#0d0809]"
            >
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid size-12 place-items-center rounded-full border border-paper/30 text-paper/70 transition group-hover:border-brand-red group-hover:text-brand-red motion-reduce:transition-none">
                  ▶
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-[13px] text-paper/80">Project title</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- how it works */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2 className={h2}>How it works</h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2">
          {HOW_IT_WORKS.map((s) => (
            <li key={s.step} className="border-t-2 border-brand-red pt-4">
              <span className="font-display text-[13px] tracking-[0.18em] text-brand-red">
                {s.step}
              </span>
              <h3 className="mt-1 text-[17px] font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-2 max-w-[46ch] text-[15px] text-paper/55">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* -------------------------------------------------------- creators */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={h2}>Featured creators</h2>
          <Link
            href="/agency/creators"
            className="text-[15px] text-paper/60 underline-offset-4 hover:text-paper hover:underline"
          >
            Browse the directory →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_CREATORS.map((c) => (
            <Link
              key={c.slug}
              href={`/agency/creators/${c.slug}`}
              className="rounded-2xl border border-paper/10 bg-gradient-to-b from-[#1a1216] to-[#120c0e] p-5 transition hover:border-brand-red/40 motion-reduce:transition-none"
            >
              <div className="flex items-center gap-3">
                <span
                  className="size-12 shrink-0 rounded-full bg-paper/10"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate font-bold text-white">{c.name}</p>
                  <p className="truncate text-[13px] text-paper/55">
                    {c.batch} graduate
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[15px] text-paper/70">{c.headline}</p>

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
                      ? "text-emerald-400"
                      : "text-paper/40"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      c.availability === "available"
                        ? "bg-emerald-400"
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

      {/* ------------------------------------------------------------- faq */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <h2 className={h2}>Questions</h2>

        <div className="mt-10 border-t border-paper/10">
          {AGENCY_FAQS.map((f) => (
            <details key={f.q} className="group border-b border-paper/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[17px] font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red [&::-webkit-details-marker]:hidden">
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
            Tell us what you&apos;re making
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-paper/55">
            Send the brief with a deadline and a budget range. You&apos;ll get a
            straight answer on whether it can be done, and who should do it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
    </main>
  );
}
