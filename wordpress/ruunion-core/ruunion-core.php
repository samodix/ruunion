<?php
/**
 * Plugin Name: RU Union Core
 * Description: Modèle éditorial local de RU Union : films, champs ACF, REST et données de démonstration.
 * Version: 1.0.0
 * Author: RU Union
 * Requires at least: 6.8
 * Requires PHP: 8.1
 * Text Domain: ruunion-core
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once __DIR__ . '/includes/cms-pages.php';
require_once __DIR__ . '/includes/admin-dashboard.php';

function ruunion_register_film_post_type() {
	register_post_type(
		'film',
		array(
			'labels' => array(
				'name'          => 'Films',
				'singular_name' => 'Film',
				'add_new_item'  => 'Ajouter un film',
				'edit_item'     => 'Modifier le film',
			),
			'public'       => true,
			'show_ui'      => true,
			'show_in_rest' => true,
			'rest_base'    => 'films',
			'has_archive'  => true,
			'rewrite'      => array( 'slug' => 'films' ),
			'menu_icon'    => 'dashicons-video-alt3',
			'supports'     => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions' ),
		)
	);
}
add_action( 'init', 'ruunion_register_film_post_type' );

function ruunion_register_acf_film_fields() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key'          => 'group_ruunion_film',
			'title'        => 'Informations du film',
			'show_in_rest' => 1,
			'fields'       => array(
				array( 'key' => 'field_ru_synopsis_court', 'label' => 'Synopsis court', 'name' => 'synopsis_court', 'type' => 'textarea' ),
				array( 'key' => 'field_ru_synopsis_long', 'label' => 'Synopsis long', 'name' => 'synopsis_long', 'type' => 'wysiwyg' ),
				array( 'key' => 'field_ru_annee', 'label' => 'Année', 'name' => 'annee', 'type' => 'number' ),
				array(
					'key'     => 'field_ru_statut',
					'label'   => 'Statut',
					'name'    => 'statut',
					'type'    => 'select',
					'choices' => array(
						'en-production' => 'En production',
						'termine'       => 'Terminé',
						'en-diffusion'  => 'En diffusion',
						'archive'       => 'Archivé',
					),
				),
				array( 'key' => 'field_ru_affiche', 'label' => 'Affiche', 'name' => 'affiche', 'type' => 'image', 'return_format' => 'id' ),
				array( 'key' => 'field_ru_bande_annonce', 'label' => 'URL bande-annonce', 'name' => 'bande_annonce_url', 'type' => 'url' ),
				array( 'key' => 'field_ru_galerie', 'label' => 'Galerie (une URL par ligne)', 'name' => 'galerie', 'type' => 'textarea', 'instructions' => 'ACF gratuit : saisir une URL locale par ligne.' ),
				array( 'key' => 'field_ru_objectif_dons', 'label' => 'Objectif de dons', 'name' => 'objectif_dons', 'type' => 'number' ),
				array( 'key' => 'field_ru_montant_collecte', 'label' => 'Montant collecté', 'name' => 'montant_collecte', 'type' => 'number' ),
				array( 'key' => 'field_ru_mis_en_avant', 'label' => 'Film mis en avant', 'name' => 'mis_en_avant', 'type' => 'true_false' ),
				array( 'key' => 'field_ru_priorite', 'label' => 'Priorité d’affichage', 'name' => 'priorite_affichage', 'type' => 'number' ),
				array( 'key' => 'field_ru_visible_public', 'label' => 'Visible sur le site public', 'name' => 'visible_public', 'type' => 'true_false' ),
				array( 'key' => 'field_ru_visible_accueil', 'label' => 'Visible sur l’accueil', 'name' => 'visible_accueil', 'type' => 'true_false' ),
				array( 'key' => 'field_ru_pack', 'label' => 'Pack WooCommerce lié', 'name' => 'pack_woocommerce_lie', 'type' => 'post_object', 'post_type' => array( 'product' ), 'return_format' => 'id' ),
				array( 'key' => 'field_ru_seo_title', 'label' => 'SEO title custom', 'name' => 'seo_title_custom', 'type' => 'text' ),
				array( 'key' => 'field_ru_seo_description', 'label' => 'SEO description custom', 'name' => 'seo_description_custom', 'type' => 'textarea' ),
			),
			'location' => array(
				array(
					array( 'param' => 'post_type', 'operator' => '==', 'value' => 'film' ),
				),
			),
		)
	);
}
add_action( 'acf/init', 'ruunion_register_acf_film_fields' );

function ruunion_rest_value( $value, $post, $field_name ) {
	if ( in_array( $field_name, array( 'annee', 'objectif_dons', 'montant_collecte', 'priorite_affichage', 'affiche', 'pack_woocommerce_lie' ), true ) ) {
		return '' === $value ? null : (int) $value;
	}
	if ( in_array( $field_name, array( 'mis_en_avant', 'visible_public', 'visible_accueil' ), true ) ) {
		return (bool) $value;
	}
	return $value;
}

function ruunion_register_film_rest_fields() {
	$fields = array(
		'synopsis_court', 'synopsis_long', 'annee', 'statut', 'affiche',
		'bande_annonce_url', 'galerie', 'objectif_dons', 'montant_collecte',
		'mis_en_avant', 'priorite_affichage', 'visible_public', 'visible_accueil',
		'pack_woocommerce_lie', 'seo_title_custom', 'seo_description_custom',
	);

	foreach ( $fields as $field_name ) {
		register_rest_field(
			'film',
			$field_name,
			array(
				'get_callback' => function ( $object ) use ( $field_name ) {
					return ruunion_rest_value( get_post_meta( $object['id'], $field_name, true ), $object, $field_name );
				},
			)
		);
	}
}
add_action( 'rest_api_init', 'ruunion_register_film_rest_fields' );

function ruunion_seed_films() {
	if ( get_option( 'ruunion_films_seeded' ) ) {
		return;
	}

	$films = array(
		array( 'title' => 'Parce que c’est toi', 'slug' => 'parce-que-cest-toi', 'status' => 'en-diffusion', 'featured' => 1, 'priority' => 1, 'public' => 1, 'home' => 1, 'goal' => 50000, 'raised' => 8000, 'year' => 2026, 'short' => 'Un film sensible sur les liens qui nous transforment.', 'long' => 'Parce que c’est toi explore la force des rencontres et la manière dont elles déplacent nos regards.' ),
		array( 'title' => 'Film solidaire 2', 'slug' => 'film-solidaire-2', 'status' => 'en-production', 'featured' => 1, 'priority' => 2, 'public' => 1, 'home' => 1, 'goal' => 30000, 'raised' => 4500, 'year' => 2026, 'short' => 'Une création collective actuellement en production.', 'long' => 'Ce projet réunit artistes, associations et habitants autour d’un récit commun.' ),
		array( 'title' => 'Film solidaire 3', 'slug' => 'film-solidaire-3', 'status' => 'termine', 'featured' => 1, 'priority' => 3, 'public' => 1, 'home' => 0, 'goal' => 20000, 'raised' => 12000, 'year' => 2025, 'short' => 'Un film terminé, prêt à rencontrer ses publics.', 'long' => 'Ce film prolonge l’engagement de RU Union avec des projections et des échanges de terrain.' ),
		array( 'title' => 'Film archive', 'slug' => 'film-archive', 'status' => 'archive', 'featured' => 0, 'priority' => 99, 'public' => 0, 'home' => 0, 'goal' => 10000, 'raised' => 10000, 'year' => 2024, 'short' => 'Un projet conservé dans les archives RU Union.', 'long' => 'Cette fiche démontre la gestion d’un film archivé et masqué du front public.' ),
	);

	foreach ( $films as $film ) {
		$existing = get_page_by_path( $film['slug'], OBJECT, 'film' );
		$post_id  = $existing ? $existing->ID : wp_insert_post(
			array(
				'post_type'    => 'film',
				'post_status'  => 'publish',
				'post_title'   => $film['title'],
				'post_name'    => $film['slug'],
				'post_excerpt' => $film['short'],
				'post_content' => $film['long'],
			)
		);

		if ( ! $post_id || is_wp_error( $post_id ) ) {
			continue;
		}

		$meta = array(
			'synopsis_court'        => $film['short'],
			'synopsis_long'         => $film['long'],
			'annee'                 => $film['year'],
			'statut'                => $film['status'],
			'objectif_dons'         => $film['goal'],
			'montant_collecte'      => $film['raised'],
			'mis_en_avant'          => $film['featured'],
			'priorite_affichage'    => $film['priority'],
			'visible_public'        => $film['public'],
			'visible_accueil'       => $film['home'],
			'seo_title_custom'      => $film['title'] . ' — RU Union',
			'seo_description_custom'=> $film['short'],
		);
		foreach ( $meta as $key => $value ) {
			update_post_meta( $post_id, $key, $value );
		}
	}

	update_option( 'ruunion_films_seeded', gmdate( 'c' ) );
}
add_action( 'init', 'ruunion_seed_films', 20 );

function ruunion_seed_woocommerce_products() {
	if ( get_option( 'ruunion_products_seeded' ) || ! class_exists( 'WooCommerce' ) || ! class_exists( 'WC_Product_Simple' ) ) {
		return;
	}

	$packs = array(
		array( 'name' => 'Soutien Découverte', 'slug' => 'soutien-decouverte', 'price' => 29, 'category' => 'Soutien' ),
		array( 'name' => 'Soutien Solidaire', 'slug' => 'soutien-solidaire', 'price' => 49, 'category' => 'Soutien' ),
		array( 'name' => 'Soutien Film', 'slug' => 'soutien-film', 'price' => 199, 'category' => 'Film' ),
		array( 'name' => 'Soutien Avant-première', 'slug' => 'soutien-avant-premiere', 'price' => 400, 'category' => 'Billetterie' ),
		array( 'name' => 'Soutien Partenaire', 'slug' => 'soutien-partenaire', 'price' => 600, 'category' => 'Mécénat' ),
		array( 'name' => 'Grand Mécène', 'slug' => 'grand-mecene', 'price' => 3000, 'category' => 'Mécénat' ),
	);

	foreach ( array( 'Soutien', 'Film', 'Mécénat', 'Billetterie' ) as $category ) {
		if ( ! term_exists( $category, 'product_cat' ) ) {
			wp_insert_term( $category, 'product_cat' );
		}
	}

	foreach ( $packs as $pack ) {
		$product_id = wc_get_product_id_by_sku( 'RU-' . strtoupper( str_replace( '-', '_', $pack['slug'] ) ) );
		if ( ! $product_id ) {
			$product = new WC_Product_Simple();
			$product->set_name( $pack['name'] );
			$product->set_slug( $pack['slug'] );
			$product->set_status( 'publish' );
			$product->set_catalog_visibility( 'visible' );
			$product->set_regular_price( (string) $pack['price'] );
			$product->set_price( (string) $pack['price'] );
			$product->set_sku( 'RU-' . strtoupper( str_replace( '-', '_', $pack['slug'] ) ) );
			$product->set_description( 'Pack de démonstration local RU Union. Aucun paiement réel n’est actif.' );
			$product_id = $product->save();
		}
		if ( $product_id ) {
			wp_set_object_terms( $product_id, $pack['category'], 'product_cat' );
		}
	}

	update_option( 'woocommerce_currency', 'EUR' );
	update_option( 'woocommerce_default_country', 'FR' );
	update_option( 'ruunion_products_seeded', gmdate( 'c' ) );
}
add_action( 'init', 'ruunion_seed_woocommerce_products', 40 );

function ruunion_activate_core() {
	ruunion_register_film_post_type();
	update_option( 'blogname', 'RU Union' );
	update_option( 'blogdescription', 'L’union des plus humains' );
	update_option( 'admin_email', 'contact@ruunion.com' );
	update_option( 'permalink_structure', '/%postname%/' );
	flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'ruunion_activate_core' );
