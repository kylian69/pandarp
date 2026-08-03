/**
 * Règlement du serveur. Structure volontairement plate : chaque règle est
 * numérotée et citable par le staff lors d'une sanction.
 */

export type Rule = { code: string; title: string; text: string };
export type RuleSection = {
  slug: string;
  title: string;
  intro: string;
  rules: Rule[];
};

export const lastUpdated = "2026-08-03";

export const ruleSections: RuleSection[] = [
  {
    slug: "principes",
    title: "Principes généraux",
    intro:
      "Ces règles priment sur toutes les autres. En cas de doute sur une situation non couverte, le staff tranche dans l'esprit de ces principes.",
    rules: [
      {
        code: "G1",
        title: "Respect entre joueurs",
        text: "Aucune insulte, menace, discrimination ou harcèlement, en jeu comme sur le Discord. Un conflit entre personnages ne justifie jamais une agression entre joueurs.",
      },
      {
        code: "G2",
        title: "Séparation du personnage et du joueur",
        text: "Ce que vous savez en tant que joueur n'existe pas pour votre personnage. Utiliser une information obtenue hors du jeu constitue du metagaming.",
      },
      {
        code: "G3",
        title: "Cohérence du personnage",
        text: "Votre personnage a un passé, des limites et un instinct de survie. Agir sans considération pour sa vie constitue du powergaming.",
      },
      {
        code: "G4",
        title: "Aucune triche",
        text: "Tout logiciel tiers modifiant le jeu, tout exploit de bug et toute revente de biens du serveur contre de l'argent réel entraînent un bannissement définitif.",
      },
      {
        code: "G5",
        title: "Un compte par joueur",
        text: "Le partage de compte est interdit. Vous êtes responsable de tout ce qui se passe sur le vôtre.",
      },
    ],
  },
  {
    slug: "roleplay",
    title: "Règles de roleplay",
    intro:
      "Le roleplay prime sur la victoire. Une scène ratée mais jouée vaut mieux qu'une scène gagnée hors personnage.",
    rules: [
      {
        code: "R1",
        title: "Rester en personnage",
        text: "Le hors-roleplay se limite au canal prévu. Utilisez /me et /do pour décrire ce qui n'est pas visible à l'écran.",
      },
      {
        code: "R2",
        title: "Valoriser sa vie",
        text: "Face à une arme, votre personnage a peur. Provoquer un adversaire armé sans échappatoire crédible est sanctionné.",
      },
      {
        code: "R3",
        title: "Interdiction du retour sur mort",
        text: "Après la mort de votre personnage, vous oubliez les circonstances de votre décès et ne retournez pas sur les lieux pendant trente minutes.",
      },
      {
        code: "R4",
        title: "Motiver ses actions violentes",
        text: "Toute agression exige un motif roleplay construit en amont. Tuer sans raison est interdit.",
      },
      {
        code: "R5",
        title: "Limites du roleplay sensible",
        text: "Les scènes de torture, d'agression sexuelle ou impliquant des mineurs sont interdites. Le suicide de personnage exige l'accord préalable du staff.",
      },
      {
        code: "R6",
        title: "Conduite cohérente",
        text: "Votre personnage conduit comme une personne réelle. Les cascades et la conduite hors route en berline sont sanctionnées.",
      },
    ],
  },
  {
    slug: "illegal",
    title: "Activités illégales",
    intro:
      "Le crime fait partie du serveur. Il est encadré pour rester une source de scénario et non un prétexte au conflit permanent.",
    rules: [
      {
        code: "I1",
        title: "Limite de participants",
        text: "Six joueurs maximum par braquage ou par action offensive coordonnée, sauf accord préalable du staff.",
      },
      {
        code: "I2",
        title: "Négociation avant escalade",
        text: "Toute prise d'otage commence par une phase de négociation. Exécuter un otage sans négociation est interdit.",
      },
      {
        code: "I3",
        title: "Délai entre deux actions",
        text: "Trente minutes minimum entre deux braquages menés par la même organisation.",
      },
      {
        code: "I4",
        title: "Zones protégées",
        text: "Aucune action offensive dans les hôpitaux, les commissariats et les zones marquées comme sûres sur la carte.",
      },
      {
        code: "I5",
        title: "Respect de l'issue",
        text: "Une arrestation ou une saisie se joue. Se déconnecter pour y échapper équivaut à de la fuite de roleplay et se sanctionne comme telle.",
      },
    ],
  },
  {
    slug: "sanctions",
    title: "Sanctions et recours",
    intro:
      "Chaque sanction est notifiée avec le code de la règle concernée. Vous pouvez la contester.",
    rules: [
      {
        code: "S1",
        title: "Échelle des sanctions",
        text: "Avertissement, puis exclusion temporaire, puis exclusion définitive. La triche et les propos haineux entraînent un bannissement immédiat.",
      },
      {
        code: "S2",
        title: "Droit de recours",
        text: "Toute sanction se conteste sous sept jours via un ticket Discord. Le recours est instruit par un membre du staff qui n'a pas prononcé la sanction.",
      },
      {
        code: "S3",
        title: "Charge de la preuve",
        text: "Un signalement s'appuie sur des éléments vérifiables. Enregistrez vos sessions : une vidéo tranche là où deux témoignages s'opposent.",
      },
    ],
  },
];
