# Pack de Skills Codex — RU Union

Ce pack spécialise Codex pour les projets WordPress, EasyWP/XAMPP, thème custom, plugin custom, WooCommerce, SEO, Next.js/React, UI/UX, responsive, performance, SFTP sécurisé et Git.

## Skills installés

- `ui-ux-pro-max` : skill externe UI/UX Pro Max installé localement depuis `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git`.
- `ruunion-project-master`
- `wordpress-easywp-expert`
- `wordpress-theme-builder`
- `wordpress-plugin-builder`
- `woocommerce-donation-packs`
- `seo-yoast-rankmath`
- `nextjs-react-ui`
- `cinematic-ui-ux`
- `responsive-accessibility`
- `performance-core-web-vitals`
- `safe-sftp-deployment`
- `git-audit-validator`

## Utilisation par Codex

Les skills sont placés dans `.agents/skills`. Lorsqu’une tâche correspond à un domaine, Codex doit charger le skill adapté, lire son `SKILL.md`, puis exécuter la mission avec les règles du projet.

Pour que l’environnement Codex détecte les nouveaux skills, relancer la session Codex si la liste active ne les affiche pas encore.

## Ajouter un nouveau skill

1. Créer un dossier `.agents/skills/nom-du-skill`.
2. Ajouter un `SKILL.md`.
3. Utiliser un frontmatter YAML avec `name` et `description`.
4. Garder le contenu clair, actionnable et concis.
5. Tester la présence du fichier.
6. Committer uniquement les fichiers nécessaires.

## Mettre à jour ui-ux-pro-max

1. Cloner ou mettre à jour temporairement :

```powershell
git -C E:\PROJECTS\_codex-skills-temp\ui-ux-pro-max-skill pull --ff-only
```

2. Copier les ressources utiles vers `.agents/skills/ui-ux-pro-max`.
3. Ne pas committer le dossier temporaire.
4. Vérifier que `.agents/skills/ui-ux-pro-max/SKILL.md` existe.

## Règles de sécurité

- Ne jamais committer de secrets.
- Ne jamais committer `.env.local`, `.env.production`, dumps SQL, backups, credentials, uploads complets, `wp-config.php`, `node_modules`, `.next`.
- Ne jamais modifier `wp-config.php`.
- Ne jamais utiliser les credentials DB dans `wp-config.php`.
- Toujours faire un backup avant SFTP.
- Ne jamais force-push.
- Ne jamais activer un paiement réel sans confirmation.

## Workflow RU Union recommandé

1. Charger `ruunion-project-master`.
2. Auditer avec `git-audit-validator`.
3. Pour WordPress/EasyWP, charger `wordpress-easywp-expert`.
4. Pour le thème, charger `wordpress-theme-builder`.
5. Pour le plugin, charger `wordpress-plugin-builder`.
6. Pour UI/UX, charger `cinematic-ui-ux` et/ou `ui-ux-pro-max`.
7. Pour WooCommerce, charger `woocommerce-donation-packs`.
8. Pour SEO, charger `seo-yoast-rankmath`.
9. Pour responsive/accessibilité, charger `responsive-accessibility`.
10. Pour performance, charger `performance-core-web-vitals`.
11. Pour SFTP, charger `safe-sftp-deployment`.
12. Rapporter factuellement les tests et résultats.

## Workflow autres projets WordPress/Next.js

1. Auditer repo, branche, remote et état des fichiers.
2. Identifier stack et cible de déploiement.
3. Choisir les skills par domaine.
4. Protéger secrets et fichiers sensibles.
5. Tester lint/build ou équivalent.
6. Déployer uniquement si explicitement demandé.
7. Produire un rapport court et vérifiable.

