import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import CreatorCard from "@/components/Agency/CreatorCard";
import CreatorFilters from "@/components/Agency/CreatorFilters";
import { CREATORS, filterCreators } from "@/lib/creators";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const metallic = "text-highlight";
export const metadata: Metadata = {
  title: "Find an AI video creator — Ifeyinwa Agency",
  description:
    "Browse AI video creators trained and vetted by Ifeyinwa. Filter by skill, budget and availability, then contact a creator directly or post a brief.",
  openGraph: {
    title: "Find an AI video creator — Ifeyinwa Agency",
    description:
      "Browse creators by skill, budget and availability. Every one is an Academy graduate picked by Ifeyinwa.",
    url: "https://ifeyinwa.com/agency/creators",
    siteName: "Ifeyinwa",
    images: [{ url: "/og/agency.jpg", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  alternates: { canonical: "/agency/creators" },
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const one = (v: string | string[] | undefined) =>
  Array.isArray(v) ? v[0] : v;

export default async function CreatorsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const filters = {
    q: one(sp.q),
    skill: one(sp.skill),
    band: one(sp.band),
    availability: one(sp.availability),
  };

  const results = filterCreators(CREATORS, filters);

  return (
    <main className="relative min-h-screen bg-ink text-paper">
      <Navbar />
      <section className="relative overflow-hidden border-b border-paper/10 px-6 pb-10 pt-14 md:pt-20">
        <div
          className="pointer-events-none absolute -top-[20%] right-[-6%] h-[520px] w-[420px] rounded-full opacity-50 blur-2xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(225,27,34,0.3), transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="text-[13px] text-paper/50">
            <Link href="/agency" className="hover:text-paper">
              Agency
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-paper/80">Creators</span>
          </nav>

          <h1
            className={`mt-4 font-display text-[38px] uppercase leading-[0.95] md:text-[64px] ${metallic}`}
          >
            Find a creator
          </h1>
          <p className="mt-4 max-w-[52ch] text-paper/70">
            Everyone here came through the Academy and was picked by Ifeyinwa on
            the strength of their work. Contact one directly, or post a brief
            and we&apos;ll match you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <Suspense
          fallback={<div className="h-32" aria-hidden="true" />}
        >
          <CreatorFilters total={results.length} />
        </Suspense>

        {results.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((c) => (
              <CreatorCard key={c.slug} creator={c} />
            ))}
          </div>
        ) : (
          <div className="mt-16 rounded-2xl border border-paper/10 px-6 py-16 text-center">
            <p className="font-display text-[22px] uppercase text-white">
              Nobody matches that yet
            </p>
            <p className="mx-auto mt-3 max-w-[44ch] text-paper/55">
              The directory is still small and grows with every batch. Post your
              brief and Ifeyinwa will find someone for it.
            </p>
            <Link
              href="/agency/brief"
              className="mt-6 inline-flex rounded-full bg-brand-red px-7 py-3.5 font-bold text-white transition hover:brightness-110 motion-reduce:transition-none"
            >
              Post a brief
            </Link>
          </div>
        )}
      </section>

      <section className="border-t border-paper/10 px-6 py-14 text-center">
        <p className="mx-auto max-w-[46ch] text-paper/55">
          Not sure who you need? Describe the project and we&apos;ll route it to
          the right creator.
        </p>
        <Link
          href="/agency/brief"
          className="mt-6 inline-flex rounded-full border border-paper/15 px-7 py-3.5 font-bold text-paper hover:bg-paper/5"
        >
          Post a brief
        </Link>
      </section>
      <Footer />
    </main>
  );
}
