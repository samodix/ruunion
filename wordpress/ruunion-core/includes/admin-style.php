<?php
/** Chargement des styles visuels RU Union dans l’administration et la connexion. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ruunion_asset_version( $relative_path ) {
	$path = dirname( __DIR__ ) . '/' . ltrim( $relative_path, '/' );
	return file_exists( $path ) ? (string) filemtime( $path ) : '1.1.0';
}

function ruunion_enqueue_admin_style() {
	wp_enqueue_style(
		'ruunion-admin',
		plugins_url( 'assets/admin.css', dirname( __DIR__ ) . '/ruunion-core.php' ),
		array(),
		ruunion_asset_version( 'assets/admin.css' )
	);
}
add_action( 'admin_enqueue_scripts', 'ruunion_enqueue_admin_style' );

function ruunion_enqueue_login_style() {
	wp_enqueue_style(
		'ruunion-login',
		plugins_url( 'assets/login.css', dirname( __DIR__ ) . '/ruunion-core.php' ),
		array(),
		ruunion_asset_version( 'assets/login.css' )
	);
}
add_action( 'login_enqueue_scripts', 'ruunion_enqueue_login_style' );

function ruunion_login_header_url() {
	return home_url( '/' );
}
add_filter( 'login_headerurl', 'ruunion_login_header_url' );

function ruunion_login_header_text() {
	return 'RU Union — L’union des plus humains';
}
add_filter( 'login_headertext', 'ruunion_login_header_text' );

function ruunion_login_brand_message( $message ) {
	$brand = '<div class="ruunion-login-brand"><strong>RU Union</strong><span>L’union des plus humains</span></div>';
	return $brand . $message;
}
add_filter( 'login_message', 'ruunion_login_brand_message' );
