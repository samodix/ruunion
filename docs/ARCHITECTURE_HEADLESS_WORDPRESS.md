# Architecture headless WordPress

## Couche de présentation publique

La direction UI est décrite dans `docs/UI_DIRECTION.md`. Les composants Next.js ne dupliquent pas les contenus métier : ils reçoivent les films normalisés depuis WordPress et les packs normalisés depuis WooCommerce. Les compositions graphiques sans média sont des fallbacks de présentation et ne remplacent pas les données du CMS.

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

Les routes fixes sont associées à huit pages CMS/headless WordPress. Next.js lit leur champ `yoast_head_json` via l'API Pages. Les fiches film utilisent directement les métadonnées Yoast du CPT Film. Cette stratégie évite de demander à Yoast une URL Next.js qu'il ne connaît pas.

Les connecteurs n'acceptent que les hôtes locaux pendant cette phase. Le passage en production nécessitera une décision explicite sur les domaines autorisés, les canonical et la stratégie de cache.

## Prochaine étape

Valider les contenus et médias dans WordPress, puis concevoir un checkout de test. Aucun paiement réel ne doit être activé avant validation fonctionnelle et sécurité.

Le plugin custom est versionné séparément dans `wordpress/ruunion-core` et installé localement dans `C:\xampp\htdocs\ruunion\wp-content\plugins\ruunion-core`.
