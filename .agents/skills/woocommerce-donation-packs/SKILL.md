---
name: woocommerce-donation-packs
description: Gestion WooCommerce des packs de soutien RU Union : produits, prix EUR, images, Store API, panier test, templates WooCommerce et vérifications sans activer de paiement réel.
---

# WooCommerce Donation Packs

## Produits

Les packs de soutien sont des produits WooCommerce avec prix en EUR, image produit, catégorie et bouton panier.

## Tests

- Vérifier produits visibles.
- Vérifier prix conservés.
- Tester Store API : `/wp-json/wc/store/products`.
- Tester panier : `/cart/?add-to-cart=PRODUCT_ID` ou URL locale équivalente.

## Paiement

Ne jamais activer Stripe, PayPal ou autre paiement réel sans confirmation explicite. Utiliser uniquement mode test si demandé.

## Templates

Adapter les templates WooCommerce dans le thème sans casser le panier, checkout, notices, hooks ou formulaires natifs.

## Rapport

Indiquer ce qui a été vérifié : produits, Store API, panier, checkout, paiement réel non activé.

