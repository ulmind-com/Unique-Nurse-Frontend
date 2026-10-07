import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, MessageCircle, Clock, Mail, ArrowUpRight } from "lucide-react";
import { settingsQ, socialQ } from "@/lib/api/queries";
import { SITE, waHref, mapEmbedUrl } from "@/config/site";
import { SERVICE_NAV } from "@/content/services";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const COMPANY_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Careers", to: "/careers" },
  { label: "Blogs", to: "/blogs" },
  { label: "Testimonials", to: "/testimonials" },
];

const SUPPORT_LINKS = [
  { label: "Contact Us", to: "/contact" },
  { label: "FAQs", to: "/faq" },
  { label: "Book a Service", to: "/booking" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Refund Policy", to: "/refund-policy" },
];

export function Footer() {
  const { data: settings } = useQuery(settingsQ());
  const { data: social } = useQuery(socialQ());

  const name = settings?.website_name || SITE.name;
  const phoneDisplay = settings?.phone || SITE.phoneDisplay;
  const phoneDial = (settings?.phone || SITE.phone).replace(/[^\d+]/g, "");
  const whatsapp = settings?.whatsapp?.replace(/\D/g, "") || SITE.whatsapp;
  const address = settings?.address || SITE.address.full;
  const email = settings?.email || SITE.email;
  const logoUrl = typeof settings?.logo === "string" ? settings.logo : (settings?.logo as any)?.url;

  return (
    <footer
      className="relative overflow-hidden border-t border-white/10 pt-16"
      style={{ background: "var(--dark)" }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(55% 50% at 88% 0%, color-mix(in oklab, var(--primary) 40%, transparent), transparent 70%), radial-gradient(45% 45% at 2% 100%, color-mix(in oklab, var(--accent) 24%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="container-x relative z-10 pb-14">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr_1fr] lg:gap-16">
          {/* ── Brand + contact ── */}
          <div>
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <div className="rounded-xl bg-white p-1.5">
                  <img src={logoUrl} alt={name} className="h-9 w-9 shrink-0 object-contain" />
                </div>
              ) : (
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 21s-7-4.35-9.5-8.5C.85 9.5 2.4 5.5 6 5c2.05-.28 3.7.9 6 3 2.3-2.1 3.95-3.28 6-3 3.6.5 5.15 4.5 3.5 7.5C19 16.65 12 21 12 21Z" />
                  </svg>
                </div>
              )}
              <div className="font-display text-xl leading-tight tracking-tight text-white sm:text-2xl">
                {name}
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
              {settings?.footer_description || SITE.description}
            </p>

            <ul className="mt-7 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
                  <MapPin className="h-4 w-4 text-white" />
                </span>
                <span className="pt-1.5 leading-relaxed text-white/70">{address}</span>
              </li>
              <li>
                <a
                  href={`tel:${phoneDial}`}
                  className="group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
                    <Phone className="h-4 w-4 text-white" />
                  </span>
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waHref(`Hi ${name}, I need help with a service.`).replace(
                    SITE.whatsapp,
                    whatsapp,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
                    <MessageCircle className="h-4 w-4 text-white" />
                  </span>
                  WhatsApp us
                </a>
              </li>
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="group flex items-center gap-3 text-white/70 transition-colors hover:text-white"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
                      <Mail className="h-4 w-4 text-white" />
                    </span>
                    {email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3 text-white/70">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10">
                  <Clock className="h-4 w-4 text-white" />
                </span>
                {SITE.hours}
              </li>
            </ul>

            <div className="mt-7 flex gap-3">
              <SocialIcon Icon={FacebookIcon} href={social?.facebook || ""} />
              <SocialIcon Icon={InstagramIcon} href={social?.instagram || ""} />
              <SocialIcon Icon={YoutubeIcon} href={social?.youtube || ""} />
              <SocialIcon Icon={LinkedinIcon} href={social?.linkedin || ""} />
            </div>
          </div>

          {/* ── Link columns ── */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-1">
            <FooterCol
              title="Services"
              links={SERVICE_NAV.map((s) => ({ label: s.label, to: s.to }))}
            />
            <FooterCol title="Company" links={COMPANY_LINKS} />
          </div>

          {/* ── Support + map ── */}
          <div className="grid gap-10">
            <FooterCol title="Support" links={SUPPORT_LINKS} />
            <div>
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
                Find us
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={settings?.google_map_embed || mapEmbedUrl}
                  title={`${name} location`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-40 w-full border-0 grayscale-[0.2]"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-white"
              >
                Open in Maps
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 w-full border-t border-white/10 bg-black/25 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-[13px] font-medium text-white/70 md:text-left">
            © {new Date().getFullYear()} {name}. All Rights Reserved.
          </div>
          <a
            href="https://www.ulmind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 text-[13px] font-medium text-white/90"
          >
            <span className="opacity-80 transition-opacity group-hover:opacity-100">
              Designed and Developed by
            </span>
            <img
              src="/assets/ulmind.png"
              alt="Ulmind"
              className="h-10 w-auto object-contain transition-all group-hover:scale-105 sm:h-12"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white/90">
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-white/60 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  Icon,
  href,
}: {
  Icon: any /* eslint-disable-line @typescript-eslint/no-explicit-any */;
  href: string;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-primary hover:scale-105"
    >
      <Icon className="h-4.5 w-4.5" fill="currentColor" />
    </a>
  );
}
