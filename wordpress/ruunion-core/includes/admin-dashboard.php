<?php
/** Personnalisation légère du tableau de bord WordPress RU Union. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ruunion_dashboard_logo() {
	$logo_url = plugins_url( 'assets/images/logo-ruunion.svg', dirname( __DIR__ ) . '/ruunion-core.php' );
	printf( '<div class="ruunion-widget-brand"><img src="%s" alt="%s"></div>', esc_url( $logo_url ), esc_attr( 'RU Union — L’union des plus humains' ) );
}

function ruunion_count_films( $meta_key = '', $meta_value = '' ) {
	$args = array(
		'post_type'      => 'film',
		'post_status'    => 'publish',
		'posts_per_page' => 1,
		'fields'         => 'ids',
	);
	if ( $meta_key ) {
		$args['meta_key']   = $meta_key;
		$args['meta_value'] = $meta_value;
	}
	return ( new WP_Query( $args ) )->found_posts;
}

function ruunion_dashboard_overview() {
	$products = wp_count_posts( 'product' );
	ruunion_dashboard_logo();
	?>
	<div class="ruunion-dashboard-grid">
		<div class="ruunion-stat"><strong><?php echo esc_html( ruunion_count_films() ); ?></strong><span>Films</span></div>
		<div class="ruunion-stat"><strong><?php echo esc_html( ruunion_count_films( 'visible_public', '1' ) ); ?></strong><span>Films publics</span></div>
		<div class="ruunion-stat"><strong><?php echo esc_html( ruunion_count_films( 'mis_en_avant', '1' ) ); ?></strong><span>Mis en avant</span></div>
		<div class="ruunion-stat"><strong><?php echo esc_html( $products ? $products->publish : 0 ); ?></strong><span>Packs WooCommerce</span></div>
	</div>
	<p class="ruunion-widget-note">Une vue claire des contenus qui alimentent le front Next.js.</p>
	<?php
}

function ruunion_dashboard_collection() {
	$film_ids  = get_posts( array( 'post_type' => 'film', 'post_status' => 'publish', 'posts_per_page' => -1, 'fields' => 'ids' ) );
	$goal      = 0;
	$collected = 0;
	foreach ( $film_ids as $film_id ) {
		$goal      += (float) get_post_meta( $film_id, 'objectif_dons', true );
		$collected += (float) get_post_meta( $film_id, 'montant_collecte', true );
	}
	$progress = $goal > 0 ? min( 100, round( ( $collected / $goal ) * 100 ) ) : 0;
	ruunion_dashboard_logo();
	?>
	<div class="ruunion-collection-values">
		<div><span>Objectifs</span><strong><?php echo esc_html( number_format_i18n( $goal, 0 ) ); ?> €</strong></div>
		<div><span>Collecté</span><strong><?php echo esc_html( number_format_i18n( $collected, 0 ) ); ?> €</strong></div>
	</div>
	<div class="ruunion-progress"><span style="width: <?php echo esc_attr( $progress ); ?>%"></span></div>
	<p><strong><?php echo esc_html( $progress ); ?> %</strong> de progression globale</p>
	<p class="ruunion-actions"><a class="button button-primary" href="<?php echo esc_url( admin_url( 'edit.php?post_type=film' ) ); ?>">Voir les films</a><a class="button" href="<?php echo esc_url( admin_url( 'edit.php?post_type=product' ) ); ?>">Voir les produits</a></p>
	<?php
}

function ruunion_dashboard_seo() {
	$cms_pages = get_posts( array( 'post_type' => 'page', 'post_status' => 'publish', 'posts_per_page' => -1, 'meta_key' => '_ruunion_headless_page', 'meta_value' => '1' ) );
	$film_ids  = get_posts( array( 'post_type' => 'film', 'post_status' => 'publish', 'posts_per_page' => -1, 'fields' => 'ids' ) );
	$titles    = 0;
	$descs     = 0;
	foreach ( $film_ids as $film_id ) {
		$titles += get_post_meta( $film_id, 'seo_title_custom', true ) ? 1 : 0;
		$descs  += get_post_meta( $film_id, 'seo_description_custom', true ) ? 1 : 0;
	}
	ruunion_dashboard_logo();
	?>
	<ul class="ruunion-check-list">
		<li><strong><?php echo esc_html( count( $cms_pages ) ); ?></strong> pages CMS/headless</li>
		<li><strong><?php echo esc_html( $titles ); ?></strong> films avec titre SEO</li>
		<li><strong><?php echo esc_html( $descs ); ?></strong> films avec description SEO</li>
	</ul>
	<p class="ruunion-actions"><a class="button button-primary" href="<?php echo esc_url( admin_url( 'edit.php?post_type=page' ) ); ?>">Gérer les pages</a><a class="button" href="<?php echo esc_url( admin_url( 'admin.php?page=wpseo_dashboard' ) ); ?>">Ouvrir Yoast</a></p>
	<?php
}

function ruunion_dashboard_quick_links() {
	ruunion_dashboard_logo();
	$links = array(
		'Ajouter un film'      => admin_url( 'post-new.php?post_type=film' ),
		'Voir tous les films'  => admin_url( 'edit.php?post_type=film' ),
		'Ajouter un produit'   => admin_url( 'post-new.php?post_type=product' ),
		'Voir les produits'    => admin_url( 'edit.php?post_type=product' ),
		'Voir le site Next.js' => 'http://localhost:3000',
		'Administration WP'    => admin_url(),
	);
	echo '<div class="ruunion-quick-links">';
	foreach ( $links as $label => $url ) {
		printf( '<a href="%s">%s <span aria-hidden="true">→</span></a>', esc_url( $url ), esc_html( $label ) );
	}
	echo '</div>';
}

function ruunion_dashboard_editorial_message() {
	ruunion_dashboard_logo();
	echo '<blockquote class="ruunion-editorial-message">Chaque film porté par RU Union est une rencontre entre une histoire, une émotion et une action concrète. Le CMS permet de garder cette intention vivante : publier, soutenir, raconter et relier.</blockquote>';
}

function ruunion_register_dashboard_widgets() {
	wp_add_dashboard_widget( 'ruunion_overview', 'RU Union — Vue d’ensemble', 'ruunion_dashboard_overview' );
	wp_add_dashboard_widget( 'ruunion_collection', 'Collecte & soutien', 'ruunion_dashboard_collection' );
	wp_add_dashboard_widget( 'ruunion_seo', 'SEO & contenus', 'ruunion_dashboard_seo' );
	wp_add_dashboard_widget( 'ruunion_links', 'Liens rapides', 'ruunion_dashboard_quick_links' );
	wp_add_dashboard_widget( 'ruunion_message', 'L’intention RU Union', 'ruunion_dashboard_editorial_message' );
}
add_action( 'wp_dashboard_setup', 'ruunion_register_dashboard_widgets' );
