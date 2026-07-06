# Déploiement RU Union sur EasyWP

## Rôle de l’hébergement

EasyWP est un hébergement WordPress managé. La décision finale est d’y héberger le site RU Union sous la forme classique suivante :

- WordPress pour le CMS, le front public et le back-office ;
- RU Union Core pour le CPT Films, les champs ACF, le dashboard et les styles d’administration ;
- RU Union Theme pour l’interface publique ;
- WooCommerce pour la boutique et les packs ;
- Yoast pour les métadonnées SEO.

Next.js reste le prototype fonctionnel et la référence UI. Il ne doit pas être lancé en SSR sur EasyWP, qui n’est pas un serveur Node. Les dossiers `.next`, `node_modules` et `out` ne doivent jamais être envoyés sur cet hébergement.

## Règles impératives

- Ne jamais placer les accès de base de données fournis par EasyWP dans `wp-config.php`.
- Ne jamais committer ni enregistrer les identifiants SFTP, WordPress ou base de données.
- Ne jamais envoyer `.env`, `.next`, `node_modules`, un dump SQL, un backup ou les uploads complets.
- Effectuer un backup SFTP des fichiers qui seront remplacés avant chaque upload.
- Ne pas activer un paiement réel sans validation séparée.
- Ne jamais remplacer la racine publique EasyWP en bloc.

## Procédure prudente

1. Vérifier que `main` est propre, testé et poussé sur GitHub.
2. Créer localement `backups/easywp-before-deploy-YYYYMMDD-HHMM/` ; ce dossier est ignoré par Git.
3. Se connecter en SFTP au port 22 en saisissant le mot de passe uniquement dans le client interactif.
4. Télécharger dans le backup :
   - `wp-content/plugins/ruunion-core` s’il existe ;
   - `wp-content/themes/ruunion-theme` s’il existe ;
   - chaque autre fichier explicitement destiné à être remplacé.
5. Envoyer uniquement :
   - `wordpress/ruunion-core` vers `wp-content/plugins/ruunion-core` ;
   - `wordpress/themes/ruunion-theme` vers `wp-content/themes/ruunion-theme`.
6. Depuis `wp-admin`, vérifier puis activer RU Union Core si nécessaire.
7. Activer `Apparence > Thèmes > RU Union Theme`.
8. Vérifier le site public, l’administration, la connexion, l’API REST et la Store API WooCommerce.
9. Régénérer tout accès temporaire utilisé pendant l’intervention.

## Checklist après upload

- [ ] Aucun écran blanc ni message PHP visible.
- [ ] `wp-admin` et `wp-login.php` restent accessibles.
- [ ] Les cinq widgets RU Union sont présents.
- [ ] Les films, ACF, Yoast et WooCommerce restent disponibles.
- [ ] `/wp-json/` répond.
- [ ] `/wp-json/wp/v2/films` répond.
- [ ] `/wp-json/wc/store/products` répond.
- [ ] Le panier fonctionne sans activation d’un moyen de paiement réel.
- [ ] `wp-config.php` n’a pas été modifié.

## Limite de cette préparation

Le staging public peut être audité sans authentification. Le backup, l’upload du plugin et du thème, leur activation et la vérification visuelle de l’administration nécessitent les accès SFTP et WordPress fournis par le propriétaire. Aucune de ces opérations ne doit être simulée ou contournée.
