"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ifeyinwa-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "declined") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-paper/15 bg-ink/95 px-6 py-4 backdrop-blur md:px-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-paper/80 md:flex-row">
        <p>
          We use cookies to keep the platform running smoothly and to
          understand how people use it. See our{" "}
          <a href="/privacy" className="underline">
            privacy policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => decide("declined")}
            className="rounded-full border border-paper/30 px-4 py-2 text-xs font-medium"
          >
            Decline
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-full bg-brand-red px-4 py-2 text-xs font-semibold text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
