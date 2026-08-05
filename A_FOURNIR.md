# Ce qu'il reste à fournir

Liste des éléments qui manquent pour que le site soit complet. Le site
fonctionne déjà sans eux — rien n'est cassé, tout dégrade proprement — mais
chacun débloque une partie du rendu final.

Cochez au fur et à mesure et prévenez-moi, je m'occupe de l'intégration.

---

## 1. Le logo — fait ✅

Le vrai logo est intégré au site depuis les fichiers fournis. Détail dans
`public/brand/README.md`.

- [x] Icône seule (panda + anneau), en `public/brand/logo-icon.png`, utilisée
      partout : en-tête, pied de page, favicon, panneau de statut, page 404,
      galerie vide.
- [x] Logo complet (icône + texte), en `public/brand/logo-full.png` — sert de
      base à l'image de partage (`public/og.jpg`).
- [x] Favicon et icône Apple générés (`app/icon.png`, `app/apple-icon.png`).

**Reste en attente, si vous voulez pousser la qualité plus loin :**
- [ ] Un vrai fichier vectoriel (les « SVG » livrés sont en réalité des PNG
      encapsulés — voir `public/brand/README.md` pour le détail). Pas
      bloquant : les PNG actuels (512–1024 px) suffisent largement aux tailles
      utilisées sur le site.
- [ ] Une version transparente correcte du **logo complet avec texte** — celle
      fournie a un défaut (le texte blanc a été en partie effacé par le
      détourage automatique). Non utilisée sur le site tant que ce n'est pas
      corrigé ; l'image de partage utilise à la place l'original à fond sombre,
      qui n'a pas ce défaut.

---

## 2. Les identifiants du serveur

À reporter dans un fichier `.env.local` à la racine du projet — le modèle est
dans `.env.example`, il suffit de le copier et de remplir. Ce fichier n'est
jamais envoyé sur GitHub.

**⚠️ Après avoir rempli ou changé une valeur ci-dessous, il faut reconstruire
le site** (`npm run build` puis relancer `npm run start`) — un simple
redémarrage ne suffit pas, ces variables sont figées dans le build par
Next.js.

- [ ] **`NEXT_PUBLIC_CFX_ID`** — le code de connexion cfx.re du serveur,
      visible sur le portail Cfx.re une fois le serveur enregistré (créez le
      serveur sur le portail Cfx.re / txAdmin pour l'obtenir).
      *Débloque :* le bouton « Rejoindre le serveur » qui lance FiveM
      directement, et le compteur de joueurs connectés en temps réel.
      **⚠️ À tester en conditions réelles dès que ce code existe** : le
      bouton utilise le lien `https://cfx.re/join/<code>`, mais aucune
      documentation officielle Cfx.re ne précise si ce lien sélectionne
      automatiquement la bonne build (Enhanced vs Legacy) quand un joueur a
      les deux clients installés.

      Sur mobile, le bouton évite déjà ce lien : FiveM n'existe sur aucune
      plateforme mobile, et la page `cfx.re/join` elle-même ne propose rien
      en cas d'échec (pas de message, pas de lien de téléchargement) —
      vérifié en la consultant directement. Un visiteur sur téléphone est
      donc renvoyé vers `/rejoindre`, qui explique qu'un PC est nécessaire.

      Cliquez sur le bouton vous-même une fois le
      serveur en ligne pour confirmer que ça ouvre bien la bonne version.

- [ ] **`NEXT_PUBLIC_DISCORD_GUILD_ID`** — l'ID de votre serveur Discord.
      Pour l'obtenir : activez le mode développeur dans Discord
      (Paramètres > Avancés), puis clic droit sur le serveur > Copier l'ID.
      **Important :** il faut aussi activer le widget dans
      Paramètres du serveur > Widget, sinon Discord refuse la requête.
      *Débloque :* le nombre de membres connectés au Discord.

- [ ] **`NEXT_PUBLIC_DISCORD_INVITE`** — le lien d'invitation permanent
      (celui qui n'expire jamais).
      *Débloque :* les boutons Discord dans le pied de page, la page
      « Rejoindre » et l'appel à l'action de l'accueil, aujourd'hui masqués.

- [ ] **`NEXT_PUBLIC_SITE_URL`** — l'URL publique du site.
      L'URL de votre tunnel Cloudflare pour le moment, `https://pandarp.fr`
      une fois le domaine acheté.
      *Débloque :* les balises canoniques, le plan du site et les aperçus
      de partage pointent vers la bonne adresse. Sans ça, ils pointent
      tous vers `pandarp.fr` qui n'existe pas encore.

**En attendant :** le bouton « Rejoindre » renvoie vers la page qui explique
la procédure de connexion, et le panneau de statut affiche « ouverture
imminente » plutôt qu'un compteur vide.

---

## 3. Les patch notes — à remplacer ⚠️

La page `/patch-notes` est en place, mais les **trois notes de version
actuellement en ligne sont des exemples que j'ai inventés** (versions 0.7.0 à
0.9.0) pour donner à voir le rendu. Elles décrivent des fonctionnalités qui
n'existent pas forcément sur votre serveur.

- [ ] **Supprimer ou réécrire** les fichiers de `content/patch-notes/`

**Comment en ajouter une :** créez un fichier `content/patch-notes/1.0.0.md`
(le nom du fichier est libre, c'est le champ `version` qui compte) :

```markdown
---
version: "1.0.0"
date: "2026-09-15"
title: "Ouverture officielle du serveur"
tags: ["Ajout", "Correctif"]
---

Une phrase d'introduction qui résume le lot.

### Ajouts

- **Nom de la nouveauté** : ce qu'elle change pour le joueur.

### Correctifs

- Ce qui a été réparé.
```

Le reste est automatique : tri par numéro de version (du plus récent au plus
ancien), affichage sur la page, raccourci vers la dernière version sur la page
d'accueil, et mise à jour du plan du site pour les moteurs de recherche.

Chaque version a une adresse directe, pratique pour la partager sur Discord :
`https://pandarp.fr/patch-notes#v1-0-0` (les points deviennent des tirets).

**Pour plus tard :** la publication automatique depuis Discord. Techniquement
la brique manquante est un petit service qui écoute un salon Discord et écrit
le fichier Markdown correspondant — on le fera quand le serveur tournera et
que le format des annonces sera stabilisé.

---

## 4. La roadmap — à remplacer ⚠️

La page `/roadmap` affiche vos chantiers en cours, prévus et à l'étude. Comme
pour les patch notes, **le contenu actuel est inventé** — il donne à voir le
rendu, rien de plus.

- [ ] **Réécrire** `content/roadmap.ts` avec vos vrais chantiers

**Comment ça se modifie :** tout est dans `content/roadmap.ts`, un seul
fichier. Chaque chantier ressemble à ceci :

```ts
{
  slug: "immobilier",
  title: "Immobilier jouable",
  summary: "Achat, location et revente de logements entre joueurs.",
  status: "en-cours",   // "en-cours" | "prevu" | "etude"
  target: "Fin 2026",   // facultatif
},
```

Faire avancer un chantier, c'est changer son `status` : la page le déplace
toute seule dans la bonne section. Quand il est livré, retirez-le de `roadmap`
et ajoutez-le à `shipped` avec le numéro de version — il rejoint alors la
liste « Ce qui tourne déjà », avec un lien vers la note de version
correspondante.

**Trois niveaux, et ils comptent :**

| Statut | Ce que ça dit au joueur |
| --- | --- |
| `en-cours` | En développement actif, ça arrivera |
| `prevu` | Validé et planifié, pas encore commencé |
| `etude` | Une piste. Ni datée, ni garantie |

La page rend cette gradation visible (marqueurs pleins en haut, anneaux pâles
en bas) pour qu'aucune ligne « à l'étude » ne se lise comme une promesse.
C'est délibéré : une roadmap publique n'a d'intérêt que si elle est tenue, et
elle se tient d'autant mieux qu'elle promet peu.

**Sur les dates :** le champ `target` est volontairement en texte libre et
large (« Rentrée 2026 », « Fin 2026 »). Évitez les dates précises sur un
chantier non commencé — c'est la promesse qu'on finit par ne pas tenir, et
une roadmap ratée fait plus de mal que pas de roadmap du tout. Le champ est
facultatif : laissez-le vide si vous ne savez pas.

---

## 5. Les captures du serveur

- [ ] **1 capture pour le fond de la page d'accueil**, en 1920 × 1080 minimum
      — *une image provisoire est en place, à remplacer*
- [ ] **6 à 12 captures d'écran** prises en jeu, en 1920 × 1080 minimum,
      en `.jpg` ou `.webp`
- [ ] *facultatif* — **2 vidéos de fond** (jour et nuit) pour animer la page
      d'accueil, moins de 3 Mo chacune

### La capture de fond (hero)

**Où la déposer :** `public/hero.jpg` (ou `.webp`, préférable : plus léger à
qualité égale). Volontairement hors de `public/medias/`, sinon elle
apparaîtrait aussi dans la galerie.

Le bandeau du haut de l'accueil devient alors une bande sombre avec la capture
en fond, dans les deux thèmes. Tant qu'aucun fichier n'est déposé, la page
garde son apparence actuelle — rien ne casse.

**Ce qui marche :** un plan large, plutôt sombre, sans élément important dans
la moitié gauche — c'est là que se posent le titre et les boutons. Los Santos
de nuit, une skyline, une route au crépuscule. Évitez les captures avec un
personnage en gros plan au centre gauche : le titre lui passerait dessus.

**Lisibilité :** un assombrissement est appliqué automatiquement par-dessus.
J'ai mesuré le contraste du pire pixel sous chaque ligne de texte, sur huit
largeurs d'écran de 320 à 1920 px : tout passe les seuils WCAG AA. Vous pouvez
donc déposer votre capture sans craindre de rendre le titre illisible.

**⚠️ Image provisoire en place.** En attendant vos captures, j'ai mis une
photo du centre-ville de Los Angeles de nuit — la ville dont Los Santos est la
transposition dans GTA. Elle vient d'Unsplash (photographe Ryan De Hamer),
sous licence libre y compris pour un usage commercial et sans attribution
obligatoire.

Je n'ai volontairement **pas** pris une capture officielle de GTA V trouvée
sur internet : ces visuels appartiennent à Rockstar, et le pied de page du
site affiche justement un avertissement de non-affiliation. Une photo sous
licence libre remplit le même rôle sans cette contradiction.

Remplacez-la dès que vous avez une vraie capture du serveur : c'est votre jeu
qu'il faut montrer, pas une photo générique.

### Le fond animé (facultatif)

Le fond de l'accueil peut être une vidéo au lieu d'une image fixe, et cette
vidéo peut changer avec le thème : Los Santos de jour en thème clair, de nuit
en thème sombre.

**Où les déposer :**

| Fichier                 | Quand elle joue                     |
| ----------------------- | ----------------------------------- |
| `public/hero-jour.webm` | thème clair                         |
| `public/hero-nuit.webm` | thème sombre                        |
| `public/hero.webm`      | vidéo unique, si vous n'en avez qu'une |

Le `.mp4` est accepté aussi, mais le `.webm` est nettement plus léger à
qualité égale. Rien n'est obligatoire : sans fichier, l'image fixe reste, et
avec une seule des deux vidéos, elle joue dans les deux thèmes.

**Ce qui marche :** 10 à 20 secondes, en boucle propre (la fin doit pouvoir
enchaîner sur le début sans saut visible), avec un mouvement **lent** — un
travelling, un plan fixe où seul le trafic bouge, un lever de soleil accéléré.
Une vidéo agitée derrière un titre fatigue et se remarque plus que le texte.
Comme pour l'image : rien d'important dans la moitié gauche.

**Le poids, c'est le point critique.** Visez **moins de 3 Mo par vidéo**,
idéalement 1 à 2 Mo. Au-delà, la page d'accueil devient lourde et ça se paie
en référencement — Google mesure la vitesse de chargement. Pour y arriver :
640 × 360 ou 960 × 540 suffit (elle est floutée par l'assombrissement de toute
façon), 24 images/seconde, et **pas de piste audio** — elle est jouée en
sourdine, la conserver serait du poids pour rien.

Commande de conversion, si vous avez `ffmpeg` :

```
ffmpeg -i votre-video.mp4 -an -vf scale=960:-2 -c:v libvpx-vp9 -b:v 800k -crf 36 hero-nuit.webm
```

Augmentez `-b:v` si le rendu vous paraît trop dégradé, baissez-le si le
fichier dépasse 3 Mo.

**Gardez l'image en place.** Elle sert d'affiche pendant le chargement de la
vidéo, et de fond de repli quand la vidéo ne peut pas jouer : connexion
coupée, ou visiteur ayant demandé à son système de réduire les animations. La
vidéo est un plus, jamais un remplacement.

### Les captures de la galerie

Ce qui marche le mieux pour convaincre un joueur qui hésite : Los Santos de
nuit sous la pluie (c'est là que le rendu Enhanced se voit le plus), une scène
de roleplay avec plusieurs personnages, un intérieur éclairé, et un plan large
de la ville.

**Où les déposer :** `public/medias/`

Elles apparaissent toutes seules sur la page Galerie, triées par nom de
fichier. Le nom sert de légende : `centre-ville-de-nuit.jpg` devient
« Centre ville de nuit ». Préfixez d'un nombre pour forcer l'ordre
(`01-…`, `02-…`), il est retiré de la légende automatiquement.

**En attendant :** la galerie affiche un bloc qui annonce que les captures
arrivent, avec un renvoi vers le Discord.

---

## 6. Le domaine

- [ ] **Acheter `pandarp.fr`**

Une fois fait, il y a trois choses à enchaîner — je peux m'en occuper :

1. Mettre `NEXT_PUBLIC_SITE_URL=https://pandarp.fr` dans `.env.local`
2. Déclarer le site dans la Google Search Console et y soumettre
   `https://pandarp.fr/sitemap.xml`
3. Faire la même chose sur Bing Webmaster Tools

Plus tôt le domaine est acheté et indexé, mieux c'est : le référencement
récompense l'ancienneté, et rien ne remplace le temps.

---

## 7. Une image de partage

- [ ] **Visuel 1200 × 630** — ce qui s'affiche quand un lien du site est
      collé sur Discord, Twitter ou WhatsApp

Typiquement : le logo sur une capture du serveur, avec le nom et une ligne
d'accroche. Si vous n'en avez pas, je peux en composer une à partir du logo
et d'une capture une fois que je les ai.

**Où la déposer :** `public/og.jpg`

**En attendant :** les liens partagés affichent le titre et la description en
texte, sans vignette — ça marche, mais c'est nettement moins cliqué.

---

## 8. Optionnel, quand vous les aurez

- [ ] Chaîne YouTube ou Twitch officielle du serveur (à lier dans le pied de page)
- [ ] Compte Twitter / X, TikTok
- [ ] Trailer ou vidéo de présentation à intégrer sur la galerie
- [ ] Corrections du contenu de `content/` si le serveur diffère de ce que
      j'ai décrit (règlement, métiers, touches, FAQ)
