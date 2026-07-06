# Conversion de Next.js vers RU Union Theme

## Pourquoi Next.js n’est pas déployé sur EasyWP

Le prototype utilise des routes `force-dynamic`, des fonctions serveur et des lectures WordPress/WooCommerce au moment de la requête. EasyWP est un hébergement WordPress managé et ne fournit pas le runtime Node nécessaire à Next.js SSR. Envoyer `.next` ne produirait pas un site fonctionnel.

## Décision d’architecture

L’interface est convertie progressivement en thème PHP WordPress. EasyWP hébergera ainsi WordPress, le plugin RU Union Core, le thème RU Union Theme, WooCommerce et Yoast. Next.js reste une référence visuelle et fonctionnelle locale.

## Mapping UI

| Référence Next.js                | Template WordPress                                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/app/page.tsx`               | `front-page.php`                                                                                                   |
| composants d’accueil             | `template-parts/hero.php`, `mission.php`, `featured-films.php`, `support-packs.php`, `values.php`, `final-cta.php` |
| `/films` et `FilmCard`           | `archive-film.php`, `template-parts/film-card.php`                                                                 |
| `/films/[slug]`                  | `single-film.php`                                                                                                  |
| `/boutique` et `SupportPackCard` | `templates/page-boutique.php`, `woocommerce.php`, `template-parts/pack-card.php`                                   |
| Header et Footer                 | `header.php`, `footer.php`                                                                                         |
| Pages éditoriales                | `templates/page-association.php`, `page-equipe.php`, `page-contact.php`                                            |

## Structure et dépendances

Le thème est situé dans `wordpress/themes/ruunion-theme`. Il charge un CSS compilé et autonome depuis `assets/css/main.css` et un JavaScript minimal pour la navigation mobile. Il ne requiert ni Elementor, ni Tailwind, ni Node en production.

RU Union Core doit rester actif : il fournit le CPT `film`, les champs ACF locaux, les données REST et le dashboard. Le thème lit directement :

- les publications `film` et leurs métadonnées ACF ;
- l’image mise en avant et le champ `affiche` ;
- la galerie stockée dans `galerie` ;
- les objectifs et montants collectés ;
- les produits, prix, images et URL d’ajout au panier WooCommerce.

## SEO et compatibilité WordPress

Le thème conserve `wp_head()`, `wp_footer()`, `body_class()`, `post_class()` et le support `title-tag`. Yoast reste donc la source des titres, descriptions, canonical et données structurées. Le thème déclare également les supports miniatures, HTML5, menus et WooCommerce.

## Test local

1. Copier le dossier vers `C:\xampp\htdocs\ruunion\wp-content\themes\ruunion-theme`.
2. Vérifier la syntaxe PHP de tous les fichiers.
3. Activer RU Union Theme depuis l’administration locale.
4. Tester accueil, archive et détail film, boutique, panier, pages éditoriales, `wp-admin` et `wp-login.php`.
5. Vérifier les formats desktop et mobile, puis `npm run lint` et `npm run build` pour préserver le prototype.

## Upload EasyWP

Suivre strictement `docs/EASYWP_DEPLOYMENT.md` : backup SFTP, upload limité au plugin et au thème, activation depuis WordPress, puis tests publics et REST. Ne jamais envoyer `.next`, `node_modules`, `.env`, `wp-config.php`, uploads complets ou dumps SQL.

## Limites restantes

- Les photographies réelles doivent encore être renseignées dans la médiathèque lorsque les sources finales seront disponibles.
- Les menus WordPress peuvent être créés dans `Apparence > Menus`; un menu de secours est intégré.
- Le checkout reste celui de WooCommerce et dépendra ultérieurement des moyens de paiement explicitement validés.
- L’upload EasyWP et l’activation distante nécessitent les accès du propriétaire.
