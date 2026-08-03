import type { Metadata } from "next";
import { getPatchNotes } from "@/lib/patch-notes";
import { formatDate } from "@/lib/blog";
import JoinButton from "@/components/JoinButton";
import { Container, Eyebrow, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Patch notes — toutes les mises à jour du serveur",
  description:
    "L'historique complet des mises à jour de PandaRP : ajouts de contenu, refontes, correctifs et équilibrages du serveur GTA 5 RP sur FiveM Enhanced.",
  alternates: { canonical: "/patch-notes" },
  openGraph: {
    title: "Patch notes — PandaRP",
    description:
      "Toutes les mises à jour du serveur GTA 5 RP PandaRP, version par version.",
    url: "/patch-notes",
  },
};

export default async function PatchNotesPage() {
  const notes = await getPatchNotes();

  return (
    <>
      <PageHeader
        eyebrow="Journal des versions"
        title="Patch notes"
        lead="Tout ce qui change sur le serveur, version par version. Les mises à jour sont annoncées ici en même temps que sur le Discord."
      />

      <Container className="pb-24">
        {notes.length === 0 ? (
          <p className="border-t border-ink pt-8 text-smoke">
            La première mise à jour sera publiée à l&apos;ouverture du serveur.
          </p>
        ) : (
          <>
            {/* Index des versions : la liste s'allonge à chaque mise à jour,
                ces raccourcis évitent de faire défiler toute la page. */}
            <nav aria-label="Aller à une version" className="border-t border-ink pt-6">
              <Eyebrow>Accès direct</Eyebrow>
              <ul className="mt-4 flex flex-wrap gap-2">
                {notes.map((note) => (
                  <li key={note.version}>
                    <a
                      href={`#${note.anchor}`}
                      className="block rounded-full border border-haze px-3.5 py-1.5 font-mono text-xs text-smoke transition-colors hover:border-volt hover:text-volt"
                    >
                      {note.version}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ol className="mt-16">
              {notes.map((note) => (
                <li
                  key={note.version}
                  id={note.anchor}
                  // Compense l'en-tête collant, qui masquerait le titre visé.
                  className="scroll-mt-24 border-t border-ink py-12 first:pt-0 lg:grid lg:grid-cols-12 lg:gap-10"
                >
                  <div className="lg:col-span-3">
                    <p className="display text-3xl text-volt">{note.version}</p>
                    <p className="eyebrow mt-2 text-smoke">
                      {formatDate(note.date)}
                    </p>
                    {note.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {note.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-haze px-3 py-1 font-mono text-xs text-smoke"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-6 lg:col-span-9 lg:mt-0">
                    <h2 className="display text-[clamp(1.5rem,3.5vw,2.25rem)] max-w-2xl">
                      {note.title}
                    </h2>
                    <div
                      className="prose-fr mt-6"
                      dangerouslySetInnerHTML={{ __html: note.html }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}

        <div className="patch mt-20 px-7 py-12 sm:px-14 sm:py-16">
          <h2 className="display text-[clamp(1.75rem,5vw,2.75rem)] max-w-2xl">
            Jouez la dernière version
          </h2>
          <p className="mt-5 max-w-xl text-paper/65">
            Les mises à jour sont appliquées côté serveur : il n&apos;y a rien à
            télécharger, votre client récupère tout à la connexion.
          </p>
          <div className="mt-8">
            <JoinButton />
          </div>
        </div>
      </Container>
    </>
  );
}
