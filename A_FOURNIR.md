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

## 4. Les captures du serveur

- [ ] **1 capture pour le fond de la page d'accueil**, en 1920 × 1080 minimum
- [ ] **6 à 12 captures d'écran** prises en jeu, en 1920 × 1080 minimum,
      en `.jpg` ou `.webp`

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

**Lisibilité :** un voile sombre est appliqué automatiquement par-dessus.
J'ai vérifié à la mesure, sur une capture de nuit comme sur une capture de
jour en plein soleil (le pire cas), que tous les textes du bandeau restent
au-dessus des seuils de contraste WCAG AA. Vous pouvez donc déposer l'image
sans craindre de rendre le titre illisible.

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

## 5. Le domaine

- [ ] **Acheter `pandarp.fr`**

Une fois fait, il y a trois choses à enchaîner — je peux m'en occuper :

1. Mettre `NEXT_PUBLIC_SITE_URL=https://pandarp.fr` dans `.env.local`
2. Déclarer le site dans la Google Search Console et y soumettre
   `https://pandarp.fr/sitemap.xml`
3. Faire la même chose sur Bing Webmaster Tools

Plus tôt le domaine est acheté et indexé, mieux c'est : le référencement
récompense l'ancienneté, et rien ne remplace le temps.

---

## 6. Une image de partage

- [ ] **Visuel 1200 × 630** — ce qui s'affiche quand un lien du site est
      collé sur Discord, Twitter ou WhatsApp

Typiquement : le logo sur une capture du serveur, avec le nom et une ligne
d'accroche. Si vous n'en avez pas, je peux en composer une à partir du logo
et d'une capture une fois que je les ai.

**Où la déposer :** `public/og.jpg`

**En attendant :** les liens partagés affichent le titre et la description en
texte, sans vignette — ça marche, mais c'est nettement moins cliqué.

---

## 7. Optionnel, quand vous les aurez

- [ ] Chaîne YouTube ou Twitch officielle du serveur (à lier dans le pied de page)
- [ ] Compte Twitter / X, TikTok
- [ ] Trailer ou vidéo de présentation à intégrer sur la galerie
- [ ] Corrections du contenu de `content/` si le serveur diffère de ce que
      j'ai décrit (règlement, métiers, touches, FAQ)
