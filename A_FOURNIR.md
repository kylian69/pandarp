# Ce qu'il reste à fournir

Liste des éléments qui manquent pour que le site soit complet. Le site
fonctionne déjà sans eux — rien n'est cassé, tout dégrade proprement — mais
chacun débloque une partie du rendu final.

Cochez au fur et à mesure et prévenez-moi, je m'occupe de l'intégration.

---

## 1. Le logo

- [ ] **Logo PandaRP** — de préférence en SVG, sinon PNG avec fond transparent
      (512 × 512 minimum)
- [ ] Variante claire si le logo existe en deux versions (une pour fond blanc,
      une pour fond noir)
- [ ] Favicon, si vous en avez un dédié — sinon je le générerai depuis le logo

**Où le déposer :** `public/logo.svg`

**En attendant :** une marque provisoire dessinée à la main occupe la place
(`components/PandaMark.tsx`). Elle apparaît dans l'en-tête, le pied de page,
le panneau de statut, la galerie vide et la page 404. Un seul fichier à
remplacer, tous les emplacements suivront.

---

## 2. Les identifiants du serveur

À reporter dans un fichier `.env.local` à la racine du projet — le modèle est
dans `.env.example`, il suffit de le copier et de remplir. Ce fichier n'est
jamais envoyé sur GitHub.

- [ ] **`NEXT_PUBLIC_CFX_ID`** — le code de connexion cfx.re du serveur,
      visible sur le portail Cfx.re une fois le serveur enregistré.
      *Débloque :* le bouton « Rejoindre le serveur » qui lance FiveM
      directement, et le compteur de joueurs connectés en temps réel.

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

## 3. Les captures du serveur

- [ ] **6 à 12 captures d'écran** prises en jeu, en 1920 × 1080 minimum,
      en `.jpg` ou `.webp`

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

## 4. Le domaine

- [ ] **Acheter `pandarp.fr`**

Une fois fait, il y a trois choses à enchaîner — je peux m'en occuper :

1. Mettre `NEXT_PUBLIC_SITE_URL=https://pandarp.fr` dans `.env.local`
2. Déclarer le site dans la Google Search Console et y soumettre
   `https://pandarp.fr/sitemap.xml`
3. Faire la même chose sur Bing Webmaster Tools

Plus tôt le domaine est acheté et indexé, mieux c'est : le référencement
récompense l'ancienneté, et rien ne remplace le temps.

---

## 5. Une image de partage

- [ ] **Visuel 1200 × 630** — ce qui s'affiche quand un lien du site est
      collé sur Discord, Twitter ou WhatsApp

Typiquement : le logo sur une capture du serveur, avec le nom et une ligne
d'accroche. Si vous n'en avez pas, je peux en composer une à partir du logo
et d'une capture une fois que je les ai.

**Où la déposer :** `public/og.jpg`

**En attendant :** les liens partagés affichent le titre et la description en
texte, sans vignette — ça marche, mais c'est nettement moins cliqué.

---

## 6. Optionnel, quand vous les aurez

- [ ] Chaîne YouTube ou Twitch officielle du serveur (à lier dans le pied de page)
- [ ] Compte Twitter / X, TikTok
- [ ] Trailer ou vidéo de présentation à intégrer sur la galerie
- [ ] Corrections du contenu de `content/` si le serveur diffère de ce que
      j'ai décrit (règlement, métiers, touches, FAQ)
