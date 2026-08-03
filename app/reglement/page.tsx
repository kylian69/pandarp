import type { Metadata } from "next";
import { ruleSections, lastUpdated } from "@/content/reglement";
import { formatDate } from "@/lib/blog";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Règlement du serveur",
  description:
    "Le règlement de PandaRP : principes généraux, règles de roleplay, encadrement des activités illégales, échelle des sanctions et droit de recours.",
  alternates: { canonical: "/reglement" },
  openGraph: {
    title: "Règlement du serveur PandaRP",
    description:
      "Principes, règles de roleplay, activités illégales, sanctions et recours.",
    url: "/reglement",
  },
};

export default function ReglementPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Règlement · mis à jour le ${formatDate(lastUpdated)}`}
        title="Le règlement"
        lead="Chaque règle porte un code. Une sanction vous est toujours notifiée avec le code concerné, et vous pouvez la contester."
      />

      <Container>
        {/* Sommaire : sur une page longue, il porte autant la navigation que le SEO. */}
        <nav
          aria-label="Sommaire du règlement"
          className="border-y border-haze py-5"
        >
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {ruleSections.map((section) => (
              <li key={section.slug}>
                <a
                  href={`#${section.slug}`}
                  className="eyebrow text-smoke transition-colors hover:text-seal"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 space-y-20">
          {ruleSections.map((section) => (
            <section key={section.slug} id={section.slug} className="scroll-mt-24">
              <h2 className="display text-[clamp(1.75rem,5vw,3rem)]">
                {section.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-smoke">
                {section.intro}
              </p>

              <dl className="mt-10 divide-y divide-haze border-t border-ink">
                {section.rules.map((rule) => (
                  <div
                    key={rule.code}
                    id={rule.code.toLowerCase()}
                    className="grid scroll-mt-24 gap-2 py-6 lg:grid-cols-12 lg:gap-8"
                  >
                    <dt className="lg:col-span-4">
                      <span className="font-mono text-sm font-semibold text-seal">
                        {rule.code}
                      </span>
                      <span className="mt-1 block font-semibold">{rule.title}</span>
                    </dt>
                    <dd className="leading-relaxed text-smoke lg:col-span-8">
                      {rule.text}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <p className="mt-20 border-t border-haze pt-6 text-sm leading-relaxed text-smoke">
          Le règlement évolue avec le serveur. Les modifications sont annoncées sur
          le Discord avant leur entrée en vigueur. Une situation non couverte est
          tranchée par le staff dans l&apos;esprit des principes généraux.
        </p>
      </Container>
    </>
  );
}
