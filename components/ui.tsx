import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

/**
 * La couleur passe par `tone` plutôt que par une classe surchargée : deux
 * utilitaires de couleur concurrents se départagent selon leur ordre dans la
 * feuille de style, pas selon l'ordre des classes — le résultat serait
 * imprévisible sur les blocs d'encre.
 */
export function Eyebrow({
  children,
  tone = "volt",
  className = "",
}: {
  children: ReactNode;
  tone?: "volt" | "muted";
  className?: string;
}) {
  const color = tone === "volt" ? "text-volt" : "text-paper/45";
  return <p className={`eyebrow ${color} ${className}`}>{children}</p>;
}

/**
 * En-tête de page : filet, étiquette, titre d'affiche, chapô.
 * Le h1 est porté ici pour garantir un seul titre de niveau 1 par page.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <Container className="pt-14 pb-10 sm:pt-20 sm:pb-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="display mt-4 text-[clamp(2.5rem,8vw,5rem)] max-w-4xl">
        {title}
      </h1>
      {lead && (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-smoke">{lead}</p>
      )}
    </Container>
  );
}

/** Injecte un bloc de données structurées JSON-LD dans la page. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
