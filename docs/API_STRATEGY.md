# Stratégie API

## État actuel

Le front Next.js lit désormais les API du WordPress XAMPP local côté serveur :

- films : `GET /wp-json/wp/v2/films` ;
- fiche film : `GET /wp-json/wp/v2/films?slug={slug}` ;
- médias : `GET /wp-json/wp/v2/media/{id}` ;
- produits : `GET /wp-json/wc/store/products` ;
- SEO : `GET /wp-json/yoast/v1/get_head?url={url}`.

Les pages restent dynamiques pour refléter les changements du CMS local sans reconstruction.

## Résilience

Chaque appel possède un délai de trois secondes. Si WordPress ou WooCommerce ne répond pas, les pages utilisent automatiquement les fichiers JSON locaux en lecture seule. En développement, `/films` et `/boutique` signalent visuellement ce mode mock. Une réponse API vide reste une réponse valide et ne déclenche pas les mocks.

## WooCommerce et paiements

La Store API publique suffit pour le catalogue et ne nécessite aucune Consumer Key. Aucun checkout réel n'est créé. Une future étape pourra choisir un checkout WooCommerce local de test ou des sandboxes Stripe/PayPal côté serveur.

## Yoast

Les titres, descriptions, robots, canonical, Open Graph et Twitter sont normalisés vers `Metadata`. Si Yoast est indisponible, les métadonnées existantes de Next.js restent actives.

## Sécurité

- appels exclusivement serveur ;
- hôtes autorisés : `localhost`, `127.0.0.1` et `::1` ;
- aucune écriture WordPress depuis Next.js ;
- aucun secret dans Git ;
- aucune connexion au WordPress Namecheap.

Voir `API_MAPPING.md` pour le détail des transformations.
