# Architecture headless WordPress

## Répartition des responsabilités

### WordPress local, puis future production

WordPress est le CMS et l'unique back-office éditorial :

- administration via `wp-admin` ;
- pages, CPT Films et médias ;
- WooCommerce et produits de soutien ;
- SEO via Yoast SEO ou Rank Math ;
- cache compatible avec l'hébergement ;
- comptes, rôles et opérations éditoriales.

### Next.js

Next.js reste exclusivement le front public :

- design et composants ;
- routage et rendu SEO ;
- performance et cache frontal ;
- lecture future des API WordPress et WooCommerce ;
- mocks locaux tant que le CMS XAMPP n'est pas prêt.

Next.js ne fournit plus de dashboard CMS, d'authentification admin ni de routes CRUD admin.

## URLs locales

- Front public Next.js : `http://localhost:3000`
- WordPress : `http://localhost/ruunion`
- CMS WordPress : `http://localhost/ruunion/wp-admin`
- REST WordPress : `http://localhost/ruunion/wp-json`
- REST WooCommerce : `http://localhost/ruunion/wp-json/wc/v3`

La route Next.js `/admin` effectue une redirection serveur vers le CMS WordPress local.

## Transition des données

Les pages publiques lisent encore les fichiers JSON de `storage/` en lecture seule. Les adaptateurs `src/lib/wordpress.ts` et `src/lib/woocommerce.ts` exposent déjà les fonctions cibles, mais n'effectuent aucun appel réseau réel.

Prochain branchement :

1. connecter `/films` et `/films/[slug]` au CPT Films ;
2. connecter `/boutique` aux produits WooCommerce ;
3. connecter les métadonnées à Yoast SEO ou Rank Math ;
4. ajouter validation des réponses, cache et gestion des erreurs ;
5. n'ajouter une authentification API que pour les futures écritures côté serveur.

Les secrets WooCommerce ou d'authentification resteront dans un fichier `.env.local` ignoré par Git. Le site WordPress Namecheap distant reste hors périmètre.
