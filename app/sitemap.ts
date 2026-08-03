import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

/**
 * Plan du site. `priority` hiérarchise l'importance relative des pages pour les
 * moteurs ; `changeFrequency` indique à quelle cadence les recrawler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/rejoindre"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/fonctionnalites"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/touches"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/reglement"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/galerie"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
