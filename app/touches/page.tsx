import type { Metadata } from "next";
import { keybindGroups } from "@/content/touches";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Touches et commandes du serveur",
  description:
    "La liste complète des raccourcis clavier et des commandes de PandaRP : interactions, vocal de proximité, véhicules, actions de roleplay et commandes /me et /do.",
  alternates: { canonical: "/touches" },
  openGraph: {
    title: "Touches et commandes du serveur PandaRP",
    description:
      "Raccourcis clavier, vocal de proximité, véhicules et commandes de roleplay.",
    url: "/touches",
  },
};

export default function TouchesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Aide-mémoire"
        title="Touches et commandes"
        lead="Les raccourcis du serveur, regroupés par usage. Gardez cette page ouverte sur un second écran pendant vos premières sessions."
      />

      <Container>
        <div className="space-y-16">
          {keybindGroups.map((group) => (
            <section key={group.title}>
              <div className="border-t border-ink pt-6">
                <h2 className="display text-[clamp(1.5rem,4vw,2.25rem)]">
                  {group.title}
                </h2>
                <p className="mt-2 text-smoke">{group.intro}</p>
              </div>

              <table className="mt-8 w-full border-collapse text-left">
                <caption className="sr-only">
                  Raccourcis de la catégorie {group.title}
                </caption>
                <thead>
                  <tr className="border-b border-haze">
                    <th scope="col" className="eyebrow py-2 text-smoke">
                      Touche
                    </th>
                    <th scope="col" className="eyebrow py-2 text-smoke">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.binds.map((bind) => (
                    <tr key={bind.keys} className="border-b border-haze align-top">
                      <th
                        scope="row"
                        className="w-[38%] py-3.5 pr-4 sm:w-[26%] md:w-[20%]"
                      >
                        <kbd className="inline-block rounded-md border border-haze bg-haze/50 px-2.5 py-1 font-mono text-sm font-semibold text-ink">
                          {bind.keys}
                        </kbd>
                      </th>
                      <td className="py-3.5">
                        <span className="text-[0.95rem]">{bind.action}</span>
                        {bind.note && (
                          <span className="mt-0.5 block text-sm text-smoke">
                            {bind.note}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>

        <p className="mt-16 border-t border-haze pt-6 text-sm leading-relaxed text-smoke">
          Certaines touches sont réassignables depuis les paramètres de FiveM,
          section Raccourcis clavier. Les commandes de métier apparaissent
          uniquement lorsque vous êtes en service.
        </p>
      </Container>
    </>
  );
}
