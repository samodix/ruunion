# Stratégie future du backend

## Limites du mock actuel

Le stockage JSON permet une recette rapide mais ne convient pas au multi-utilisateur, aux déploiements serverless, aux écritures concurrentes ni à la traçabilité avancée. L’authentification de démonstration n’offre aucune sécurité réelle.

## Option 1 — WordPress Headless

- Créer un Custom Post Type `film` avec champs structurés.
- Utiliser les produits WooCommerce pour les packs de soutien.
- Exposer les métadonnées SEO via Yoast SEO ou RankMath.
- Consommer les contenus en lecture côté serveur avec cache et revalidation.
- Restreindre les écritures à une API authentifiée et auditée.

## Option 2 — Supabase

- Tables `films`, `support_packs`, `donations` et profils admin.
- Supabase Auth pour le back-office.
- Storage pour les affiches, galeries et documents.
- Row Level Security et migrations versionnées.

## Option 3 — PostgreSQL et Prisma

- Modèles `Film`, `SupportPack`, `Donation`, `Order` et `AdminUser`.
- Migrations Prisma, contraintes d’unicité et transactions.
- Auth.js pour les sessions admin.
- Stockage objet séparé pour les médias.

## Stripe et PayPal

- Créer les sessions côté serveur depuis des packs connus en base.
- Enregistrer les commandes et états de paiement.
- Vérifier les signatures des webhooks et gérer l’idempotence.
- Synchroniser `donationCollected` uniquement après confirmation serveur.
- Tester intégralement dans les sandboxes avant activation.

## Recommandation

Valider d’abord le modèle éditorial et les parcours avec ce back-office local. Choisir ensuite WordPress Headless si l’autonomie éditoriale prime, ou PostgreSQL/Supabase si les dons, commandes et données relationnelles deviennent le cœur du produit.
