<?php
/** Audit local en lecture seule, sans accès direct aux identifiants de base de données. */

$wp_load = 'C:/xampp/htdocs/ruunion/wp-load.php';
if ( ! file_exists( $wp_load ) ) {
	fwrite( STDERR, "WordPress local introuvable.\n" );
	exit( 1 );
}

require_once $wp_load;

$gateways = array();
if ( function_exists( 'WC' ) && WC()->payment_gateways() ) {
	foreach ( WC()->payment_gateways()->payment_gateways() as $gateway ) {
		$gateways[] = array(
			'id'      => $gateway->id,
			'enabled' => $gateway->enabled,
		);
	}
}

$result = array(
	'theme'      => wp_get_theme()->get( 'Name' ),
	'stylesheet' => get_option( 'stylesheet' ),
	'plugins'    => get_option( 'active_plugins', array() ),
	'permalink'  => get_option( 'permalink_structure' ),
	'pages'      => array(
		'shop'     => get_permalink( (int) get_option( 'woocommerce_shop_page_id' ) ),
		'cart'     => get_permalink( (int) get_option( 'woocommerce_cart_page_id' ) ),
		'checkout' => get_permalink( (int) get_option( 'woocommerce_checkout_page_id' ) ),
	),
	'gateways'   => $gateways,
);

echo wp_json_encode( $result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ) . PHP_EOL;
