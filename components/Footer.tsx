import Link from "next/link";

const EXPLORE = [
  { href: "/movies", label: "Movies & Showcase" },
  { href: "/academy", label: "Academy" },
  { href: "/agency", label: "Agency" },
  { href: "/about", label: "About" },
];

const COMMUNITY = [
  { href: "/community", label: "Community" },
  { href: "/store", label: "Store" },
  { href: "/impact", label: "Donations / Impact" },
  { href: "/contact", label: "Contact" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red";
const linkClass = `text-[14.5px] text-paper/70 transition-colors hover:text-paper motion-reduce:transition-none ${focusRing}`;
const colHeading = "text-[15px] font-bold text-hi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          {/* brand */}
          <div>
            <Link
              href="/"
              aria-label="Ifeyinwa home"
              className={`inline-flex items-center gap-3 ${focusRing}`}
            >
              <span
                aria-hidden="true"
                className="grid size-10 place-items-center rounded-xl bg-brand-red text-[13px] font-bold text-white shadow-[0_8px_20px_-8px_rgba(225,27,34,0.8)]"
              >
                IF
              </span>
              <span className="text-lg font-bold tracking-[0.14em] text-hi">
                IFEYINWA
              </span>
            </Link>

            <p className="mt-4 text-[11px] font-bold tracking-[0.28em] text-brand-red sm:text-xs">
              CREATE · EMPOWER · INSPIRE
            </p>

            <p className="mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-paper/70">
              Ifeyinwa is the online home of an AI video academy, creator agency
              and film showcase. Learn AI video creation in a guided cohort, get
              promoted into the agency and put your work in front of the world.
            </p>
          </div>

          {/* explore */}
          <nav aria-label="Footer: explore">
            <h2 className={colHeading}>Explore</h2>
            <ul className="mt-4 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* community */}
          <nav aria-label="Footer: community">
            <h2 className={colHeading}>Community</h2>
            <ul className="mt-4 space-y-3">
              {COMMUNITY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-paper/10 pt-6 text-[13px] text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ifeyinwa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className={`hover:text-paper ${focusRing}`}
            >
              Privacy
            </Link>
            <Link href="/terms" className={`hover:text-paper ${focusRing}`}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}