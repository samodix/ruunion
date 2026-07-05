# WordPress local avec XAMPP

Cette procédure concerne exclusivement le poste local. Elle ne doit jamais être utilisée avec le WordPress Namecheap distant.

## Repères locaux

- Dossier WordPress recommandé : `C:\xampp\htdocs\ruunion`
- Site WordPress : `http://localhost/ruunion`
- Administration : `http://localhost/ruunion/wp-admin`
- Base MySQL recommandée : `ruunion_wp`
- phpMyAdmin : `http://localhost/phpmyadmin`

## Installation

1. Démarrer Apache et MySQL depuis le panneau XAMPP.
2. Ouvrir phpMyAdmin et créer une base vide nommée `ruunion_wp` avec un encodage `utf8mb4`.
3. Télécharger WordPress depuis le site officiel.
4. Décompresser WordPress dans `C:\xampp\htdocs\ruunion`.
5. Ouvrir `http://localhost/ruunion` et suivre l'assistant d'installation.
6. Se connecter ensuite à `http://localhost/ruunion/wp-admin`.

Ne jamais versionner `wp-config.php`, des mots de passe, des clés API ou des sauvegardes de base de données.

## Extensions locales recommandées

- WooCommerce pour les packs de soutien.
- Yoast SEO ou Rank Math pour les métadonnées.
- ACF pour les champs Films.
- Custom Post Type UI, optionnel, pour créer le CPT sans code.
- WP REST API Controller, optionnel, pour maîtriser les champs exposés.
- Application Passwords (natif WordPress) ou JWT Auth plus tard, pour les opérations API authentifiées.
- LiteSpeed Cache seulement si le serveur local le permet ; sinon choisir un cache compatible avec Apache/XAMPP. Le cache n'est pas prioritaire en développement.

## CPT Films

Créer un type de contenu `Films` avec le slug `films`, l'API REST activée (`show_in_rest`) et les supports suivants : titre, éditeur, image mise en avant, extrait et champs personnalisés.

Champs ACF à prévoir :

- synopsis court et synopsis long ;
- année et statut ;
- affiche, bande-annonce et galerie ;
- objectif de dons et montant collecté ;
- mis en avant et priorité ;
- visible publiquement et visible sur l'accueil ;
- produit ou pack WooCommerce lié.

## WooCommerce

Créer les packs de soutien comme produits et prévoir les catégories `Soutien`, `Film` et `Mécénat`. Stripe et PayPal seront configurés ultérieurement, d'abord en environnement de test. Aucune clé de paiement ne doit entrer dans Git.

## SEO

Yoast SEO ou Rank Math gère les métadonnées dans WordPress. Le front Next.js les récupérera plus tard via l'API et les transformera en métadonnées Next.js.

## Vérification avant connexion au front

- `http://localhost/ruunion/wp-json` répond localement ;
- le CPT Films apparaît dans `wp-json/wp/v2` ;
- les produits WooCommerce de démonstration sont visibles ;
- aucune URL, clé ou donnée Namecheap n'est utilisée.
