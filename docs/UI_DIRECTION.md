# Direction UI publique RU Union

## Intention

L’interface publique associe une composition cinématographique à une expression humaine et associative. Elle évite les codes froids des produits SaaS comme les traitements trop enfantins : grands titres, rythme éditorial, lumière douce, cartes profondes et appels à l’action sobres.

Les fichiers de référence `UIHero.md`, `UIPacks.md` et `UIFooter.md` ont servi uniquement à identifier trois structures utiles : un hero avec preuve et chiffres clés, des cartes produit très lisibles et un footer éditorial de grande ampleur. Les textes, couleurs, composants et interactions restent originaux et propres à RU Union.

## Palette

- Turquoise : `#48C1B3`
- Turquoise foncé : `#0E9A8B`
- Jaune solaire : `#F6B62E`
- Blanc cassé : `#FAFAF7`
- Fond clair : `#F8FBFA`
- Anthracite : `#33363A`
- Gris texte : `#5F666B`
- Bordure : `#DDEDEA`

## Composants concernés

- `HeroSection` : film prioritaire, progression de collecte, chiffres clés et visuel WordPress avec fallback CSS.
- `MissionSection`, `FeaturedFilmsSection`, `SupportSection`, `ValuesSection` et `FinalCtaSection` : parcours narratif complet de la page d’accueil.
- `SupportPackCard` et `SupportPackGrid` : produits WooCommerce, catégories filtrables, pack recommandé et paiement désactivé.
- `FilmCard`, `FilmHero` et `FilmDonationBox` : affiches, statut, progression et accès clair au soutien.
- `Header` et `Footer` : navigation sobre, CTA visible et conclusion éditoriale.

## Données et médias

Les films continuent de provenir du CPT WordPress et les packs de la Store API WooCommerce. Les fallbacks locaux restent actifs si les services locaux ne répondent pas. Une affiche ou une galerie WordPress est utilisée lorsqu’elle existe ; sinon l’interface produit une composition graphique locale sans image distante.

## Responsive et accessibilité

- Hero en deux colonnes sur desktop et empilé sur mobile.
- Grilles à une colonne sur mobile, deux sur tablette et trois ou quatre sur grand écran.
- Aucun élément n’impose une largeur supérieure au viewport de 390 px.
- Boutons, filtres et liens conservent des libellés explicites et un état de focus.
- Le paiement est affiché comme indisponible et les boutons correspondants sont désactivés.

## Prochaines améliorations médias

Ajouter dans WordPress des affiches verticales cohérentes, des photographies de tournage optimisées et, pour chaque film, une image de couverture pensée pour les grands écrans. Une future passe pourra ajouter des transitions vidéo légères en respectant les préférences de mouvement réduit.
