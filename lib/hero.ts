import fs from "node:fs";
import path from "node:path";

/**
 * Médias de fond du hero, déposés à la racine de `public/`.
 *
 * Volontairement hors de `public/medias/` : ce dossier alimente la galerie,
 * ces fichiers s'y ajouteraient donc en double.
 */

/**
 * Les extensions sont testées dans cet ordre : `.webp` d'abord, nettement plus
 * léger à qualité égale, et cette image est le plus gros téléchargement de la
 * page d'accueil quand aucune vidéo n'est déposée.
 */
const IMAGE_CANDIDATES = ["hero.webp", "hero.jpg", "hero.jpeg", "hero.png"];

/**
 * WebM avant MP4 : à qualité perçue égale, VP9/AV1 pèse nettement moins que
 * H.264, et tous les navigateurs qui nous concernent le lisent. Le MP4 reste
 * accepté comme repli pour qui n'aurait que ça sous la main.
 */
const VIDEO_EXTENSIONS = ["webm", "mp4"];

/**
 * Une vidéo par thème : le jour s'affiche en thème clair, la nuit en sombre.
 * `hero` sans suffixe sert de vidéo unique, montrée dans les deux thèmes —
 * c'est le cas de figure « je n'ai qu'un seul rush ».
 */
const VIDEO_BASENAMES = { day: "hero-jour", night: "hero-nuit", single: "hero" };

function firstExisting(files: string[]): string | null {
  for (const file of files) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `/${file}`;
    }
  }
  return null;
}

function findVideo(basename: string): string | null {
  return firstExisting(VIDEO_EXTENSIONS.map((ext) => `${basename}.${ext}`));
}

export type HeroMedia = {
  /** Toujours l'image : elle sert d'affiche pendant le chargement de la vidéo,
   *  et de fond définitif si aucune vidéo n'est déposée ou si l'animation est
   *  refusée par le système. */
  image: string | null;
  /** Vidéo du thème clair, ou `null`. */
  day: string | null;
  /** Vidéo du thème sombre, ou `null`. */
  night: string | null;
};

/**
 * Médias du hero, tels que trouvés sur le disque.
 *
 * Chaque niveau dégrade proprement : pas de vidéo → l'image seule ; une seule
 * vidéo → la même dans les deux thèmes ; rien du tout → le hero garde son fond
 * uni. Aucun de ces cas ne casse la page.
 */
export function getHeroMedia(): HeroMedia {
  const single = findVideo(VIDEO_BASENAMES.single);
  return {
    image: firstExisting(IMAGE_CANDIDATES),
    day: findVideo(VIDEO_BASENAMES.day) ?? single,
    night: findVideo(VIDEO_BASENAMES.night) ?? single,
  };
}
