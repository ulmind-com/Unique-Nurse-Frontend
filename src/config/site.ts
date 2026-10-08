/**
 * Single source of truth for brand, contact and location details.
 *
 * Anything editable from the admin panel (website settings) should still be
 * preferred at runtime — these values are the fallbacks used before the
 * settings query resolves, and in static metadata.
 */

export const SITE = {
  /** Full legal/brand name. */
  name: "Unique Nurse and Aya Services",
  /** Short name for the logo lockup. */
  shortName: "Unique",
  /** Second line of the logo lockup. */
  nameSuffix: "Nurse & Aya Services",
  tagline: "Nursing, Aya & Patient Care at Home in Kolkata",
  description:
    "Trained nurses, Aya, patient attendants, elder care, newborn care, " +
    "maids and housekeeping staff — placed at your home or hospital across " +
    "Kolkata. Verified staff, flexible shifts, 24/7 support.",

  /** Dial-ready phone number. */
  phone: "+919432941098",
  /** Human-readable phone number. */
  phoneDisplay: "+91 94329 41098",
  /** wa.me target (digits only, with country code). */
  whatsapp: "919432941098",
  email: "unique.point2010@gmail.com",

  address: {
    line1: "3, Anukul Chandra Road, Tetulberia",
    line2: "Garia, Kolkata - 700084",
    locality: "Garia",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700084",
    country: "India",
    /** One-line form used in footers and schema.org output. */
    full: "3, Anukul Chandra Road, Tetulberia, Garia, Kolkata - 700084",
  },

  mapQuery: "3 Anukul Chandra Road, Tetulberia, Garia, Kolkata 700084",

  hours: "Open 24 hours · 7 days a week",
} as const;

/** `tel:` href for the brand phone number. */
export const telHref = `tel:${SITE.phone}`;

/** Build a WhatsApp deep link with an optional prefilled message. */
export function waHref(message?: string): string {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps embed URL for the office address. */
export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  SITE.mapQuery,
)}&output=embed`;
