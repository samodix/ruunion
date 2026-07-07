---
name: nextjs-react-ui
description: Travail Next.js/React pour RU Union ou autres projets : App Router, TypeScript, composants, images, lint/build, performance et conversion future vers thème WordPress sans déployer SSR sur EasyWP.
---

# Next.js React UI

Next.js sert de prototype UI/source design pour RU Union. Ne pas le réintroduire comme back-office WordPress et ne pas déployer SSR sur EasyWP.

## Bonnes pratiques

- App Router.
- TypeScript propre.
- Composants simples et réutilisables.
- Gestion images via `next/image` et `remotePatterns`.
- Accessibilité.
- Responsive.
- Performance.

## Tests

```powershell
npm run lint
npm run build
```

## Conversion WordPress

Transformer les patterns React en templates PHP WordPress : sections, cards, CTA, header, footer, films, boutique. Ne pas copier React tel quel.

