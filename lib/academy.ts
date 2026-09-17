/**
 * Single source of truth for Academy landing page content.
 * Prices, dates and copy change often — edit here, not in the components.
 */

/** Next cohort start. West Africa Time (UTC+1). */
export const COHORT = {
  label: "Batch 4",
  startsAt: "2026-09-14T09:00:00+01:00",
  displayDate: "Monday 14 September",
  seatsNote: "Enrolment closes when the batch starts",
} as const;

export const WHATSAPP_NUMBER = "234XXXXXXXXXX"; // TODO: client's number, digits only
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Ifeyinwa Academy, I'd like to join the next bootcamp.",
)}`;

export type Pkg = {
  slug: string;
  index: number;
  name: string;
  price: string;
  priceNote?: string;
  summary: string;
  points: string[];
  houses?: { name: string; who: string; dot: string }[];
  badge?: string;
  featured?: boolean;
};

export const PACKAGES: Pkg[] = [
  {
    slug: "group-bootcamp",
    index: 1,
    name: "General group bootcamp",
    price: "₦15,000",
    summary:
      "A 10-day group bootcamp with pre-recorded lessons and practical assignments.",
    points: [
      "You submit assignments to your House Captain, who reviews, scores, corrects and guides you until you get it right.",
      "The houses are designed to encourage creativity, teamwork and healthy competition.",
    ],
    houses: [
      { name: "Star Kids House", who: "Kids", dot: "#E0459B" },
      { name: "Gold House", who: "Adults", dot: "#E6B54A" },
      { name: "Green House", who: "Adults", dot: "#3FBF6F" },
    ],
    badge: `${COHORT.label} starts ${COHORT.displayDate}`,
    featured: true,
  },
  {
    slug: "private-bootcamp",
    index: 2,
    name: "Private bootcamp",
    price: "₦40,000",
    summary:
      "A personal learning experience where a member of our team takes you through the entire bootcamp curriculum.",
    points: [
      "Start immediately, or whenever you're available.",
      "Tailored to your schedule.",
      "Built for busy people, or kids in school who need flexibility.",
      "Learn at your own pace, with full guidance and support.",
    ],
  },
  {
    slug: "private-class",
    index: 3,
    name: "Private class",
    price: "₦30,000",
    priceNote: "per session",
    summary:
      "A one-on-one Zoom session with direct hand-holding, practical guidance and personal direction.",
    points: [
      "One session (2 hours) — ₦30,000",
      "Two sessions — ₦60,000",
      "How many sessions you need depends on your learning speed and how much guidance you want.",
    ],
  },
  {
    slug: "advanced-class",
    index: 4,
    name: "Advanced class",
    price: "₦60,000",
    summary: "A 5-day group class focused on taking your skills further.",
    points: [
      "Advanced camera angles",
      "AI agents",
      "Building your portfolio",
      "Creating adverts for clients",
      "How to start teaching your own classes",
      "How to turn your skills into income",
    ],
  },
];

/** Shared across every package. */
export const INCLUDED = [
  {
    title: "Lessons you keep",
    body: "Pre-recorded lessons stay in your account after the batch ends, so you can go back over anything.",
  },
  {
    title: "Work that gets corrected",
    body: "Every assignment is reviewed and scored by a House Captain who tells you what to fix, not just whether you passed.",
  },
  {
    title: "A house, not a chatroom",
    body: "You're placed with people at your level and your age group, and the houses compete through the ten days.",
  },
  {
    title: "Tools walkthroughs",
    body: "Setup guides for every tool used in class, including the free tiers and what each one is actually good for.",
  },
];

/** TODO: confirm day-by-day breakdown with Ifeyinwa before launch. */
export const CURRICULUM = [
  { day: "Day 1", title: "The landscape", body: "The tools that matter right now, what each is good at, and getting your accounts set up." },
  { day: "Day 2", title: "Prompting for shots", body: "Writing prompts that return something you can actually use in a film." },
  { day: "Day 3", title: "Character consistency", body: "Building a face and a look you can bring back in shot after shot." },
  { day: "Day 4", title: "Image to video", body: "Motion, timing, and the things that break a clip." },
  { day: "Day 5", title: "Camera language", body: "Angles, movement and coverage — making it read as film rather than a moving picture." },
  { day: "Day 6", title: "Voice and dialogue", body: "Voice generation, lip sync, and matching performance to the shot." },
  { day: "Day 7", title: "Sound", body: "Music, ambience and effects, and why sound carries more than people expect." },
  { day: "Day 8", title: "Editing the scene", body: "Cutting your clips into something with a beginning, middle and end." },
  { day: "Day 9", title: "Your assignment film", body: "You make it, your House Captain marks it, you fix it." },
  { day: "Day 10", title: "Finishing and posting", body: "Export settings, formats for each platform, and how to post so it gets watched." },
];

export const FAQS = [
  {
    q: "Do I need any experience?",
    a: "No. The bootcamp starts from setting up your first tool. If you can use a phone and follow instructions, you can do the work.",
  },
  {
    q: "Can I do it on my phone, or do I need a laptop?",
    a: "Most of the bootcamp can be done on a phone. A laptop makes editing days easier, but it isn't required to finish.",
  },
  {
    q: "Do I pay separately for the AI tools?",
    a: "The class is built around free tiers wherever possible. If a paid tool would help you, we say so and tell you what it costs, but nothing in the curriculum requires a subscription.",
  },
  {
    q: "How much data will I need?",
    a: "Lessons are pre-recorded and you download them once. Generating videos uses the tool's servers, not your device, so data use is closer to browsing than to streaming.",
  },
  {
    q: "What is a House Captain?",
    a: "Your marker and guide for the ten days. You send your assignments to them, they score and correct the work, and they stay on it with you until it's right.",
  },
  {
    q: "Can children join?",
    a: "Yes. Under-18s go into Star Kids House, which runs the same curriculum at a pace built for school schedules. The private bootcamp is often a better fit if term time is tight.",
  },
  {
    q: "How do I pay?",
    a: "Card or bank transfer through Paystack at checkout. International cards work, and you'll get a receipt by email the moment payment clears.",
  },
  {
    q: "What if I miss the batch start?",
    a: "You can either wait for the next batch or take the private bootcamp, which starts whenever you're ready and covers the same curriculum.",
  },
];
