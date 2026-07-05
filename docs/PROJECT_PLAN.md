# Plan du projet RU Union

## Back-office local de recette

Le back-office mock sous `/admin` valide les modèles Film et SupportPack, les formulaires, les filtres et la synchronisation front avant le choix du CMS ou de la base définitive. Le stockage JSON et l’authentification de démonstration devront être remplacés avant production.

## Vision

RU Union utilise le cinéma, les rencontres et les actions culturelles pour renforcer les liens humains. La plateforme doit rendre les projets compréhensibles, désirables et faciles à soutenir.

## Socle technique

- Next.js avec App Router
- React et TypeScript strict
- Tailwind CSS et composants réutilisables
- Contenus mock locaux pendant la phase de conception
- Intégrations externes uniquement côté serveur dans les lots concernés

## Principes

1. Accessibilité et mobile first.
2. Séparation entre présentation, données et intégrations.
3. Aucun secret dans le navigateur ou dans Git.
4. Déploiements progressifs avec recette à chaque lot.
5. Le WordPress actuel reste indépendant jusqu’à la stratégie de migration validée.

## Jalons

1. Valider le socle et le design system.
2. Finaliser les contenus et médias.
3. Connecter le CMS et la boutique en lecture.
4. Activer les paiements en environnement de test.
5. Réaliser les audits sécurité, SEO, performance et conformité.
6. Préparer la mise en ligne et la formation.
