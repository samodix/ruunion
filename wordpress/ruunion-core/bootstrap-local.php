<?php
/** Bootstrap local RU Union. À exécuter uniquement avec PHP CLI. */

if ( PHP_SAPI !== 'cli' ) {
	http_response_code( 403 );
	exit( 'CLI only.' );
}

require dirname( __DIR__, 3 ) . '/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';

$plugins = array(
	'woocommerce/woocommerce.php',
	'advanced-custom-fields/acf.php',
	'wordpress-seo/wp-seo.php',
	'ruunion-core/ruunion-core.php',
);

foreach ( $plugins as $plugin ) {
	$result = activate_plugin( $plugin );
	if ( is_wp_error( $result ) ) {
		fwrite( STDERR, $plugin . ': ' . $result->get_error_message() . PHP_EOL );
		exit( 1 );
	}
	echo $plugin . ': actif' . PHP_EOL;
}

$yoast_titles                      = get_option( 'wpseo_titles', array() );
$yoast_titles['company_or_person'] = 'company';
$yoast_titles['company_name']      = 'RU Union';
$yoast_titles['website_name']      = 'RU Union';
update_option( 'wpseo_titles', $yoast_titles );

foreach ( array( 'bacs', 'cheque', 'cod', 'paypal' ) as $gateway ) {
	$settings            = get_option( 'woocommerce_' . $gateway . '_settings', array() );
	$settings['enabled'] = 'no';
	update_option( 'woocommerce_' . $gateway . '_settings', $settings );
}

if ( function_exists( 'ruunion_register_film_post_type' ) ) {
	ruunion_register_film_post_type();
	ruunion_seed_films();
	ruunion_seed_woocommerce_products();
	flush_rewrite_rules();
}

echo 'Bootstrap local terminé.' . PHP_EOL;
