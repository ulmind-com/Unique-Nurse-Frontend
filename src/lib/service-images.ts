import type { Service } from "@/lib/api/types";

/**
 * Curated default healthcare imagery used when a service has no
 * `featured_image` set in the admin panel. Keeps the grid looking
 * premium and complete even before content is uploaded.
 */
const DEFAULT_SERVICE_IMAGES = [
  "/assets/hero-desktop/hero_desktop_1_nursing_1786737139820.jpg", // nursing
  "/assets/services/bedridden_care.png", // patient attendant
  "/assets/elderly-hero/1.png", // elder care
  "/assets/hero-desktop/hero_desktop_6_icu_1786737546853.jpg", // hospital
  "/assets/hero-desktop/hero_desktop_3_mother_baby_1786737385210.jpg", // baby care
  "/assets/services/nurse-elder.jpg", // aya
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80", // household help
];

const KEYWORD_IMAGES: Array<{ test: RegExp; url: string }> = [
  { test: /maid|domestic|cook|utensil|housekeep|cleaning/i, url: DEFAULT_SERVICE_IMAGES[6] },
  { test: /aya/i, url: DEFAULT_SERVICE_IMAGES[5] },
  { test: /baby|newborn|mother|japa|feeding|diaper/i, url: DEFAULT_SERVICE_IMAGES[4] },
  { test: /hospital|escort|admission|discharge|diagnostic/i, url: DEFAULT_SERVICE_IMAGES[3] },
  { test: /elder|senior|geriatric|check-?in/i, url: DEFAULT_SERVICE_IMAGES[2] },
  { test: /attendant|bedridden|personal care|shift/i, url: DEFAULT_SERVICE_IMAGES[1] },
  { test: /nurs|injection|wound|monitor|post[- ]?hospital/i, url: DEFAULT_SERVICE_IMAGES[0] },
];

/** Deterministic default image for a service (stable across renders). */
export function serviceImage(service: Service, index = 0): string {
  if (service.featured_image) {
    let url = typeof service.featured_image === "string" 
      ? service.featured_image 
      : service.featured_image.url;
      
    return url;
  }
  const haystack = `${service.title} ${service.category_name ?? ""}`;
  for (const { test, url } of KEYWORD_IMAGES) {
    if (test.test(haystack)) return url;
  }
  return DEFAULT_SERVICE_IMAGES[index % DEFAULT_SERVICE_IMAGES.length];
}
