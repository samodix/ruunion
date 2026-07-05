# Architecture headless WordPress

## Répartition des responsabilités

### WordPress local, puis future production

WordPress est le CMS et l'unique back-office éditorial :

- administration via `wp-admin` ;
- CPT Films, champs ACF et médias ;
- WooCommerce et produits de soutien ;
- SEO via Yoast SEO ;
- comptes, rôles et opérations éditoriales.

### Next.js

Next.js reste exclusivement le front public :

- design, composants et routage ;
- rendu SEO et performance ;
- lecture future des API WordPress, WooCommerce et Yoast ;
- mocks locaux tant que le branchement réel n'est pas activé.

Next.js ne fournit plus de dashboard CMS, d'authentification admin ni de routes CRUD admin.

## URLs locales

- Front public : `http://localhost:3000`
- WordPress : `http://localhost/ruunion`
- CMS : `http://localhost/ruunion/wp-admin/`
- REST WordPress : `http://localhost/ruunion/wp-json`
- Films : `http://localhost/ruunion/wp-json/wp/v2/films`
- Store API : `http://localhost/ruunion/wp-json/wc/store/products`
- REST WooCommerce admin future : `http://localhost/ruunion/wp-json/wc/v3`
- Yoast : `http://localhost/ruunion/wp-json/yoast/v1/get_head`

La route Next.js `/admin` effectue une redirection serveur vers le CMS local.

## Transition des données

Les pages publiques lisent encore `storage/*.json` en lecture seule. Les adaptateurs `src/lib/wordpress.ts` et `src/lib/woocommerce.ts` exposent les fonctions cibles, mais n'effectuent encore aucun appel réseau réel.

Prochain branchement :

1. mapper `/films` et `/films/[slug]` vers le CPT Films ;
2. mapper `/boutique` vers la Store API WooCommerce publique ;
3. mapper les métadonnées vers l'endpoint Yoast ;
4. valider les réponses, gérer les erreurs et ajouter la revalidation Next.js ;
5. conserver les opérations d'administration dans `wp-admin`.

La Store API publique ne requiert pas de Consumer Key pour lire le catalogue. Toute future opération WooCommerce administrative utilisera des secrets serveur dans `.env.local`, jamais dans Git.
