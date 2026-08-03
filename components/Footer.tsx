import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-haze">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/brand/logo-icon.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="display text-xl">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-smoke">
              Serveur GTA 5 RP francophone sur FiveM Enhanced. Accès libre, sans
              whitelist ni candidature : téléchargez FiveM, connectez-vous, jouez.
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-smoke">Le serveur</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink hover:text-volt transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-smoke">Communauté</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                {site.discordInvite ? (
                  <a
                    href={site.discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink hover:text-volt transition-colors"
                  >
                    Discord
                  </a>
                ) : (
                  <span className="text-sm text-smoke">Discord — bientôt</span>
                )}
              </li>
              <li>
                <Link
                  href="/rejoindre"
                  className="text-sm text-ink hover:text-volt transition-colors"
                >
                  Comment nous rejoindre
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-haze flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="eyebrow text-smoke">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-xs leading-relaxed text-smoke max-w-xl sm:text-right">
            Projet communautaire indépendant. Non affilié à Rockstar Games,
            Take-Two Interactive ni à Cfx.re. GTA V est une marque de Rockstar
            Games ; un exemplaire légitime du jeu est requis pour jouer.
          </p>
        </div>
      </div>
    </footer>
  );
}
