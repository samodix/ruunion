---
name: seo-yoast-rankmath
description: SEO WordPress avec Yoast ou RankMath : titles, metas, Open Graph, sitemap, robots, films, produits, pages CMS, endpoint yoast_head_json et respect de wp_head().
---

# SEO Yoast RankMath

## Principes

Yoast ou RankMath reste la source principale des metas SEO. Ne pas coder de metas en dur si le plugin SEO les gère.

## Vérifier

- `wp_head()` présent dans le thème.
- Titles/metas par page.
- Open Graph.
- Sitemap.
- Robots.
- Pages CMS.
- Films.
- Produits WooCommerce.
- `yoast_head_json` si disponible.

## Endpoint

Si un endpoint SEO retourne 404, utiliser la donnée WordPress disponible et documenter le fallback.

## Sécurité

Ne pas modifier les réglages SEO sensibles sans demande. Ne pas casser l’indexation existante.

