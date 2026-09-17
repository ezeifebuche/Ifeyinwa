"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/academy", label: "Academy" },
  { href: "/agency", label: "Agency" },
  { href: "/movies", label: "Movies" },
];

export default function Navbar2() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-paper/10 px-6 py-5 backdrop-blur-md md:px-16"
      style={{ backgroundColor: "rgba(15, 11, 10, 0.85)" }}
    >
      <div>
        <div className="text-2xl font-bold tracking-wide">
          IFEYINW<span className="text-brand-red">A</span>
        </div>
        <div className="mt-1 text-[5px] tracking-[0.28em] text-paper/60">
          CREATE · EMPOWER · INSPIRE
        </div>
      </div>

      <div className="hidden gap-11 text-[15px] md:flex">
        {NAV_LINKS.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative pb-1.5 ${
                isActive ? "text-paper" : "text-paper/60 hover:text-paper"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brand-red" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-6">
        <button
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60"
        >
          ⌕
        </button>

        <Link
          href="/enrol"
          className="flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.97]"
        >
          Enrol now <span>→</span>
        </Link>
      </div>
    </nav>
  );
}
