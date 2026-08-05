# PandaRP — site du serveur

Site vitrine du serveur GTA 5 RP **PandaRP**, sur FiveM Enhanced.
Next.js 16 (App Router), TypeScript, Tailwind CSS v4. Tout est en français,
toutes les pages sont générées statiquement.

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs
npm run dev                  # http://localhost:3000
```

Production :

```bash
npm run build && npm run start
```

## Environnement de développement

Le site tourne en local et est exposé via un tunnel Cloudflare sur
**https://pandarp.lumero.fr**.

```bash
# 1. le site, en build de production, sur le port 3100
npm run build
PORT=3100 npm run start

# 2. le tunnel, dans un autre terminal
cloudflared tunnel --no-autoupdate run --token "$(cat ~/.cloudflared/pandarp.token)"
```

Le jeton du tunnel vit dans `~/.cloudflared/pandarp.token`, hors du dépôt et en
permissions `600`. Le tunnel s'appelle `pandarp` côté Cloudflare, sa
configuration d'ingress est gérée à distance depuis le tableau de bord — rien
à maintenir en local.

Les deux processus sont détachés du terminal mais **ne survivent pas à un
redémarrage de la machine**. Pour les rendre permanents, `cloudflared service
install` et un service systemd pour le site feraient l'affaire.

### Le site de développement n'est pas indexable

Tant que `NEXT_PUBLIC_SITE_URL` ne vaut pas `https://pandarp.fr`, le site sert
un `robots.txt` qui interdit tout et une balise `noindex, nofollow`. C'est
délibéré : le tunnel est public, et laisser Google indexer le domaine de dev
créerait un doublon qui ferait concurrence au vrai site. La bascule est
automatique (`isProductionSite` dans `lib/site.ts`), il n'y a rien à penser à
retirer le jour de la mise en production.

## Ce qu'il reste à renseigner

Les quatre variables de `.env.local` pilotent le site. Sans elles, il
fonctionne quand même : le bouton de connexion renvoie vers `/rejoindre` et la
télémétrie affiche « ouverture imminente » au lieu de casser.

| Variable | Où la trouver |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL du tunnel en dev, `https://pandarp.fr` en prod |
| `NEXT_PUBLIC_CFX_ID` | code de connexion cfx.re du serveur |
| `NEXT_PUBLIC_DISCORD_GUILD_ID` | ID du serveur Discord, widget activé dans Paramètres > Widget |
| `NEXT_PUBLIC_DISCORD_INVITE` | lien d'invitation permanent |

## Où se trouve quoi

```
app/                pages et routes (une page = un dossier)
  api/              télémétrie serveur FiveM et Discord
components/         en-tête, pied de page, panneau live, primitives
content/            tout le texte éditorial — c'est ici qu'on écrit
  blog/*.md         articles, en Markdown avec frontmatter
  patch-notes/*.md  notes de version, une par mise à jour
  roadmap.ts        chantiers en cours, prévus et à l'étude
lib/                configuration du site, appels live, lecture du blog
public/medias/      captures d'écran de la galerie
```

### Modifier le contenu

Le texte vit dans `content/`, séparé de la mise en page :

- `content/features.ts` — ce que propose le serveur
- `content/reglement.ts` — règles, chacune avec son code citable en sanction
- `content/touches.ts` — table des raccourcis clavier
- `content/faq.ts` — questions et réponses (alimente aussi le balisage Google)

### Publier un article

Créez un fichier dans `content/blog/`, nommé d'après l'URL voulue :

```markdown
---
title: "Titre de l'article"
description: "Résumé d'une ou deux phrases, repris par Google."
date: "2026-08-10"
tags: ["Guide"]
---

Le corps de l'article, en Markdown.
```

Le fichier `mon-article.md` devient `/blog/mon-article`. Il apparaît
automatiquement dans la liste, dans le plan du site et sur l'accueil.

### Publier une note de version

Créez un fichier dans `content/patch-notes/` :

```markdown
---
version: "1.0.0"
date: "2026-09-15"
title: "Ouverture officielle du serveur"
tags: ["Ajout", "Correctif"]
---

Une phrase d'introduction, puis les sections `### Ajouts`, `### Correctifs`…
```

Les notes sont triées par numéro de version, pas par nom de fichier : `0.10.0`
passe bien avant `0.9.0`. Chacune obtient une ancre partageable
(`/patch-notes#v1-0-0`), et la plus récente s'affiche sur l'accueil.

### La navigation

Neuf pages, mais quatre entrées seulement dans la barre : `Le serveur`,
`Jouer ▾`, `Suivre ▾`, `Galerie`. La structure vit dans `nav`, à la fin de
`lib/site.ts` — une entrée est soit un lien, soit un groupe avec ses `items`.

Le regroupement répond à un problème concret : la barre servait deux publics à
la fois. Le visiteur venu de Google veut savoir si le serveur lui plaît (`Le
serveur`, `Galerie`) ; le joueur déjà installé cherche une référence
(`Touches`, `Règlement`). Les deux pages qui convertissent restent donc
directement accessibles, le reste se range sous le verbe qui le résume.

Aucune page n'a été fusionnée : chacune garde son URL et son référencement.
Le pied de page les liste toutes à plat via `allNavLinks`, dérivé du même
tableau — ajouter une page à `nav` suffit, le pied suit.

**Les menus s'ouvrent au clic, pas au survol.** Combiner les deux impose de
retenir lequel a ouvert le menu : sinon le clic qui suit un survol referme
aussitôt ce que le survol venait d'ouvrir. Le clic marche sur tous les
supports et évite les ouvertures involontaires quand la souris traverse la
barre. Échap et un clic à l'extérieur referment ; Échap rend le focus au
déclencheur.

**Sur mobile**, chaque entrée de la barre devient un bloc encadré — y compris
les deux liens isolés, qui portent une flèche pour dire qu'ils mènent quelque
part là où l'en-tête d'un groupe ne mène nulle part. C'est ce contour qui rend
les quatre unités visibles : en simple liste, les neuf liens se noyaient au
même poids et la structure disparaissait.

Rien n'est replié en accordéon : tout reste à une seule touche. Les
espacements sont réglés pour que le panneau tienne d'une pièce sur un écran de
667 px (iPhone SE), bouton de connexion compris — 665 px mesurés. Si vous
ajoutez une entrée, revérifiez cette hauteur, et gardez 48 px par ligne (le
minimum tactile recommandé est 44).

### Faire vivre la roadmap

Tout tient dans `content/roadmap.ts`. Un chantier avance en changeant son
`status` (`en-cours` → `prevu` → `etude`, ou l'inverse) ; la page le range
dans la bonne section sans autre intervention. Une fois livré, il passe du
tableau `roadmap` au tableau `shipped`, avec le numéro de version qui l'a
apporté.

Ce lien de version n'est rendu cliquable que si la note existe réellement dans
`content/patch-notes/` — une note supprimée dégrade en texte simple plutôt que
de laisser une ancre morte.

La gradation visuelle (marqueur plein, anneau, anneau pâle ; rail qui pâlit de
groupe en groupe) encode la certitude décroissante. Ce n'est pas décoratif :
c'est ce qui empêche une piste « à l'étude » de se lire comme un engagement.

L'ordre d'affichage vient de `ROADMAP_STATUSES`, pas de l'ordre des entrées
dans le tableau — celles-ci peuvent donc être écrites dans n'importe quel
ordre.

### Mettre une capture en fond de l'accueil

Déposez l'image en `public/hero.jpg` (`.webp`, `.jpeg` et `.png` sont aussi
reconnus, dans cet ordre de préférence). Le bandeau du haut devient une bande
sombre avec l'image en fond ; sans fichier, il garde son apparence par défaut.

La classe `.on-dark` rétablit alors la palette du mode sombre sur ce
sous-arbre, quel que soit le thème actif : les utilitaires de couleur qu'il
contient s'y accordent seuls, sans surcharge. Elle repose aussi `color`, sinon
les éléments sans classe de couleur — le `h1` — hériteraient de la valeur déjà
calculée sur `body`.

La lisibilité repose d'abord sur un filtre de luminosité appliqué à l'image :
un voile s'ajoute uniformément alors que la gêne est ponctuelle — lampadaires,
enseignes — là où la luminosité écrase ces pics proportionnellement, sans
ternir les zones déjà sombres.

Trois voiles la modulent ensuite : un plancher uniforme, un dégradé haut pour
le surtitre, et un dégradé latéral qui assombrit la colonne de texte à partir
de `lg`. En dessous, la mise en page s'empile et le texte occupe toute la
largeur : le dégradé latéral n'y protégerait rien, le voile uniforme y est
donc plus opaque.

Le réglage a été calibré à la mesure, pas à l'œil : contraste du pire pixel
sous chaque ligne de texte, sur huit largeurs de 320 à 1920 px. Si vous
changez ces valeurs, revérifiez — le seuil se franchit sans que ça se voie.

### Ajouter des captures à la galerie

Déposez vos images dans `public/medias/`. Elles sont publiées telles quelles,
triées par nom de fichier. Le nom sert de légende : `centre-ville-de-nuit.jpg`
devient « Centre ville de nuit ». Préfixez d'un nombre pour forcer l'ordre
(`01-…`, `02-…`), il est retiré de la légende.

### Changer les couleurs

Tout tient dans deux blocs de variables en haut de `app/globals.css`. Les
couleurs sont nommées **par rôle**, pas par teinte :

| Jeton | Rôle |
| --- | --- |
| `paper` | le fond de la page — noir en sombre, blanc en clair |
| `ink` | son opposé, ce qui s'y inscrit, et le fond des « taches » |
| `smoke` | le texte secondaire |
| `haze` | les filets et séparateurs |
| `volt` | le bleu d'accent, sur le fond de page — repris du logo |
| `volt-fill` | le bleu des boutons — ne s'inverse pas |
| `bamboo` | le vert, réservé aux états « en ligne » |

Le bleu (`volt`, `#1c66c4`–`#4c9bec`) est mesuré directement sur le logo
Discord du serveur (anneau peint au pinceau). C'est une estimation par
extraction de pixels, pas une valeur officielle de charte — si un fichier de
marque avec les couleurs exactes existe, il remplace cette estimation.

L'inversion du thème tient entièrement à `paper` et `ink`. En sombre, le
papier devient noir et l'encre claire : les taches passent donc de blocs
sombres sur page claire à des blocs clairs sur page sombre. La logique du
panda est conservée, simplement retournée — et aucune classe n'a besoin de
changer dans les composants.

Quand la charte définitive arrivera, il n'y aura que ces deux blocs à
remplacer.

### Le thème

Le **sombre est le thème par défaut**. Un bouton dans l'en-tête bascule vers
le clair, et le choix est mémorisé dans le `localStorage`.

Le thème vit dans l'attribut `data-theme` de `<html>`. Un script inline dans
le `<head>` applique le choix mémorisé avant le premier rendu, ce qui évite
tout clignotement. Les icônes du bouton sont montrées ou masquées en CSS selon
cet attribut, sans état React — donc rien ne clignote non plus à l'hydratation.

### Le logo

Le vrai logo est en place, dans `public/brand/` :

- `logo-icon.png` — panda + anneau, sans texte. Utilisé partout sur le site
  (en-tête, pied de page, favicon, panneau de statut, page 404, galerie vide).
- `logo-full.png` — icône + texte « PANDARP ». A un défaut de détourage sur
  le texte (voir `public/brand/README.md`), pas utilisé directement sur les
  pages. L'image de partage (`public/og.jpg`) est construite depuis
  l'original à fond sombre, qui n'a pas ce défaut.

Pour mettre à jour l'icône (nouvelle version, correction) : remplacer
`public/brand/logo-icon.png` (transparent, carré) suffit — tous les
emplacements du site la référencent directement en `next/image`, aucun code
à toucher. Penser aussi à régénérer `app/icon.png` et `app/apple-icon.png`
à partir du nouveau fichier.

## Référencement

Le site est construit autour du référencement. Ce qui est déjà en place :

- métadonnées, balise canonique et Open Graph sur chaque page
- `sitemap.xml` et `robots.txt` générés automatiquement, articles inclus
- données structurées JSON-LD : `Organization`, `WebSite`, `FAQPage` sur la
  FAQ, `HowTo` sur la page de connexion, `Article` sur chaque billet
- URLs en français porteuses de mots-clés (`/rejoindre`, `/touches`, `/faq`)
- pages générées statiquement, polices en `display: swap`, images via
  `next/image`

Restant à faire, une fois le domaine acheté :

1. Déclarer `pandarp.fr` dans la Google Search Console et y soumettre
   `https://pandarp.fr/sitemap.xml`.
2. Faire de même sur Bing Webmaster Tools.
3. Créer une image Open Graph (1200 × 630) et la placer en `public/og.jpg`,
   puis la référencer dans `openGraph.images` de `app/layout.tsx`.
4. Obtenir des liens entrants : fiche du serveur sur les annuaires FiveM,
   Discord public, chaînes YouTube et Twitch des joueurs.

Le levier le plus rentable reste le blog. Les requêtes autour de « FiveM
Enhanced » sont encore peu disputées : chaque guide publié capte des joueurs
en phase de recherche et les amène sur la page de connexion.
