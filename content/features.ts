/**
 * Contenu éditorial des fonctionnalités du serveur.
 * À ajuster selon ce qui tourne réellement sur PandaRP.
 */

export type Feature = {
  slug: string;
  title: string;
  summary: string;
  details: string[];
};

export const features: Feature[] = [
  {
    slug: "enhanced",
    title: "Bâti pour GTA V Enhanced",
    summary:
      "Le serveur tourne sur la build Enhanced de FiveM : ray tracing, éclairage global et distance d'affichage revue.",
    details: [
      "Les intérieurs et les éclairages sont retravaillés pour tirer parti du rendu Enhanced plutôt que d'y être simplement portés.",
      "Aucun pack graphique lourd à installer côté joueur : le rendu vient du jeu, pas d'un ENB à télécharger.",
      "Les ressources sont optimisées pour tenir un framerate stable en zone dense, à Vinewood comme au centre de Los Santos.",
    ],
  },
  {
    slug: "acces-libre",
    title: "Accès libre, sans whitelist",
    summary:
      "Pas de candidature à écrire, pas d'entretien à passer, pas de file d'attente pour être validé.",
    details: [
      "Vous téléchargez FiveM, vous vous connectez, vous créez votre personnage : la première session commence dans la minute.",
      "La modération se fait en jeu, sur les comportements, pas en amont sur un formulaire.",
      "Un parcours d'arrivée guide les nouveaux joueurs sur leurs premières heures sans les isoler du reste du serveur.",
    ],
  },
  {
    slug: "metiers",
    title: "Métiers et progression",
    summary:
      "Métiers légaux et illégaux, avec une progression qui se joue plutôt qu'elle ne se farme.",
    details: [
      "Services publics : police, SAMU, mécaniciens, transports — chaque service a sa hiérarchie et ses procédures.",
      "Métiers civils : commerces tenus par des joueurs, immobilier, restauration, journalisme.",
      "Voie illégale : structurée, risquée et surveillée. Le crime rapporte quand il est joué, pas quand il est répété.",
    ],
  },
  {
    slug: "economie",
    title: "Économie persistante",
    summary:
      "Une économie fermée où l'argent circule entre joueurs au lieu d'apparaître à l'infini.",
    details: [
      "Les stocks des commerces sont alimentés par des joueurs, de la matière première au produit fini.",
      "Véhicules, logements et entreprises s'achètent, s'entretiennent et se revendent.",
      "L'inflation est suivie et corrigée par l'équipe économique pour que les débuts restent accessibles.",
    ],
  },
  {
    slug: "factions",
    title: "Factions et territoires",
    summary:
      "Des organisations tenues par les joueurs, avec un impact réel sur la carte.",
    details: [
      "Les factions se créent et se dissolvent selon le jeu, pas selon un tableau figé.",
      "Les conflits de territoire passent par des règles claires pour éviter la dérive en deathmatch.",
      "L'équipe accompagne les projets de faction sérieux avec du support technique et scénaristique.",
    ],
  },
  {
    slug: "moderation",
    title: "Modération présente et lisible",
    summary:
      "Un staff joignable, des sanctions motivées et un droit de contestation.",
    details: [
      "Chaque sanction est notifiée avec son motif et la règle concernée.",
      "Les recours se font sur Discord, traités par un membre du staff qui n'a pas prononcé la sanction.",
      "Anti-triche actif et journalisation des actions sensibles pour trancher sur des faits.",
    ],
  },
];
