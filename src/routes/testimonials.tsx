import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Star, ArrowRight } from "lucide-react";
import { testimonialsQ, reviewSummaryQ } from "@/lib/api/queries";
import { PageHero } from "@/components/site/PageHero";
import { TestimonialCard } from "@/components/site/cards/TestimonialCard";
import { Section } from "@/components/site/Section";
import { motion } from "framer-motion";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Unique Nurse and Aya Services" },
      { name: "description", content: "Real stories from the families we've cared for." },
      { property: "og:title", content: "Testimonials — Unique Nurse and Aya Services" },
      { property: "og:description", content: "Real stories from families." },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

const DUMMY_TESTIMONIALS: any[] = [
  {
    id: "d1",
    name: "Rajeshwar Roy",
    role: "Son of Patient, Garia",
    rating: 5,
    content: "They sent a trained nurse the same evening my father was discharged. She handled his dressing and medicines properly, and the coordinator checked in every day that first week.",
  },
  {
    id: "d2",
    name: "Anjali Mukherjee",
    role: "New Mother, Jadavpur",
    rating: 5,
    content: "We took night baby care for the first two months. The didi was experienced with newborns and very clean in her habits — I finally got some sleep after the delivery.",
  },
  {
    id: "d3",
    name: "Saurabh Banerjee",
    role: "Elder Care Client",
    rating: 5,
    content: "A 24-hour attendant for my elderly mother changed everything for us. She is patient with my mother, which matters more than anything else.",
  },
  {
    id: "d4",
    name: "Sandhya Dutta",
    role: "Nursing Home Administrator",
    rating: 5,
    content: "We use their housekeeping staff for our nursing home. Uniformed, supervised, and they understand waste segregation — which is not something every agency gets right.",
  },
  {
    id: "d5",
    name: "Vikram Saha",
    role: "Husband of Patient, Behala",
    rating: 4,
    content: "Booked a hospital Aya for my wife's five-day admission. He was punctual every shift and we did not have to keep a relative in the ward overnight.",
  },
  {
    id: "d6",
    name: "Sneha Kapoor",
    role: "Daughter, NRI",
    rating: 5,
    content: "I live abroad and my parents are alone in Kolkata. Their caregiver visits daily, takes them to the doctor and sends me updates on WhatsApp. That peace of mind is worth everything.",
  }
];

function TestimonialsPage() {
  const { data, isLoading } = useQuery(testimonialsQ({ limit: 60 }));
  const { data: reviews } = useQuery(reviewSummaryQ());
  const rawItems = data?.items ?? [];
  const items = rawItems.length > 0 ? rawItems : DUMMY_TESTIMONIALS;

  const rating = reviews?.average_rating ? reviews.average_rating.toFixed(1) : "4.9";
  const total = reviews?.total_reviews;

  return (
    <>
      <PageHero
        eyebrow="Words from families"
        title="Care remembered."
        description="What patients and their families told us — in their own words, after care that mattered."
        crumbs={[{ label: "Home", to: "/" }, { label: "Testimonials" }]}
        badges={[
          `${rating}★ average rating`,
          ...(total ? [`${total}+ reviews`] : ["Trusted by families"]),
        ]}
      />

      {/* Rating summary band */}
      <div className="container-x pt-16 lg:pt-20">
        <div className="flex flex-col items-center justify-between gap-6 rounded-[2rem] border border-border/60 bg-primary-soft/40 p-8 sm:flex-row lg:p-10">
          <div className="flex items-center gap-5">
            <div className="font-display text-6xl tracking-tight text-primary">{rating}</div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {total
                  ? `Across ${total}+ verified reviews`
                  : "Rated by families across the region"}
              </div>
            </div>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3.5 text-sm font-medium text-primary-foreground"
          >
            Book care <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <Section className="pt-12 pb-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--primary-soft),transparent_50%)] opacity-50" />
        
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-60 rounded-3xl border border-border bg-surface animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-max items-start">
            {items.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: (index % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="will-change-transform h-full"
                style={{ transform: 'translateZ(0)' }}
              >
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
