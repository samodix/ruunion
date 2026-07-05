# Back-office local RU Union

## Accès

- URL : `http://localhost:3000/admin`
- Connexion : `http://localhost:3000/admin/login`
- Email de démonstration : `admin@ruunion.com`
- Mot de passe de démonstration : `RuUnion@2026`

Ces identifiants sont publics et réservés au test local. Ils ne constituent pas une authentification de production.

## CRUD disponibles

- Films : création, lecture, modification, suppression, recherche et filtre par statut.
- Packs de soutien : création, lecture, modification, suppression, recherche et filtre par type.
- Les pages publiques lisent les mêmes fichiers JSON et reflètent les changements.

## Stockage

- `storage/films.json`
- `storage/support-packs.json`

Toutes les lectures et écritures passent par `src/lib/admin-storage.ts` côté serveur. Les composants client n’accèdent jamais directement au filesystem.

## Routes API

- `GET|POST /api/admin/films`
- `GET|PUT|DELETE /api/admin/films/[id]`
- `GET|POST /api/admin/support-packs`
- `GET|PUT|DELETE /api/admin/support-packs/[id]`
- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/me`

## Limites

- Authentification mock avec cookie local connu.
- Stockage JSON mono-instance sans transactions ni verrou distribué.
- Pas de gestion de médias.
- Aucun paiement réel.
- Aucune connexion WordPress, WooCommerce ou base de données.
- À ne pas déployer tel quel sur Internet.
