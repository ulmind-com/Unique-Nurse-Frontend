import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { settingsQ } from "@/lib/api/queries";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Unique Nurse and Aya Services" },
      {
        name: "description",
        content: "Our refund and cancellation policy for nursing, Aya, attendant and household staff placements.",
      },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: Page,
});

function Page() {
  const { data: settings } = useQuery(settingsQ());

  const defaultSections = [
    {
      title: "Care services",
      body: "Cancellations made at least 24 hours before a scheduled shift are fully refundable. Cancellations within 24 hours may be charged up to 50% of the shift fee, since the staff member has already been committed.",
    },
    {
      title: "Monthly placements",
      body: "Monthly placements cancelled before the staff member reports are fully refundable. Once a placement has started, unused days are refundable pro-rata against the agreed monthly rate.",
    },
    {
      title: "Staff replacement",
      body: "If the staff member we placed is unsuitable, we replace them at no extra charge rather than refunding, wherever a replacement is available.",
    },
    {
      title: "Quality concerns",
      body: "If you are not satisfied with a shift, contact us within 48 hours. We will investigate and, where appropriate, replace the staff member or issue a full or partial refund.",
    },
    {
      title: "Refund method",
      body: "Refunds are processed to the original payment method within 7–10 business days.",
    },
    { title: "Contact", body: "For refund questions, reach us via the contact page." },
  ];

  const sections = settings?.refund_sections?.length ? settings.refund_sections : defaultSections;

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Refund policy"
        crumbs={[{ label: "Home", to: "/" }, { label: "Refund policy" }]}
      />
      <Section className="pt-4">
        <LegalPage
          updated="July 2026"
          sections={sections}
        />
      </Section>
    </>
  );
}
