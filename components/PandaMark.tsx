/**
 * Marque provisoire, en attendant le logo fourni par le client.
 * Pour la remplacer : déposer le fichier dans `public/logo.svg` et échanger ce
 * composant par un <Image src="/logo.svg" …/>.
 *
 * Les deux couleurs sont fixes plutôt qu'héritées : un panda est clair et
 * sombre quel que soit le fond. La face claire donne la silhouette sur
 * l'encre, les marques sombres portent le dessin sur le papier.
 * Pour l'atténuer, utiliser une classe d'opacité, pas une classe de couleur.
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
      {/* Oreilles */}
      <circle cx="11.5" cy="12.5" r="7" fill={INK} />
      <circle cx="36.5" cy="12.5" r="7" fill={INK} />
      {/* Face */}
      <ellipse cx="24" cy="26.5" rx="17" ry="15.5" fill={PAPER} />
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
