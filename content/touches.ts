/**
 * Table des raccourcis clavier du serveur.
 * Page très recherchée par les joueurs — et par les moteurs de recherche
 * sur des requêtes du type « touches FiveM » ou « commandes serveur GTA RP ».
 */

export type Keybind = { keys: string; action: string; note?: string };
export type KeybindGroup = { title: string; intro: string; binds: Keybind[] };

export const keybindGroups: KeybindGroup[] = [
  {
    title: "Base",
    intro: "Les touches à connaître dès la première session.",
    binds: [
      { keys: "F1", action: "Ouvrir le menu principal du personnage" },
      { keys: "F2", action: "Ouvrir l'inventaire" },
      { keys: "F3", action: "Ouvrir le menu d'emote et d'animation" },
      { keys: "F5", action: "Menu du métier en service", note: "Selon le métier exercé" },
      { keys: "M", action: "Ouvrir le menu d'interaction contextuel" },
      { keys: "E", action: "Interagir avec l'élément visé" },
      { keys: "Échap", action: "Ouvrir le menu de pause" },
    ],
  },
  {
    title: "Communication",
    intro: "Le vocal de proximité est le canal par défaut : parlez, on vous entend.",
    binds: [
      { keys: "N", action: "Parler en vocal de proximité", note: "Maintenir la touche" },
      { keys: "Y", action: "Changer la portée de la voix", note: "Chuchoter / normal / crier" },
      { keys: "T", action: "Ouvrir le chat texte" },
      { keys: "Alt gauche", action: "Parler en radio", note: "Radio requise dans l'inventaire" },
      { keys: "B", action: "Ouvrir la fréquence radio" },
    ],
  },
  {
    title: "Véhicules",
    intro: "Conduite, entretien et accès aux véhicules personnels.",
    binds: [
      { keys: "F", action: "Entrer ou sortir du véhicule" },
      { keys: "G", action: "Verrouiller ou déverrouiller le véhicule" },
      { keys: "K", action: "Ouvrir le coffre" },
      { keys: "L", action: "Allumer les phares", note: "Appuis successifs pour les feux de route" },
      { keys: "H", action: "Activer le régulateur de vitesse" },
      { keys: "Maj gauche", action: "Attacher ou détacher la ceinture" },
    ],
  },
  {
    title: "Roleplay",
    intro: "Les actions qui font vivre la scène.",
    binds: [
      { keys: "X", action: "Lever les mains en l'air" },
      { keys: "Ctrl gauche", action: "S'accroupir" },
      { keys: "U", action: "Se mettre à terre" },
      { keys: "O", action: "Ouvrir le menu de tenue" },
      { keys: "P", action: "Consulter la liste des joueurs connectés" },
    ],
  },
  {
    title: "Commandes utiles",
    intro: "À taper dans le chat, touche T.",
    binds: [
      { keys: "/me", action: "Décrire une action de votre personnage" },
      { keys: "/do", action: "Décrire un état ou un décor autour de votre personnage" },
      { keys: "/report", action: "Signaler un joueur au staff" },
      { keys: "/aide", action: "Demander de l'aide à un membre du staff" },
      { keys: "/id", action: "Afficher votre identifiant de session" },
    ],
  },
];
