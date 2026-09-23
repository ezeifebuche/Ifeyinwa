"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Pillar = {
  key: string;
  label: string;
  title: string;
  desc: string;
  gradient: string;
  image:string;
  comingSoon?: boolean;
};

// Community and Store are Phase 3 per the scope doc (Section 3.2).
// Shown here as "Coming soon" cards with email capture rather than
// removed, per the doc's recommendation to preserve the 5-pillar design.
const pillars: Pillar[] = [
  {
    key: "agency",
    label: "IFEYINWA",
    title: "Agency",
    desc: "Hire. Creators. Get it done.",
    gradient: "from-[#2a2320] to-[#0a0808]",
    image: "/pillars/agency.jpg",
  },
  {
    key: "academy",
    label: "IFEYINWA",
    title: "Academy",
    desc: "Learn. Create. Grow.",
    gradient: "from-[#3a2410] to-[#120a06]",
    image: "/pillars/academy.jpg",
  },
  {
    key: "movies",
    label: "IFEYINWA",
    title: "Movies",
    desc: "African stories. Global impact.",
    gradient: "from-[#4a1218] to-[#160406]",
    image: "/pillars/movies.jpg",
  },
  {
    key: "community",
    label: "IFEYINWA",
    title: "Community",
    desc: "Join. Belong. Win together.",
    gradient: "from-[#0f2a30] to-[#050e10]",
    image: "/pillars/community.jpg",
  },
  {
    key: "store",
    label: "IFEYINWA",
    title: "Store",
    desc: "Get tools. Support the vision.",
    gradient: "from-[#1c1024] to-[#08050a]",
    image: "/pillars/store.jpg",
    comingSoon: true,
  },
];

const OFFSETS = [
  { x: -360, rot: 28, scale: 0.82, z: 1 },
  { x: -190, rot: 18, scale: 0.9, z: 2 },
  { x: 0, rot: 0, scale: 1.12, z: 5 },
  { x: 190, rot: -18, scale: 0.9, z: 2 },
  { x: 360, rot: -28, scale: 0.82, z: 1 },
];

const AUTO_ROTATE_MS = 5000;

export default function PillarCarousel() {
  const [active, setActive] = useState(2); // Movies starts centered
  const pausedRef = useRef(false);

  const go = (dir: 1 | -1) => {
    setActive((prev) => (prev + dir + pillars.length) % pillars.length);
  };

  // Per scope doc §5.1: "rotating pillar cards" — auto-advance, but pause
  // as soon as the visitor interacts so it doesn't fight their choice.
  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) go(1);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const pauseThenGo = (fn: () => void) => {
    pausedRef.current = true;
    fn();
  };

  // Position each card relative to the active index, wrapping around.
  const ordered = pillars.map((p, i) => {
    let rel = i - active;
    if (rel > 2) rel -= pillars.length;
    if (rel < -2) rel += pillars.length;
    return { pillar: p, offset: OFFSETS[rel + 2] };
  });

  return (
    <div className="mt-14" onMouseEnter={() => (pausedRef.current = true)} onMouseLeave={() => (pausedRef.current = false)}>
      <div
        className="relative mx-auto flex h-[420px] max-w-5xl items-center justify-center md:h-[520px]"
        style={{ perspective: "1400px" }}
      >
        {ordered.map(({ pillar, offset }) => {
          const isCenter = offset.z === 5;
          return (
           <button
  key={pillar.key}
  onClick={() =>
    pauseThenGo(() =>
      setActive(pillars.findIndex((p) => p.key === pillar.key))
    )
  }
  className={`absolute flex h-[300px] w-[170px] flex-col justify-end overflow-hidden rounded-2xl border p-4 text-left shadow-[0_30px_60px_rgba(0,0,0,0.55)] transition-transform duration-400 ease-out md:h-[400px] md:w-[230px] md:p-5 ${
    isCenter ? "border-white/40" : "border-white/10"
  }`}
  style={{
    transform: `translateX(${offset.x * 0.72}px) rotateY(${offset.rot}deg) scale(${offset.scale})`,
    zIndex: offset.z,
  }}
>
  {/* image layer */}
  {pillar.image && (
    <Image
      src={pillar.image}
      alt={pillar.title}
      fill
      className="object-cover"
      sizes="(min-width: 768px) 230px, 170px"
    />
  )}

  {/* gradient overlay */}
  <div
    className={`absolute inset-0 bg-gradient-to-b ${pillar.gradient} opacity-30`}
  />

  {/* extra bottom scrim so white text stays legible over any photo, in any theme */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

  {/* text content — now correctly wraps everything, sits above image+gradient */}
  <div className="relative z-10 flex h-full flex-col justify-end">
    {pillar.comingSoon && (
      <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2 py-1 text-[9px] tracking-wide text-white/80">
        Coming soon
      </span>
    )}
    <div className="text-[10px] tracking-[0.2em] text-white/75">
      {pillar.label}
    </div>
    <h3
      className={`mt-1.5 font-display font-bold text-white ${
        isCenter ? "text-[26px] md:text-[30px]" : "text-[19px] md:text-[22px]"
      }`}
    >
      {pillar.title}
    </h3>
    <p className={`mt-2 text-white/70 ${isCenter ? "text-[13px]" : "text-[11px] md:text-[12.5px]"}`}>
      {pillar.desc}
    </p>

    {pillar.comingSoon ? (
      <div
        className="mt-3 flex items-center overflow-hidden rounded-full border border-white/30"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="email"
          placeholder="Notify me"
          className="w-full bg-transparent px-3 py-1.5 text-[11px] text-white placeholder:text-white/40 focus:outline-none"
        />
      </div>
    ) : (
      <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/50 text-sm text-white">
        →
      </div>
    )}
  </div>
    </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-center gap-5">
        <button
          aria-label="Previous"
          onClick={() => pauseThenGo(() => go(-1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
        >
          ←
        </button>
        <div className="flex gap-2">
          {pillars.map((p, i) => (
            <button
              key={p.key}
              aria-label={`Go to ${p.title}`}
              onClick={() => pauseThenGo(() => setActive(i))}
              className={`h-[3px] rounded-full transition-all ${
                i === active ? "w-6 bg-brand-red" : "w-5 bg-white/25"
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Next"
          onClick={() => pauseThenGo(() => go(1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white"
        >
          →
        </button>
      </div>
    </div>
  );
}