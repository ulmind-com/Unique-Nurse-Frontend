import { useState, useEffect, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SITE, telHref, waHref } from "@/config/site";
import type { ServiceLandingContent } from "@/content/services";
import { SERVICE_LANDINGS } from "@/content/services";
import { settingsQ, categoriesQ } from "@/lib/api/queries";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import { ServiceBookingModal } from "@/components/forms/ServiceBookingModal";
import { cn } from "@/lib/utils";

/**
 * The single template behind every service vertical.
 *
 * All copy comes from `src/content/services.ts`, so a new vertical needs a
 * content entry and a one-line route file — never a new 1,000-line page.
 */
export function ServiceLanding({ content }: { content: ServiceLandingContent }) {
  const { data: settings } = useQuery(settingsQ());
  const phone = settings?.phone?.replace(/[^\d+]/g, "") || SITE.phone;
  const whatsapp = settings?.whatsapp?.replace(/\D/g, "") || SITE.whatsapp;
  const others = SERVICE_LANDINGS.filter((entry) => entry.slug !== content.slug).slice(0, 4);

  return (
    <div className="bg-background">
      <Hero content={content} phone={phone} whatsapp={whatsapp} />
      <WhatWeProvide content={content} />
      <WhyUs content={content} />
      <ShiftsAndFit content={content} />
      <Faqs content={content} />
      <ClosingCta content={content} phone={phone} whatsapp={whatsapp} />
      <OtherServices others={others} />
    </div>
  );
}

/* ─────────────────────────────── Hero ─────────────────────────────── */

function Hero({
  content,
  phone,
  whatsapp,
}: {
  content: ServiceLandingContent;
  phone: string;
  whatsapp: string;
}) {
  const { data: categoriesData } = useQuery(categoriesQ({ limit: 20 }));

  // Try to find the matching category from the API for hero images
  const category = categoriesData?.items?.find(
    (c) =>
      c.slug === content.categorySlug ||
      c.name?.toLowerCase() === content.name.toLowerCase(),
  );

  // Build image array: prefer API hero_images, fallback to single heroImage
  const heroImages = useMemo(() => {
    const apiImages = category?.hero_images
      ?.map((img: any) => img.url)
      .filter(Boolean) as string[] | undefined;
    if (apiImages && apiImages.length > 0) return apiImages;
    return [content.heroImage];
  }, [category?.hero_images, content.heroImage]);

  const hasSlider = heroImages.length > 1;
  const SLIDE_DURATION = 6000;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!hasSlider) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [hasSlider, heroImages.length]);

  return (
    <section className="relative min-h-[100svh] lg:min-h-svh flex items-center overflow-hidden">
      {/* Hero background image slider */}
      <div className="absolute inset-0 -z-20 w-full h-full bg-[#0a0a0a]">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 8, ease: "easeOut" }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <picture>
              <img 
                src={heroImages[currentSlide]} 
                alt="" 
                className="w-full h-full object-cover object-[center_30%]"
              />
            </picture>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Cinematic dark overlay similar to home page hero */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      {/* Cross/plus pattern */}
      <div className="absolute inset-0 -z-10 opacity-5 pointer-events-none" aria-hidden>
        {Array.from({ length: 6 }).map((_: any, i: number) => (
          <div
            key={i}
            className="absolute text-white font-bold text-4xl"
            style={{
              top: `${15 + i * 15}%`,
              left: `${60 + (i % 3) * 12}%`,
              transform: `rotate(${i * 12}deg)`,
            }}
          >
            +
          </div>
        ))}
      </div>

      <div className="container-x relative z-10 pt-24 pb-12 lg:pt-28 lg:pb-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {content.navLabel}
            </div>

            <h1 
              className="font-display font-medium text-white tracking-tight leading-[1.1] text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] mb-4 whitespace-pre-line"
              style={{ textShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
            >
              {content.heroTitle}
              <br />
              <span className="text-gradient-brand">{content.heroHighlight}</span>
            </h1>

            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mb-6">
              {content.heroDescription}
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <ServiceBookingModal
                modalTitle={`Book ${content.name}`}
                modalDescription="Share a few details and our care coordinator will call you back shortly."
                serviceOptions={content.bookingOptions}
                selectPlaceholder="Select what you need"
                source={content.slug}
              >
                <button
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
                >
                  Book This Service
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </ServiceBookingModal>

              <a
                href={telHref.replace(SITE.phone, phone)}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-8 py-3.5 text-[15px] font-medium text-white shadow-sm hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5 text-[#25D366]" />
                Call Now
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-6">
              {content.stats.map((s: any) => (
                <div key={s.label}>
                  <div className="text-xl font-display font-bold text-white">{s.value}</div>
                  <div className="text-xs text-white/55 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {hasSlider && (
              <div className="mt-8 flex items-center gap-2">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === currentSlide
                        ? "w-8 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/60",
                    )}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────── What we provide ───────────────────────── */

function WhatWeProvide({ content }: { content: ServiceLandingContent }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <div className="max-w-2xl">
            <Eyebrow>What's included</Eyebrow>
            <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl lg:text-[2.75rem]">
              Everything under {content.name}
            </h2>
            <p className="mt-4 text-base text-muted-foreground lg:text-lg">
              Book any one of these on its own, or combine them into a single placement — we will
              tell you honestly which option costs less.
            </p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, i) => (
            <StaggerItem key={item.title}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant">
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-sm font-semibold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Check className="h-5 w-5 text-primary/30 transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-5 font-display text-xl tracking-tight">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ──────────────────────────────── Why us ──────────────────────────── */

function WhyUs({ content }: { content: ServiceLandingContent }) {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "var(--dark)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 85% 10%, color-mix(in oklab, var(--primary) 45%, transparent), transparent 70%), radial-gradient(45% 45% at 5% 90%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div>
              <Eyebrow tone="dark">Why families choose us</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                Verified staff, honest advice, and someone who picks up the phone.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65 lg:text-base">
                We are based in Garia and we place staff across Kolkata ourselves — so when
                something goes wrong, you are talking to the people who can actually fix it.
              </p>

              <div className="mt-8 space-y-3 text-sm">
                <a
                  href={telHref}
                  className="flex items-center gap-3 text-white/85 transition-colors hover:text-white"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                    <Phone className="h-4 w-4" />
                  </span>
                  {SITE.phoneDisplay}
                </a>
                <div className="flex items-start gap-3 text-white/65">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="pt-2">{SITE.address.full}</span>
                </div>
                <div className="flex items-center gap-3 text-white/65">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
                    <Clock className="h-4 w-4" />
                  </span>
                  {SITE.hours}
                </div>
              </div>
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-4 sm:grid-cols-2">
            {content.highlights.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-3xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.09]">
                  <ShieldCheck className="h-6 w-6 text-white" />
                  <h3 className="mt-5 font-display text-lg tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
            <StaggerItem className="sm:col-span-2">
              <div
                className="rounded-3xl p-7"
                style={{
                  background:
                    "linear-gradient(120deg, var(--primary), color-mix(in oklab, var(--accent) 80%, black 10%))",
                }}
              >
                <p className="font-display text-xl leading-snug text-white">
                  Not sure what you need — a nurse, an attendant or an Aya?
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Call us and describe the patient. We will tell you the cheapest option that
                  actually works.
                </p>
                <a
                  href={telHref}
                  className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]"
                >
                  <Phone className="h-4 w-4" />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Shifts + who it's for ──────────────────────── */

function ShiftsAndFit({ content }: { content: ServiceLandingContent }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <Eyebrow>Shift options</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                Pick the cover that fits your week
              </h2>
              <div className="mt-8 space-y-3">
                {content.shifts.map((shift) => (
                  <div
                    key={shift.title}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/30"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft">
                      <Clock className="h-4.5 w-4.5 text-primary" />
                    </span>
                    <div>
                      <div className="font-medium">{shift.title}</div>
                      <div className="mt-0.5 text-sm text-muted-foreground">{shift.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[32px] border border-border bg-secondary p-8 lg:p-10">
              <Eyebrow>Who it's for</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                This is usually the right choice when…
              </h2>
              <ul className="mt-8 space-y-4">
                {content.suitableFor.map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-secondary-foreground">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────── FAQs ───────────────────────────── */

function Faqs({ content }: { content: ServiceLandingContent }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 lg:py-28" style={{ background: "var(--muted)" }}>
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-4 font-display text-3xl tracking-tight md:text-4xl">
                Asked before every booking
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">
                Something not covered here? Call{" "}
                <a
                  href={telHref}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {SITE.phoneDisplay}
                </a>{" "}
                and ask directly.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              {content.faqs.map((faq, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={faq.q}
                    className={cn(
                      "overflow-hidden rounded-2xl border bg-surface transition-colors",
                      isOpen ? "border-primary/30" : "border-border",
                    )}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base tracking-tight">{faq.q}</span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                          isOpen && "rotate-180",
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── Closing CTA ───────────────────────── */

function ClosingCta({
  content,
  phone,
  whatsapp,
}: {
  content: ServiceLandingContent;
  phone: string;
  whatsapp: string;
}) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-x">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[36px] px-8 py-14 text-center lg:px-16 lg:py-20"
            style={{
              background:
                "linear-gradient(130deg, var(--primary) 0%, color-mix(in oklab, var(--accent) 88%, black 6%) 100%)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(40% 60% at 15% 10%, rgba(255,255,255,0.35), transparent 70%)",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
                {content.ctaTitle}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/85 lg:text-base">
                {content.ctaBody}
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <ServiceBookingModal
                  modalTitle={`Book ${content.name}`}
                  modalDescription="Share a few details and our care coordinator will call you back shortly."
                  serviceOptions={content.bookingOptions}
                  selectPlaceholder="Select what you need"
                  source={`${content.slug}-cta`}
                >
                  <button className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]">
                    Book Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </ServiceBookingModal>
                <a
                  href={telHref.replace(SITE.phone, phone)}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <Phone className="h-4 w-4" />
                  {SITE.phoneDisplay}
                </a>
                <a
                  href={waHref(`Hi, I need ${content.name}.`).replace(SITE.whatsapp, whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────── Other services ───────────────────────── */

function OtherServices({ others }: { others: ServiceLandingContent[] }) {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Also available</Eyebrow>
              <h2 className="mt-3 font-display text-2xl tracking-tight md:text-3xl">
                Other services we provide
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((entry) => (
            <StaggerItem key={entry.slug}>
              <Link
                to={`/${entry.slug}`}
                className="group block h-full overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={entry.heroImage}
                    alt={entry.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base tracking-tight">{entry.name}</h3>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ────────────────────────────── Shared ───────────────────────────── */

function Eyebrow({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em]",
        tone === "dark"
          ? "border-white/20 bg-white/5 text-white/70"
          : "border-border bg-surface text-muted-foreground",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}
