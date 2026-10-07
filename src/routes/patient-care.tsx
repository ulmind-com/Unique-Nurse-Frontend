import { createFileRoute } from "@tanstack/react-router";

import { ServiceLanding } from "@/components/site/ServiceLanding";
import { getServiceLanding } from "@/content/services";
import { SITE } from "@/config/site";

const content = getServiceLanding("patient-care")!;
const title = `${content.name} in Kolkata — ${SITE.name}`;

export const Route = createFileRoute("/patient-care")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: content.heroDescription },
      { property: "og:title", content: title },
      { property: "og:description", content: content.heroDescription },
      { property: "og:url", content: "/patient-care" },
    ],
    links: [{ rel: "canonical", href: "/patient-care" }],
  }),
  component: () => <ServiceLanding content={content} />,
});
