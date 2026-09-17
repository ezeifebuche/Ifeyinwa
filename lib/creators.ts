/**
 * Creator directory data (scope §5.9).
 *
 * TODO Phase 2: these records stand in for CreatorProfile rows
 * (user_id, headline, skills[], availability, is_featured, rank).
 * Replace CREATORS with a database query — the filter helper below
 * takes a list, so the page component won't need to change.
 */

export type Availability = "available" | "busy" | "closed";

export type Creator = {
  slug: string;
  name: string;
  headline: string;
  bio: string;
  batch: string;
  skills: string[];
  band: "entry" | "mid" | "premium";
  availability: Availability;
  isFeatured?: boolean;
  /** /creators/<slug>.jpg in public/ */
  photo?: string;
};

export const SKILLS = [
  "Product ads",
  "Faceless channels",
  "Music videos",
  "Kids content",
  "Brand films",
  "Social cutdowns",
];

export const BANDS: { value: Creator["band"]; label: string }[] = [
  { value: "entry", label: "Entry" },
  { value: "mid", label: "Mid" },
  { value: "premium", label: "Premium" },
];

export const AVAILABILITY_LABELS: Record<Availability, string> = {
  available: "Available",
  busy: "Booked up",
  closed: "Not taking work",
};

export const CREATORS: Creator[] = [
  {
    slug: "creator-one",
    name: "Creator One",
    headline: "Product adverts for beauty and lifestyle brands",
    bio: "Placeholder bio — replace with the creator's own words from their profile editor.",
    batch: "Batch 2",
    skills: ["Product ads", "Social cutdowns"],
    band: "mid",
    availability: "available",
    isFeatured: true,
  },
  {
    slug: "creator-two",
    name: "Creator Two",
    headline: "Faceless channels at weekly volume",
    bio: "Placeholder bio — replace with the creator's own words from their profile editor.",
    batch: "Batch 3",
    skills: ["Faceless channels", "Brand films"],
    band: "entry",
    availability: "busy",
  },
  {
    slug: "creator-three",
    name: "Creator Three",
    headline: "Concept-led music videos",
    bio: "Placeholder bio — replace with the creator's own words from their profile editor.",
    batch: "Batch 1",
    skills: ["Music videos", "Brand films"],
    band: "premium",
    availability: "available",
    isFeatured: true,
  },
  {
    slug: "creator-four",
    name: "Creator Four",
    headline: "Character animation for kids channels",
    bio: "Placeholder bio — replace with the creator's own words from their profile editor.",
    batch: "Batch 2",
    skills: ["Kids content"],
    band: "mid",
    availability: "available",
  },
  {
    slug: "creator-five",
    name: "Creator Five",
    headline: "Campaign films and founder stories",
    bio: "Placeholder bio — replace with the creator's own words from their profile editor.",
    batch: "Batch 3",
    skills: ["Brand films", "Product ads"],
    band: "premium",
    availability: "closed",
  },
  {
    slug: "creator-six",
    name: "Creator Six",
    headline: "High-volume short-form for retail",
    bio: "Placeholder bio — replace with the creator's own words from their profile editor.",
    batch: "Batch 4",
    skills: ["Social cutdowns", "Product ads"],
    band: "entry",
    availability: "available",
  },
];

export type CreatorFilters = {
  q?: string;
  skill?: string;
  band?: string;
  availability?: string;
};

/** Featured first, then available before booked. */
export function filterCreators(list: Creator[], f: CreatorFilters) {
  const q = f.q?.trim().toLowerCase();

  return list
    .filter((c) => {
      if (f.skill && !c.skills.includes(f.skill)) return false;
      if (f.band && c.band !== f.band) return false;
      if (f.availability && c.availability !== f.availability) return false;
      if (q) {
        const haystack = [c.name, c.headline, c.bio, c.batch, ...c.skills]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (!!b.isFeatured !== !!a.isFeatured) return a.isFeatured ? -1 : 1;
      const rank = { available: 0, busy: 1, closed: 2 } as const;
      return rank[a.availability] - rank[b.availability];
    });
}
