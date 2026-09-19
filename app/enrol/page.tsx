import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm";
import { COHORT, PACKAGES } from "@/lib/academy";

export const metadata: Metadata = {
  title: "Enrol — Ifeyinwa Academy",
  description:
    "Create your account to join the next Ifeyinwa Academy bootcamp. Takes a minute; payment comes after.",
  // A checkout step shouldn't be indexed or shared.
  robots: { index: false, follow: false },
};

const metallic = "text-hi";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const STEPS = ["Account", "Your details", "Payment"];

export default async function EnrolPage({ searchParams }: Props) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.package) ? sp.package[0] : sp.package;
  const chosen =
    PACKAGES.find((p) => p.slug === raw) ??
    PACKAGES.find((p) => p.slug === "group-bootcamp")!;

  return (
    <main className="relative min-h-screen overflow-x-clip bg-ink text-paper">
      <div
        className="pointer-events-none absolute -top-40 right-[-8%] h-[520px] w-[420px] rounded-full opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(225,27,34,0.3), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* logo, theme toggle and menu button only */}
      <Navbar minimal />

      <div className="relative z-10 mx-auto max-w-lg px-5 pb-14 pt-8 sm:px-6 md:pb-20 md:pt-12">
        {/* everything lives in one box */}
        <div className="rounded-2xl border border-paper/10 bg-gradient-to-b from-surface to-surface-2 p-5 sm:p-7">
          <h1
            className={`font-display text-[clamp(1.5rem,6vw,2rem)] uppercase leading-none ${metallic}`}
          >
            Join the Academy
          </h1>
          <p className="mt-2 text-[15px] font-bold text-paper/80">
            Create your account
          </p>
          <p className="mt-1 text-[13.5px] text-paper/55">
            One minute now, then your details and payment. Nothing is charged
            until the last step.
          </p>

          {/* step indicator */}
          <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px]">
            {STEPS.map((label, i) => {
              const current = i === 0;
              return (
                <li key={label} className="flex items-center gap-2">
                  <span
                    aria-current={current ? "step" : undefined}
                    className={`flex items-center gap-1.5 ${
                      current ? "text-paper" : "text-paper/50"
                    }`}
                  >
                    <span
                      className={`grid size-5 place-items-center rounded-full text-[11px] font-bold ${
                        current
                          ? "bg-brand-red text-white"
                          : "border border-paper/20 text-paper/50"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <span className="h-px w-4 bg-paper/15" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>

          {/* selected package, compact */}
          <div className="mt-5 rounded-xl border border-brand-red/40 bg-brand-red/5 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-paper/60">
                  You&apos;re joining
                </p>
                <p className="mt-1 font-display text-[17px] uppercase leading-tight text-hi">
                  {chosen.name}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-display text-[20px] leading-tight text-hi">
                  {chosen.price}
                </p>
                {chosen.priceNote && (
                  <p className="text-[11.5px] text-paper/60">
                    {chosen.priceNote}
                  </p>
                )}
              </div>
            </div>

            <p className="mt-2 text-[13px] text-paper/65">{chosen.summary}</p>

            {chosen.badge && (
              <p className="mt-3 rounded-lg border border-brand-red/40 bg-brand-red/10 px-3 py-2 text-[12.5px] font-semibold">
                {chosen.badge}
              </p>
            )}

            <Link
              href="/academy#packages"
              className="mt-3 inline-block text-[12.5px] text-paper/65 underline-offset-4 hover:text-paper hover:underline"
            >
              Change package
            </Link>
          </div>

          {/* form */}
          <div className="mt-6 border-t border-paper/10 pt-6">
            <SignupForm packageSlug={chosen.slug} />
          </div>

          <p className="mt-5 text-[12.5px] text-paper/55">
            Paying by bank transfer instead? Choose that option at the payment
            step and upload your proof — {COHORT.label} enrolment is confirmed
            once it&apos;s approved.
          </p>
        </div>
      </div>
    </main>
  );
}