"use client";

import { useEffect, useState } from "react";

type Props = {
  /** ISO string with offset, e.g. 2026-09-14T09:00:00+01:00 */
  target: string;
  label: string;
};

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function remaining(target: number): Parts | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = [
  ["days", "days"],
  ["hours", "hrs"],
  ["minutes", "min"],
  ["seconds", "sec"],
] as const;

export default function Countdown({ target, label }: Props) {
  const targetMs = new Date(target).getTime();
  // Null on the first render on both server and client, so hydration matches.
  const [parts, setParts] = useState<Parts | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParts(remaining(targetMs));
    const id = setInterval(() => setParts(remaining(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const started = mounted && parts === null;

  return (
    <div className="flex flex-col gap-3" aria-live="polite">
      <p className="text-[15px] text-paper/55">
        {started ? `${label} is under way` : `${label} starts in`}
      </p>

      {started ? (
        <p className="max-w-[34ch] text-paper/80">
          Join the private bootcamp and start today, or hold for the next batch.
        </p>
      ) : (
        <ol className="flex gap-2">
          {UNITS.map(([key, unit]) => (
            <li
              key={key}
              className="flex min-w-[4.25rem] flex-1 flex-col items-center gap-1 rounded-xl border border-paper/10 bg-gradient-to-b from-brand-red/15 to-transparent px-2 pb-2.5 pt-3 sm:flex-none"
            >
              <span className="bg-gradient-to-b from-white via-[#b9bcc2] to-[#7e8288] bg-clip-text font-display text-[26px] leading-none tabular-nums text-transparent sm:text-[32px]">
                {mounted && parts ? String(parts[key]).padStart(2, "0") : "\u2013\u2013"}
              </span>
              <span className="text-[11px] tracking-[0.08em] text-paper/50">
                {unit}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
