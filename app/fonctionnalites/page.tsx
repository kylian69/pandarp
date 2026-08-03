import type { Metadata } from "next";
import Link from "next/link";
import { features } from "@/content/features";
import JoinButton from "@/components/JoinButton";
import { Container, PageHeader, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Le serveur : métiers, factions et économie",
  description:
    "Ce qui vous attend sur PandaRP : rendu GTA V Enhanced, accès sans whitelist, métiers légaux et illégaux, économie fermée, factions joueurs et modération présente.",
  alternates: { canonical: "/fonctionnalites" },
  openGraph: {
    title: "Le serveur PandaRP : métiers, factions et économie",
    description:
      "Rendu Enhanced, accès libre, métiers, économie fermée et factions tenues par les joueurs.",
    url: "/fonctionnalites",
  },
};

export default function FonctionnalitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Le serveur"
        title="Ce qui vous attend en jeu"
        lead="PandaRP est un serveur GTA 5 RP francophone bâti sur FiveM Enhanced. Voici comment il est construit, système par système."
      />

      <Container>
        <div className="space-y-16 border-t border-ink pt-14 sm:space-y-20">
          {features.map((feature, index) => (
            <article
              key={feature.slug}
              id={feature.slug}
              className="grid gap-6 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <span className="font-mono text-sm font-semibold text-seal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="display mt-3 text-[clamp(1.75rem,4.5vw,2.75rem)]">
                  {feature.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg leading-relaxed text-ink/85">
                  {feature.summary}
                </p>
                <ul className="mt-6 space-y-3.5">
                  {feature.details.map((detail) => (
                    <li key={detail} className="relative pl-6 text-[0.95rem] leading-relaxed text-smoke">
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.6em] h-2 w-2 rounded-[0.25rem_0.125rem_0.25rem_0.125rem] bg-seal"
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="patch patch-alt mt-20 px-7 py-12 sm:px-14 sm:py-16">
          <Eyebrow tone="muted">Prêt à essayer</Eyebrow>
          <h2 className="display mt-4 text-[clamp(1.75rem,5vw,3rem)] max-w-2xl">
            La meilleure façon de juger un serveur, c&apos;est d&apos;y entrer
          </h2>
          <p className="mt-5 max-w-xl text-paper/65">
            L&apos;accès est libre : aucune candidature ne vous sépare de votre
            première session.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JoinButton />
            <Link
              href="/rejoindre"
              className="inline-flex items-center justify-center rounded-full border border-paper/30 px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Comment se connecter
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
