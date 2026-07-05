# Mapping des API locales

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

Le connecteur utilise `json.title`, `description`, `canonical`, `robots`, les champs Open Graph et Twitter. Le graphe Schema est disponible dans la réponse Yoast mais n'est pas injecté automatiquement par l'API `Metadata` de Next.js ; une future intégration JSON-LD dédiée pourra l'exploiter.

## Repli et sécurité

- délai maximal d'un appel local : trois secondes ;
- fallback vers `storage/*.json` si WordPress ou WooCommerce est absent ;
- fallback vers `createMetadata` si Yoast est absent ;
- seules les URL `localhost`, `127.0.0.1` et `::1` sont autorisées dans cette phase ;
- aucun endpoint Namecheap, paiement ou secret n'est utilisé.
