"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { HeroMedia } from "@/lib/hero";

/**
 * Fond du hero : image fixe, et vidéo en surimpression quand il y en a une.
 *
 * L'image reste rendue en dessous en toutes circonstances. C'est elle qui est
 * peinte en premier — donc elle qui compte pour le LCP — et c'est elle qu'on
 * voit si la vidéo n'arrive jamais : réseau coupé, format refusé, lecture
 * automatique bloquée. La vidéo est un embellissement posé par-dessus, jamais
 * une dépendance.
 *
 * La vidéo suit le thème : celle de jour en clair, celle de nuit en sombre.
 * Une seule des deux est téléchargée — celle du thème courant — et le montage
 * n'a lieu qu'après le premier rendu, pour ne pas disputer la bande passante
 * à l'image pendant l'affichage initial.
 */
export default function HeroBackground({
  media,
  className = "",
}: {
  media: HeroMedia;
  className?: string;
}) {
  // `null` = on ne sait pas encore quoi jouer : rendu serveur, animation
  // refusée, ou aucune vidéo déposée. Dans tous ces cas, l'image suffit.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!media.day && !media.night) return;

    // Une vidéo de fond est une décoration en boucle : exactement ce que
    // `prefers-reduced-motion` demande de ne pas imposer. On s'arrête là.
    const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Et sur un forfait compté, quelques mégaoctets de décor n'ont rien
    // d'anodin — le navigateur nous le signale, autant l'écouter.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;

    const pick = () => {
      if (stillness.matches || connection?.saveData) {
        setSrc(null);
        return;
      }
      const light = document.documentElement.getAttribute("data-theme") === "light";
      setSrc(light ? media.day : media.night);
    };

    pick();

    // Le thème vit dans un attribut de <html>, sans état React à écouter :
    // l'observer est le seul moyen d'être prévenu quand la bascule est
    // actionnée.
    const observer = new MutationObserver(pick);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    stillness.addEventListener("change", pick);

    return () => {
      observer.disconnect();
      stillness.removeEventListener("change", pick);
    };
  }, [media.day, media.night]);

  return (
    <>
      {media.image && (
        <Image
          src={media.image}
          alt=""
          fill
          // Plus gros téléchargement de la page tant qu'aucune vidéo n'est
          // lancée, et élément le plus grand au premier écran : il conditionne
          // le LCP, donc pas de chargement différé.
          priority
          sizes="100vw"
          className={className}
        />
      )}
      {src && (
        <video
          // La clé force un remontage quand le thème change : réutiliser
          // l'élément demanderait de piloter le chargement à la main, alors
          // qu'un montage relance la lecture tout seul.
          key={src}
          src={src}
          poster={media.image ?? undefined}
          autoPlay
          loop
          muted
          // Sans ça, iOS passe la vidéo en plein écran au lieu de la jouer en
          // place — et refuse la lecture automatique.
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          // `next/image` en mode `fill` se positionne seul ; la vidéo, non —
          // il faut la superposer explicitement à l'image qu'elle recouvre.
          className={`absolute inset-0 h-full w-full ${className}`}
        />
      )}
    </>
  );
}
