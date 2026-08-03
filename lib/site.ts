/**
 * Configuration centrale du site.
 * Les valeurs sensibles ou pas encore connues passent par les variables
 * d'environnement (voir .env.example) pour ne rien coder en dur.
 */

export const site = {
  name: "PandaRP",
  /** Domaine de production. Surchargé en dev via NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://pandarp.fr").replace(/\/$/, ""),
  locale: "fr_FR",
  description:
    "PandaRP est un serveur GTA 5 RP francophone sur FiveM Enhanced, sans whitelist. Connexion immédiate, roleplay sérieux, métiers, factions et économie persistante.",
  /** Code de connexion cfx.re (ex. « abc123 »). Renseigner quand le serveur est publié. */
  cfxId: process.env.NEXT_PUBLIC_CFX_ID ?? "",
  /** ID du serveur Discord, widget à activer dans Paramètres du serveur > Widget. */
  discordGuildId: process.env.NEXT_PUBLIC_DISCORD_GUILD_ID ?? "",
  discordInvite: process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "",
} as const;

/** Lien de connexion direct qui lance FiveM sur le serveur. */
export const joinUrl = site.cfxId ? `fivem://connect/${site.cfxId}` : "";

export const nav = [
  { href: "/fonctionnalites", label: "Le serveur" },
  { href: "/rejoindre", label: "Rejoindre" },
  { href: "/reglement", label: "Règlement" },
  { href: "/touches", label: "Touches" },
  { href: "/galerie", label: "Galerie" },
  { href: "/blog", label: "Actualités" },
  { href: "/faq", label: "FAQ" },
] as const;

/** Construit une URL absolue, requise pour les balises canoniques et Open Graph. */
export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
