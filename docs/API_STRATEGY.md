# Stratégie API

## État actuel

Le CMS WordPress XAMPP est opérationnel, mais le front Next.js continue volontairement d'utiliser ses mocks JSON locaux en lecture seule. Aucun appel WordPress ou WooCommerce réel n'est encore exécuté par Next.js.

## WordPress Films

- Endpoint testé : `GET /wp-json/wp/v2/films`
- Quatre films de démonstration sont disponibles.
- Les 16 champs RU Union sont exposés directement dans chaque objet REST.
- L'adaptateur `src/lib/wordpress.ts` préparera le mapping vers les types `Film` existants.

Le branchement devra valider les réponses, filtrer `visible_public`, trier `priorite_affichage` et utiliser la revalidation côté serveur.

## WooCommerce

- Endpoint public testé : `GET /wp-json/wc/store/products`
- Endpoint versionné disponible : `GET /wp-json/wc/store/v1/products`
- Six produits de démonstration sont disponibles en EUR.

La Store API servira au catalogue public sans clé. `WOOCOMMERCE_API_URL` et d'éventuelles Consumer Keys sont réservés à de futures opérations serveur administratives ; aucune clé n'est actuellement créée.

## Yoast SEO

Endpoint testé : `GET /wp-json/yoast/v1/get_head?url=http://localhost/ruunion/`.

Next.js pourra transformer les métadonnées Yoast en objets `Metadata` lors du branchement réel.

## Sécurité

- aucune écriture WordPress depuis le navigateur Next.js ;
- aucun paiement réel ni clé Stripe/PayPal ;
- validation des réponses aux frontières ;
- aucun secret dans Git ;
- aucune connexion au WordPress Namecheap.
