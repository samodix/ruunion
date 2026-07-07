---
name: git-audit-validator
description: Audit Git, validation de modifications, commit et push sécurisés : git status, log, remote, branche, secrets, fichiers exclus, hash commit, repo propre et jamais de force-push.
---

# Git Audit Validator

## Toujours commencer par

```powershell
git status
git log --oneline -10
git remote -v
git branch --show-current
```

## Règles

- Ne jamais force-push.
- Ne jamais `reset --hard` sans confirmation explicite.
- Ne jamais committer secrets, `.env`, dumps SQL, backups, uploads complets, `wp-config.php`, `node_modules`, `.next`.
- Vérifier `HEAD` et `origin/main`.
- Préserver les changements utilisateur non liés.

## Commit

Utiliser un message clair. Après commit, rapporter le hash. Pousser normalement seulement si demandé.

## Rapport final

Indiquer statut repo, fichiers commités, tests, hash, push oui/non, problème restant.

