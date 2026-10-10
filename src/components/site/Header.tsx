import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { settingsQ } from "@/lib/api/queries";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SITE } from "@/config/site";
import { SERVICE_NAV } from "@/content/services";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services", children: SERVICE_NAV },
  { to: "/faq", label: "FAQs" },
  { to: "/blogs", label: "Blogs" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: settings } = useQuery(settingsQ());

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // "scrolled" flips once the header has scrolled past the page's hero, so the
  // pill can switch from floating-over-hero styling to solid-on-content styling.
  useEffect(() => {
    const compute = () => {
      const hero =
        document.getElementById("hero-section") ||
        document.querySelector<HTMLElement>("main section");
      const threshold = hero ? hero.offsetHeight - 96 : window.innerHeight * 0.4;
      setScrolled(window.scrollY > threshold);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [pathname]);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isFaq = pathname === "/faq";
  const isBlogs = pathname.startsWith("/blogs");
  const isBooking = pathname === "/booking";
  const onDarkHero = !isAbout && !isFaq && !isBlogs && !isBooking && !scrolled;
  const overlay = isHome && !scrolled;

  return (
    <header className={cn("z-50 inset-x-0", overlay ? "absolute top-4" : "fixed top-4")}>
      <div className="container-x">
        <div
          className={cn(
            "relative overflow-hidden flex h-16 items-center justify-between gap-4 rounded-full pl-3 pr-3 lg:h-[68px] lg:pl-6 lg:pr-2",
            "backdrop-blur-2xl backdrop-saturate-150 transition-colors duration-300",
            "shadow-[0_20px_50px_-20px_rgba(25,90,95,0.28)]",
            onDarkHero
              ? "bg-white/10 border border-white/25"
              : "bg-white/90 border border-border/40",
          )}
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-full bg-gradient-to-b to-transparent",
              onDarkHero ? "from-white/15" : "from-white/60",
            )}
          />
          <Link to="/" className="relative flex items-center gap-2.5 shrink-0">
            {settings?.logo ? (
              <img
                src={
                  typeof settings.logo === "string" ? settings.logo : (settings.logo as any)?.url
                }
                alt={settings.website_name || SITE.name}
                className="h-9 w-9 object-contain"
              />
            ) : (
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden
                >
                  <path d="M12 21s-7-4.35-9.5-8.5C.85 9.5 2.4 5.5 6 5c2.05-.28 3.7.9 6 3 2.3-2.1 3.95-3.28 6-3 3.6.5 5.15 4.5 3.5 7.5C19 16.65 12 21 12 21Z" />
                </svg>
              </div>
            )}
            <div className="leading-tight flex flex-col justify-center whitespace-nowrap">
              <div
                className={cn(
                  "font-display text-[15px] font-semibold tracking-tight uppercase",
                  onDarkHero && "text-white",
                )}
              >
                {settings?.website_name?.split(" ")[0] || SITE.shortName}
              </div>
              <div
                className={cn(
                  "text-[9px] uppercase tracking-[0.22em] -mt-0.5",
                  onDarkHero ? "text-white/70" : "text-muted-foreground",
                )}
              >
                {settings?.website_name?.split(" ").slice(1).join(" ") || SITE.nameSuffix}
              </div>
            </div>
          </Link>

          <nav className="relative hidden xl:flex items-center gap-6 2xl:gap-8">
            {NAV.map((item) => {
              const children = "children" in item ? item.children : undefined;
              const link = (
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{
                    className: onDarkHero
                      ? "text-white font-semibold"
                      : "text-accent font-semibold",
                  }}
                  inactiveProps={{ className: onDarkHero ? "text-white/75" : "text-foreground/70" }}
                  className="inline-flex items-center gap-1 whitespace-nowrap text-[13px] uppercase tracking-wider transition-colors hover:text-primary 2xl:text-sm"
                >
                  {item.label}
                  {children && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
              );

              if (!children) return <div key={item.to}>{link}</div>;

              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {link}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-1/2 top-full z-50 w-[560px] -translate-x-1/2 pt-5"
                      >
                        <div className="grid grid-cols-2 gap-1 rounded-3xl border border-border/60 bg-white/95 p-3 shadow-float backdrop-blur-2xl">
                          {children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-primary-soft"
                            >
                              <img
                                src={child.image}
                                alt=""
                                aria-hidden
                                className="h-10 w-10 shrink-0 rounded-xl object-cover"
                              />
                              <span className="text-[13px] font-medium leading-snug text-foreground/80 group-hover:text-primary">
                                {child.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="relative flex items-center gap-2">
            <Link
              to="/booking"
              className={cn(
                "hidden sm:inline-flex h-[32px] sm:h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 sm:px-5 text-[11px] xs:text-[12px] sm:text-sm font-semibold tracking-wide transition-all hover:scale-105",
                onDarkHero
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-sm hover:opacity-90",
              )}
            >
              <span className="flex items-center gap-1.5 sm:hidden">
                Book Trusted Care <ArrowRight className="h-3 w-3" />
              </span>
              <span className="hidden sm:inline">Book Appointment</span>
            </Link>

            <button
              onClick={() => setOpen(!open)}
              className={cn(
                "p-2 -mr-2 rounded-full xl:hidden",
                onDarkHero ? "text-white hover:bg-white/10" : "text-foreground hover:bg-white/50",
              )}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="xl:hidden mt-2 rounded-3xl bg-white/90 backdrop-blur-3xl backdrop-saturate-150 border border-border/40 shadow-[0_20px_50px_-20px_rgba(25,90,95,0.28)] origin-top overflow-hidden"
            >
              <div className="py-3 px-3 grid gap-1">
                {NAV.map((item) => {
                  const children = "children" in item ? item.children : undefined;
                  return (
                    <div key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        activeOptions={{ exact: item.to === "/" }}
                        activeProps={{ className: "bg-primary-soft text-accent" }}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-foreground/80"
                      >
                        {item.label}
                      </Link>
                      {children && (
                        <div className="mb-1 ml-4 grid gap-0.5 border-l border-border pl-3">
                          {children.map((child) => (
                            <Link
                              key={child.to}
                              to={child.to}
                              onClick={() => setOpen(false)}
                              activeProps={{ className: "text-primary" }}
                              className="rounded-lg px-3 py-2 text-sm text-muted-foreground"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <Link
                  to="/booking"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
