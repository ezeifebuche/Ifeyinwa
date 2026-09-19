import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import SignInForm from "@/components/auth/SingInForm";

export const metadata: Metadata = {
  title: "Sign in — Ifeyinwa Academy",
  description: "Sign in to reach your cohort dashboard, lessons and assignments.",
  robots: { index: false, follow: false },
};

const metallic = "text-hi";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Only same-site paths are allowed through, otherwise ?next=https://evil.com
 * turns the sign-in page into an open redirect. Browsers treat "/\" like "//",
 * so backslashes are rejected too.
 */
function safeNext(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return "/dashboard";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) {
    return "/dashboard";
  }
  return raw;
}

export default async function SignInPage({ searchParams }: Props) {
  const sp = await searchParams;
  const next = safeNext(sp.next);

  return (
    <div className="flex min-h-dvh flex-col bg-ink text-paper">
      {/* logo, theme toggle and menu button only */}
      <Navbar minimal />

      {/* flex-1 fills whatever the navbar leaves, so no hardcoded height */}
      <main className="relative grid flex-1 place-items-center overflow-hidden px-5 py-10 sm:px-6 md:py-12">
        <div
        />

        <div className="relative z-10 w-full max-w-md">
          <div className="theme-card rounded-2xl border border-paper/10 p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] sm:p-7">
            <div className="text-center">
              <h1
                className={`font-display text-[clamp(1.75rem,7vw,2.5rem)] uppercase leading-[0.95] ${metallic}`}
              >
                Welcome back
              </h1>
              <p className="mx-auto mt-3 max-w-[34ch] text-[14.5px] text-paper/60 sm:text-[15px]">
                Sign in to reach your lessons, assignments and house standing.
              </p>
            </div>

            <div className="mt-7">
              <SignInForm next={next} />
            </div>
          </div>

          <p className="mt-6 text-center text-[13px] text-paper/60">
            Having trouble?{" "}
            <Link
              href="/contact"
              className="underline underline-offset-4 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Get in touch
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}