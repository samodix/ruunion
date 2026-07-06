# Gestion et Importation des Médias — RU Union

Ce document spécifie le workflow de préparation, d'optimisation et d'importation des visuels (affiches de films, galeries des coulisses, packs de soutien) dans WordPress local pour l'application RU Union.

---

## 1. Structure des Dossiers de Médias

Toutes les images d'origine (haute définition, photos de tournage brutes) doivent être placées dans les sous-dossiers correspondants de `media-source/` :

```
ruunion/
  ├── media-source/
  │    ├── films/
  │    │    ├── parce-que-cest-toi/
  │    │    │    ├── poster/           <-- Placer ici l'affiche du film (JPG/PNG)
  │    │    │    └── gallery/          <-- Placer ici 3 photos de tournage max
  │    │    ├── film-solidaire-2/
  │    │    ├── film-solidaire-3/
  │    │    └── film-archive/
  │    └── packs/
  │         ├── soutien-decouverte/    <-- Placer ici le visuel du pack
  │         ├── soutien-solidaire/
  │         ├── soutien-film/
  │         ├── soutien-avant-premiere/
  │         ├── soutien-partenaire/
  │         └── grand-mecene/
  │
  └── media-optimized/                 <-- Généré automatiquement par le script d'optimisation
```

---

## 2. Optimisation automatique en WebP

Nous utilisons la bibliothèque ultra-performante `sharp` en Node.js pour convertir, redimensionner et compresser les images au format moderne **WebP**.

### Dimensions et Qualités recommandées
* **Affiches de films (posters)** : `1200 x 1600` pixels (ratio aspect 3:4), qualité `82`.
* **Photos des coulisses (galeries)** : Largeur maximale de `1600` pixels (sans agrandissement si l'image est plus petite), qualité `80`.
* **Packs de soutien WooCommerce** : `1200 x 900` pixels (ratio aspect 4:3), qualité `82`.

### Génération automatique de Placeholders Cinématiques
Si un dossier de `media-source` est vide ou ne contient aucune image, le script de traitement génère automatiquement un **placeholder WebP vectoriel haute définition de style cinématique** (fond dégradé sombre, bordure fine dorée ou blanche, typographie d'affiche, logo symbolique de l'association, badge de déduction d'impôts, etc.).

### Commande d'optimisation
Pour lancer l'optimisation des images :
```bash
npm run media:optimize
```
*Le script traite l'ensemble des dossiers et enregistre les résultats prêts pour l'importation dans le dossier `media-optimized/`.*

---

## 3. Importation et Liaison Automatique dans WordPress

Un script PHP en ligne de commande charge l'environnement WordPress local, importe les visuels optimisés dans la médiathèque et réalise l'ensemble des liaisons en base de données de manière intelligente.

### Actions du Script d'Importation
1. **Évite les doublons** : Le script associe un tag meta unique `_ruunion_media_key` à chaque image de la médiathèque. S'il détecte que l'image a déjà été importée, il réutilise son ID existant sans créer de doublon.
2. **Alt Texts personnalisés** : Renseigne automatiquement les textes alternatifs (`alt_text`) pour une accessibilité et un SEO d'excellence (ex: *« Affiche du film Parce que c’est toi — RU Union »*).
3. **Liaisons CPT Films** :
   * Définit l'image comme Image mise en avant (`_thumbnail_id`) du film.
   * Met à jour le champ ACF personnalisé `affiche`.
4. **Liaisons Galeries** :
   * Associe les 3 photos de tournage au champ ACF `galerie`.
   * Stocke également les IDs et URLs dans les metas personnalisés `_ruunion_gallery_ids` et `_ruunion_gallery_urls` pour le headless.
5. **Liaisons Produits WooCommerce** :
   * Associe le visuel du pack correspondant comme image mise en avant du produit WooCommerce.
6. **SEO Yoast** :
   * Remplit les métadonnées SEO dans WordPress pour chaque film (`_yoast_wpseo_title`, `_yoast_wpseo_metadesc`, `_yoast_wpseo_focuskw`).

### Commande d'importation (CLI)
Exécutez la commande depuis votre invite de commandes (avec PHP installé dans votre PATH, ou via XAMPP) :

```bash
php wordpress/scripts/import-ruunion-media.php
```
Ou en spécifiant le chemin absolu de l'exécutable PHP de XAMPP :
```bash
C:\xampp\php\php.exe wordpress/scripts/import-ruunion-media.php
```

---

## 4. Intégration dans Next.js

Pour afficher ces visuels, le projet Next.js est configuré de la manière suivante :
* **next.config.js** : Autorise le chargement d'images provenant de `localhost` via les `remotePatterns` :
  ```javascript
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/ruunion/wp-content/uploads/**"
      }
    ]
  }
  ```
* **Intégration d'images Fallback** : Si le site WordPress local est éteint de manière temporaire ou que l'importation n'a pas encore été effectuée, Next.js bascule de manière invisible sur l'affichage des placeholders optimisés locaux situés dans `media-optimized/`, garantissant ainsi une interface toujours visuelle, fluide et soignée.
