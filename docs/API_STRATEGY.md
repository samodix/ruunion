# Stratégie API

## API admin locale

Les routes Next.js sous `/api/admin` utilisent exclusivement `storage/*.json` avec `fs/promises` côté serveur. Elles sont protégées par un cookie de démonstration qui devra être remplacé par Auth.js, WordPress JWT ou Supabase Auth.

## État initial

Les modules `wordpress.ts`, `woocommerce.ts`, `stripe.ts` et `paypal.ts` sont des adaptateurs inactifs. Ils ne réalisent aucun appel réseau et ne contiennent aucun secret.

## WordPress

- Lecture côté serveur avec cache et revalidation.
- Schémas TypeScript et validation Zod aux frontières.
- Aucune écriture depuis le navigateur.
- Définir précisément les types de contenus Films, Équipe et Pages avant connexion.

## WooCommerce

- Catalogue lu côté serveur.
- Les clés consommateur restent dans l’environnement serveur.
- Les commandes ne sont créées qu’après validation du parcours de paiement.

## Stripe et PayPal

- Utiliser les SDK officiels dans des routes serveur.
- Créer les montants côté serveur à partir d’identifiants de packs connus.
- Vérifier les webhooks et garantir l’idempotence.
- Commencer exclusivement avec les environnements de test.

## Sécurité

- Validation Zod de toutes les entrées.
- Journalisation sans secrets ni données sensibles.
- Limitation de débit sur les formulaires et endpoints transactionnels.
- Politique CSP, en-têtes de sécurité et rotation des clés avant production.
