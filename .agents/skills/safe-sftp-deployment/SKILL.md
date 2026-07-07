---
name: safe-sftp-deployment
description: Déploiement SFTP sécurisé vers EasyWP ou WordPress : backup avant upload, fichiers ciblés uniquement, exclusion secrets/wp-config/.env/.next/node_modules, tests HTTP, cache et rapport factuel.
---

# Safe SFTP Deployment

## Avant upload

1. Auditer Git.
2. Identifier les fichiers exacts à uploader.
3. Créer un backup local des fichiers/dossiers distants ciblés.
4. Ne jamais afficher ni sauvegarder les mots de passe.

## Ne jamais uploader

- `wp-config.php`
- `.env`
- `.env.local`
- `.env.production`
- `node_modules`
- `.next`
- `backups`
- dumps SQL
- credentials
- uploads complets sans confirmation

## Après upload

Tester :

- site public
- login/admin si disponible
- REST API
- endpoints métier
- absence d’erreur PHP visible

Vider cache LiteSpeed/EasyWP si accessible et dans le périmètre.

## Rapport

Répondre factuellement : upload oui/non, backup oui/non, fichiers testés, endpoints OK/KO, problème restant.

