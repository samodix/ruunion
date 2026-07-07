<?php get_header(); ?>
<?php while ( have_posts() ) : the_post();
	$slug     = get_post_field( 'post_name', get_the_ID() );
	$is_legal = in_array( $slug, array( 'mentions-legales', 'politique-confidentialite', 'privacy-policy', 'cgu', 'cookies' ), true );
	$is_wc    = function_exists( 'is_cart' ) && ( is_cart() || is_checkout() || is_account_page() );
?>
<section class="ru-page-hero<?php echo $is_legal ? ' ru-page-hero--legal' : ''; ?>">
	<div class="ru-container ru-page-hero__split">
		<div>
			<span class="ru-pill"><?php echo esc_html( $is_legal ? __( 'Cadre clair · Confiance', 'ruunion-theme' ) : __( 'RU Union', 'ruunion-theme' ) ); ?></span>
			<h1><?php the_title(); ?></h1>
			<p><?php echo esc_html( $is_legal ? __( 'Des informations structurées, lisibles et accessibles pour comprendre nos engagements.', 'ruunion-theme' ) : __( 'Un espace éditorial construit autour de la clarté, de la proximité et de l’élan collectif.', 'ruunion-theme' ) ); ?></p>
		</div>
		<figure class="ru-page-hero__image"><img src="<?php echo esc_url( ruunion_theme_asset_image( 'stock/cinematic-reference.jpg' ) ); ?>" alt="" loading="eager"></figure>
	</div>
</section>
<section class="ru-section">
	<div class="ru-container <?php echo esc_attr( $is_legal ? 'ru-legal-layout' : ( $is_wc ? 'ru-woocommerce' : 'ru-prose' ) ); ?>">
		<?php if ( $is_legal ) : ?>
			<aside class="ru-legal-summary"><span class="ru-eyebrow"><?php esc_html_e( 'Sommaire', 'ruunion-theme' ); ?></span><a href="#contenu-legal"><?php esc_html_e( 'Informations principales', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( ruunion_theme_page_url( 'contact' ) ); ?>"><?php esc_html_e( 'Nous contacter', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Retour accueil', 'ruunion-theme' ); ?></a></aside>
		<?php endif; ?>
		<article id="contenu-legal" <?php post_class( $is_legal ? 'ru-legal-card' : '' ); ?>><?php the_content(); ?></article>
	</div>
</section>
<?php endwhile; ?>
<?php get_footer(); ?>
