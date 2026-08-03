/**
 * Questions fréquentes. Alimente la page /faq et son balisage FAQPage,
 * qui permet à Google d'afficher les questions directement dans ses résultats.
 * Les réponses sont en texte brut : le balisage n'accepte pas de HTML riche.
 */

export type FaqItem = { question: string; answer: string };

export const faq: FaqItem[] = [
  {
    question: "Faut-il une whitelist pour jouer sur PandaRP ?",
    answer:
      "Non. PandaRP est un serveur GTA 5 RP en accès libre : aucune candidature ni entretien. Vous installez FiveM, vous vous connectez au serveur et vous créez votre personnage immédiatement.",
  },
  {
    question: "Que faut-il pour jouer sur un serveur FiveM Enhanced ?",
    answer:
      "Il faut posséder GTA V Enhanced sur PC (Steam, Rockstar Games Launcher ou Epic Games), l'avoir lancé au moins une fois pour se connecter à son compte Rockstar, puis installer le client FiveM depuis fivem.net. Aucun autre téléchargement n'est nécessaire : les ressources du serveur arrivent automatiquement à la connexion.",
  },
  {
    question: "Quelle est la différence entre FiveM Legacy et FiveM Enhanced ?",
    answer:
      "Enhanced correspond à la version remasterisée de GTA V sortie sur PC en 2025, avec ray tracing, éclairage global et rendu amélioré. Legacy désigne l'ancienne version du jeu. Les deux builds sont incompatibles : un serveur Enhanced n'est accessible qu'avec un client FiveM en mode Enhanced. PandaRP tourne sur Enhanced.",
  },
  {
    question: "PandaRP est-il gratuit ?",
    answer:
      "Oui. L'accès au serveur et l'ensemble du contenu de jeu sont gratuits. Seul GTA V, le jeu de base, doit être acheté légalement. Aucun avantage de gameplay n'est vendu.",
  },
  {
    question: "Le serveur est-il francophone ?",
    answer:
      "Oui, PandaRP est un serveur français. Le roleplay, la modération et le Discord se font en français.",
  },
  {
    question: "Quelle configuration PC faut-il pour FiveM Enhanced ?",
    answer:
      "Comptez au minimum un processeur récent 6 cœurs, 16 Go de mémoire vive et une carte graphique équivalente à une RTX 2060 ou une RX 5700 pour jouer confortablement. GTA V Enhanced est plus exigeant que la version d'origine, en particulier si le ray tracing est activé. Une installation sur SSD est fortement recommandée.",
  },
  {
    question: "Peut-on jouer sur PandaRP avec une version piratée de GTA V ?",
    answer:
      "Non. FiveM vérifie que votre compte Rockstar possède une copie légitime du jeu. Une version piratée ne permet pas de se connecter.",
  },
  {
    question: "Y a-t-il un âge minimum pour rejoindre le serveur ?",
    answer:
      "Le serveur est ouvert à partir de 16 ans. Les thématiques abordées en roleplay sont adultes et le respect du règlement est attendu de tous, sans distinction d'âge.",
  },
  {
    question: "Comment signaler un joueur qui ne respecte pas le règlement ?",
    answer:
      "Utilisez la commande de signalement en jeu pour joindre le staff en direct, ou ouvrez un ticket sur le Discord avec vos preuves (capture vidéo de préférence). Chaque signalement est traité et vous recevez une réponse.",
  },
  {
    question: "Peut-on créer sa propre entreprise ou sa propre faction ?",
    answer:
      "Oui. Les projets d'entreprise et de faction se déposent auprès de l'équipe via le Discord. Un projet cohérent et porté par plusieurs joueurs reçoit un accompagnement technique et scénaristique.",
  },
];
