import Link from "next/link";
import type { Metadata } from "next";
import { getDiscordStatus, getServerStatus } from "@/lib/live";
import { getAllPosts, formatDate } from "@/lib/blog";
import { features } from "@/content/features";
import { site } from "@/lib/site";
import LivePanel from "@/components/LivePanel";
import JoinButton from "@/components/JoinButton";
import PandaMark from "@/components/PandaMark";
import { Container, Eyebrow, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "PandaRP — Serveur GTA 5 RP sur FiveM Enhanced, sans whitelist",
  description: site.description,
  alternates: { canonical: "/" },
};

export const revalidate = 300;

export default async function HomePage() {
  const [server, discord] = await Promise.all([
    getServerStatus(),
    getDiscordStatus(),
  ]);
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          inLanguage: "fr-FR",
          description: site.description,
          about: {
            "@type": "VideoGame",
            name: "Grand Theft Auto V",
            gamePlatform: "PC",
          },
        }}
      />

      {/* Hero — la thèse du serveur, énoncée sans détour. */}
      <section className="border-b border-haze">
        <Container className="pt-16 pb-16 sm:pt-24 sm:pb-20">
          <Eyebrow>Serveur GTA 5 RP · FiveM Enhanced · Français</Eyebrow>

          <h1 className="display mt-5 text-[clamp(2.75rem,8.5vw,6.25rem)] max-w-5xl">
            Le roleplay sur GTA V Enhanced.{" "}
            <span className="block text-seal">Sans whitelist.</span>
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-xl leading-relaxed text-ink/80 max-w-xl">
                Pas de candidature à écrire, pas d&apos;entretien à passer. Vous
                installez FiveM, vous vous connectez, vous créez votre personnage.
                La première session commence dans la minute.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <JoinButton />
                <Link
                  href="/fonctionnalites"
                  className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-base font-semibold transition-colors hover:bg-ink hover:text-paper"
                >
                  Découvrir le serveur
                </Link>
              </div>
              <p className="mt-5 text-sm text-smoke">
                Nécessite GTA V Enhanced sur PC et le client FiveM.{" "}
                <Link
                  href="/rejoindre"
                  className="text-seal-deep underline underline-offset-2"
                >
                  Voir la procédure
                </Link>
                .
              </p>
            </div>

            {/* Télémétrie : traitée comme un instrument, pas comme une vitrine. */}
            <div className="lg:col-span-5">
              <div className="patch p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="eyebrow text-paper/45">En direct</p>
                  <PandaMark className="h-7 w-7 opacity-30" />
                </div>
                <div className="mt-5">
                  <LivePanel initialServer={server} initialDiscord={discord} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tache — le pari technique, sur fond d'encre. */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="patch patch-alt px-7 py-12 sm:px-14 sm:py-16">
            <Eyebrow tone="muted">Le pari</Eyebrow>
            <h2 className="display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] max-w-3xl">
              Construit sur Enhanced, pas porté dessus
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/70">
              La plupart des serveurs GTA RP tournent sur des bases vieilles de dix
              ans, adaptées tant bien que mal à la nouvelle version du jeu. PandaRP
              part de zéro sur la build Enhanced, sans dette technique à traîner.
            </p>

            <dl className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {[
                {
                  t: "Rendu natif",
                  d: "Ray tracing et éclairage global exploités par des intérieurs conçus pour eux, pas hérités de Legacy.",
                },
                {
                  t: "Rien à installer",
                  d: "Aucun pack graphique, aucun ENB. Les ressources arrivent à la connexion, le rendu vient du jeu.",
                },
                {
                  t: "Framerate tenu",
                  d: "Ressources optimisées pour rester stable en zone dense, là où les serveurs chargés s'effondrent.",
                },
              ].map((item) => (
                <div key={item.t}>
                  <dt className="display text-xl text-paper">{item.t}</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-paper/60">
                    {item.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Fonctionnalités */}
      <section className="pb-8">
        <Container>
          <Eyebrow>Sur le serveur</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2rem,6vw,3.75rem)] max-w-3xl">
            Une ville qui tient debout sans vous
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-smoke">
            Métiers, factions, économie fermée : les systèmes existent pour produire
            des situations, pas pour occuper une barre de progression.
          </p>

          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <li key={f.slug}>
                <h3 className="display text-2xl">{f.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-smoke">
                  {f.summary}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <Link
              href="/fonctionnalites"
              className="inline-flex items-center gap-2 font-semibold text-seal-deep transition-all hover:gap-3"
            >
              Tout ce qui vous attend en jeu
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Rejoindre — une vraie séquence, donc numérotée. */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="border-t border-ink pt-10">
            <Eyebrow>Trois étapes</Eyebrow>
            <h2 className="display mt-4 text-[clamp(2rem,6vw,3.75rem)]">
              Se connecter
            </h2>

            <ol className="mt-12 grid gap-10 sm:grid-cols-3">
              {[
                {
                  t: "Installer FiveM",
                  d: "Téléchargez le client sur fivem.net et connectez-le à votre compte Cfx.re.",
                },
                {
                  t: "Passer en build Enhanced",
                  d: "Dans les paramètres du client, section Jeu, sélectionnez Enhanced plutôt que Legacy.",
                },
                {
                  t: "Rejoindre PandaRP",
                  d: "Cliquez sur le bouton de connexion et créez votre personnage. C'est tout.",
                },
              ].map((step, i) => (
                <li key={step.t}>
                  <span className="font-mono text-sm font-semibold text-seal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 text-xl">{step.t}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-smoke">
                    {step.d}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-12">
              <Link
                href="/rejoindre"
                className="inline-flex items-center gap-2 font-semibold text-seal-deep transition-all hover:gap-3"
              >
                Guide détaillé, avec les erreurs fréquentes
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Actualités */}
      {posts.length > 0 && (
        <section className="pb-16 sm:pb-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Actualités et guides</Eyebrow>
                <h2 className="display mt-4 text-[clamp(2rem,6vw,3.75rem)]">
                  À lire avant de jouer
                </h2>
              </div>
              <Link
                href="/blog"
                className="font-semibold text-seal-deep underline-offset-4 hover:underline"
              >
                Tous les articles
              </Link>
            </div>

            <ul className="mt-12 grid gap-10 sm:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug} className="border-t border-ink pt-5">
                  <p className="eyebrow text-smoke">
                    {formatDate(post.date)} · {post.readingMinutes} min
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition-colors hover:text-seal"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-smoke">
                    {post.description}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Appel final */}
      <section className="pb-8">
        <Container>
          <div className="patch px-7 py-14 text-center sm:px-14 sm:py-20">
            <PandaMark className="mx-auto h-14 w-14" />
            <h2 className="display mt-8 text-[clamp(2rem,6.5vw,4rem)]">
              Los Santos vous attend
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-paper/65">
              Accès libre, serveur français, communauté en construction. Le meilleur
              moment pour arriver quelque part, c&apos;est au début.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <JoinButton />
              {site.discordInvite && (
                <a
                  href={site.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-paper/30 px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
                >
                  Rejoindre le Discord
                </a>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
