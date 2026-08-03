import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { getLatestPatchDate } from "@/lib/patch-notes";

/**
 * Plan du site. `priority` hiérarchise l'importance relative des pages pour les
 * moteurs ; `changeFrequency` indique à quelle cadence les recrawler.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const latestPatch = await getLatestPatchDate();

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/rejoindre"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/fonctionnalites"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/touches"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/reglement"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/galerie"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    {
      url: absoluteUrl("/patch-notes"),
      // La date de la dernière note publiée, pas celle du build : c'est elle
      // qui indique aux moteurs si la page a réellement changé.
      lastModified: latestPatch ? new Date(latestPatch) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...posts];
}
