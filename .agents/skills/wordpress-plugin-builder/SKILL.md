---
name: wordpress-plugin-builder
description: Construction et maintenance du plugin RU Union Core ou de plugins WordPress custom : CPT, ACF, REST fields, dashboard widgets, styles admin/login, sécurité, capabilities, nonce, sanitization et versionnement propre.
---

# WordPress Plugin Builder

Le plugin contient la logique CMS/core, pas la mise en page publique du thème.

## RU Union Core

Responsabilités :

- CPT Films.
- Champs ACF et intégrations.
- REST fields.
- Dashboard widgets.
- Styles admin.
- Styles login.
- Fonctions CMS transverses.

## Sécurité

- Vérifier les capabilities.
- Utiliser des nonces pour actions.
- Sanitizer les entrées.
- Échapper les sorties.
- Ne jamais stocker ou afficher de secret.
- Ne pas modifier les rôles ou options sensibles sans demande explicite.

## Versionnement

Garder le plugin autonome et propre dans `wordpress/ruunion-core`. Synchroniser vers WordPress local uniquement quand nécessaire.

## Limite thème/plugin

Le thème gère le rendu public. Le plugin gère les données, CPT, admin, REST et logique métier.

