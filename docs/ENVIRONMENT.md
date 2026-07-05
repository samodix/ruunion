# Environnement

## Prérequis

- Node.js 20.19 ou une version LTS supérieure ;
- npm 10+ et Git ;
- XAMPP avec Apache et MySQL pour le CMS local.

## Installation du front

```bash
npm install
copy .env.example .env.local
npm run dev
```

Le front est disponible sur `http://localhost:3000`. `/admin` redirige vers `http://localhost/ruunion/wp-admin/`.

Le fichier `.env.local` ne doit jamais être committé. Les variables `NEXT_PUBLIC_*` sont visibles dans le navigateur et ne doivent contenir aucun secret.

## Variables prévues

- `NEXT_PUBLIC_SITE_URL` : URL publique du front ;
- `WORDPRESS_BASE_URL` : URL locale du CMS ;
- `WORDPRESS_API_URL` : base REST WordPress ;
- `WOOCOMMERCE_API_URL` : base REST WooCommerce ;
- clés WooCommerce, Stripe et PayPal : serveur uniquement, à renseigner plus tard dans `.env.local`.

## Commandes

- `npm run dev` : développement ;
- `npm run lint` : analyse statique ;
- `npm run build` : compilation de production ;
- `npm run start` : serveur de production local.

Voir `LOCAL_WORDPRESS_XAMPP.md` pour l'installation du CMS.
