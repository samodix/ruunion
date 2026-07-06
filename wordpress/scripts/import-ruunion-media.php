<?php
/**
 * Script d'importation automatique des médias et configuration SEO pour RU Union.
 * 
 * Ce script charge l'environnement WordPress local, importe les images WebP optimisées,
 * configure les affiches, galeries, images de produits WooCommerce, et enrichit le SEO Yoast.
 */

// Permettre l'exécution en CLI uniquement
if (php_sapi_name() !== 'cli') {
    die("Ce script doit être exécuté en ligne de commande (CLI).\n");
}

echo "=== DEBUT DE L'IMPORTATION DES MEDIAS ET DU SEO RU UNION ===\n";

// 1. Recherche et chargement de wp-load.php
$wp_load_paths = [
    'C:/xampp/htdocs/ruunion/wp-load.php',
    dirname(__DIR__, 4) . '/ruunion/wp-load.php', // Par rapport à l'arborescence standard XAMPP si le projet est dans htdocs
    dirname(__DIR__, 2) . '/wp-load.php',
];

$wp_loaded = false;
foreach ($wp_load_paths as $path) {
    if (file_exists($path)) {
        require_once $path;
        $wp_loaded = true;
        echo "[WP] Environnement WordPress chargé avec succès depuis : $path\n";
        break;
    }
}

if (!$wp_loaded) {
    echo "[AVERTISSEMENT] Impossible de localiser wp-load.php.\n";
    echo "Le script fonctionnera en mode simulation ou s'arrêtera si nécessaire.\n";
    echo "Assurez-vous que XAMPP est lancé et que WordPress est installé dans C:/xampp/htdocs/ruunion/.\n";
    // Pour ne pas bloquer les linter ou builds d'intégration continue, nous allons simuler ou sortir proprement.
}

// 2. Détermination des dossiers de médias
$project_root = dirname(__DIR__, 2);
$media_optimized_dir = $project_root . '/media-optimized';

if (!is_dir($media_optimized_dir)) {
    die("[ERREUR] Le dossier des médias optimisés n'existe pas : $media_optimized_dir\nVeuillez exécuter 'npm run media:optimize' d'abord.\n");
}

echo "[MEDIA] Dossier des médias optimisés détecté : $media_optimized_dir\n";

// Liste des films et de leur configuration de mapping SEO
$films_seo = [
    'parce-que-cest-toi' => [
        'title' => "Parce que c’est toi — Film solidaire RU Union",
        'desc' => "Découvrez Parce que c’est toi, un film porté par RU Union pour raconter une histoire humaine, soutenir un projet solidaire et créer du lien.",
        'focus' => "film solidaire RU Union"
    ],
    'film-solidaire-2' => [
        'title' => "Film solidaire 2 — Production RU Union",
        'desc' => "Suivez Film solidaire 2, une production RU Union en développement autour d’une histoire humaine et d’un engagement collectif.",
        'focus' => "production solidaire"
    ],
    'film-solidaire-3' => [
        'title' => "Film solidaire 3 — Cinéma et engagement humain",
        'desc' => "Film solidaire 3 illustre la volonté de RU Union de transmettre des récits sensibles, utiles et porteurs d’action.",
        'focus' => "cinéma solidaire"
    ],
    'film-archive' => [
        'title' => "Film archive — Mémoire des projets RU Union",
        'desc' => "Retrouvez un ancien projet RU Union et son rôle dans l’histoire des films solidaires portés par l’association.",
        'focus' => "projets RU Union"
    ],
];

// Liste des packs WooCommerce à mapper
$packs_mapping = [
    'soutien-decouverte' => 'Soutien Découverte',
    'soutien-solidaire' => 'Soutien Solidaire',
    'soutien-film' => 'Soutien Film',
    'soutien-avant-premiere' => 'Soutien Avant-première',
    'soutien-partenaire' => 'Soutien Partenaire',
    'grand-mecene' => 'Grand Mécène',
];

if ($wp_loaded) {
    // Inclure les fichiers nécessaires pour l'import de médias dans WordPress
    require_once ABSPATH . 'wp-admin/includes/image.php';
    require_once ABSPATH . 'wp-admin/includes/file.php';
    require_once ABSPATH . 'wp-admin/includes/media.php';

    /**
     * Importe un fichier image dans la médiathèque de WordPress s'il n'existe pas déjà.
     * Utilise _ruunion_media_key pour éviter les doublons.
     */
    function ruunion_import_media($file_path, $title, $alt_text, $media_key) {
        if (!file_exists($file_path)) {
            echo "  [MEDIA-IMPORT] Fichier introuvable : $file_path\n";
            return null;
        }

        // Vérification des doublons
        $existing = get_posts([
            'post_type' => 'attachment',
            'meta_key' => '_ruunion_media_key',
            'meta_value' => $media_key,
            'posts_per_page' => 1,
        ]);

        if (!empty($existing)) {
            echo "  [MEDIA-IMPORT] Image déjà importée (ID: " . $existing[0]->ID . ") pour la clé: $media_key\n";
            return $existing[0]->ID;
        }

        // Préparation du fichier pour l'import
        $file = array(
            'name'     => basename($file_path),
            'tmp_name' => $file_path,
        );

        // Copie temporaire car wp_handle_sideload déplace le fichier source
        $temp_file = wp_tempnam($file_path);
        copy($file_path, $temp_file);
        
        $file_array = array(
            'name'     => basename($file_path),
            'tmp_name' => $temp_file,
        );

        // Importation dans WordPress
        $id = media_handle_sideload($file_array, 0, $title);

        if (is_wp_error($id)) {
            echo "  [ERREUR] Échec de l'import de $file_path : " . $id->get_error_message() . "\n";
            @unlink($temp_file);
            return null;
        }

        // Configuration des métadonnées et de la clé unique
        update_post_meta($id, '_ruunion_media_key', $media_key);
        update_post_meta($id, '_wp_attachment_image_alt', $alt_text);

        echo "  [MEDIA-IMPORT] Image importée avec succès ! ID: $id (Titre: $title)\n";
        return $id;
    }

    // --- IMPORTATION ET LIENS POUR LES FILMS ---
    foreach ($films_seo as $slug => $seo) {
        echo "\n[FILM] Traitement du film : $slug...\n";
        
        // Recherche du post du film par son slug
        $posts = get_posts([
            'post_type' => 'films',
            'name' => $slug,
            'posts_per_page' => 1,
            'post_status' => 'any'
        ]);

        if (empty($posts)) {
            echo "  [FILM] Aucun post 'films' trouvé avec le slug : $slug. Veuillez le créer dans l'admin WordPress.\n";
            continue;
        }

        $film_post = $posts[0];
        $film_id = $film_post->ID;
        $film_title = $film_post->post_title;

        // 1. Importation et liaison de l'affiche (poster)
        $poster_path = "$media_optimized_dir/films/$slug/poster.webp";
        $poster_key = "film_{$slug}_poster";
        $poster_title = "Affiche du film $film_title";
        $poster_alt = "Affiche du film $film_title — RU Union";

        $poster_id = ruunion_import_media($poster_path, $poster_title, $poster_alt, $poster_key);

        if ($poster_id) {
            // Définir comme image mise en avant principale de WordPress
            set_post_thumbnail($film_id, $poster_id);
            // Mettre à jour le champ ACF 'affiche' (ID de média ou URL selon la configuration ACF)
            update_field('affiche', $poster_id, $film_id);
            // Fallback meta au cas où ACF n'est pas actif
            update_post_meta($film_id, '_ruunion_poster_id', $poster_id);
            echo "  [FILM] Affiche liée au film : $film_title (ID: $poster_id)\n";
        }

        // 2. Importation et liaison de la galerie (3 photos de tournage)
        $gallery_ids = [];
        $gallery_urls = [];
        for ($i = 1; $i <= 3; $i++) {
            $gallery_path = "$media_optimized_dir/films/$slug/gallery-{$i}.webp";
            $gallery_key = "film_{$slug}_gallery_{$i}";
            $gallery_title = "Photo de tournage $film_title — image $i";
            $gallery_alt = "Photo de tournage $film_title — RU Union — image $i";

            $img_id = ruunion_import_media($gallery_path, $gallery_title, $gallery_alt, $gallery_key);
            if ($img_id) {
                $gallery_ids[] = $img_id;
                $gallery_urls[] = wp_get_attachment_url($img_id);
            }
        }

        if (!empty($gallery_ids)) {
            // Mettre à jour le champ ACF 'galerie'
            update_field('galerie', $gallery_ids, $film_id);
            // Mettre à jour les meta customs pour le headless Next.js
            update_post_meta($film_id, '_ruunion_gallery_ids', $gallery_ids);
            update_post_meta($film_id, '_ruunion_gallery_urls', $gallery_urls);
            echo "  [FILM] Galerie liée au film (" . count($gallery_ids) . " images) : $film_title\n";
        }

        // 3. Configuration du SEO Yoast pour le film
        update_post_meta($film_id, '_yoast_wpseo_title', $seo['title']);
        update_post_meta($film_id, '_yoast_wpseo_metadesc', $seo['desc']);
        update_post_meta($film_id, '_yoast_wpseo_focuskw', $seo['focus']);
        
        // Également sur les champs ACF personnalisés si définis
        update_field('seo_title_custom', $seo['title'], $film_id);
        update_field('seo_description_custom', $seo['desc'], $film_id);

        echo "  [SEO] Métadonnées Yoast SEO appliquées avec succès pour : $film_title\n";
    }

    // --- IMPORTATION ET LIENS POUR LES PACKS WOOCOMMERCE ---
    echo "\n[WOOCOMMERCE] Liaison des visuels aux produits...\n";
    foreach ($packs_mapping as $slug => $title) {
        // Recherche du produit par son slug
        $products = get_posts([
            'post_type' => 'product',
            'name' => $slug,
            'posts_per_page' => 1,
            'post_status' => 'any'
        ]);

        if (empty($products)) {
            // Recherche alternative par titre
            $products = get_posts([
                'post_type' => 'product',
                'title' => $title,
                'posts_per_page' => 1,
                'post_status' => 'any'
            ]);
        }

        if (empty($products)) {
            echo "  [WOOCOMMERCE] Produit introuvable : '$title' ($slug). Créez-le dans WooCommerce.\n";
            continue;
        }

        $product_post = $products[0];
        $product_id = $product_post->ID;
        $product_title = $product_post->post_title;

        $pack_path = "$media_optimized_dir/packs/$slug.webp";
        $pack_key = "product_{$slug}_image";
        $pack_title = "Pack $product_title";
        $pack_alt = "Pack $product_title — RU Union";

        $img_id = ruunion_import_media($pack_path, $pack_title, $pack_alt, $pack_key);

        if ($img_id) {
            // Définir l'image principale du produit WooCommerce
            set_post_thumbnail($product_id, $img_id);
            echo "  [WOOCOMMERCE] Image liée au produit : $product_title (ID: $img_id)\n";
        }
    }

    echo "\n=== IMPORTATION ET CONFIGURATION TERMINEES AVEC SUCCES EN BASE WORDPRESS ===\n";

} else {
    // Mode simulation de réussite pour l'environnement d'intégration
    echo "\n[SIMULATION] Le script s'exécute en dehors de WordPress (CLI locale).\n";
    echo "Une fois sous XAMPP, lancez la commande suivante pour importer réellement :\n";
    echo "php wordpress/scripts/import-ruunion-media.php\n";
}
