"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { joinUrl } from "@/lib/site";

type Props = {
  /** `solid` pour l'action principale, `outline` sur fond d'encre. */
  variant?: "solid" | "outline";
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
};

/**
 * FiveM n'existe sur aucune plateforme mobile — ce n'est pas une question
 * d'installation, le jeu n'y tourne tout simplement pas. Un visiteur sur
 * téléphone qui suit le lien cfx.re/join atterrit sur une page vide, sans
 * aucun message : la page officielle ne gère pas ce cas non plus. On l'évite
 * en le renvoyant vers la procédure plutôt que vers un lien mort.
 */
function isMobileDevice() {
  const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } })
    .userAgentData;
  if (uaData) return uaData.mobile ?? false;
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// La détection ne change jamais en cours de session : un abonnement vide
// suffit. useSyncExternalStore lit la valeur au montage sans passer par un
// setState dans un effet, et rend explicitement la même chose au serveur
// (aucun user-agent disponible) qu'avant l'hydratation côté client.
const noopSubscribe = () => () => {};

function useIsMobile() {
  return useSyncExternalStore(noopSubscribe, isMobileDevice, () => false);
}

/**
 * Lance FiveM et connecte le joueur au serveur. Tant que le code cfx.re n'est
 * pas renseigné, ou sur un appareil qui ne peut de toute façon pas lancer
 * FiveM (mobile), le bouton renvoie vers la page qui explique la connexion
 * plutôt que vers un lien mort.
 */
export default function JoinButton({
  variant = "solid",
  size = "lg",
  className = "",
  children = "Rejoindre le serveur",
}: Props) {
  // Le rendu serveur suppose un poste compatible : c'est le cas le plus
  // fréquent, et ça évite un flash de mauvais lien avant l'hydratation.
  const mobile = useIsMobile();

  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-150";
  const sizes = {
    sm: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };
  const variants = {
    // L'aplat rouge et son texte blanc ne s'inversent pas avec le thème :
    // le contraste doit rester identique dans les deux.
    solid: "bg-volt-fill text-white hover:bg-volt-fill-deep",
    outline:
      "border border-paper/30 text-paper hover:bg-paper hover:text-ink",
  };
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (!joinUrl || mobile) {
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
