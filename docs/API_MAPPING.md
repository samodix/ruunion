# Mapping des API locales

## Consommation par l’interface publique

- Le hero et la section « Films en lumière » utilisent les films WordPress publics, visibles sur l’accueil et mis en avant, triés par `priorite_affichage`.
- Les affiches et galeries WordPress sont rendues lorsqu’elles sont disponibles ; une illustration CSS locale sert de fallback.
- L’accueil et la boutique utilisent les packs normalisés depuis la Store API WooCommerce. Les filtres s’appuient sur le type dérivé des catégories produit.
- Les collections mock de `src/data` restent la source de secours lorsque WordPress ou WooCommerce local est indisponible.

## CPT Film WordPress vers `Film` Next.js

| WordPress / ACF                            | Next.js              | Traitement                          |
| ------------------------------------------ | -------------------- | ----------------------------------- |
| `id`                                       | `id`                 | Conversion en chaîne                |
| `slug`                                     | `slug`               | Valeur directe                      |
| `title.rendered`                           | `title`              | HTML retiré                         |
| `acf.synopsis_court` ou `excerpt.rendered` | `shortDescription`   | HTML retiré                         |
| `acf.synopsis_long` ou `content.rendered`  | `longDescription`    | HTML retiré                         |
| `acf.annee`                                | `year`               | Conversion en nombre                |
| `acf.statut`                               | `status`             | Validation du statut RU Union       |
| `acf.affiche` ou `featured_media`          | `poster`             | Résolution via `/wp/v2/media/{id}`  |
| `acf.bande_annonce_url`                    | `trailerUrl`         | Valeur directe                      |
| `acf.galerie`                              | `gallery`            | URLs séparées par lignes ou tableau |
| `acf.objectif_dons`                        | `donationGoal`       | Conversion en nombre                |
| `acf.montant_collecte`                     | `donationCollected`  | Conversion en nombre                |
| `acf.mis_en_avant`                         | `isFeatured`         | Conversion booléenne                |
| `acf.priorite_affichage`                   | `priorityOrder`      | Conversion en nombre                |
| `acf.visible_public`                       | `publicVisibility`   | Conversion booléenne                |
| `acf.visible_accueil`                      | `homepageVisibility` | Conversion booléenne                |
| `acf.pack_woocommerce_lie`                 | `donationPackSlug`   | Slug ou identifiant disponible      |
| `acf.seo_title_custom`                     | `seoTitle`           | Valeur directe                      |
| `acf.seo_description_custom`               | `seoDescription`     | Valeur directe                      |

L'API locale expose actuellement les champs à la fois sous `acf` et à la racine. Le connecteur privilégie `acf`.

## Produit Store API vers `SupportPack` Next.js

| WooCommerce                          | Next.js              | Traitement                                             |
| ------------------------------------ | -------------------- | ------------------------------------------------------ |
| `id`                                 | `id`, `wooProductId` | Chaîne pour `id`, nombre pour la référence WooCommerce |
| `slug`                               | `slug`               | Valeur directe                                         |
| `name`                               | `title`              | HTML retiré                                            |
| `short_description` ou `description` | `description`        | HTML retiré                                            |
| `prices.price`                       | `price`              | Division par `10 ** currency_minor_unit`               |
| `prices.currency_code`               | `currency`           | EUR dans le catalogue local                            |
| catégories                           | `type`               | Soutien, Film, Billetterie ou Mécénat                  |
| catégories et tags                   | `features`           | Libellés publics                                       |
| tag de mise en avant                 | `isHighlighted`      | Avec repli sur le pack Solidaire                       |

## Yoast vers `Metadata` Next.js

Le connecteur utilise `json.title`, `description`, `robots`, les champs Open Graph et Twitter. Pour les routes fixes, `seoRouteMap` traduit la route Next.js en slug de page WordPress, puis lit `yoast_head_json` dans `/wp/v2/pages`. Pour les fiches film, la même donnée provient du CPT Film.

Le canonical et l'URL Open Graph sont réécrits vers le front Next.js. Le graphe Schema reste disponible dans la réponse Yoast mais n'est pas encore injecté automatiquement ; une future intégration JSON-LD dédiée pourra l'exploiter.

| Route Next.js                | Slug WordPress              |
| ---------------------------- | --------------------------- |
| `/`                          | `accueil`                   |
| `/association`               | `association`               |
| `/equipe`                    | `equipe`                    |
| `/films`                     | `films`                     |
| `/boutique`                  | `boutique`                  |
| `/contact`                   | `contact`                   |
| `/mentions-legales`          | `mentions-legales`          |
| `/politique-confidentialite` | `politique-confidentialite` |

## Repli et sécurité

- délai maximal d'un appel local : trois secondes ;
- fallback vers `storage/*.json` si WordPress ou WooCommerce est absent ;
- fallback vers `createMetadata` si Yoast est absent ;
- seules les URL `localhost`, `127.0.0.1` et `::1` sont autorisées dans cette phase ;
- aucun endpoint Namecheap, paiement ou secret n'est utilisé.
