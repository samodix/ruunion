---
name: ruunion-project-master
description: Contexte maître du projet RU Union. À utiliser pour toute tâche RU Union impliquant WordPress, EasyWP, thème RU Union, plugin RU Union Core, WooCommerce, Yoast, ACF, CPT Films, Next.js prototype, sécurité, audit, déploiement ou rapport final.
---

# RU Union Project Master

Toujours répondre en français et travailler avec prudence.

## Architecture

- EasyWP héberge le site final WordPress complet.
- WordPress = CMS, front public et back-office.
- RU Union Theme = thème public custom.
- RU Union Core = plugin custom : CPT Films, champs REST, dashboard, styles admin/login.
- WooCommerce = boutique et packs de soutien.
- Yoast SEO = SEO.
- ACF = champs films.
- CPT `film` = contenus films.
- Next.js = prototype/source UI, pas hébergement final EasyWP.

## URLs

- WordPress local : `http://localhost/ruunion`
- Admin local : `http://localhost/ruunion/wp-admin/`
- Staging EasyWP : `https://ruunion-test-v1-f98f20.ingress-comporellon.ewp.live/`

## Règles absolues

- Ne jamais toucher à `wp-config.php`.
- Ne jamais committer de secrets, `.env`, dumps SQL, backups, uploads complets ou credentials.
- Ne jamais activer un paiement réel sans confirmation explicite.
- Toujours faire un backup avant SFTP.
- Ne jamais force-push.
- Ne jamais uploader `.next`, `node_modules` ou un export Next.js comme app Node sur EasyWP.
- Toujours produire un rapport final factuel.

## Tests standards

```powershell
git status
npm run lint
npm run build
```

Tester aussi :

- `/wp-json/`
- `/wp-json/wp/v2/films`
- `/wp-json/wc/store/products`

## Checklist finale

Confirmer : fichiers modifiés, tests lancés, secrets absents, options sensibles intactes, WooCommerce intact, Yoast/ACF intact, backup créé si SFTP, hash commit si commit, push si demandé.

