import Image from "next/image";
import Link from "next/link";

import { AVAILABILITY_LABELS, type Creator } from "@/lib/creators";

/* Status colours come from tokens so they darken in day mode — emerald-400
   and amber-400 are built for a dark ground and wash out on white. */
const DOT: Record<Creator["availability"], { dot: string; text: string }> = {
  available: { dot: "bg-[var(--ok)]", text: "text-[var(--ok)]" },
  busy: { dot: "bg-[var(--warn)]", text: "text-[var(--warn)]" },
  closed: { dot: "bg-paper/40", text: "text-paper/40" },
};

export default function CreatorCard({ creator }: { creator: Creator }) {
  const status = DOT[creator.availability];

  return (
    <Link
      href={`/agency/creators/${creator.slug}`}
      className="flex flex-col rounded-2xl border border-paper/10 bg-gradient-to-b from-surface to-surface-2 p-4 transition hover:border-brand-red/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none sm:p-5"
    >
      <div className="flex items-start gap-3">
        {creator.photo ? (
          <Image
            src={creator.photo}
            alt=""
            width={48}
            height={48}
            className="size-11 shrink-0 rounded-full object-cover sm:size-12"
          />
        ) : (
          <span
            className="size-11 shrink-0 rounded-full bg-paper/10 sm:size-12"
            aria-hidden="true"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-hi">{creator.name}</p>
          <p className="truncate text-[13px] text-paper/55">
            {creator.batch} graduate
          </p>
        </div>

        {creator.isFeatured && (
          <span className="shrink-0 rounded-full bg-brand-red/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-brand-red">
            Featured
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-[14.5px] text-paper/70 sm:text-[15px]">
        {creator.headline}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {creator.skills.map((s) => (
          <span
            key={s}
            className="rounded-full border border-paper/15 px-2.5 py-1 text-[11px] text-paper/60"
          >
            {s}
          </span>
        ))}
      </div>

      <p className={`mt-4 flex items-center gap-1.5 text-[12px] ${status.text}`}>
        <span
          className={`size-1.5 rounded-full ${status.dot}`}
          aria-hidden="true"
        />
        {AVAILABILITY_LABELS[creator.availability]}
      </p>
    </Link>
  );
}