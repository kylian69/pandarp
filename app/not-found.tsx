import Link from "next/link";
import { Container } from "@/components/ui";
import PandaMark from "@/components/PandaMark";
import JoinButton from "@/components/JoinButton";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <div className="patch px-7 py-16 text-center sm:px-14 sm:py-24">
        <PandaMark className="mx-auto h-14 w-14 text-volt opacity-90" />
        <p className="eyebrow mt-8 text-paper/45">Erreur 404</p>
        <h1 className="display mt-4 text-[clamp(2rem,6vw,3.5rem)]">
          Cette page n&apos;existe pas
        </h1>
        <p className="mx-auto mt-5 max-w-md text-paper/60">
          Le lien est peut-être obsolète. Reprenez depuis l&apos;accueil, ou
          connectez-vous directement au serveur.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <JoinButton />
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-paper/30 px-7 py-3.5 text-base font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </Container>
  );
}
