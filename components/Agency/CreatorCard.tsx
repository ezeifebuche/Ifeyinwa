import Image from "next/image";
import Link from "next/link";

import { AVAILABILITY_LABELS, type Creator } from "@/lib/creators";

const DOT: Record<Creator["availability"], string> = {
  available: "bg-emerald-400 text-emerald-400",
  busy: "bg-amber-400 text-amber-400",
  closed: "bg-paper/40 text-paper/40",
};

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link
      href={`/agency/creators/${creator.slug}`}
      className="flex flex-col rounded-2xl border border-paper/10 bg-gradient-to-b from-[#1a1216] to-[#120c0e] p-5 transition hover:border-brand-red/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red motion-reduce:transition-none"
    >
      <div className="flex items-start gap-3">
        {creator.photo ? (
          <Image
            src={creator.photo}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="size-12 shrink-0 rounded-full bg-paper/10"
            aria-hidden="true"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate font-bold text-white">{creator.name}</p>
          <p className="truncate text-[13px] text-paper/55">
            {creator.batch} graduate
          </p>
        </div>

        {creator.isFeatured && (
          <span className="rounded-full bg-brand-red/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-brand-red">
            Featured
          </span>
        )}
      </div>

      <p className="mt-4 flex-1 text-[15px] text-paper/70">
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

      <p
        className={`mt-4 flex items-center gap-1.5 text-[12px] ${DOT[creator.availability].split(" ")[1]}`}
      >
        <span
          className={`size-1.5 rounded-full ${DOT[creator.availability].split(" ")[0]}`}
          aria-hidden="true"
        />
        {AVAILABILITY_LABELS[creator.availability]}
      </p>
    </Link>
  );
}
