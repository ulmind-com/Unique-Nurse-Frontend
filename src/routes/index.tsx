import { useEffect, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { blogsQ, faqsQ, reviewSummaryQ, settingsQ, testimonialsQ } from "@/lib/api/queries";
import { Section, SectionHeader } from "@/components/site/Section";
import { BlogCard } from "@/components/site/cards/BlogCard";
import { VideoTestimonialsSection } from "@/components/site/VideoTestimonialsSection";
import { TestimonialCard } from "@/components/site/cards/TestimonialCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { GoogleReviews } from "@/components/site/GoogleReviews";
import { Hero } from "@/components/site/Hero";
import { CategoryShowcasePremium } from "@/components/site/CategoryShowcasePremium";
import { ComprehensiveServicesSection } from "@/components/site/ComprehensiveServicesSection";
import { HowItWorksSection } from "@/components/site/HowItWorksSection";
import { ProfessionalsSection } from "@/components/site/ProfessionalsSection";
import { PremiumScrollReveal } from "@/components/site/PremiumScrollReveal";

import { CommitmentSection } from "@/components/site/CommitmentSection";
import { OurStaffSection } from "@/components/site/OurStaffSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — Nursing, Aya & Patient Care in Kolkata` },
      {
        name: "description",
        content: SITE.description,
      },
      { property: "og:title", content: `${SITE.name} — Nursing, Aya & Patient Care in Kolkata` },
      {
        property: "og:description",
        content: SITE.description,
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* 1. Hero Page / Top Banner */}
      <Hero />
      <TrustBar />

      {/* 1.5. Our Staff Section */}
      <PremiumScrollReveal>
        <OurStaffSection />
      </PremiumScrollReveal>

      {/* 2. Our Categories Section (Quick view icons/boxes) */}
      <PremiumScrollReveal>
        <CategoryShowcasePremium />
      </PremiumScrollReveal>

      {/* 3. Our Comprehensive Services (4 detailed static cards — Aroha Cares style) */}
      <ComprehensiveServicesSection />

      {/* 4. About Us Section */}
      <PremiumScrollReveal>
        <ProfessionalsSection />
      </PremiumScrollReveal>

      {/* 5. Getting Started Easy (Step 1, 2, 3) */}
      <PremiumScrollReveal>
        <HowItWorksSection />
      </PremiumScrollReveal>

      {/* 7. Care Blog Section */}
      <PremiumScrollReveal>
        <BlogVideosSection />
      </PremiumScrollReveal>

      {/* 6. They Say About Unique Nurse and Aya Services (Testimonials) */}
      <PremiumScrollReveal>
        <TestimonialsSection />
      </PremiumScrollReveal>

      {/* Why Choose Unique Nurse and Aya Services + Commitment to Excellence */}
      <PremiumScrollReveal>
        <CommitmentSection />
      </PremiumScrollReveal>

      <PremiumScrollReveal>
        <VideoTestimonialsSection />
      </PremiumScrollReveal>
      <PremiumScrollReveal>
        <ReviewsSection />
      </PremiumScrollReveal>

      {/* 8. FAQ's Section */}
      <PremiumScrollReveal>
        <FaqSection />
      </PremiumScrollReveal>

      {/* Closing Contact CTA */}
      <PremiumScrollReveal>
        <ContactCta />
      </PremiumScrollReveal>
    </>
  );
}

function TrustBar() {
  const { data: settings } = useQuery(settingsQ());
  const items = settings?.trust_bar_items?.length
    ? settings.trust_bar_items
    : [
        "Licensed nurses",
        "24/7 helpline",
        "Insurance-friendly",
        "Transparent pricing",
        "Background-checked",
      ];
  return (
    <div className="border-y border-border/70 bg-surface/60 backdrop-blur">
      <div className="container-x py-4 overflow-hidden">
        <div className="flex items-center gap-10 whitespace-nowrap text-xs uppercase tracking-[0.2em] text-muted-foreground animate-marquee">
          {[...items, ...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-primary" /> {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const DEFAULT_TESTIMONIALS: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [
  {
    id: "1",
    name: "Rajeshwar Roy",
    role: "Son of Patient, Kolkata",
    rating: 5,
    content:
      "They sent a trained nurse the same evening my father was discharged. She handled his dressing and medicines properly, and the coordinator checked in every day that first week.",
  },
  {
    id: "2",
    name: "Anjali Mukherjee",
    role: "New Mother, Garia",
    rating: 5,
    content:
      "We took night baby care for the first two months. The didi was experienced with newborns and very clean in her habits — I finally got some sleep.",
  },
  {
    id: "3",
    name: "Saurabh Banerjee",
    role: "Elder Care Client",
    rating: 5,
    content:
      "I live abroad and my mother is alone in Kolkata. Their caregiver visits daily, takes her to the doctor and sends me updates. That peace of mind is worth everything.",
  },
];

function TestimonialsSection() {
  const { data } = useQuery(testimonialsQ({ limit: 8 }));
  const rawItems = data?.items ?? [];
  const items = rawItems.length ? rawItems : DEFAULT_TESTIMONIALS;

  const isMobile = useIsMobile();
  const plugins = !isMobile ? [
    AutoScroll({
      playOnInit: true,
      speed: 1.2,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      direction: "forward",
    })
  ] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    dragFree: !isMobile, 
    align: "start" 
  }, plugins);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Section className="overflow-hidden pb-4 pt-2 lg:pt-4">
      <SectionHeader eyebrow="Testimonials & Reviews" title="They Say About Unique Nurse and Aya Services" align="center" />
      <div className="mt-10 -mx-4 md:-mx-8">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex pl-4 md:pl-8">
            {[...items, ...items, ...items].map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_50%] md:flex-[0_0_35%] lg:flex-[0_0_28%] pr-4 md:pr-6"
              >
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {isMobile && (
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-6 bg-primary" : "w-2 bg-primary/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

const DEFAULT_BLOGS: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [
  {
    id: "1",
    title: "How to Ensure Safety & Comfort for Seniors Recovering at Home",
    slug: "senior-home-recovery-safety",
    category_name: "Elder Care",
    excerpt:
      "Essential guidelines for home adaptations, fall prevention, and vitals monitoring to create a safe post-hospitalization healing sanctuary.",
    author_name: "Dr. A. Sengupta",
    read_time: "4",
    featured_image: "/assets/hero-slide-2.jpeg",
    published_at: "2026-07-28T10:00:00Z",
  },
  {
    id: "2",
    title: "Nurse, Attendant or Aya — Which One Does Your Patient Actually Need?",
    slug: "nurse-attendant-or-aya-which-to-hire",
    category_name: "Patient Care",
    excerpt:
      "The three roles cost very different amounts and do very different work. A plain guide to picking the right one without overpaying.",
    author_name: "Care Team",
    read_time: "5",
    featured_image: "/assets/hero-slide-1.jpeg",
    published_at: "2026-07-22T10:00:00Z",
  },
  {
    id: "3",
    title: "Hiring a Live-In Maid in Kolkata: What to Agree Before Day One",
    slug: "hiring-live-in-maid-kolkata-checklist",
    category_name: "Household Help",
    excerpt:
      "Hours, offs, wages, accommodation and tasks — settling these in writing up front is what keeps a placement working long term.",
    author_name: "Placement Desk",
    read_time: "3",
    featured_image: "/assets/hero-slide-3.jpeg",
    published_at: "2026-07-15T10:00:00Z",
  },
];

function BlogVideosSection() {
  const { data: blogs } = useQuery(blogsQ({ limit: 6 }));
  const rawItems = blogs?.items ?? [];
  const bItems = rawItems.length ? rawItems : [...DEFAULT_BLOGS, ...DEFAULT_BLOGS];

  const isMobile = useIsMobile();
  const plugins = !isMobile ? [
    AutoScroll({
      playOnInit: true,
      speed: 1.2,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      direction: "forward",
    })
  ] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    dragFree: !isMobile, 
    align: "start" 
  }, plugins);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Section className="overflow-hidden pt-10 pb-2 lg:pt-12 lg:pb-4">
      <div className="md:flex items-end justify-between mb-10">
        <SectionHeader
          eyebrow="Care Blog"
          title="Latest from Our Care Blog"
          align="center"
        />
      </div>

      <div className="-mx-4 md:-mx-8">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex pl-4 md:pl-8">
            {bItems.map((b, i) => (
              <div
                key={`${b.id}-${i}`}
                className="min-w-0 flex-[0_0_58%] sm:flex-[0_0_40%] md:flex-[0_0_27%] lg:flex-[0_0_21%] pr-4 md:pr-6"
              >
                <BlogCard blog={b} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {isMobile && (
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-6 bg-primary" : "w-2 bg-primary/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
    </Section>
  );
}

const DEFAULT_FAQS: any /* eslint-disable-line @typescript-eslint/no-explicit-any */[] = [
  {
    id: "1",
    question: "How quickly can Unique Nurse and Aya Services arrange a nurse or caregiver at my home?",
    answer:
      "For most Kolkata localities we place a nurse, Aya or attendant within a few hours of confirmation. Call us and we will tell you honestly what is available for your area and shift.",
  },
  {
    id: "2",
    question: "Are all Unique Nurse and Aya Services caregivers and nurses certified and background-checked?",
    answer:
      "Yes. We verify Aadhaar, a local address and references for every nurse, Aya, attendant and maid, and we check nursing qualifications and registration before any clinical placement.",
  },
  {
    id: "3",
    question:
      "Can I request a replacement if the assigned caregiver does not suit our family schedule?",
    answer:
      "Yes. Tell us what is not working and we arrange a replacement — usually the same day. Comfort with the caregiver matters as much as the skill.",
  },
  {
    id: "4",
    question: "What is the difference between a nurse, an attendant and an Aya?",
    answer:
      "A nurse handles clinical work — injections, IV, dressings and monitoring. An attendant or Aya handles everyday bedside care such as feeding, hygiene, mobility and company. Describe the patient when you call and we will tell you the cheaper option that actually works.",
  },
  {
    id: "5",
    question: "How does billing and pricing work for long-term care plans?",
    answer:
      "Pricing is agreed up front against the shift you choose — 8, 12 or 24-hour — and billed weekly or monthly. Monthly placements work out cheaper per day. No hidden charges.",
  },
];

function FaqSection() {
  const { data } = useQuery(faqsQ({ limit: 6 }));
  const rawItems = data?.items ?? [];
  const items = rawItems.length ? rawItems : DEFAULT_FAQS;

  return (
    <Section className="bg-muted">
      <div className="grid gap-12 lg:grid-cols-2 items-start">
        {/* Left Side: Illustration */}
        <div className="flex items-center justify-center lg:justify-end pr-0 lg:pr-8">
          <img
            src="/assets/faq-illustration.jpeg"
            alt="Telemedicine Consultation"
            className="w-[85%] md:w-[70%] lg:w-[85%] max-w-md h-auto mix-blend-multiply"
          />
        </div>

        {/* Right Side: FAQs */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col justify-center will-change-transform"
          style={{ transform: 'translateZ(0)' }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-foreground mb-6 leading-tight tracking-tight"
          >
            Frequently Asked
            <br />
            <span className="text-primary">Questions</span>
          </motion.h2>

          <FaqAccordion items={items.slice(0, 6)} />

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="mt-8 text-center sm:text-left"
          >
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 text-primary px-8 py-3.5 font-semibold hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Read More...
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

function ReviewsSection() {
  const { data } = useQuery(reviewSummaryQ());
  if (!data || data.total_reviews === 0) return null;
  return (
    <Section>
      <GoogleReviews summary={data} />
    </Section>
  );
}

function ContactCta() {
  const { data: settings } = useQuery(settingsQ());
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] p-10 lg:p-16 text-white shadow-[var(--shadow-elegant)] will-change-transform"
        style={{ background: "linear-gradient(135deg, var(--accent), var(--primary))", transform: 'translateZ(0)' }}
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm uppercase tracking-[0.2em] text-white/70 mb-3">
              Ready when you are
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              {settings?.cta_title || "Talk to our care coordinator."}
            </h2>
            <p className="mt-4 text-white/80 max-w-md">
              {settings?.cta_description ||
                "Tell us about the patient and the shift you need — we will match the right staff, usually the same day."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/booking"
              className="rounded-full bg-white text-dark px-6 py-3.5 text-sm font-medium transition-transform hover:scale-105"
            >
              Book care
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/30 text-white px-6 py-3.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
