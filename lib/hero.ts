import fs from "node:fs";
import path from "node:path";

/**
 * Image de fond du hero, déposée à la racine de `public/`.
 *
 * Volontairement hors de `public/medias/` : ce dossier alimente la galerie,
 * la capture s'y ajouterait donc en double.
 *
 * Les extensions sont testées dans cet ordre : `.webp` d'abord, nettement plus
 * léger à qualité égale, et cette image est le plus gros téléchargement de la
 * page d'accueil.
 */
const CANDIDATES = ["hero.webp", "hero.jpg", "hero.jpeg", "hero.png"];

/** Chemin public de l'image de hero, ou `null` si aucune n'a été déposée. */
export function getHeroImage(): string | null {
  for (const file of CANDIDATES) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `/${file}`;
    }
  }
  return null;
}
