import type { Metadata } from "next";
import Link from "next/link";
import {
  ROADMAP_STATUSES,
  roadmap,
  shipped,
  statusLabels,
  type RoadmapStatus,
} from "@/content/roadmap";
import { getPatchNotes } from "@/lib/patch-notes";
import JoinButton from "@/components/JoinButton";
import { Container, Eyebrow, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Roadmap — ce qui arrive sur le serveur",
  description:
    "La feuille de route de PandaRP : les chantiers en cours, ce qui est prévu et les pistes à l'étude sur le serveur GTA 5 RP FiveM Enhanced.",
  alternates: { canonical: "/roadmap" },
  openGraph: {
    title: "Roadmap — PandaRP",
    description:
      "Les chantiers en cours, prévus et à l'étude sur le serveur GTA 5 RP PandaRP.",
    url: "/roadmap",
  },
};

/**
 * Le marqueur se remplit à mesure que la certitude monte : plein pour ce qui
 * est en cours, cerclé pour ce qui est prévu, cerclé pâle pour ce qui n'est
 * qu'une piste. La forme dit la même chose que l'intertitre, en plus rapide.
 *
 * Pas de bordure pointillée pour « à l'étude », bien qu'elle dise exactement
 * la bonne chose : à 14 px de diamètre, le pointillé ne produit que quatre
 * arcs et le marqueur se lit comme un indicateur de chargement.
 */
const MARKERS: Record<RoadmapStatus, string> = {
  "en-cours": "bg-volt border-volt",
  prevu: "border-volt",
  etude: "border-smoke/50",
};

/** Le rail pâlit d'un groupe au suivant, au même rythme que la certitude. */
const RAILS: Record<RoadmapStatus, string> = {
  "en-cours": "bg-volt/70",
  prevu: "bg-volt/30",
  etude: "bg-haze",
};

export default async function RoadmapPage() {
  const notes = await getPatchNotes();
  // Une ancre ne vaut que si la version existe vraiment : sans ce filtre, une
  // note supprimée laisserait un lien qui ne mène nulle part.
  const anchors = new Map(notes.map((note) => [note.version, note.anchor]));

  return (
    <>
      <PageHeader
        eyebrow="Feuille de route"
        title="Roadmap"
        lead="Ce sur quoi l'équipe travaille, ce qui suivra, et les pistes qu'on explore encore. Mis à jour à chaque changement de cap."
      />

      <Container className="pb-24">
        <p className="max-w-2xl border-t border-ink pt-6 text-sm leading-relaxed text-smoke">
          Une feuille de route n&apos;est pas un calendrier de livraison. Les
          chantiers du haut sont engagés ; ceux du bas sont des intentions, qui
          peuvent être repoussées ou abandonnées si le jeu ne suit pas. Chaque
          élément livré est détaillé dans les{" "}
          <Link href="/patch-notes" className="text-volt-deep underline underline-offset-4">
            patch notes
          </Link>
          .
        </p>

        <div className="mt-16">
          {ROADMAP_STATUSES.map((status) => {
            const items = roadmap.filter((item) => item.status === status);
            if (items.length === 0) return null;

            return (
              <section
                key={status}
                className="border-t border-haze py-12 first:border-0 first:pt-0 lg:grid lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-3">
                  <h2 className="display text-2xl">
                    {statusLabels[status].label}
                    <span className="ml-2 font-mono text-sm font-normal text-smoke">
                      {items.length}
                    </span>
                  </h2>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-smoke">
                    {statusLabels[status].hint}
                  </p>
                </div>

                {/* Le rail longe les entrées et pâlit de groupe en groupe.
                    Décoratif : le statut est déjà porté par l'intertitre. */}
                <ul className="relative mt-8 pl-9 lg:col-span-9 lg:mt-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-[7px] top-2 bottom-2 w-px ${RAILS[status]}`}
                  />
                  {items.map((item) => (
                    <li key={item.slug} className="relative pb-7 last:pb-0">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-9 top-1.5 h-3.5 w-3.5 rounded-full border-2 bg-paper ${MARKERS[status]}`}
                      />
                      <h3 className="font-semibold leading-snug">{item.title}</h3>
                      <p className="mt-1.5 max-w-xl leading-relaxed text-prose">
                        {item.summary}
                      </p>
                      {item.target && (
                        <p className="eyebrow mt-2.5 text-smoke">{item.target}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {shipped.length > 0 && (
          <section className="mt-20 border-t border-ink pt-10">
            <Eyebrow>Déjà livré</Eyebrow>
            <h2 className="display mt-4 text-2xl">Ce qui tourne déjà</h2>
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {shipped.map((item) => {
                const anchor = anchors.get(item.version);
                return (
                  <li
                    key={`${item.version}-${item.title}`}
                    className="flex items-baseline gap-3 border-b border-haze pb-4"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="shrink-0 translate-y-0.5 text-volt"
                    >
                      <path d="M1.5 7l3.5 3.5L11.5 2.5" />
                    </svg>
                    <span className="flex-1 leading-snug">{item.title}</span>
                    {anchor ? (
                      <Link
                        href={`/patch-notes#${anchor}`}
                        className="shrink-0 font-mono text-xs text-smoke transition-colors hover:text-volt"
                      >
                        {item.version}
                      </Link>
                    ) : (
                      <span className="shrink-0 font-mono text-xs text-smoke">
                        {item.version}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <div className="patch mt-20 px-7 py-12 sm:px-14 sm:py-16">
          <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)] max-w-2xl">
            La suite se joue avec vous
          </h2>
          <p className="mt-5 max-w-xl text-paper/65">
            Les chantiers de cette page viennent en grande partie des retours
            des joueurs. Rejoignez le serveur, dites-nous ce qui manque.
          </p>
          <div className="mt-8">
            <JoinButton />
          </div>
        </div>
      </Container>
    </>
  );
}
