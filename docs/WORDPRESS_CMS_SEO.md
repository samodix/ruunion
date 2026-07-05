# WordPress CMS et SEO headless

## Pourquoi les pages Next.js ne figurent pas dans WordPress

Next.js et WordPress utilisent deux systèmes de routage distincts. Les routes publiques `/association`, `/films` ou `/boutique` sont rendues par Next.js ; WordPress ne peut donc pas les afficher dans son menu Pages ni leur associer directement un bloc Yoast.

Pour conserver un vrai pilotage éditorial, RU Union utilise huit pages WordPress dites CMS/headless. Elles portent le contenu de référence et les métadonnées Yoast, tandis que Next.js reste responsable du rendu public.

## Mapping des routes

| Route Next.js                | Page WordPress               | Slug                        |
| ---------------------------- | ---------------------------- | --------------------------- |
| `/`                          | Accueil                      | `accueil`                   |
| `/association`               | Association                  | `association`               |
| `/equipe`                    | Équipe                       | `equipe`                    |
| `/films`                     | Films                        | `films`                     |
| `/boutique`                  | Boutique                     | `boutique`                  |
| `/contact`                   | Contact                      | `contact`                   |
| `/mentions-legales`          | Mentions légales             | `mentions-legales`          |
| `/politique-confidentialite` | Politique de confidentialité | `politique-confidentialite` |

Next.js interroge `/wp-json/wp/v2/pages?slug={slug}` et lit `yoast_head_json`. Le canonical et l'URL Open Graph restent ceux du front Next.js. Si la page ou Yoast est absent, les métadonnées locales existantes prennent le relais.

Les fiches `/films/[slug]` lisent directement `yoast_head_json` dans le CPT Film. Elles utilisent ensuite les champs ACF SEO et le titre du film comme fallback.

## Gérer les contenus

- Pages générales : WordPress → Pages.
- Films : WordPress → Films ; contenu, visibilité, collecte et SEO se trouvent dans « Informations du film ».
- Boutique : WordPress → Produits pour les packs ; la page WordPress Boutique porte le SEO de `/boutique`.
- SEO : ouvrir une page ou un film, puis utiliser le bloc Yoast SEO.

Le plugin RU Union Core initialise les huit pages et leurs métadonnées, sans supprimer les pages existantes. Toute modification éditoriale ultérieure peut être faite normalement dans WordPress.

## Dashboard RU Union

Le plugin charge une feuille CSS légère uniquement dans `wp-admin` et ajoute cinq widgets : vue d'ensemble, collecte, SEO, liens rapides et message éditorial. Aucun menu natif n'est masqué.

## Plugin versionné

La source est conservée dans `wordpress/ruunion-core`. Pour l'installer sur un autre WordPress local, copier ce dossier vers `wp-content/plugins/ruunion-core`, puis activer « RU Union Core ».

Le dépôt n'inclut jamais `wp-config.php`, les uploads ou un export de base de données.
