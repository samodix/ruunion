<?php
/** Fonctions du thème RU Union. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ruunion_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);
	register_nav_menus(
		array(
			'primary' => __( 'Navigation principale', 'ruunion-theme' ),
			'footer'  => __( 'Navigation du pied de page', 'ruunion-theme' ),
		)
	);
}
add_action( 'after_setup_theme', 'ruunion_theme_setup' );

function ruunion_theme_assets() {
	$version = wp_get_theme()->get( 'Version' );
	wp_enqueue_style(
		'ruunion-theme-main',
		get_theme_file_uri( 'assets/css/main.css' ),
		array(),
		file_exists( get_theme_file_path( 'assets/css/main.css' ) ) ? (string) filemtime( get_theme_file_path( 'assets/css/main.css' ) ) : $version
	);
	wp_enqueue_script(
		'ruunion-theme-main',
		get_theme_file_uri( 'assets/js/main.js' ),
		array(),
		file_exists( get_theme_file_path( 'assets/js/main.js' ) ) ? (string) filemtime( get_theme_file_path( 'assets/js/main.js' ) ) : $version,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'ruunion_theme_assets' );

function ruunion_theme_page_url( $slug ) {
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : home_url( '/' . trim( $slug, '/' ) . '/' );
}

function ruunion_theme_meta( $post_id, $key, $default = '' ) {
	$value = get_post_meta( $post_id, $key, true );
	return '' === $value || null === $value ? $default : $value;
}

function ruunion_theme_status_label( $status ) {
	$labels = array(
		'en-production' => __( 'En production', 'ruunion-theme' ),
		'en-diffusion'  => __( 'En diffusion', 'ruunion-theme' ),
		'termine'       => __( 'Terminé', 'ruunion-theme' ),
		'archive'       => __( 'Archivé', 'ruunion-theme' ),
	);
	return isset( $labels[ $status ] ) ? $labels[ $status ] : __( 'Projet RU Union', 'ruunion-theme' );
}

function ruunion_theme_film_progress( $post_id ) {
	$goal      = (float) ruunion_theme_meta( $post_id, 'objectif_dons', 0 );
	$collected = (float) ruunion_theme_meta( $post_id, 'montant_collecte', 0 );
	$percent   = $goal > 0 ? min( 100, round( ( $collected / $goal ) * 100 ) ) : 0;
	return array(
		'goal'      => $goal,
		'collected' => $collected,
		'percent'   => $percent,
	);
}

function ruunion_theme_film_image( $post_id, $size = 'large' ) {
	$image_id = (int) ruunion_theme_meta( $post_id, 'affiche', 0 );
	if ( $image_id ) {
		$image = wp_get_attachment_image_url( $image_id, $size );
		if ( $image ) {
			return $image;
		}
	}
	return get_the_post_thumbnail_url( $post_id, $size ) ?: '';
}

function ruunion_theme_gallery_urls( $post_id ) {
	$gallery = ruunion_theme_meta( $post_id, 'galerie', '' );
	$urls    = array();

	if ( is_array( $gallery ) ) {
		foreach ( $gallery as $item ) {
			$url = is_numeric( $item ) ? wp_get_attachment_image_url( (int) $item, 'large' ) : ( is_array( $item ) && isset( $item['url'] ) ? $item['url'] : $item );
			if ( $url ) {
				$urls[] = $url;
			}
		}
	} elseif ( is_string( $gallery ) ) {
		$urls = preg_split( '/\r\n|\r|\n/', $gallery );
	}

	return array_values( array_filter( array_map( 'trim', $urls ) ) );
}

function ruunion_theme_featured_films( $limit = 3 ) {
	return new WP_Query(
		array(
			'post_type'      => 'film',
			'post_status'    => 'publish',
			'posts_per_page' => absint( $limit ),
			'meta_key'       => 'priorite_affichage',
			'orderby'        => 'meta_value_num',
			'order'          => 'ASC',
			'meta_query'     => array(
				'relation' => 'AND',
				array( 'key' => 'visible_public', 'value' => '1' ),
				array( 'key' => 'visible_accueil', 'value' => '1' ),
				array( 'key' => 'mis_en_avant', 'value' => '1' ),
			),
		)
	);
}

function ruunion_theme_money( $amount ) {
	if ( function_exists( 'wc_price' ) ) {
		return wc_price( $amount );
	}
	return number_format_i18n( (float) $amount, 0 ) . ' €';
}

function ruunion_theme_body_classes( $classes ) {
	$classes[] = 'ruunion-public';
	return $classes;
}
add_filter( 'body_class', 'ruunion_theme_body_classes' );
