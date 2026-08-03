import type { Metadata } from "next";
import Link from "next/link";
import { site, joinUrl } from "@/lib/site";
import { getDiscordStatus, getServerStatus } from "@/lib/live";
import LivePanel from "@/components/LivePanel";
import JoinButton from "@/components/JoinButton";
import { Container, PageHeader, Eyebrow, JsonLd } from "@/components/ui";

export const metadata: Metadata = {
  title: "Rejoindre le serveur : installer FiveM Enhanced et se connecter",
  description:
    "Installer FiveM, basculer le client en build Enhanced et rejoindre PandaRP. Procédure complète, prérequis et solutions aux erreurs de connexion les plus fréquentes.",
  alternates: { canonical: "/rejoindre" },
  openGraph: {
    title: "Rejoindre PandaRP — installer FiveM Enhanced et se connecter",
    description:
      "Procédure complète pour installer FiveM en build Enhanced et rejoindre un serveur GTA 5 RP sans whitelist.",
    url: "/rejoindre",
  },
};

export const revalidate = 300;

const steps = [
  {
    title: "Vérifier les prérequis",
    body: "Vous devez posséder GTA V Enhanced sur PC — Steam, Epic Games ou Rockstar Games Launcher — et l'avoir lancé au moins une fois en solo pour créer votre profil Rockstar. FiveM vérifie que votre compte détient une licence valide : une copie piratée ne permet pas de se connecter.",
  },
  {
    title: "Installer le client FiveM",
    body: "Téléchargez FiveM.exe depuis le site officiel fivem.net, et depuis lui seul : les installateurs relayés ailleurs sont une source classique de vol de compte. Lancez-le, puis connectez-vous à votre compte Cfx.re — c'est lui qui portera votre identité sur le serveur.",
  },
  {
    title: "Passer le client en build Enhanced",
    body: "C'est l'étape la plus souvent manquée. Ouvrez les paramètres du client, section Jeu, et vérifiez que la build sélectionnée est Enhanced et non Legacy. Un client en Legacy ne voit pas les serveurs Enhanced : si PandaRP n'apparaît pas dans votre liste, c'est presque toujours la cause.",
  },
  {
    title: "Se connecter à PandaRP",
    body: "Cliquez sur le bouton de connexion ci-dessus : FiveM s'ouvre et vous connecte directement. Le premier chargement prend quelques minutes, le temps que les ressources du serveur soient téléchargées. Les suivants sont quasi instantanés.",
  },
  {
    title: "Créer votre personnage",
    body: "Prenez le temps de cette étape : sur un serveur roleplay, ce personnage est votre seule identité, et en changer se joue plutôt que se clique. Un profil ordinaire avec des besoins concrets produit bien plus de jeu qu'un passé héroïque.",
  },
];

const problems = [
  {
    q: "« Impossible de vérifier votre copie du jeu »",
    a: "Lancez GTA V seul, en dehors de FiveM, connectez-vous au Rockstar Games Launcher, quittez le jeu, puis relancez FiveM.",
  },
  {
    q: "Le serveur n'apparaît pas dans la liste",
    a: "Votre client est en build Legacy. Repassez-le en Enhanced dans les paramètres, section Jeu.",
  },
  {
    q: "Le chargement reste bloqué à un pourcentage fixe",
    a: "Videz le cache du client depuis les paramètres, section Jeu, puis reconnectez-vous. Un cache corrompu produit des chargements interminables souvent imputés à tort au serveur.",
  },
  {
    q: "Framerate faible une fois en jeu",
    a: "Enhanced est plus exigeant que la version d'origine. Désactivez le ray tracing en priorité : c'est de loin le réglage le plus coûteux, avant même la résolution.",
  },
];

export default async function RejoindrePage() {
  const [server, discord] = await Promise.all([
    getServerStatus(),
    getDiscordStatus(),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Rejoindre le serveur GTA 5 RP PandaRP sur FiveM Enhanced",
          description:
            "Installer FiveM en build Enhanced et se connecter au serveur GTA 5 RP PandaRP.",
          inLanguage: "fr-FR",
          totalTime: "PT20M",
          step: steps.map((step, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: step.title,
            text: step.body,
          })),
        }}
      />

      <PageHeader
        eyebrow="Rejoindre"
        title="Se connecter à PandaRP"
        lead="Comptez une vingtaine de minutes la première fois, installation de FiveM comprise. Ensuite, la connexion est immédiate."
      />

      <Container>
        <div className="grid gap-10 border-t border-ink pt-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <JoinButton />
              {site.discordInvite && (
                <a
                  href={site.discordInvite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-3.5 text-base font-semibold transition-colors hover:bg-ink hover:text-paper"
                >
                  Discord
                </a>
              )}
            </div>

            {joinUrl ? (
              <p className="mt-5 text-sm text-smoke">
                Le bouton ouvre FiveM et lance la connexion. Vous pouvez aussi
                coller ce code dans le client :{" "}
                <code className="rounded bg-haze px-1.5 py-0.5 font-mono text-[0.85em]">
                  {site.cfxId}
                </code>
              </p>
            ) : (
              <p className="mt-5 rounded-2xl border border-haze bg-haze/40 px-5 py-4 text-sm leading-relaxed text-smoke">
                Le code de connexion sera publié ici à l&apos;ouverture du serveur.
                Suivez le Discord pour être prévenu.
              </p>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="patch p-7">
              <p className="eyebrow text-paper/45">En direct</p>
              <div className="mt-5">
                <LivePanel initialServer={server} initialDiscord={discord} />
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20">
          <Eyebrow>La procédure</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2rem,6vw,3.5rem)]">
            Cinq étapes
          </h2>
          <ol className="mt-12 space-y-12">
            {steps.map((step, i) => (
              <li key={step.title} className="grid gap-4 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <span className="font-mono text-sm font-semibold text-seal">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-2 text-2xl">{step.title}</h3>
                </div>
                <p className="text-[1.0625rem] leading-relaxed text-smoke lg:col-span-8">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-20">
          <div className="patch px-7 py-12 sm:px-14 sm:py-16">
            <Eyebrow tone="muted">Si ça coince</Eyebrow>
            <h2 className="display mt-4 text-[clamp(1.75rem,5vw,3rem)]">
              Les quatre blocages classiques
            </h2>
            <dl className="mt-12 grid gap-10 sm:grid-cols-2">
              {problems.map((p) => (
                <div key={p.q}>
                  <dt className="font-semibold text-paper">{p.q}</dt>
                  <dd className="mt-2.5 text-sm leading-relaxed text-paper/60">
                    {p.a}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-sm text-paper/60">
              Un autre problème ? La{" "}
              <Link href="/faq" className="text-paper underline underline-offset-2">
                FAQ
              </Link>{" "}
              couvre le reste, et le Discord répond au cas par cas.
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
