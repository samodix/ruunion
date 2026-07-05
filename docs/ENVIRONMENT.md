# Environnement

## Prérequis

- Node.js 20.19 ou version LTS supérieure recommandée
- npm 10+
- Git

## Installation

```bash
npm install
copy .env.example .env.local
npm run dev
```

Le fichier `.env.local` ne doit jamais être committé. Dans le socle initial, aucune variable secrète n’est requise.

## Variables prévues

- `NEXT_PUBLIC_SITE_URL` : URL publique du front.
- `WORDPRESS_API_URL` : base REST du CMS.
- `WOOCOMMERCE_API_URL` : base de la boutique.
- `WOOCOMMERCE_CONSUMER_KEY` et `WOOCOMMERCE_CONSUMER_SECRET` : serveur uniquement.
- `STRIPE_SECRET_KEY` et `PAYPAL_CLIENT_SECRET` : serveur uniquement.
- Les variables `NEXT_PUBLIC_*` sont visibles dans le navigateur et ne doivent contenir aucun secret.

## Commandes

- `npm run dev` : développement.
- `npm run lint` : analyse statique.
- `npm run build` : compilation de production.
- `npm run start` : serveur de production local.
