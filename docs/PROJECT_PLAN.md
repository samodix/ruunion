# Plan du projet RU Union

## Architecture retenue

WordPress local sous XAMPP est le back-office éditorial. Next.js est uniquement le front public. Les mocks JSON restent temporairement disponibles en lecture seule jusqu'au branchement des API WordPress et WooCommerce.

## Vision

RU Union utilise le cinéma, les rencontres et les actions culturelles pour renforcer les liens humains. La plateforme doit rendre les projets compréhensibles, désirables et faciles à soutenir.

## Socle technique

- Next.js avec App Router, React et TypeScript strict ;
- Tailwind CSS et composants réutilisables ;
- WordPress, CPT Films, ACF et WooCommerce côté CMS ;
- intégrations externes uniquement côté serveur ;
- aucun secret dans le navigateur ou dans Git.

## Jalons

1. Installer et configurer WordPress local dans XAMPP.
2. Créer le CPT Films, les champs ACF et les produits WooCommerce de test.
3. Connecter les films, la boutique et les métadonnées SEO en lecture.
4. Activer les paiements dans les environnements de test.
5. Réaliser les audits sécurité, SEO, performance et conformité.
6. Préparer séparément la stratégie de production, sans toucher au site Namecheap pendant le développement local.
