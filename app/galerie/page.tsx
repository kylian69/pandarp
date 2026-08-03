import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHeader, Eyebrow } from "@/components/ui";
import JoinButton from "@/components/JoinButton";

export const metadata: Metadata = {
  title: "Galerie : le serveur en images",
  description:
    "Captures d'écran et vidéos de PandaRP, serveur GTA 5 RP sur FiveM Enhanced : Los Santos rendu avec le ray tracing, scènes de roleplay et vie de la ville.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "Galerie — PandaRP en images",
    description:
      "Captures et vidéos du serveur GTA 5 RP PandaRP, rendu FiveM Enhanced.",
    url: "/galerie",
  },
};

const MEDIA_DIR = path.join(process.cwd(), "public", "medias");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Les captures sont lues directement dans `public/medias`. Déposer un fichier
 * dans ce dossier suffit à le publier — pas de liste à tenir à jour en double.
 * Le nom du fichier sert de légende : `centre-ville-de-nuit.jpg` devient
 * « Centre ville de nuit ».
 */
function getScreenshots() {
  if (!fs.existsSync(MEDIA_DIR)) return [];
  return fs
    .readdirSync(MEDIA_DIR)
    .filter((f) => IMAGE_EXT.test(f))
    .sort()
    .map((file) => {
      const label = file
        .replace(IMAGE_EXT, "")
        .replace(/[-_]+/g, " ")
        .replace(/^\d+\s*/, "")
        .trim();
      return {
        src: `/medias/${file}`,
        caption: label.charAt(0).toUpperCase() + label.slice(1),
      };
    });
}

export default function GaleriePage() {
  const screenshots = getScreenshots();

  return (
    <>
      <PageHeader
        eyebrow="Galerie"
        title="Le serveur en images"
        lead="Los Santos rendu par la build Enhanced, et les scènes qui s'y jouent. Toutes les captures sont prises en jeu, sans retouche."
      />

      <Container>
        {screenshots.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((shot, i) => (
              <li key={shot.src} className="group">
                <div className="patch relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={`${shot.caption} — serveur GTA 5 RP PandaRP sur FiveM Enhanced`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={i < 3}
                  />
                </div>
                <p className="mt-3 text-sm text-smoke">{shot.caption}</p>
              </li>
            ))}
          </ul>
        ) : (
          /* État vide : il indique quoi faire, il ne s'excuse pas. */
          <div className="patch px-7 py-16 text-center sm:px-14 sm:py-24">
            <Image
              src="/brand/logo-icon.png"
              alt="PandaRP"
              width={56}
              height={56}
              className="mx-auto h-14 w-14 opacity-90"
            />
            <h2 className="display mt-8 text-[clamp(1.5rem,4.5vw,2.5rem)]">
              Les premières captures arrivent
            </h2>
            <p className="mx-auto mt-5 max-w-md text-paper/60">
              La galerie se remplira à l&apos;ouverture du serveur. En attendant,
              le Discord publie les avancées du développement.
            </p>
            <div className="mt-9 flex justify-center">
              <JoinButton variant="outline" />
            </div>
          </div>
        )}

        <div className="mt-20 border-t border-ink pt-10">
          <Eyebrow>Vous filmez sur PandaRP</Eyebrow>
          <h2 className="display mt-4 text-[clamp(1.5rem,4.5vw,2.5rem)] max-w-2xl">
            Vos captures ont leur place ici
          </h2>
          <p className="mt-5 max-w-xl leading-relaxed text-smoke">
            Partagez vos plus belles scènes dans le canal dédié du Discord. Les
            captures retenues rejoignent cette page, créditées à leur auteur.
          </p>
        </div>
      </Container>
    </>
  );
}
