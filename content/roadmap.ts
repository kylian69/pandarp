/**
 * Feuille de route publique du serveur.
 *
 * Contenu éditorial : c'est ici qu'on ajoute, déplace et retire les chantiers.
 * Le rendu de `/roadmap` s'y adapte seul — rien à toucher côté code.
 *
 * ⚠️ Les entrées actuelles sont des exemples, à remplacer par les vrais
 * chantiers du serveur (voir A_FOURNIR.md).
 */

/**
 * L'ordre de ce tableau est celui de l'affichage, et il encode une certitude
 * décroissante : ce qui est en cours arrivera, ce qui est à l'étude est une
 * intention. La page le donne à lire visuellement — le rail s'estompe vers le
 * bas — pour qu'aucune ligne « à l'étude » ne se lise comme une promesse.
 */
export const ROADMAP_STATUSES = ["en-cours", "prevu", "etude"] as const;

export type RoadmapStatus = (typeof ROADMAP_STATUSES)[number];

export const statusLabels: Record<RoadmapStatus, { label: string; hint: string }> = {
  "en-cours": {
    label: "En cours",
    hint: "En développement actif, livré dans une prochaine version.",
  },
  prevu: {
    label: "Prévu",
    hint: "Validé et planifié, le développement n'a pas encore commencé.",
  },
  etude: {
    label: "À l'étude",
    hint: "Une piste qui nous intéresse. Ni datée, ni garantie.",
  },
};

export type RoadmapItem = {
  slug: string;
  title: string;
  summary: string;
  status: RoadmapStatus;
  /**
   * Période visée, en texte libre et volontairement large (« fin 2026 »,
   * « courant 2027 »). Une date précise sur un chantier non commencé est une
   * promesse qu'on finit par ne pas tenir.
   */
  target?: string;
};

export const roadmap: RoadmapItem[] = [
  {
    slug: "ouverture-publique",
    title: "Ouverture publique du serveur",
    summary:
      "Fin de la bêta fermée : le serveur passe en accès libre, sans whitelist ni candidature.",
    status: "en-cours",
    target: "Rentrée 2026",
  },
  {
    slug: "metiers-illegaux",
    title: "Métiers illégaux structurés",
    summary:
      "Braquages préparés, filières de revente et blanchiment. Le crime doit se jouer et se risquer, pas se répéter en boucle.",
    status: "en-cours",
    target: "Rentrée 2026",
  },
  {
    slug: "immobilier",
    title: "Immobilier jouable",
    summary:
      "Achat, location et revente de logements entre joueurs, avec des intérieurs meublables et un marché qui suit l'offre.",
    status: "en-cours",
  },
  {
    slug: "hierarchie-services",
    title: "Hiérarchies des services publics",
    summary:
      "Grades, formations internes et procédures propres à la police et au SAMU, gérés par les joueurs eux-mêmes.",
    status: "prevu",
    target: "Fin 2026",
  },
  {
    slug: "entreprises-joueurs",
    title: "Entreprises tenues par les joueurs",
    summary:
      "Créer une société, embaucher, fixer ses prix et tenir sa comptabilité. Les stocks viennent d'autres joueurs, pas d'un menu.",
    status: "prevu",
    target: "Fin 2026",
  },
  {
    slug: "events-recurrents",
    title: "Événements récurrents",
    summary:
      "Courses, ventes aux enchères et rendez-vous communautaires à date fixe, annoncés sur le site et sur le Discord.",
    status: "prevu",
  },
  {
    slug: "justice",
    title: "Système judiciaire complet",
    summary:
      "Avocats, procès joués et peines purgées en jeu, pour que l'arrestation ne soit pas la fin de l'histoire.",
    status: "etude",
  },
  {
    slug: "presse",
    title: "Presse et médias joueurs",
    summary:
      "Une rédaction tenue par des joueurs, avec un journal consultable en jeu et diffusé sur le site.",
    status: "etude",
  },
  {
    slug: "app-compagnon",
    title: "Application compagnon",
    summary:
      "Consulter son compte, ses messages et l'état de son entreprise depuis le téléphone, hors du jeu.",
    status: "etude",
  },
];

/**
 * Ce qui a été livré, rattaché à la version qui l'a apporté.
 *
 * Le lien vers la note de version n'est produit que si cette version existe
 * réellement dans `content/patch-notes/` — sinon l'entrée reste en texte
 * simple, plutôt que de pointer vers une ancre morte.
 */
export type ShippedItem = {
  title: string;
  version: string;
};

export const shipped: ShippedItem[] = [
  { title: "Passage complet à la build Enhanced", version: "0.9.0" },
  { title: "Quatre métiers légaux jouables", version: "0.9.0" },
  { title: "Téléphone et système de factures", version: "0.9.0" },
  { title: "Économie persistante et comptes bancaires", version: "0.8.0" },
  { title: "Territoires de faction revendicables", version: "0.8.0" },
  { title: "Création de personnage et sauvegarde", version: "0.7.0" },
  { title: "Voix de proximité et système de secours", version: "0.7.0" },
];
