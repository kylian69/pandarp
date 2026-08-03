"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import PandaMark from "./PandaMark";
import JoinButton from "./JoinButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-haze">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={() => setOpen(false)}
          >
            <PandaMark className="h-8 w-8 text-volt" />
            <span className="display text-xl tracking-tight">{site.name}</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`text-sm transition-colors hover:text-volt ${
                        active ? "text-volt font-semibold" : "text-smoke"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <ThemeToggle />
            <JoinButton size="sm" className="hidden sm:inline-flex">
              Rejoindre
            </JoinButton>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="lg:hidden p-2 -mr-2"
            >
              <span className="sr-only">
                {open ? "Fermer le menu" : "Ouvrir le menu"}
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
                {open ? (
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

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navigation mobile"
          className="lg:hidden border-t border-haze bg-paper"
        >
          <ul className="mx-auto max-w-6xl px-5 sm:px-8 py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-base border-b border-haze last:border-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 sm:hidden">
              <JoinButton className="w-full" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
