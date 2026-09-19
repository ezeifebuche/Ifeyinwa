export type ShowcaseCategory =
  | "Product ads"
  | "Music videos"
  | "Faceless channels"
  | "Brand films"
  | "Kids content";

export type ShowcaseVideo = {
  id: string;
  title: string;
  /** Where the source file lives / plays from. */
  source: "youtube" | "tiktok" | "bunny";
  /** YouTube/TikTok URL, or a Bunny Stream playback URL. */
  url: string;
  thumbnail: string;
  category: ShowcaseCategory;
  creator?: string;
  isFeatured: boolean;
  order: number;
};

// TODO: replace with a query against the ShowcaseVideo table (§6 of the
// scoping doc) — is_featured DESC, order ASC. Thumbnails point at /public
// placeholders until real assets are supplied by the client.
export const SHOWCASE_VIDEOS: ShowcaseVideo[] = [
  {
    id: "sv-01",
    title: "Glow Skincare — 30-second launch ad",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=placeholder01",
    thumbnail: "/showcase/glow-skincare.svg",
    category: "Product ads",
    creator: "Chidera A.",
    isFeatured: true,
    order: 1,
  },
  {
    id: "sv-02",
    title: "Lumen — afrobeat visualiser",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=placeholder02",
    thumbnail: "/showcase/lumen-visualiser.svg",
    category: "Music videos",
    creator: "Tobi K.",
    isFeatured: true,
    order: 2,
  },
  {
    id: "sv-03",
    title: "Naija Folktales — Ep. 4: The Tortoise's Bargain",
    source: "tiktok",
    url: "https://www.tiktok.com/@ifeyinwa/video/placeholder03",
    thumbnail: "/showcase/naija-folktales.svg",
    category: "Kids content",
    creator: "Amaka N.",
    isFeatured: true,
    order: 3,
  },
  {
    id: "sv-04",
    title: "Kaya Foods — market day brand film",
    source: "bunny",
    url: "https://iframe.mediadelivery.net/embed/placeholder04",
    thumbnail: "/showcase/kaya-foods.svg",
    category: "Brand films",
    creator: "Emeka O.",
    isFeatured: false,
    order: 4,
  },
  {
    id: "sv-05",
    title: "Faceless Finance — Episode 12",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=placeholder05",
    thumbnail: "/showcase/faceless-finance.svg",
    category: "Faceless channels",
    creator: "Tobi K.",
    isFeatured: false,
    order: 5,
  },
  {
    id: "sv-06",
    title: "Zaron Cosmetics — Valentine campaign",
    source: "tiktok",
    url: "https://www.tiktok.com/@ifeyinwa/video/placeholder06",
    thumbnail: "/showcase/zaron-cosmetics.svg",
    category: "Product ads",
    creator: "Chidera A.",
    isFeatured: false,
    order: 6,
  },
  {
    id: "sv-07",
    title: "Riverside Academy — enrolment film",
    source: "bunny",
    url: "https://iframe.mediadelivery.net/embed/placeholder07",
    thumbnail: "/showcase/riverside-academy.svg",
    category: "Brand films",
    creator: "Amaka N.",
    isFeatured: false,
    order: 7,
  },
  {
    id: "sv-08",
    title: "Yemi B. — 'Late Nights' lyric video",
    source: "youtube",
    url: "https://www.youtube.com/watch?v=placeholder08",
    thumbnail: "/showcase/late-nights.svg",
    category: "Music videos",
    creator: "Emeka O.",
    isFeatured: false,
    order: 8,
  },
  {
    id: "sv-09",
    title: "Small Wins Podcast — clip channel trailer",
    source: "tiktok",
    url: "https://www.tiktok.com/@ifeyinwa/video/placeholder09",
    thumbnail: "/showcase/small-wins.svg",
    category: "Faceless channels",
    creator: "Tobi K.",
    isFeatured: false,
    order: 9,
  },
];

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  "Product ads",
  "Music videos",
  "Faceless channels",
  "Brand films",
  "Kids content",
];