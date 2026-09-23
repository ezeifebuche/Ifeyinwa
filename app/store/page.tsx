  import type { Metadata } from "next";
  import Link from "next/link";

  import Navbar from "@/components/Navbar";
  import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

  /* Uses the site theme tokens: bg-ink, text-paper, text-highlight,
    text-brand-red, surface / surface-2, font-display. */

  const metallic = "text-highlight";

  /* Headings scale continuously rather than jumping at md. */
  const h1Size = "text-[clamp(2.2rem,8vw,4.25rem)]";
  const h2Size = "text-[clamp(1.75rem,5.5vw,3.25rem)]";
  const h2 = `font-display ${h2Size} uppercase leading-none ${metallic}`;

  const section = "mx-auto max-w-5xl px-5 py-14 sm:px-6 md:py-24";
  const ctaGhost =
    "inline-flex items-center justify-center rounded-full border border-paper/15 px-6 py-3.5 text-center font-bold text-paper transition hover:bg-paper/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:px-7 sm:py-[15px]";

  export const metadata: Metadata = {
    title: "Store — Ifeyinwa",
    description:
      "Ifeyinwa Store is coming soon — merchandise and creator drops for the community. Join the waiting list.",
    alternates: { canonical: "/store" },
  };

  const WHAT_TO_EXPECT = [
    {
      title: "Merch that means something",
      body: "Pieces tied to the brand and to cohorts — not generic logo wear.",
    },
    {
      title: "Creator drops",
      body: "Limited items designed with featured creators, not just sold by us.",
    },
    {
      title: "Early access for graduates",
      body: "Academy alumni get first pick before anything goes public.",
    },
  ];

  export default function StorePage() {
    return (
      <main className="relative min-h-screen overflow-x-clip bg-ink text-paper">
        <Navbar />

        {/* ------------------------------------------------------------ hero */}
        <section className="relative overflow-hidden border-b border-paper/10 px-5 pb-12 pt-12 sm:px-6 md:pb-20 md:pt-24">
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="text-[11px] tracking-[0.3em] text-paper/60 sm:text-xs sm:tracking-[0.35em]">
              STORE
            </p>

            <h1
              className={`mt-4 font-display ${h1Size} uppercase leading-[0.95] sm:mt-5 ${metallic}`}
            >
              Coming soon
            </h1>

            <p className="mx-auto mt-5 max-w-[46ch] text-[16px] text-paper/70 sm:text-[17px] md:text-[19px]">
              Merchandise and creator drops for the Ifeyinwa community. Join the
              waiting list and we&apos;ll email you the moment it opens.
            </p>

            <div className="mt-6 flex justify-center">
              <WaitlistForm />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------- what's coming */}
        <section className={section}>
          <h2 className={`text-center ${h2}`}>What to expect</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 md:mt-10">
            {WHAT_TO_EXPECT.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-paper/10 bg-gradient-to-b from-surface to-surface-2 p-5 sm:p-6"
              >
                <h3 className="font-display text-[17px] uppercase leading-tight text-highlight sm:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14.5px] text-paper/70 sm:text-[15px]">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- meanwhile */}
        <section className="relative overflow-hidden border-t border-paper/10 px-5 py-14 text-center sm:px-6 md:py-24">
          <div className="relative z-10">
            <h2
              className={`font-display ${h2Size} uppercase leading-none text-highlight`}
            >
              While you wait
            </h2>
            <p className="mx-auto mt-3 max-w-[48ch] text-[15px] text-paper/55 sm:text-base">
              See what graduates are already making in the Showcase, or start
              learning through the Academy.
            </p>
            <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center md:mt-8">
              <Link href="/movies" className={ctaGhost}>
                See the Showcase
              </Link>
              <Link href="/academy" className={ctaGhost}>
                Explore the Academy
              </Link>
            </div>
          </div>
        </section>
        <Footer/>
      </main>
    );
  }