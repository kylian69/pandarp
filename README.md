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

### Mettre une capture en fond de l'accueil

Déposez l'image en `public/hero.jpg` (`.webp`, `.jpeg` et `.png` sont aussi
reconnus, dans cet ordre de préférence). Le bandeau du haut devient une bande
sombre avec l'image en fond ; sans fichier, il garde son apparence par défaut.

La classe `.on-dark` rétablit alors la palette du mode sombre sur ce
sous-arbre, quel que soit le thème actif : les utilitaires de couleur qu'il
contient s'y accordent seuls, sans surcharge. Elle repose aussi `color`, sinon
les éléments sans classe de couleur — le `h1` — hériteraient de la valeur déjà
calculée sur `body`.

Trois voiles se superposent à l'image : un uniforme qui garantit un plancher
de contraste, un latéral qui protège la colonne de texte, un supérieur pour le
surtitre. Ils sont calibrés pour tenir les seuils WCAG AA y compris sur une
capture de plein jour.

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
