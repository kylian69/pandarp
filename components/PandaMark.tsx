/**
 * Marque provisoire, en attendant le fichier définitif du logo fourni par le
 * client (`public/_tmp/logo-source.jpg`, à retravailler en vectoriel).
 * Pour la remplacer : déposer le fichier dans `public/logo.svg` et échanger ce
 * composant par un <Image src="/logo.svg" …/>.
 *
 * Les couleurs de la face sont fixes plutôt qu'héritées : un panda est clair
 * et sombre quel que soit le fond. Seul l'anneau reprend l'accent bleu du
 * logo, via currentColor — c'est le seul élément qui doit suivre le thème.
 */
const INK = "#101012";
const PAPER = "#FAFAF7";

export default function PandaMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Anneau, écho du cercle peint au pinceau du logo fourni. */}
      <circle
        cx="24"
        cy="24"
        r="22.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      {/* Oreilles */}
      <circle cx="11.5" cy="12.5" r="6.6" fill={INK} />
      <circle cx="36.5" cy="12.5" r="6.6" fill={INK} />
      {/* Face */}
      <ellipse cx="24" cy="26.5" rx="16" ry="14.6" fill={PAPER} />
      {/* Taches oculaires, inclinées vers le museau */}
      <ellipse
        cx="16.6"
        cy="24.2"
        rx="5"
        ry="6.1"
        fill={INK}
        transform="rotate(-18 16.6 24.2)"
      />
      <ellipse
        cx="31.4"
        cy="24.2"
        rx="5"
        ry="6.1"
        fill={INK}
        transform="rotate(18 31.4 24.2)"
      />
      <circle cx="16.6" cy="24.2" r="1.9" fill={PAPER} />
      <circle cx="31.4" cy="24.2" r="1.9" fill={PAPER} />
      {/* Museau */}
      <ellipse cx="24" cy="32.4" rx="3.1" ry="2.3" fill={INK} />
    </svg>
  );
}
