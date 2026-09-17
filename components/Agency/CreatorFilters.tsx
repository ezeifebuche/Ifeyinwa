"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { AVAILABILITY_LABELS, BANDS, SKILLS } from "@/lib/creators";

/**
 * Filters live in the URL, not in state, so a filtered directory can be
 * shared, bookmarked and rendered on the server.
 */
export default function CreatorFilters({ total }: { total: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(params.get("q") ?? "");

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    startTransition(() =>
      router.replace(next.toString() ? `${pathname}?${next}` : pathname, {
        scroll: false,
      }),
    );
  };

  // Debounce the text box so every keystroke isn't a navigation.
  useEffect(() => {
    const id = setTimeout(() => {
      if (q !== (params.get("q") ?? "")) set("q", q || null);
    }, 300);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const skill = params.get("skill");
  const band = params.get("band");
  const availability = params.get("availability");
  const hasFilters = Boolean(q || skill || band || availability);

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-[13px] transition motion-reduce:transition-none ${
      active
        ? "border-brand-red bg-brand-red text-white"
        : "border-paper/15 text-paper/70 hover:border-paper/35 hover:text-paper"
    }`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <label className="relative min-w-[16rem] flex-1">
          <span className="sr-only">Search creators</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, skill or style"
            className="w-full rounded-full border border-paper/15 bg-paper/[0.03] px-5 py-3 text-[15px] text-paper placeholder:text-paper/40 focus:border-brand-red focus:outline-none"
          />
        </label>

        {hasFilters && (
          <button
            type="button"
            onClick={() => startTransition(() => router.replace(pathname))}
            className="rounded-full border border-paper/15 px-4 py-2.5 text-[13px] text-paper/70 hover:text-paper"
          >
            Clear all
          </button>
        )}
      </div>

      <fieldset className="flex flex-wrap items-center gap-2">
        <legend className="sr-only">Filter by skill</legend>
        <button
          type="button"
          onClick={() => set("skill", null)}
          className={chip(!skill)}
        >
          All work
        </button>
        {SKILLS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => set("skill", skill === s ? null : s)}
            className={chip(skill === s)}
          >
            {s}
          </button>
        ))}
      </fieldset>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-[13px] text-paper/55">
          Budget
          <select
            value={band ?? ""}
            onChange={(e) => set("band", e.target.value || null)}
            className="rounded-lg border border-paper/15 bg-ink px-3 py-2 text-paper focus:border-brand-red focus:outline-none"
          >
            <option value="">Any</option>
            {BANDS.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-[13px] text-paper/55">
          Availability
          <select
            value={availability ?? ""}
            onChange={(e) => set("availability", e.target.value || null)}
            className="rounded-lg border border-paper/15 bg-ink px-3 py-2 text-paper focus:border-brand-red focus:outline-none"
          >
            <option value="">Any</option>
            {Object.entries(AVAILABILITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <p
          aria-live="polite"
          className={`ml-auto text-[13px] ${isPending ? "text-paper/30" : "text-paper/55"}`}
        >
          {total} {total === 1 ? "creator" : "creators"}
        </p>
      </div>
    </div>
  );
}
