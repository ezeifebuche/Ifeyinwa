"use client";

import { useMemo, useState } from "react";

import type { ShowcaseCategory, ShowcaseVideo } from "@/lib/movies";

const ALL = "All work" as const;

function embedUrl(video: ShowcaseVideo) {
  if (video.source === "youtube") {
    const id = video.url.split("v=")[1]?.split("&")[0];
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : video.url;
  }
  // TikTok has no simple embeddable iframe URL from a share link, and Bunny
  // Stream URLs are already embeddable as-is.
  return video.url;
}

export default function MoviesGrid({
  videos,
  categories,
}: {
  videos: ShowcaseVideo[];
  categories: ShowcaseCategory[];
}) {
  const [active, setActive] = useState<ShowcaseCategory | typeof ALL>(ALL);
  const [playing, setPlaying] = useState<ShowcaseVideo | null>(null);

  const filtered = useMemo(() => {
    const list =
      active === ALL ? videos : videos.filter((v) => v.category === active);
    return [...list].sort((a, b) => a.order - b.order);
  }, [videos, active]);

  return (
    <>
      {/* filter tabs */}
      <div className="flex flex-wrap gap-2">
        {[ALL, ...categories].map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full border px-4 py-2 text-[13px] transition ${
                isActive
                  ? "border-brand-red bg-brand-red/10 text-hi"
                  : "border-paper/15 text-paper/60 hover:border-paper/30 hover:text-paper"
              } motion-reduce:transition-none`}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* grid */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setPlaying(video)}
            className="group relative aspect-video overflow-hidden rounded-xl border border-paper/10 bg-gradient-to-br from-[#231519] to-[#0d0809] text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={video.thumbnail}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition group-hover:opacity-90 motion-reduce:transition-none"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-12 place-items-center rounded-full border border-paper/30 bg-black/40 text-paper/80 transition group-hover:border-brand-red group-hover:text-brand-red motion-reduce:transition-none">
                ▶
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
              <p className="text-[13px] font-medium text-paper/90">
                {video.title}
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-paper/50">
                {video.category}
                {video.creator ? ` · ${video.creator}` : ""}
              </p>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-paper/50">
            Nothing in this category yet — check back soon.
          </p>
        )}
      </div>

      {/* player modal */}
      {playing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={playing.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-6"
          onClick={() => setPlaying(null)}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3">
              <p className="text-sm text-paper/70">{playing.title}</p>
              <button
                type="button"
                onClick={() => setPlaying(null)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 text-paper/70 hover:text-paper"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-xl border border-paper/10 bg-black">
              {playing.source === "tiktok" ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <p className="text-paper/60">
                    This one plays on TikTok.
                  </p>
                  <a
                    href={playing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Watch on TikTok →
                  </a>
                </div>
              ) : (
                <iframe
                  src={embedUrl(playing)}
                  title={playing.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}