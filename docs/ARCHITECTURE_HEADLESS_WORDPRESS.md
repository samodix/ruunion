# Architecture headless WordPress

## WordPress local

WordPress est le CMS et l'unique back-office éditorial : CPT Films, champs ACF, médias, produits WooCommerce et métadonnées Yoast.

## Next.js

Next.js reste le front public et assure :

- le design, les composants et le routage ;
- le rendu des films et produits issus des API locales ;
- la normalisation des réponses WordPress, WooCommerce et Yoast ;
- les filtres de visibilité et les tris éditoriaux ;
- le fallback mock si XAMPP est arrêté ;
- le rendu SEO et les performances du front.

Next.js ne fournit aucun dashboard CMS, aucune authentification admin et aucune route CRUD admin. `/admin` redirige vers `http://localhost/ruunion/wp-admin/`.

## Flux actuels

- accueil → films WordPress publics, mis en avant et visibles sur l'accueil ;
- `/films` → collection du CPT Films ;
- `/films/[slug]` → recherche REST par slug ;
- `/boutique` → produits publics de la WooCommerce Store API ;
- métadonnées → endpoint Yoast, avec fallback Next.js.

Les connecteurs n'acceptent que les hôtes locaux pendant cette phase. Le passage en production nécessitera une décision explicite sur les domaines autorisés, les canonical et la stratégie de cache.

## Prochaine étape

Valider les contenus et médias dans WordPress, puis concevoir un checkout de test. Aucun paiement réel ne doit être activé avant validation fonctionnelle et sécurité.
