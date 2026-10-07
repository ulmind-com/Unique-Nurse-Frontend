import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Clock, HeartHandshake, Activity, Sparkles } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { cn } from "@/lib/utils";

/**
 * All six cards sit in the brand's red family on purpose — differentiation
 * comes from the icon, not from six unrelated hues.
 */
const REASONS = [
  {
    id: 1,
    title: "Qualified Nursing Staff",
    description:
      "GNM and ANM qualified nurses for clinical care, and trained attendants for everything else.",
    icon: Stethoscope,
    gradient: "from-primary/18 to-accent/10",
    iconColor: "text-primary",
  },
  {
    id: 2,
    title: "Verified Before Placement",
    description:
      "Aadhaar, local address and reference checks on file for every nurse, Aya and maid we send.",
    icon: ShieldCheck,
    gradient: "from-accent/18 to-primary/10",
    iconColor: "text-accent",
  },
  {
    id: 3,
    title: "Day, Night or 24-Hour",
    description:
      "8, 12 and 24-hour shifts, live-in placements and cover for the staff's weekly off.",
    icon: Clock,
    gradient: "from-primary/14 to-accent/14",
    iconColor: "text-primary",
  },
  {
    id: 4,
    title: "Replacement, Not Excuses",
    description:
      "If your staff falls ill or leaves, we send a substitute — you never restart the search.",
    icon: HeartHandshake,
    gradient: "from-accent/14 to-primary/18",
    iconColor: "text-accent",
  },
  {
    id: 5,
    title: "Local to Kolkata",
    description:
      "Based in Garia and placing staff across Kolkata ourselves — not a call centre in another city.",
    icon: Activity,
    gradient: "from-primary/20 to-accent/8",
    iconColor: "text-primary",
  },
  {
    id: 6,
    title: "Honest Recommendations",
    description:
      "Describe the patient and we will tell you the cheapest option that actually works.",
    icon: Sparkles,
    gradient: "from-accent/20 to-primary/8",
    iconColor: "text-accent",
  },
];

export function WhyChooseUsSection() {
  return (
    <Section className="relative overflow-hidden bg-surface/30">
      {/* Decorative background elements (Optimized for performance) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-30 bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)]" style={{ transform: 'translateZ(0)' }} />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-30 bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)]" style={{ transform: 'translateZ(0)' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <SectionHeader
          align="center"
          eyebrow="The Unique Nurse & Aya Advantage"
          title={
            <>
              Why Choose <span className="text-primary">Unique Nurse and Aya Services</span>
            </>
          }
          description="Experience the perfect blend of clinical excellence, compassion, and reliability right in the comfort of your home."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 w-full">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-border/50 to-transparent hover:from-primary/50 hover:to-accent/50 transition-colors duration-500 will-change-transform"
              style={{ transform: 'translateZ(0)' }}
            >
              <div className="relative h-full bg-surface/90 backdrop-blur-md rounded-[calc(1.5rem-1px)] p-8 overflow-hidden transition-transform duration-500 group-hover:scale-[0.98]">
                {/* Glow effect on hover */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br",
                    reason.gradient,
                  )}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-surface shadow-sm border border-border/50 group-hover:scale-110 transition-transform duration-500",
                      reason.iconColor,
                    )}
                  >
                    <reason.icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold font-display mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {reason.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 mt-auto">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
