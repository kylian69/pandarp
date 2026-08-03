"use client";

/**
 * Bascule sombre / clair. Le sombre est le défaut.
 *
 * Aucun état React : le thème vit dans l'attribut `data-theme` de <html>, et
 * les deux icônes sont montrées ou masquées en CSS selon cet attribut. Rien à
 * synchroniser, donc rien à faire clignoter au moment de l'hydratation.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("pandarp-theme", next);
    } catch {
      // Navigation privée ou stockage refusé : le thème vaut pour la session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title="Changer de thème"
      className={`rounded-full p-2 text-smoke transition-colors hover:text-ink ${className}`}
    >
      <span className="sr-only">Changer de thème</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        {/* Soleil : visible en thème sombre, il propose de passer au clair. */}
        <g className="theme-icon-sun">
          <circle cx="9" cy="9" r="3.4" />
          <path d="M9 1.4v1.8M9 14.8v1.8M1.4 9h1.8M14.8 9h1.8M3.6 3.6l1.3 1.3M13.1 13.1l1.3 1.3M14.4 3.6l-1.3 1.3M4.9 13.1l-1.3 1.3" />
        </g>
        {/* Lune : visible en thème clair, elle propose de passer au sombre. */}
        <g className="theme-icon-moon">
          <path
            d="M15 10.6A6.4 6.4 0 0 1 7.4 3a6.6 6.6 0 1 0 7.6 7.6Z"
            fill="currentColor"
            strokeWidth="1.2"
          />
        </g>
      </svg>
    </button>
  );
}
