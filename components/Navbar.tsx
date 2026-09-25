"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { href: "/movies", label: "Movies & Showcase" },
  { href: "/academy", label: "Academy" },
  { href: "/agency", label: "Agency" },
  { href: "/community", label: "Community" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
];

/* Kills the grey/black flash Android Chrome paints on tapped controls. */
const noTapFlash = "[-webkit-tap-highlight-color:transparent] touch-manipulation";
const iconBtnBase = `size-9 shrink-0 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition hover:border-paper/35 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none ${noTapFlash}`;
const iconBtn = `flex ${iconBtnBase}`;

type Props = {
  /* Logo + theme toggle + menu button only (checkout-style pages). */
  minimal?: boolean;
};

export default function Navbar({ minimal = false }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sign in is always reachable from the mobile menu — the top-bar icon
  // is desktop-only now (see below), since there isn't room for it next
  // to the logo and hamburger on narrow screens.
  const menuLinks = [...NAV_LINKS, { href: "/sign-in", label: "Sign in" }];

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    // Lock scroll while the menu is open, so the page behind it doesn't
    // move. (No scrollbar-gap padding here — the header is `sticky`, an
    // in-flow child of body, so adding padding to body was shrinking the
    // header's own width and shifting the logo/icons every time the menu
    // opened. That was the actual bug, not the icon toggle itself.)
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-ink/85 backdrop-blur-md">
      {/* no flex-wrap: one row at every width, or the bar grows to two lines */}
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-6 md:gap-4 md:px-16 md:py-5"
      >
        <Link href="/" className={`min-w-0 shrink ${noTapFlash}`}>
          <div className="truncate text-xl font-bold tracking-wide sm:text-2xl">
            IFEYINW<span className="text-brand-red">A</span>
          </div>
        </Link>

        {!minimal && (
          <div className="hidden gap-7 text-[15px] md:flex lg:gap-11">
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative whitespace-nowrap pb-1.5 transition-colors duration-200 motion-reduce:transition-none ${
                    isActive ? "text-paper" : "text-paper/60 hover:text-paper"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-brand-red transition-transform duration-300 motion-reduce:transition-none ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <ThemeToggle />

          {!minimal && (
            <Link href="/sign-in" aria-label="Sign in" className={`hidden md:flex ${iconBtnBase}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[18px] w-[18px]"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>
            </Link>
          )}

          {!minimal && (
            <Link
              href="/enrol"
              className={`hidden shrink-0 items-center rounded-full bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-150 hover:brightness-110 active:scale-[0.97] motion-reduce:transition-none sm:flex md:px-5 md:py-3 ${noTapFlash}`}
            >
              Enrol
            </Link>
          )}

          {/* menu button — hidden on desktop at every width, minimal or not */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`text-paper md:hidden ${iconBtn}`}
          >
            <span className="relative block h-3.5 w-[18px]">
              <span
                className={`absolute inset-x-0 h-0.5 rounded bg-current transition-all duration-200 motion-reduce:transition-none ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-current transition-opacity duration-200 motion-reduce:transition-none ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 h-0.5 rounded bg-current transition-all duration-200 motion-reduce:transition-none ${
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown — lives in normal document flow directly under
          the nav row, so it simply pushes the page content down when it
          opens. No fixed positioning, no measured offset, nothing that
          can drift out of sync with the navbar's real height. */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="max-h-[70vh] overflow-y-auto border-t border-paper/10 bg-ink pb-[env(safe-area-inset-bottom)] md:hidden"
        >
          <ul className="px-4 sm:px-6">
            {menuLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <li key={link.href} className="border-b border-paper/10">
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center justify-between py-3.5 text-[16px] ${noTapFlash} ${
                      isActive ? "text-brand-red" : "text-paper"
                    }`}
                  >
                    {link.label}
                    <span aria-hidden="true" className="text-paper/30">
                      ›
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {!minimal && (
            <div className="px-4 py-4 sm:px-6">
              <Link
                href="/enrol"
                className={`block rounded-full bg-brand-red px-5 py-3.5 text-center font-semibold text-white active:scale-[0.97] ${noTapFlash}`}
              >
                Enrol
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}