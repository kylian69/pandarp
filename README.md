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

### Ajouter des captures à la galerie

Déposez vos images dans `public/medias/`. Elles sont publiées telles quelles,
triées par nom de fichier. Le nom sert de légende : `centre-ville-de-nuit.jpg`
devient « Centre ville de nuit ». Préfixez d'un nombre pour forcer l'ordre
(`01-…`, `02-…`), il est retiré de la légende.

### Remplacer le logo

`components/PandaMark.tsx` contient une marque provisoire. Déposez le logo
définitif dans `public/logo.svg` et remplacez le contenu du composant par un
`<Image src="/logo.svg" … />` : tous les emplacements suivront.

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
