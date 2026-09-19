import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import MoviesGrid from "@/components/MoviesGrid";

import { SHOWCASE_CATEGORIES, SHOWCASE_VIDEOS } from "@/lib/movies";

/* Uses the site theme tokens: bg-ink, text-paper, text-brand-red, font-display. */

const metallic = "text-hi";
const h2 = `font-display text-[32px] uppercase leading-none md:text-[52px] ${metallic}`;
const ctaBase =
  "inline-flex items-center justify-center rounded-full px-7 py-[15px] font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none";
const ctaSolid = `${ctaBase} bg-brand-red text-white shadow-[0_10px_30px_-12px_rgba(225,27,34,0.9)] hover:brightness-110`;
const ctaGhost = `${ctaBase} border border-paper/15 text-paper hover:bg-paper/5`;

export const metadata: Metadata = {
  title: "Movies & Showcase — Ifeyinwa",
  description:
    "Product adverts, music videos, faceless-channel content and brand films made by Ifeyinwa's AI video creators — the proof behind the Academy and Agency.",
  openGraph: {
    title: "Movies & Showcase — Ifeyinwa",
    description:
      "The brand's video output, made entirely with AI by creators trained through the Ifeyinwa Academy.",
    url: "https://ifeyinwa.com/movies",
    siteName: "Ifeyinwa",
    images: [{ url: "/og/movies.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/movies" },
};

function showcaseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ifeyinwa Showcase",
    itemListElement: SHOWCASE_VIDEOS.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "VideoObject",
        name: v.title,
        thumbnailUrl: v.thumbnail,
        contentUrl: v.url,
        genre: v.category,
      },
    })),
  };
}

export default function MoviesPage() {
  const featured = SHOWCASE_VIDEOS.filter((v) => v.isFeatured);

  return (
    <main className="relative min-h-screen bg-ink text-paper">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseJsonLd()) }}
      />

      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-paper/10 px-6 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="text-xs tracking-[0.35em] text-paper/60">
            MOVIES & SHOWCASE
          </p>

          <h1
            className={`mt-5 font-display text-[44px] uppercase leading-[0.92] md:text-[82px] ${metallic}`}
          >
            Made with AI.
            <br />
            Made to look real.
          </h1>

          <p className="mt-6 max-w-[52ch] text-[17px] text-paper/70 md:text-[19px]">
            Every video here was produced by a creator trained inside the
            Ifeyinwa Academy — no camera crew, no studio rental. This is the
            proof, not a promise.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/agency" className={ctaSolid}>
              Hire a creator
            </Link>
            <Link href="/academy" className={ctaGhost}>
              Learn how it&apos;s made
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
          <h2 className={h2}>Featured this month</h2>
          <p className="mt-3 max-w-[52ch] text-paper/55">
            Picked by Ifeyinwa — the work that best shows what the Academy
            trains people to do.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((v) => (
              <div
                key={v.id}
                className="group relative aspect-video overflow-hidden rounded-xl border border-brand-red/30 bg-gradient-to-br from-[#2a161b] to-[#0d0809]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.thumbnail}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                />
                <div className="absolute inset-x-0 top-0 flex justify-between p-3">
                  <span className="rounded-full bg-brand-red px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Featured
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
                  <p className="text-[13px] font-medium text-paper/90">
                    {v.title}
                  </p>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-paper/50">
                    {v.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------- all work */}
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={h2}>Browse the showcase</h2>
          <Link
            href="/agency"
            className="text-[15px] text-paper/60 underline-offset-4 hover:text-paper hover:underline"
          >
            Commission something like this →
          </Link>
        </div>

        <div className="mt-10">
          <MoviesGrid videos={SHOWCASE_VIDEOS} categories={SHOWCASE_CATEGORIES} />
        </div>
      </section>

      {/* ------------------------------------------------------- final cta */}
      <section className="relative overflow-hidden border-t border-paper/10 px-6 py-16 text-center md:py-24">
        <div className="relative z-10">
          <h2 className="font-display text-[30px] uppercase leading-none text-white md:text-[52px]">
            Want to make something like this?
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-paper/55">
            Learn to make it yourself through the Academy, or commission a
            creator through the Agency.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/academy" className={ctaSolid}>
              Join the Academy
            </Link>
            <Link href="/agency" className={ctaGhost}>
              Browse creators
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}