import Link from "next/link";
import { joinUrl } from "@/lib/site";

type Props = {
  /** `solid` pour l'action principale, `outline` sur fond d'encre. */
  variant?: "solid" | "outline";
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
};

/**
 * Lance FiveM et connecte le joueur au serveur. Tant que le code cfx.re n'est
 * pas renseigné, le bouton renvoie vers la page qui explique la connexion
 * plutôt que vers un lien mort.
 */
export default function JoinButton({
  variant = "solid",
  size = "lg",
  className = "",
  children = "Rejoindre le serveur",
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-150";
  const sizes = {
    sm: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };
  const variants = {
    // L'aplat rouge et son texte blanc ne s'inversent pas avec le thème :
    // le contraste doit rester identique dans les deux.
    solid: "bg-seal-fill text-white hover:bg-seal-fill-deep",
    outline:
      "border border-paper/30 text-paper hover:bg-paper hover:text-ink",
  };
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (!joinUrl) {
    return (
      <Link href="/rejoindre" className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={joinUrl} className={classes}>
      {children}
    </a>
  );
}
