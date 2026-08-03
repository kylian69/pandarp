import type { Metadata } from "next";
import Link from "next/link";
import { faq } from "@/content/faq";
import JoinButton from "@/components/JoinButton";
import { Container, PageHeader, Eyebrow, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Whitelist, prérequis, différence entre FiveM Enhanced et Legacy, configuration PC, âge minimum : les réponses aux questions les plus posées sur PandaRP.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Questions fréquentes — PandaRP",
    description:
      "Whitelist, prérequis, Enhanced ou Legacy, configuration PC : toutes les réponses.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      {/* Le balisage FAQPage permet à Google d'afficher ces questions
          directement dans ses résultats de recherche. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "fr-FR",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <PageHeader
        eyebrow="FAQ"
        title="Questions fréquentes"
        lead="Les réponses aux questions qui reviennent le plus souvent avant une première connexion."
      />

      <Container>
        {/* <details> natif : fonctionne sans JavaScript et reste accessible
            au clavier comme aux lecteurs d'écran. */}
        <div className="border-t border-ink">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group border-b border-haze [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6">
                <h2 className="text-lg font-semibold leading-snug transition-colors group-open:text-volt">
                  {item.question}
                </h2>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-2xl leading-none text-smoke transition-transform duration-200 group-open:rotate-45 group-open:text-volt"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-7 leading-relaxed text-smoke">
                {item.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="patch mt-20 px-7 py-12 sm:px-14 sm:py-16">
          <Eyebrow tone="muted">Pas de réponse ici</Eyebrow>
          <h2 className="display mt-4 text-[clamp(1.75rem,5vw,3rem)] max-w-2xl">
            Le Discord répond au cas par cas
          </h2>
          <p className="mt-5 max-w-xl text-paper/65">
            Les guides détaillés couvrent l&apos;installation et les premières
            heures de jeu ; pour tout le reste, l&apos;équipe est joignable.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <JoinButton />
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-paper/30 px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              Lire les guides
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
