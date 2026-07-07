---
name: ui-ux-pro-max
description: Intelligence UI/UX avancée pour concevoir, auditer et améliorer des interfaces web, mobile et desktop avec recherche de styles, palettes, typographies, patterns landing, accessibilité et performance. À utiliser pour les demandes de direction artistique, design system, UI premium, refonte visuelle, responsive, composants React/Next.js ou conversion visuelle vers WordPress.
---

# UI/UX Pro Max

Utiliser ce skill quand une tâche demande une direction UI/UX structurée, une recommandation de style, une palette, une typographie, un design system, un audit d’interface ou une amélioration visuelle.

## Commandes utiles

Depuis la racine du repo :

```powershell
python .agents/skills/ui-ux-pro-max/scripts/search.py "requête produit style audience" --design-system -p "Nom du projet"
python .agents/skills/ui-ux-pro-max/scripts/search.py "cinematic nonprofit warm" --domain style -n 5
python .agents/skills/ui-ux-pro-max/scripts/search.py "accessibility responsive web" --domain ux -n 5
python .agents/skills/ui-ux-pro-max/scripts/search.py "nextjs performance image layout" --domain react -n 5
```

Sur Windows, utiliser `python`. Sur macOS/Linux, `python3` peut être nécessaire.

## Workflow

1. Identifier le produit, l’audience, le ton, le stack et les contraintes.
2. Lancer d’abord une recherche `--design-system` pour obtenir une recommandation globale.
3. Compléter avec des recherches par domaine si nécessaire : `style`, `color`, `typography`, `landing`, `ux`, `react`, `chart`.
4. Adapter les recommandations à la charte du projet, sans appliquer aveuglément des styles incompatibles.
5. Vérifier responsive, contraste, focus clavier, motion réduite, performance image et lisibilité.

## Pour RU Union

Respecter la charte RU Union : humain, cinématique, naturel, chaleureux, solidaire, premium accessible. Ne pas produire une UI SaaS froide, enfantine ou trop gadget. Préférer des sections respirées, des CTA humains, des cartes éditoriales et une présence visuelle douce.

