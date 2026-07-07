---
name: performance-core-web-vitals
description: Optimisation performance et Core Web Vitals pour WordPress, WooCommerce et Next.js : WebP, lazy loading, tailles images, CSS léger, JS minimal, cache LiteSpeed, CLS et Lighthouse.
---

# Performance Core Web Vitals

## Images

- Utiliser WebP quand possible.
- Définir dimensions largeur/hauteur.
- Lazy loading hors hero.
- Éviter images surdimensionnées.

## CSS/JS

- CSS léger.
- JS minimal.
- Pas de plugin lourd sans nécessité.
- Éviter layout shift.
- Préserver le rendu critique.

## WordPress

Utiliser LiteSpeed Cache si compatible et accessible. Ne pas modifier les réglages cache sensibles sans demande.

## Tests

Lancer `npm run build` côté Next.js si fichiers concernés. Utiliser Lighthouse si possible et pertinent.

