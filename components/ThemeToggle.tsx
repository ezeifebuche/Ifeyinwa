"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode — the toggle still works for this session.
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Read whatever the inline script in layout.tsx already decided.
  useEffect(() => {
    const current =
      (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className="relative flex size-10 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition hover:border-paper/35 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none"
    >
      {/* Both icons render; opacity and rotation swap them. Hidden until
          mounted so the server render can't show the wrong one. */}
      <span
        className={`absolute transition-all duration-300 motion-reduce:transition-none ${
          mounted && isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 -rotate-90 opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* moon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span
        className={`absolute transition-all duration-300 motion-reduce:transition-none ${
          mounted && !isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-50 rotate-90 opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* sun */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}