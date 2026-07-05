# WordPress local avec XAMPP

Cette installation concerne exclusivement le poste local. Le WordPress Namecheap distant reste hors périmètre.

## État installé

- WordPress : 7.0
- Dossier réel : `C:\xampp\htdocs\ruunion`
- URL : `http://localhost/ruunion`
- Administration : `http://localhost/ruunion/wp-admin/`
- Base MariaDB : `ruunion_wp`, encodage `utf8mb4`, collation `utf8mb4_unicode_ci`
- PHP : 8.2.12
- MariaDB : 10.4.32
- Permaliens : `/%postname%/`

Apache utilise ici une racine personnalisée `E:\htdocs`. Une jonction locale `E:\htdocs\ruunion` pointe donc vers le dossier WordPress demandé dans `C:\xampp\htdocs\ruunion`. La configuration Apache et les autres sites locaux n'ont pas été modifiés.

WordPress recommande actuellement PHP 8.3+ et MariaDB 10.6+ ou MySQL 8.0+. Les versions XAMPP présentes fonctionnent pour ce développement local, mais une mise à niveau est recommandée avant d'en faire un environnement durable.

## Extensions

- WooCommerce : actif, devise EUR, pays France ;
- Advanced Custom Fields : actif ;
- Yoast SEO : actif, organisation `RU Union` ;
- RU Union Core : actif ;
- LiteSpeed Cache : installé et actif, mais le cache serveur LiteSpeed n'est pas disponible sous Apache XAMPP ;
- aucun plugin de paiement réel n'est configuré.

Tous les moyens de paiement WooCommerce intégrés ont été explicitement désactivés. Aucune clé Stripe, PayPal ou WooCommerce n'a été créée.

## RU Union Core

Le plugin local se trouve dans `C:\xampp\htdocs\ruunion\wp-content\plugins\ruunion-core`. Il enregistre :

- le CPT `film`, REST base `films`, archive `/films` ;
- les 16 champs du groupe ACF « Informations du film » ;
- l'exposition REST des champs Films ;
- les quatre films de démonstration ;
- les catégories et six produits WooCommerce de démonstration.

Les fichiers WordPress et ce plugin local ne font pas partie du dépôt Next.js.

## Endpoints vérifiés

Tous ces endpoints ont répondu HTTP 200 le 5 juillet 2026 :

- `http://localhost/ruunion/`
- `http://localhost/ruunion/wp-admin/`
- `http://localhost/ruunion/wp-json/`
- `http://localhost/ruunion/wp-json/wp/v2/films`
- `http://localhost/ruunion/wp-json/wc/store/products`
- `http://localhost/ruunion/wp-json/wc/store/v1/products`
- `http://localhost/ruunion/wp-json/yoast/v1/get_head?url=http://localhost/ruunion/`

## Connexion au front Next.js

Le front consomme maintenant les endpoints Films, Store API et Yoast côté serveur. Le fichier `.env.local`, ignoré par Git, contient uniquement les URL locales. Si Apache ou MySQL est arrêté, les films et produits reviennent automatiquement aux mocks JSON sans interrompre le front.

Les variables nécessaires sont documentées dans `.env.example`, notamment `WORDPRESS_API_URL`, `WOOCOMMERCE_STORE_API_URL` et `YOAST_API_URL`.

## Sécurité locale

- `wp-config.php`, mots de passe, clés API et exports SQL ne doivent jamais être versionnés ;
- ne pas connecter Search Console, Stripe, PayPal ou un service distant pendant cette phase ;
- ne jamais réutiliser cette configuration pour le site Namecheap.
