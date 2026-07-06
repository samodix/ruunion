# Assets de marque RU Union

## Logos disponibles

Le fichier de référence fourni ne contenait pas d’image exploitable. Une identité vectorielle légère a donc été créée sans ressource externe :

- `wordpress/themes/ruunion-theme/assets/images/logo-ruunion.svg` : logo principal pour fonds clairs ;
- `wordpress/themes/ruunion-theme/assets/images/logo-ruunion-white.svg` : version claire pour le footer anthracite ;
- `wordpress/themes/ruunion-theme/assets/images/favicon.svg` : symbole compact prêt pour l’icône du site ;
- `wordpress/ruunion-core/assets/images/logo-ruunion.svg` : copie autonome utilisée par le login et le dashboard WordPress.

## Identité

- Turquoise principal : `#48C1B3`
- Turquoise foncé : `#0E9A8B`
- Jaune solaire : `#F6B62E`
- Blanc cassé : `#FAFAF7`
- Anthracite : `#33363A`

Le symbole représente deux liens humains qui se rejoignent dans une forme de cœur. Les SVG utilisent uniquement des formes, du texte et des piles de polices système ; ils ne chargent aucune police ou image externe.

## Usages

- Header : logo principal lié à l’accueil, avec texte alternatif complet.
- Footer : version claire sur le fond anthracite.
- Login WordPress : logo principal chargé depuis RU Union Core.
- Dashboard : signature de marque dans les cinq widgets RU Union.
- Favicon : fichier préparé mais non activé automatiquement.

Pour activer manuellement le favicon : `Apparence > Personnaliser > Identité du site > Icône du site`. Aucune option WordPress n’est modifiée automatiquement.

## Déploiement EasyWP

Avant upload, sauvegarder les versions distantes du thème et du plugin. Envoyer uniquement les trois SVG du thème, les fichiers `header.php`, `footer.php`, `assets/css/main.css`, puis le SVG, les CSS et le fichier dashboard modifiés de RU Union Core.

## Remplacement futur

Un logo final fourni par un graphiste peut remplacer les fichiers SVG en conservant exactement leurs noms et leurs `viewBox`. Vérifier ensuite le header, le footer, le login et les widgets sur desktop et mobile avant déploiement.
