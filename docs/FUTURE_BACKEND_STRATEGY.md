# Stratégie backend retenue

Le backend éditorial retenu est WordPress headless. Le dashboard mock Next.js et ses routes CRUD ont été retirés.

## WordPress headless

- CPT `films` avec champs ACF structurés ;
- produits WooCommerce pour les packs de soutien ;
- métadonnées via Yoast SEO ou Rank Math ;
- contenus lus côté serveur par Next.js avec cache et revalidation ;
- écritures réservées à une API authentifiée et auditée si elles deviennent nécessaires.

## Phase transitoire

Les fichiers JSON locaux restent une source de démonstration en lecture seule. Ils ne constituent pas un CMS et seront remplacés progressivement par les réponses REST du WordPress XAMPP.

## Paiements futurs

Stripe et PayPal seront activés uniquement côté serveur et d'abord dans leurs environnements de test. Les signatures de webhooks, l'idempotence et l'enregistrement des commandes devront être validés avant toute production.

Voir `ARCHITECTURE_HEADLESS_WORDPRESS.md` et `LOCAL_WORDPRESS_XAMPP.md`.
