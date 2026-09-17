/**
 * Content for the Agency landing page (scope §5.9).
 * Phase 2 builds the real directory — until then the creators below are
 * placeholders and should be replaced by a query, not edited by hand.
 */

import { WHATSAPP_NUMBER } from "@/lib/academy";

export const AGENCY_WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Ifeyinwa, I'd like to commission an AI video.",
)}`;

/** What a business can commission — the skills/tags from §5.9. */
export const SERVICES = [
  {
    slug: "product-ads",
    title: "Product adverts",
    body: "Short-form ads for a product or service, built to run on Instagram, TikTok and YouTube without a shoot, a crew or a location fee.",
    deliverable: "15–60 seconds",
  },
  {
    slug: "faceless-channels",
    title: "Faceless channels",
    body: "Ongoing content for channels that never show a presenter — narration, visuals and edit handled end to end, at a volume a camera crew can't match.",
    deliverable: "Weekly or monthly retainer",
  },
  {
    slug: "music-videos",
    title: "Music videos",
    body: "Concept-led visuals for artists and labels, from performance-style cuts to fully imagined worlds that would be impossible to shoot on a Nigerian budget.",
    deliverable: "Full track or snippet",
  },
  {
    slug: "kids-content",
    title: "Kids content",
    body: "Animation and character-led storytelling for children's channels, educational series and brand mascots, with consistent characters across episodes.",
    deliverable: "Series or one-off",
  },
  {
    slug: "brand-films",
    title: "Brand films",
    body: "Longer pieces that carry a story rather than a pitch — founder films, campaign anchors and anything that needs a cinematic register.",
    deliverable: "1–3 minutes",
  },
  {
    slug: "social-cutdowns",
    title: "Social cutdowns",
    body: "One shoot-free concept reversioned across every aspect ratio and platform, so a single idea doesn't cost five separate productions.",
    deliverable: "Bundle of 5–10",
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us what you need",
    body: "Send a brief — the product, the audience, the deadline and roughly what you want to spend. Reference links help more than a long description.",
  },
  {
    step: "02",
    title: "We match you to a creator",
    body: "Every creator in the directory came through the Academy and was picked by Ifeyinwa herself. You can choose one directly, or let us route the brief.",
  },
  {
    step: "03",
    title: "You see the concept first",
    body: "The creator comes back with a direction before anything is rendered in full, so the expensive part happens after you've agreed on the idea.",
  },
  {
    step: "04",
    title: "Delivery and revisions",
    body: "You get the files in the formats you need, with a revision round built in. Ifeyinwa stays across the project rather than handing you off.",
  },
];

/** TODO Phase 2: replace with CreatorProfile records from the database. */
export const FEATURED_CREATORS = [
  {
    slug: "placeholder-1",
    name: "Creator name",
    headline: "Product ads and brand films",
    batch: "Batch 2",
    skills: ["Product ads", "Brand films"],
    availability: "available" as const,
  },
  {
    slug: "placeholder-2",
    name: "Creator name",
    headline: "Faceless channels, weekly volume",
    batch: "Batch 3",
    skills: ["Faceless", "Narration"],
    availability: "busy" as const,
  },
  {
    slug: "placeholder-3",
    name: "Creator name",
    headline: "Music videos and concept visuals",
    batch: "Batch 1",
    skills: ["Music videos", "VFX"],
    availability: "available" as const,
  },
];

export const AGENCY_FAQS = [
  {
    q: "Who are the creators?",
    a: "Graduates of Ifeyinwa Academy, chosen by Ifeyinwa from each batch on the strength of the work they produced during the bootcamp. Nobody buys their way onto the directory.",
  },
  {
    q: "How fast can something be delivered?",
    a: "Short-form work is usually days rather than weeks, because there is no shoot to schedule. Tell us your deadline in the brief and we'll say plainly whether it's realistic.",
  },
  {
    q: "What does it cost?",
    a: "It depends on length, complexity and how many versions you need. Send a budget range with your brief and we'll come back with what's achievable inside it.",
  },
  {
    q: "Do you work with brands outside Nigeria?",
    a: "Yes. The work is remote, and payment by international card is supported.",
  },
  {
    q: "Who owns the finished video?",
    a: "You do, for the use agreed in the brief. Confirm intended usage up front — broadcast and paid media are different from organic social.",
  },
];