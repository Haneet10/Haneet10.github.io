import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${profile.site}/`, priority: 1 },
    ...projects.map((p) => ({ url: `${profile.site}/work/${p.slug}/`, priority: 0.8 })),
  ];
}
