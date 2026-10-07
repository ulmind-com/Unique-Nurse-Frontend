import { createFileRoute } from "@tanstack/react-router";

import { ServiceLanding } from "@/components/site/ServiceLanding";
import { getServiceLanding } from "@/content/services";
import { SITE } from "@/config/site";

const content = getServiceLanding("house-maid")!;
const title = `${content.name} in Kolkata — ${SITE.name}`;

export const Route = createFileRoute("/house-maid")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: content.heroDescription },
      { property: "og:title", content: title },
      { property: "og:description", content: content.heroDescription },
      { property: "og:url", content: "/house-maid" },
    ],
    links: [{ rel: "canonical", href: "/house-maid" }],
  }),
  component: () => <ServiceLanding content={content} />,
});
