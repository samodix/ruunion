---
name: wordpress-easywp-expert
description: Expertise WordPress local XAMPP et EasyWP staging. À utiliser pour vérifier, déployer ou diagnostiquer WordPress, EasyWP, SFTP, caches, REST API, erreurs PHP, plugins et thème sans modifier les réglages sensibles.
---

# WordPress EasyWP Expert

## Local XAMPP

Vérifier Apache et MySQL/MariaDB avant de diagnostiquer WordPress local. Tester `http://localhost/ruunion`, `/wp-admin/` et `/wp-json/`.

## EasyWP

EasyWP est un hébergement WordPress managé. Ne pas supposer Node.js/SSR. Ne pas modifier `wp-config.php`. Ne jamais utiliser les identifiants DB dans `wp-config.php`.

## SFTP prudent

Avant upload :

1. Créer un backup local des dossiers/fichiers ciblés.
2. Uploader seulement les fichiers nécessaires.
3. Exclure `wp-config.php`, `.env`, `node_modules`, `.next`, backups, dumps SQL, credentials, uploads complets.
4. Ne pas afficher les mots de passe.

## Tests

Tester :

- `/`
- `/wp-admin/` si session disponible
- `/wp-login.php`
- `/wp-json/`
- `/wp-json/wp/v2/films`
- `/wp-json/wc/store/products`

Vérifier HTTP 200, JSON valide, absence de `Fatal error`, `Parse error`, `Warning:` visible.

## Cache

Vider LiteSpeed Cache/EasyWP seulement si accessible et dans le périmètre demandé.

## Rapport

Rapporter uniquement ce qui est vérifié. Ne pas écrire “OK” si non vérifié.

