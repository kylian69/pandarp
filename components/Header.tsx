"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { isNavGroup, nav, site, type NavLink } from "@/lib/site";
import JoinButton from "./JoinButton";
import ThemeToggle from "./ThemeToggle";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`transition-transform ${open ? "-rotate-180" : ""}`}
    >
      <path d="M2 3.5L5 6.5L8 3.5" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Libellé du groupe ouvert, ou `null`. Un seul à la fois. */
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Un changement de page doit refermer les menus : sans ça, le panneau reste
  // ouvert par-dessus la page qu'on vient d'atteindre.
  //
  // L'ajustement se fait pendant le rendu plutôt que dans un effet : React
  // relance alors le rendu avant de peindre, là où un effet laisserait
  // apparaître une image intermédiaire, menu encore ouvert. Ça couvre aussi
  // les boutons précédent/suivant du navigateur, qu'un `onClick` manquerait.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setMobileOpen(false);
    setOpenGroup(null);
  }

  // Échap referme, et un clic en dehors aussi. Les deux sorties auxquelles on
  // s'attend d'un menu déroulant — sans elles, il faut viser le déclencheur.
  useEffect(() => {
    if (!openGroup) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        // Rendre le focus au déclencheur : au clavier, le perdre renverrait
        // en haut du document.
        navRef.current
          ?.querySelector<HTMLButtonElement>(`[data-group="${openGroup}"]`)
          ?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openGroup]);

  const linkClass = (active: boolean) =>
    `text-sm transition-colors hover:text-volt ${
      active ? "text-volt font-semibold" : "text-smoke"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-haze">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/brand/logo-icon.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="display text-xl tracking-tight">{site.name}</span>
          </Link>

          <nav
            ref={navRef}
            aria-label="Navigation principale"
            className="hidden lg:block"
          >
            <ul className="flex items-center gap-6">
              {nav.map((entry) => {
                if (!isNavGroup(entry)) {
                  return (
                    <li key={entry.href}>
                      <Link
                        href={entry.href}
                        aria-current={isActive(entry.href) ? "page" : undefined}
                        className={linkClass(isActive(entry.href))}
                      >
                        {entry.label}
                      </Link>
                    </li>
                  );
                }

                const open = openGroup === entry.label;
                // Le groupe se signale actif dès qu'on est sur l'une de ses
                // pages : sans ça, la barre n'indique plus où l'on se trouve.
                const groupActive = entry.items.some((i) => isActive(i.href));

                return (
                  // Ouverture au clic seul, pas au survol. Combiner les deux
                  // demande de savoir lequel a ouvert le menu, sans quoi le
                  // clic qui suit un survol referme aussitôt ce que le survol
                  // venait d'ouvrir. Le clic marche partout — souris, tactile,
                  // clavier — et évite les ouvertures involontaires quand la
                  // souris ne fait que traverser la barre.
                  <li key={entry.label} className="relative">
                    <button
                      type="button"
                      data-group={entry.label}
                      aria-expanded={open}
                      aria-controls={`menu-${entry.label}`}
                      onClick={() => setOpenGroup(open ? null : entry.label)}
                      className={`flex items-center gap-1.5 ${linkClass(groupActive)}`}
                    >
                      {entry.label}
                      <Chevron open={open} />
                    </button>

                    {open && (
                      // L'écart avec le bouton est un `padding` du conteneur
                      // positionné : il reste ainsi dans la zone du menu, donc
                      // dans ce que le gestionnaire de clic extérieur
                      // considère comme « dedans ».
                      <div className="absolute left-0 top-full pt-3">
                        <ul
                          id={`menu-${entry.label}`}
                          className="min-w-48 rounded-xl border border-haze bg-paper py-2 shadow-lg shadow-black/20"
                        >
                          {entry.items.map((item: NavLink) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                aria-current={
                                  isActive(item.href) ? "page" : undefined
                                }
                                className={`block px-4 py-2 text-sm transition-colors hover:bg-haze/60 hover:text-volt ${
                                  isActive(item.href)
                                    ? "text-volt font-semibold"
                                    : "text-ink"
                                }`}
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <ThemeToggle />
            {/* La visibilité se pilote sur ce conteneur, pas sur JoinButton :
                son propre "inline-flex" interne écraserait un "hidden" posé
                sur le même élément — les deux ciblent `display`, et c'est
                l'ordre du CSS généré qui tranche, pas l'ordre des classes. */}
            <div className="hidden sm:block">
              <JoinButton size="sm">Rejoindre</JoinButton>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              className="lg:hidden p-2 -mr-2"
            >
              <span className="sr-only">
                {mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <>
                    <path d="M5 5l12 12" />
                    <path d="M17 5L5 17" />
                  </>
                ) : (
                  <>
                    <path d="M3 6h16" />
                    <path d="M3 11h16" />
                    <path d="M3 16h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="menu-mobile"
          aria-label="Navigation mobile"
          className="lg:hidden border-t border-haze bg-paper"
        >
          {/* Chaque entrée de la barre devient un bloc encadré, y compris les
              liens isolés : c'est ce contour qui rend visibles les quatre
              unités, là où une simple liste de textes les noyait toutes au
              même poids. Rien n'est replié — tout reste à une seule touche. */}
          {/* Espacements resserrés au minimum utile : le panneau doit tenir
              d'une pièce sur un écran de 667 px (iPhone SE), bouton de
              connexion compris. Les hauteurs de touche, elles, ne bougent
              pas — 48 px par entrée, au-dessus du minimum de 44. */}
          <div className="mx-auto max-w-6xl space-y-2.5 px-5 py-4 sm:px-8">
            {nav.map((entry) =>
              isNavGroup(entry) ? (
                <section
                  key={entry.label}
                  className="overflow-hidden rounded-xl border border-haze"
                >
                  <h2 className="eyebrow px-4 pt-3 pb-2.5 text-smoke">
                    {entry.label}
                  </h2>
                  <ul>
                    {entry.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={`block border-t border-haze px-4 py-3 text-base ${
                            isActive(item.href) ? "bg-haze/50 text-volt font-semibold" : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : (
                // La flèche distingue le lien isolé du bloc de groupe : celui-ci
                // mène quelque part, l'en-tête d'un groupe non.
                <Link
                  key={entry.href}
                  href={entry.href}
                  aria-current={isActive(entry.href) ? "page" : undefined}
                  className={`flex items-center justify-between gap-3 rounded-xl border border-haze px-4 py-3.5 text-base font-semibold ${
                    isActive(entry.href) ? "bg-haze/50 text-volt" : ""
                  }`}
                >
                  {entry.label}
                  <ArrowRight />
                </Link>
              ),
            )}
            <div className="pt-2 sm:hidden">
              <JoinButton className="w-full" />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
