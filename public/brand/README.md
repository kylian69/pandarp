# Assets de marque

## En cours d'utilisation sur le site

- **`logo-icon.png`** (512×512, transparent) — le panda + l'anneau, sans
  texte. Utilisé partout : en-tête, pied de page, favicon, panneau de statut,
  page 404, galerie vide.
- **`logo-full.png`** (1024×1024, transparent) — icône + texte « PANDARP ».
  ⚠️ Le texte a un défaut de détourage (voir plus bas) : **ne pas l'utiliser
  tel quel** tant qu'il n'est pas corrigé.
- **`logo-mono-black.png`** (1024×1024, transparent) — version monochrome
  noire, gardée en réserve (merch, impression), pas encore utilisée sur le
  site.

Couleurs de marque, fournies par le client :
- Bleu foncé : `#1C66C4`
- Bleu clair / éclaboussures : `#4C9BEC`
- Blanc : `#FFFFFF`
- Noir : `#000000` / `#111111`

## `source/` — livrables bruts, non utilisés directement

Archive des fichiers reçus, conservée pour référence :

- `PNG_Originals/` — 5 PNG 1024×1024, fond opaque (blanc, noir ou dégradé
  selon le fichier). Bonne qualité, cohérents entre eux.
- `PNG_Transparents/` — 3 des 5 déclinaisons détourées automatiquement.
  Deux manquent (monochrome blanc, logo fond sombre) : le détourage cassait
  le logo dessus.
- `SVG_Vectoriels/` — **ne sont pas de vrais SVG.** Chaque fichier contient
  une unique balise `<image>` avec un PNG encodé en base64 à l'intérieur
  d'une enveloppe SVG : aucun tracé vectoriel (`<path>`), juste une image
  plate déguisée. Conséquence : ça se pixellise en zoomant comme n'importe
  quel PNG, et le poids (0,5 à 1,5 Mo par fichier) est totalement disproportionné
  pour un logo de cette simplicité. Non utilisés sur le site.

## Le défaut du détourage sur `logo-full.png`

Vérifié par comparaison pixel à pixel avec l'original : dans la zone du texte
« PANDARP », le détourage automatique a traité l'intérieur blanc des lettres
comme faisant partie du fond blanc à retirer. Résultat : les lettres sont
presque entièrement transparentes, il ne reste que leur contour sombre — sur
fond noir, le texte devient quasiment illisible.

L'icône seule (`logo-icon.png`) n'a pas ce problème : le pelage clair du
panda est entouré d'éléments contrastés (oreilles sombres, anneau bleu), ce
qui a permis un détourage propre. C'est pour ça qu'elle sert de référence
partout sur le site, et que le logo complet est réservé à l'image de partage
— construite à partir de l'original à fond sombre (`source/PNG_Originals/
05_Logo_Fond_Sombre_original.png`), qui n'est jamais passé par le détourage
défaillant.

**Si vous refaites détourer le logo complet**, vérifiez le résultat en le
posant sur un fond noir plein avant de le considérer bon — c'est ce qui a
révélé le défaut ici, invisible sur un damier de prévisualisation classique.
