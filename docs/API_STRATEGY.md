# Stratégie API

## État actuel

Le front utilise des mocks JSON locaux en lecture seule. Il n'existe plus de routes `/api/admin`, d'authentification admin ou de CRUD Next.js. Aucun appel WordPress, WooCommerce, Stripe ou PayPal n'est exécuté.

## WordPress

L'adaptateur `src/lib/wordpress.ts` prépare les fonctions de pages, films, médias et SEO. La connexion future sera réalisée côté serveur vers `WORDPRESS_API_URL`, avec validation des réponses, cache et revalidation.

## WooCommerce

L'adaptateur `src/lib/woocommerce.ts` prépare la lecture des produits, des packs et la future création d'une URL de checkout. Les clés consommateur resteront exclusivement dans l'environnement serveur.

## Sécurité

- aucune écriture depuis le navigateur vers WordPress ;
- validation des réponses et entrées aux frontières ;
- aucun secret dans Git ;
- journalisation sans données sensibles ;
- environnements de test pour Stripe et PayPal ;
- aucune connexion au WordPress Namecheap pendant le développement local.
