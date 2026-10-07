/**
 * Canonical content for the eight service verticals.
 *
 * `ServiceLanding` renders every one of these through a single template, so
 * adding a vertical means adding an entry here plus a one-line route file.
 * Keep this in sync with `app/database/catalogue.py` on the backend.
 */

/** Route slugs for the eight landing pages — kept as a union so `/${slug}`
 *  type-checks against the generated route tree. */
export type ServiceSlug =
  | "home-nursing"
  | "patient-care"
  | "elder-care"
  | "hospital-escort"
  | "baby-care"
  | "aya-services"
  | "house-maid"
  | "housekeeping";

export type ServiceItem = {
  title: string;
  body: string;
};

export type ServiceLandingContent = {
  /** URL path, without the leading slash. */
  slug: ServiceSlug;
  /** Category slug stored in MongoDB — used to pull live services/images. */
  categorySlug: string;
  /** Short label used in navigation and breadcrumbs. */
  navLabel: string;
  /** Full category name. */
  name: string;
  eyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string;
  /** Trust chips under the hero copy. */
  badges: string[];
  /** Headline stats shown in the band under the hero. */
  stats: Array<{ value: string; label: string }>;
  /** The actual service list the client supplied. */
  items: ServiceItem[];
  /** "Why us" points, specific to this vertical. */
  highlights: ServiceItem[];
  /** Who this service is for. */
  suitableFor: string[];
  /** Shift / engagement options. */
  shifts: Array<{ title: string; detail: string }>;
  faqs: Array<{ q: string; a: string }>;
  /** Options listed in the booking modal's service dropdown. */
  bookingOptions: string[];
  ctaTitle: string;
  ctaBody: string;
};

/** Hero imagery. Local assets where we have them, curated stock otherwise. */
const IMG = {
  nursing: "/assets/hero-desktop/hero_desktop_1_nursing_1786737139820.jpg",
  attendant: "/assets/services/bedridden_care.png",
  elder: "/assets/elderly-hero/1.png",
  hospital: "/assets/hero-desktop/hero_desktop_6_icu_1786737546853.jpg",
  baby: "/assets/hero-desktop/hero_desktop_3_mother_baby_1786737385210.jpg",
  aya: "/assets/services/nurse-elder.jpg",
  maid: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1600&q=80",
  housekeeping:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1600&q=80",
};

const COMMON_SHIFTS = [
  { title: "12-Hour Shift", detail: "Day (8am – 8pm) or night (8pm – 8am) duty." },
  { title: "24-Hour Live-In", detail: "Staff stays with the patient round the clock." },
  { title: "Monthly Placement", detail: "Fixed monthly engagement with weekly off cover." },
];

export const SERVICE_LANDINGS: ServiceLandingContent[] = [
  {
    slug: "home-nursing",
    categorySlug: "home-nursing-services",
    navLabel: "Home Nursing",
    name: "Home Nursing Services",
    eyebrow: "Qualified Nurses",
    heroTitle: "Hospital-standard nursing,",
    heroHighlight: "inside your home",
    heroDescription:
      "GNM and ANM qualified nurses for injections, wound dressing, post-operative recovery and daily patient monitoring — without the hospital stay.",
    heroImage: IMG.nursing,
    badges: ["GNM / ANM Qualified", "24/7 Availability", "Verified Staff"],
    stats: [
      { value: "24/7", label: "Nurse Availability" },
      { value: "2 hrs", label: "Typical Placement" },
      { value: "100%", label: "Background Verified" },
    ],
    items: [
      {
        title: "Trained Nurse / Nursing Care",
        body: "Certified GNM and ANM nurses who handle clinical procedures at home — injections, IV lines, dressings and catheter care.",
      },
      {
        title: "Home Nursing Support",
        body: "Day or night nursing support matched to the patient's diagnosis, mobility and medication schedule.",
      },
      {
        title: "Post-Hospital Care",
        body: "Structured recovery care after surgery or discharge, following the hospital's own discharge plan.",
      },
      {
        title: "Patient Monitoring & Daily Care",
        body: "Vitals charting, medicine reminders, intake-output tracking and a daily written care log for the family.",
      },
    ],
    highlights: [
      {
        title: "Clinically screened nurses",
        body: "Every nurse is interviewed for qualification, registration and hands-on experience before placement.",
      },
      {
        title: "Replacement, not excuses",
        body: "If a nurse is unwell or on leave, we send a trained substitute so care never pauses.",
      },
      {
        title: "Family stays informed",
        body: "Daily updates on vitals, medicines and how the patient slept, ate and moved.",
      },
    ],
    suitableFor: [
      "Post-surgery and post-ICU recovery at home",
      "Stroke, paralysis and long-term bed rest",
      "Diabetic wound and bedsore dressing",
      "Elderly patients on multiple medications",
      "Patients on Ryles tube or catheter",
    ],
    shifts: COMMON_SHIFTS,
    faqs: [
      {
        q: "Are your nurses qualified or just trained attendants?",
        a: "Our nursing staff hold GNM or ANM qualifications. If your requirement is non-clinical — feeding, hygiene, mobility — we will recommend a patient attendant or Aya instead, which costs less.",
      },
      {
        q: "How quickly can a nurse reach my home in Kolkata?",
        a: "For most Kolkata localities we place a nurse within a few hours of confirmation. Call us and we will tell you honestly what is available for your area and shift.",
      },
      {
        q: "Do you supply medicines or equipment?",
        a: "No. We provide the nursing staff; medicines, consumables and any equipment are arranged by the family or the treating hospital.",
      },
      {
        q: "Can we change the nurse if the family is not comfortable?",
        a: "Yes. Tell us what is not working and we will replace the nurse — comfort with the caregiver matters as much as the clinical skill.",
      },
    ],
    bookingOptions: [
      "Trained Nurse / Nursing Care",
      "Home Nursing Support",
      "Post-Hospital Care",
      "Patient Monitoring & Daily Care",
      "Injection / IV at Home",
      "Wound Dressing",
      "Other Nursing Requirement",
    ],
    ctaTitle: "Need a nurse at home today?",
    ctaBody:
      "Tell us the patient's condition and the shift you need. We will confirm availability and send a qualified nurse.",
  },

  {
    slug: "patient-care",
    categorySlug: "patient-care-attendant-services",
    navLabel: "Patient Care",
    name: "Patient Care & Attendant Services",
    eyebrow: "Male & Female Attendants",
    heroTitle: "Attendants who stay",
    heroHighlight: "bedside, all shift",
    heroDescription:
      "Verified male and female attendants for bedridden, recovering and long-term patients — feeding, hygiene, mobility and company, at home or in hospital.",
    heroImage: IMG.attendant,
    badges: ["Male & Female Staff", "Day / Night Shifts", "Hospital or Home"],
    stats: [
      { value: "8 / 12 / 24", label: "Hour Shifts" },
      { value: "Both", label: "Male & Female" },
      { value: "Same-day", label: "Placement Possible" },
    ],
    items: [
      {
        title: "Male & Female Patient Attendants",
        body: "Choose the attendant the patient and family are most comfortable with — we keep both on our panel.",
      },
      {
        title: "Bedridden Patient Care",
        body: "Position changes every few hours, bedsore prevention, sponge baths and complete bedside assistance.",
      },
      {
        title: "Personal Care Assistance",
        body: "Bathing, grooming, dressing, toileting and diaper changes handled with patience and dignity.",
      },
      {
        title: "Hospital & Home Patient Care",
        body: "The same attendant can cover hospital duty and continue at home after discharge.",
      },
      {
        title: "Day / Night Shift Attendant",
        body: "8, 12 or 24-hour shifts with reliable replacement if your attendant takes leave.",
      },
    ],
    highlights: [
      {
        title: "Trained for real bedside work",
        body: "Lifting, turning, feeding and hygiene are taught and checked — not left to guesswork.",
      },
      {
        title: "Identity verified",
        body: "Aadhaar, address and reference checks on file for every attendant we place.",
      },
      {
        title: "Supervised placements",
        body: "A coordinator follows up through the first week and stays reachable after that.",
      },
    ],
    suitableFor: [
      "Bedridden and paralysed patients",
      "Post-operative patients needing physical support",
      "Dementia and Alzheimer's patients",
      "Families where everyone works full-time",
      "Hospital duty when relatives cannot stay",
    ],
    shifts: COMMON_SHIFTS,
    faqs: [
      {
        q: "What is the difference between an attendant and a nurse?",
        a: "An attendant handles non-clinical care — feeding, hygiene, mobility, turning the patient, company. A nurse handles clinical procedures such as injections, IV and dressings. Many families use an attendant daily and call a nurse only for procedures.",
      },
      {
        q: "Can we request specifically a male or female attendant?",
        a: "Yes, and we encourage it. Tell us the patient's preference and we will match accordingly.",
      },
      {
        q: "Will the attendant also cook or clean?",
        a: "An attendant's job is the patient. Light patient-related work is fine; for household cooking and cleaning you need a maid, which we also provide separately.",
      },
      {
        q: "What happens on the attendant's weekly off?",
        a: "We arrange a substitute for the off day so you are never left without cover. Just confirm the schedule with us in advance.",
      },
    ],
    bookingOptions: [
      "Male Patient Attendant",
      "Female Patient Attendant",
      "Bedridden Patient Care",
      "Personal Care Assistance",
      "Hospital Patient Care",
      "Day Shift Attendant",
      "Night Shift Attendant",
      "24-Hour Live-In Attendant",
    ],
    ctaTitle: "Need an attendant for home or hospital?",
    ctaBody:
      "Share the patient's condition, the shift and whether you prefer male or female staff. We will arrange it.",
  },

  {
    slug: "elder-care",
    categorySlug: "elder-care-senior-citizen-assistance",
    navLabel: "Elder Care",
    name: "Elder Care & Senior Citizen Assistance",
    eyebrow: "Senior Citizen Care",
    heroTitle: "Elders stay home.",
    heroHighlight: "We stay with them",
    heroDescription:
      "Patient caregivers who help with medicines, meals, walks, doctor visits and company — so your parents keep their independence and their own home.",
    heroImage: IMG.elder,
    badges: ["Daily Check-ins", "Doctor Visit Support", "Live-In Available"],
    stats: [
      { value: "7 days", label: "A Week Cover" },
      { value: "Live-in", label: "Or Hourly Visits" },
      { value: "Kolkata", label: "Wide Coverage" },
    ],
    items: [
      {
        title: "Elderly Care at Home",
        body: "Full-time, part-time or live-in caregivers for seniors who need help through the day.",
      },
      {
        title: "Senior Citizen Assistance",
        body: "Medicines on time, meals served, walks assisted, bathroom safety watched and conversation offered.",
      },
      {
        title: "Doctor Visit Assistance",
        body: "A caregiver takes your parent to the doctor, carries the reports and brings back the prescription explained.",
      },
      {
        title: "Daily Check-in & Support",
        body: "Scheduled visits for elders living alone — a wellness check, grocery run and a call to the family.",
      },
      {
        title: "Hospital Visit Assistance",
        body: "End-to-end support for admissions, tests and follow-up visits so nobody has to take leave.",
      },
    ],
    highlights: [
      {
        title: "Chosen for temperament",
        body: "Elder care needs patience more than speed. We place staff who have the right nature for it.",
      },
      {
        title: "Built around their routine",
        body: "We work to your parent's existing habits — meal times, prayer, afternoon rest, evening walk.",
      },
      {
        title: "For families living away",
        body: "If you are in another city or abroad, you get regular updates and a coordinator you can call.",
      },
    ],
    suitableFor: [
      "Seniors living alone in Kolkata",
      "Children working in another city or abroad",
      "Elders with mobility or balance problems",
      "Post-fall and post-fracture recovery",
      "Memory loss, dementia and Alzheimer's",
    ],
    shifts: [
      {
        title: "Hourly Visits",
        detail: "A few hours daily for medicines, meals and a wellness check.",
      },
      {
        title: "12-Hour Day Care",
        detail: "Company and assistance through the whole working day.",
      },
      { title: "24-Hour Live-In", detail: "A caregiver stays in the house, including nights." },
    ],
    faqs: [
      {
        q: "My parents live alone in Kolkata and I am abroad. Can you help?",
        a: "This is a large part of what we do. We can arrange daily check-in visits or a live-in caregiver, and keep you updated by call or WhatsApp.",
      },
      {
        q: "Will the caregiver handle medicines correctly?",
        a: "Caregivers follow the prescription and chart you provide and give medicines on schedule. For injections or IV we send a qualified nurse instead.",
      },
      {
        q: "Can the same person take my father to the doctor?",
        a: "Yes. Doctor and hospital visit assistance is included in elder care, or can be booked on its own for a single appointment.",
      },
      {
        q: "My mother is resistant to having a stranger at home.",
        a: "Very common. We start with short visits so trust builds, and we are happy to change the caregiver until your mother is comfortable.",
      },
    ],
    bookingOptions: [
      "Elderly Care at Home",
      "Senior Citizen Assistance",
      "Live-In Elder Caregiver",
      "Doctor Visit Assistance",
      "Daily Check-in & Support",
      "Hospital Visit Assistance",
      "Dementia / Alzheimer's Care",
    ],
    ctaTitle: "Looking for care for your parents?",
    ctaBody:
      "Tell us about their routine and what they struggle with. We will suggest the right level of support — no overselling.",
  },

  {
    slug: "hospital-escort",
    categorySlug: "hospital-escort-assistance",
    navLabel: "Hospital Escort",
    name: "Hospital Escort & Assistance",
    eyebrow: "Hospital Support",
    heroTitle: "Someone reliable",
    heroHighlight: "through the whole visit",
    heroDescription:
      "From admission paperwork to discharge billing, our escorts stay with the patient, handle the queues and keep the family updated at every step.",
    heroImage: IMG.hospital,
    badges: ["Admission to Discharge", "Report Collection", "Family Updates"],
    stats: [
      { value: "End-to-end", label: "Admission → Discharge" },
      { value: "Same-day", label: "Booking Possible" },
      { value: "All", label: "Kolkata Hospitals" },
    ],
    items: [
      {
        title: "Hospital Escort",
        body: "A responsible escort accompanies the patient from home to hospital and back.",
      },
      {
        title: "Hospital Admission Assistance",
        body: "Admission forms, deposits, insurance desk and ward coordination handled for you.",
      },
      {
        title: "Doctor Visit Assistance",
        body: "Queue and token management, consultation notes written down, follow-up dates noted.",
      },
      {
        title: "Diagnostic Test Visit Assistance",
        body: "Support for scans, blood work and sample giving — including collecting the reports later.",
      },
      {
        title: "Hospital Discharge Assistance",
        body: "Final billing, discharge summary, medicines purchased and a safe transfer home.",
      },
      {
        title: "Family Updates & Coordination",
        body: "Calls and messages to the family after each step, so decisions can be made quickly.",
      },
    ],
    highlights: [
      {
        title: "Knows the system",
        body: "Our escorts have done this hundreds of times in Kolkata hospitals — they know which counter, which form, which floor.",
      },
      {
        title: "Nothing gets lost",
        body: "Reports, prescriptions, bills and cards are tracked and handed over to the family in order.",
      },
      {
        title: "Saves the family's leave",
        body: "One booking instead of a full day off work for two relatives.",
      },
    ],
    suitableFor: [
      "Elderly patients attending appointments alone",
      "Families with everyone working full-time",
      "NRI families managing parents' treatment remotely",
      "Planned admissions and day-care procedures",
      "Long diagnostic days with multiple tests",
    ],
    shifts: [
      { title: "Single Visit", detail: "One doctor appointment or diagnostic test." },
      { title: "Full Day Escort", detail: "Admission day or a multi-test diagnostic day." },
      {
        title: "Admission to Discharge",
        detail: "Continuous cover across the full hospital stay.",
      },
    ],
    faqs: [
      {
        q: "Which hospitals do you cover?",
        a: "We support patients at hospitals and nursing homes across Kolkata — government and private. Tell us the hospital and date when you book.",
      },
      {
        q: "Can the escort take decisions on our behalf?",
        a: "No. The escort coordinates, assists and keeps you informed; all medical and financial decisions stay with the family. Payments are made by you or arranged with you on call.",
      },
      {
        q: "Can the escort also stay overnight in the ward?",
        a: "Yes — that becomes a hospital attendant or Aya booking, and we can arrange the same person to continue.",
      },
      {
        q: "Will we get a record of what happened?",
        a: "Yes. The escort notes the doctor's advice, next appointment and tests prescribed, and shares it with the family.",
      },
    ],
    bookingOptions: [
      "Hospital Escort",
      "Hospital Admission Assistance",
      "Doctor Visit Assistance",
      "Diagnostic Test Visit Assistance",
      "Hospital Discharge Assistance",
      "Full Admission-to-Discharge Support",
    ],
    ctaTitle: "Hospital visit coming up?",
    ctaBody:
      "Share the hospital, date and what is planned. We will send an escort who knows how to get it done.",
  },

  {
    slug: "baby-care",
    categorySlug: "baby-newborn-care",
    navLabel: "Baby Care",
    name: "Baby & Newborn Care",
    eyebrow: "Mother & Baby",
    heroTitle: "Experienced hands for",
    heroHighlight: "your first months",
    heroDescription:
      "Trained newborn caregivers and Japa support so new mothers can rest, recover and settle into a routine with confidence.",
    heroImage: IMG.baby,
    badges: ["Newborn Trained", "Japa / Mother Care", "Night Support"],
    stats: [
      { value: "Newborn", label: "Specialist Staff" },
      { value: "Night", label: "Shifts Available" },
      { value: "Mother", label: "Care Included" },
    ],
    items: [
      {
        title: "Newborn Baby Care",
        body: "Caregivers experienced specifically with newborns — handling, swaddling, sleep and safety.",
      },
      {
        title: "Baby Care & Assistance",
        body: "Daily bathing, oil massage, sleep routines, sterilising bottles and constant supervision.",
      },
      {
        title: "Feeding & Burping Assistance",
        body: "Support with feeding schedules, bottle preparation, safe burping and colic comfort.",
      },
      {
        title: "Diaper Changing & Hygiene Care",
        body: "Frequent nappy changes, rash prevention and strict hygiene around the baby.",
      },
      {
        title: "Mother & Baby Support",
        body: "Postnatal support for the mother — meals, rest cover, and help through night feeds.",
      },
    ],
    highlights: [
      {
        title: "Only experienced caregivers",
        body: "Newborn care is not a first placement. We send staff who have cared for infants before.",
      },
      {
        title: "Nights are covered",
        body: "A night caregiver means the mother actually sleeps, which matters more than anything in month one.",
      },
      {
        title: "Hygiene is non-negotiable",
        body: "Handwashing, clean clothes, no outside footwear near the baby — checked, not assumed.",
      },
    ],
    suitableFor: [
      "First-time parents with no family support nearby",
      "Mothers recovering from a C-section",
      "Twins and multiple births",
      "Mothers returning to work early",
      "Families wanting night-only baby support",
    ],
    shifts: [
      { title: "Day Care (12 hrs)", detail: "Baby care through the day while the mother rests." },
      {
        title: "Night Care (12 hrs)",
        detail: "Night feeds and settling handled so parents sleep.",
      },
      { title: "24-Hour Live-In Japa", detail: "Round-the-clock mother and baby support." },
    ],
    faqs: [
      {
        q: "Is this the same as a Japa maid?",
        a: "Yes — Japa-style newborn and mother care is exactly what this covers, and we can arrange live-in or shift-based support.",
      },
      {
        q: "Will the caregiver cook for the mother?",
        a: "Light postnatal meal preparation for the mother is usually included. For full household cooking, add a maid alongside.",
      },
      {
        q: "How soon should we book before the delivery?",
        a: "Two to four weeks ahead is ideal, especially for live-in Japa support. Last-minute requests are still worth a call.",
      },
      {
        q: "Can we meet the caregiver first?",
        a: "Yes. We arrange an introduction before confirming, so the parents are comfortable with who will handle the baby.",
      },
    ],
    bookingOptions: [
      "Newborn Baby Care",
      "Baby Care & Assistance",
      "Japa / Mother & Baby Support",
      "Night Baby Care",
      "Feeding & Burping Assistance",
      "Live-In Baby Caregiver",
    ],
    ctaTitle: "Expecting, or just home with the baby?",
    ctaBody:
      "Tell us the due date or the baby's age and the shift you need. We will match an experienced caregiver.",
  },

  {
    slug: "aya-services",
    categorySlug: "aya-services",
    navLabel: "Aya Services",
    name: "Aya Services",
    eyebrow: "Male & Female Aya",
    heroTitle: "Trusted Aya for",
    heroHighlight: "home and hospital",
    heroDescription:
      "Background-verified male and female Aya for patients, elders and hospital duty — on flexible shifts, with quick replacement if plans change.",
    heroImage: IMG.aya,
    badges: ["Male & Female Aya", "Hospital Duty", "Flexible Shifts"],
    stats: [
      { value: "Both", label: "Male & Female Aya" },
      { value: "12 / 24", label: "Hour Shifts" },
      { value: "Quick", label: "Replacement Cover" },
    ],
    items: [
      {
        title: "Male & Female Aya",
        body: "Pick the Aya that suits the patient and the family's comfort — both are available on our panel.",
      },
      {
        title: "Patient Aya",
        body: "Bedside care, feeding, hygiene and mobility support for patients recovering at home.",
      },
      {
        title: "Elder Care Aya",
        body: "Daily assistance and companionship for senior citizens, with help around the house.",
      },
      {
        title: "Hospital Aya",
        body: "Full-shift Aya duty inside hospitals and nursing homes, so a relative need not stay.",
      },
      {
        title: "Home Care Aya",
        body: "Live-in or shift-based Aya for ongoing care at home.",
      },
    ],
    highlights: [
      {
        title: "Verified before placement",
        body: "Identity, address and references checked for every Aya we send.",
      },
      {
        title: "Experience matched to need",
        body: "A bedridden patient, an elder and a hospital ward each need different experience. We match, not just fill.",
      },
      {
        title: "No sudden gaps",
        body: "If your Aya cannot come, tell us and a replacement is arranged the same day wherever possible.",
      },
    ],
    suitableFor: [
      "Patients needing bedside help at home",
      "Hospital or nursing home ward duty",
      "Elders needing daily assistance",
      "Families needing night-only cover",
      "Long-term care over months",
    ],
    shifts: COMMON_SHIFTS,
    faqs: [
      {
        q: "What does an Aya actually do?",
        a: "An Aya handles non-clinical care: feeding, bathing, changing, helping the patient move, keeping the bed clean and staying alert through the shift. Injections and dressings need a nurse.",
      },
      {
        q: "Do you provide Aya for hospital duty?",
        a: "Yes. Hospital Aya is one of our most-requested services, for both government and private hospitals in Kolkata.",
      },
      {
        q: "Is a male Aya available for a male patient?",
        a: "Yes. Many families prefer same-gender care for bathing and toileting, and we keep male Aya available for exactly this.",
      },
      {
        q: "What is the minimum booking period?",
        a: "We take bookings from a single 12-hour shift upward. Monthly placements work out cheaper per day — ask us when you call.",
      },
    ],
    bookingOptions: [
      "Male Aya",
      "Female Aya",
      "Patient Aya",
      "Elder Care Aya",
      "Hospital Aya",
      "Home Care Aya",
      "Live-In Aya",
    ],
    ctaTitle: "Need an Aya today?",
    ctaBody:
      "Tell us where — home or hospital — the shift, and whether you want a male or female Aya. We will confirm availability.",
  },

  {
    slug: "house-maid",
    categorySlug: "house-maid-domestic-help",
    navLabel: "House Maid",
    name: "House Maid & Domestic Help",
    eyebrow: "Verified Household Staff",
    heroTitle: "Household help you",
    heroHighlight: "can actually rely on",
    heroDescription:
      "Full-time and part-time maids for cooking, cleaning and everyday household work — identity verified and placed quickly.",
    heroImage: IMG.maid,
    badges: ["Full & Part Time", "Identity Verified", "Cooking Available"],
    stats: [
      { value: "Part / Full", label: "Time Options" },
      { value: "Verified", label: "Aadhaar & Address" },
      { value: "Replacement", label: "Cover Provided" },
    ],
    items: [
      {
        title: "Full-Time Maid",
        body: "Live-in or full-day maid handling the complete running of the household.",
      },
      {
        title: "Part-Time Maid",
        body: "Fixed-hour help for specific daily tasks, once or twice a day.",
      },
      {
        title: "House Cleaning",
        body: "Sweeping, mopping, dusting, bathroom cleaning and keeping rooms in order.",
      },
      {
        title: "Cooking Assistance",
        body: "Daily meal preparation to your family's taste — Bengali, North Indian or as instructed.",
      },
      {
        title: "Utensil Washing",
        body: "Kitchen clean-up and utensil washing after every meal.",
      },
      {
        title: "General Household Work",
        body: "Laundry, folding, organising and the everyday chores that pile up.",
      },
    ],
    highlights: [
      {
        title: "Documents on record",
        body: "Aadhaar, local address and references are collected and kept on file before placement.",
      },
      {
        title: "Clear work agreement",
        body: "Hours, tasks, offs and wages are agreed in writing up front, so there are no arguments later.",
      },
      {
        title: "Replacement, no re-hunting",
        body: "If a maid leaves, we replace her — you do not start the search again from scratch.",
      },
    ],
    suitableFor: [
      "Working couples with no time for housework",
      "Families with elderly members at home",
      "New mothers needing household cover",
      "Large families needing full-time help",
      "Anyone who needs cooking handled daily",
    ],
    shifts: [
      { title: "Part-Time (2 – 4 hrs)", detail: "Cleaning and utensils, once or twice a day." },
      {
        title: "Full-Time (8 – 12 hrs)",
        detail: "Cooking, cleaning and household work through the day.",
      },
      { title: "Live-In", detail: "Stay-at-home maid with accommodation provided by the family." },
    ],
    faqs: [
      {
        q: "Are the maids verified?",
        a: "Yes. We collect Aadhaar, confirm a local address and take references before anyone is placed with a family.",
      },
      {
        q: "Can we get a maid who only cooks?",
        a: "Yes — cook-only placements are common. Tell us the cuisine and meal timings and we will match accordingly.",
      },
      {
        q: "What if the maid stops coming?",
        a: "Inform us and we arrange a replacement. That is the main reason to place through an agency rather than hiring directly.",
      },
      {
        q: "Do you place live-in maids?",
        a: "Yes, where the family can provide accommodation and reasonable working hours. We will be upfront about what is realistic.",
      },
    ],
    bookingOptions: [
      "Full-Time Maid",
      "Part-Time Maid",
      "Live-In Maid",
      "House Cleaning",
      "Cooking Assistance",
      "Utensil Washing",
      "General Household Work",
    ],
    ctaTitle: "Need household help?",
    ctaBody:
      "Tell us the tasks, the hours and your locality in Kolkata. We will place a verified maid.",
  },

  {
    slug: "housekeeping",
    categorySlug: "housekeeping-services",
    navLabel: "Housekeeping",
    name: "Housekeeping Services",
    eyebrow: "Home & Hospital",
    heroTitle: "Housekeeping with",
    heroHighlight: "a standard to it",
    heroDescription:
      "Trained housekeeping staff for homes, hospitals and nursing homes — uniformed, supervised and working to a hygiene-first routine.",
    heroImage: IMG.housekeeping,
    badges: ["Trained Staff", "Hospital Grade", "Supervised Daily"],
    stats: [
      { value: "Home +", label: "Hospital Trained" },
      { value: "Daily", label: "Supervision" },
      { value: "Teams", label: "Or Single Staff" },
    ],
    items: [
      {
        title: "Home Housekeeping",
        body: "Scheduled deep cleaning and daily upkeep for residences, done to a checklist.",
      },
      {
        title: "Hospital / Nursing Home Housekeeping",
        body: "Hygiene-compliant cleaning for wards, cabins, OTs and common areas with correct disinfection practice.",
      },
      {
        title: "Cleaning & Maintenance Support",
        body: "Ongoing housekeeping staff plus light maintenance support, on contract.",
      },
    ],
    highlights: [
      {
        title: "Checklist, not guesswork",
        body: "Staff work to a defined daily and weekly checklist, so nothing is skipped quietly.",
      },
      {
        title: "Clinical-space trained",
        body: "For hospitals and nursing homes, staff are briefed on infection-control basics and waste segregation.",
      },
      {
        title: "Supervised contracts",
        body: "Institutional contracts come with a supervisor and a point of contact for escalation.",
      },
    ],
    suitableFor: [
      "Nursing homes and small hospitals",
      "Clinics and diagnostic centres",
      "Residential apartments and bungalows",
      "Offices needing daily housekeeping",
      "Post-renovation and deep-clean jobs",
    ],
    shifts: [
      { title: "Daily Shift Staff", detail: "Fixed-hour housekeeping staff, every day." },
      {
        title: "Institutional Contract",
        detail: "Multiple staff with a supervisor, on a monthly contract.",
      },
      { title: "One-Time Deep Clean", detail: "A full deep clean of the premises." },
    ],
    faqs: [
      {
        q: "Do you take nursing home housekeeping contracts?",
        a: "Yes. We supply trained housekeeping staff to nursing homes and hospitals in Kolkata, with a supervisor for larger contracts.",
      },
      {
        q: "Do you bring your own cleaning materials?",
        a: "For contracts this is agreed in advance — either you supply consumables or we quote inclusive of them. We will be clear about it before you sign.",
      },
      {
        q: "Can we start with a trial?",
        a: "Yes. A short trial period is a fair way to check standards, and we are comfortable with it.",
      },
      {
        q: "Is staff uniform provided?",
        a: "Yes, for institutional placements staff are placed in uniform.",
      },
    ],
    bookingOptions: [
      "Home Housekeeping",
      "Hospital / Nursing Home Housekeeping",
      "Cleaning & Maintenance Support",
      "One-Time Deep Clean",
      "Institutional Housekeeping Contract",
    ],
    ctaTitle: "Need housekeeping staff?",
    ctaBody:
      "Tell us the premises, the area and how many staff you need. We will send a quote and arrange a visit.",
  },
];

/** Look up a landing-page content block by its route slug. */
export function getServiceLanding(slug: ServiceSlug): ServiceLandingContent | undefined {
  return SERVICE_LANDINGS.find((entry) => entry.slug === slug);
}

/** Compact list used by navigation menus and the services index. */
export const SERVICE_NAV = SERVICE_LANDINGS.map((entry) => ({
  to: `/${entry.slug}` as const,
  label: entry.navLabel,
  name: entry.name,
  description: entry.heroDescription,
  image: entry.heroImage,
}));
