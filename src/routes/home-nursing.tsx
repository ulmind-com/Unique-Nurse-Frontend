import { createFileRoute } from "@tanstack/react-router";

import { ServiceLanding } from "@/components/site/ServiceLanding";
import { getServiceLanding } from "@/content/services";
import { SITE } from "@/config/site";

const content = getServiceLanding("home-nursing")!;
const title = `${content.name} in Kolkata — ${SITE.name}`;

export const Route = createFileRoute("/home-nursing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: content.heroDescription },
      { property: "og:title", content: title },
      { property: "og:description", content: content.heroDescription },
      { property: "og:url", content: "/home-nursing" },
    ],
    links: [{ rel: "canonical", href: "/home-nursing" }],
  }),
  component: () => <ServiceLanding content={content} />,
});
