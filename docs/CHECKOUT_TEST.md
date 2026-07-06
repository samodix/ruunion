# Mode Test du Panier WooCommerce Local — RU Union

Ce document détaille le fonctionnement, la configuration et l'architecture du système de test local du tunnel de commande (checkout) de l'application headless RU Union connectée à WooCommerce.

---

## 1. Philosophie & Isolation

Conformément aux règles de sécurité absolues du projet :
* **Aucun paiement réel** n'est configuré ou activé sur l'environnement de développement ou dans le code source Next.js.
* Les appels aux APIs réelles de passerelles de paiement distantes (ex: Stripe, PayPal, Namecheap distant) sont **strictement désactivés**.
* L'intégration repose sur le panier et le tunnel de commande natif de WordPress / WooCommerce local s'exécutant sous XAMPP (`http://localhost/ruunion`).

---

## 2. Fonctionnement du Bouton de Test du Panier

Sur la boutique Next.js (`/boutique`), chaque carte de pack de soutien comporte un bouton de test :
* **Label** : `Tester le panier`
* **Badge visuel** : `Mode test local` (vert émeraude)
* **Action** : Ajoute directement le produit au panier local WooCommerce de développement et redirige l'utilisateur vers la page panier.

### URL de Redirection de Panier WooCommerce

Le lien est généré dynamiquement via la fonction `createWooCheckoutUrl(productIdOrSlug)` de `src/lib/woocommerce.ts` :

```
http://localhost/ruunion/cart/?add-to-cart=PRODUCT_ID
```

Où `PRODUCT_ID` est l'identifiant réel du produit dans la base WooCommerce locale (ex: `10`, `12`, etc.).

---

## 3. Configuration requise sous WordPress (XAMPP)

Pour que le test du panier fonctionne de bout en bout localement :

1. **Lancer Apache & MySQL** dans le panneau de contrôle XAMPP.
2. S'assurer que WordPress local est installé et accessible à l'adresse :
   `http://localhost/ruunion/`
3. S'assurer que WooCommerce est actif et que les 6 produits de soutien ont été créés :
   * *Soutien Découverte*
   * *Soutien Solidaire*
   * *Soutien Film*
   * *Soutien Avant-première*
   * *Soutien Partenaire*
   * *Grand Mécène*
4. **Permettre la redirection du panier** :
   Dans l'administration WordPress (`wp-admin`) :
   * Aller dans *WooCommerce > Réglages > Produits > Général*.
   * Cocher la case : *« Rediriger vers la page panier après un ajout réussi »*.

---

## 4. Évolutions Futures vers le Checkout Headless

Dans une phase ultérieure de production, le mode test pourra être remplacé par :
1. **Intégration Stripe/PayPal Headless** : Des routes API Next.js (`/api/checkout/stripe` et `/api/checkout/paypal`) qui consomment en toute sécurité les clés secrètes serveur non exposées au client, et créent des sessions de paiement.
2. **Synchronisation d'État** : Une fois le paiement validé via Webhook, une requête de mise à jour mettra à jour le montant collecté (`montant_collecte`) sur le CPT Film correspondant via l'API REST WordPress de manière automatisée.
