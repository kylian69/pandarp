import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionSite } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Hors production, on ferme tout : le site de développement est public via le
  // tunnel, et son indexation créerait un doublon concurrent de pandarp.fr.
  if (!isProductionSite) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Les routes de télémétrie n'ont aucun intérêt pour l'indexation.
      disallow: "/api/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
