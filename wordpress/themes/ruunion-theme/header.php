<?php
/** En-tête public RU Union. */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="ru-skip-link" href="#main-content"><?php esc_html_e( 'Aller au contenu', 'ruunion-theme' ); ?></a>
<header class="ru-header">
	<div class="ru-container ru-header__inner">
		<?php if ( has_custom_logo() ) {
			the_custom_logo();
		} else { ?>
			<a class="site-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'Accueil RU Union', 'ruunion-theme' ); ?>">
				<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo-ruunion.webp' ); ?>" alt="<?php echo esc_attr( 'RU Union — L’union des plus humains', 'ruunion-theme' ); ?>" width="440" height="240">
			</a>
		<?php } ?>
		<button class="ru-menu-toggle" type="button" aria-expanded="false" aria-controls="ru-primary-nav"><span></span><span></span><span></span><span class="screen-reader-text"><?php esc_html_e( 'Ouvrir le menu', 'ruunion-theme' ); ?></span></button>
		<nav id="ru-primary-nav" class="ru-nav" aria-label="<?php esc_attr_e( 'Navigation principale', 'ruunion-theme' ); ?>">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'menu_class' => 'ru-nav__list', 'fallback_cb' => false ) );
			} else {
				$links = array(
					__( 'Association', 'ruunion-theme' ) => ruunion_theme_page_url( 'association' ),
					__( 'Équipe', 'ruunion-theme' )      => ruunion_theme_page_url( 'equipe' ),
					__( 'Films', 'ruunion-theme' )       => get_post_type_archive_link( 'film' ) ?: ruunion_theme_page_url( 'films' ),
					__( 'Boutique', 'ruunion-theme' )    => function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ),
					__( 'Contact', 'ruunion-theme' )     => ruunion_theme_page_url( 'contact' ),
				);
				echo '<ul class="ru-nav__list">';
				foreach ( $links as $label => $url ) {
					printf( '<li><a href="%s">%s</a></li>', esc_url( $url ), esc_html( $label ) );
				}
				echo '</ul>';
			}
			?>
		</nav>
		<div class="ru-header__actions">
			<a class="ru-button ru-button--small ru-button--secondary" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>"><?php esc_html_e( 'Soutenir', 'ruunion-theme' ); ?></a>
			<?php if ( function_exists( 'WC' ) ) : ?>
				<button class="ru-cart-button" type="button" data-ru-cart-open aria-controls="ru-mini-cart" aria-expanded="false">
					<span><?php esc_html_e( 'Panier', 'ruunion-theme' ); ?></span>
					<b data-ru-cart-count><?php echo esc_html( ruunion_theme_cart_count() ); ?></b>
				</button>
			<?php endif; ?>
		</div>
	</div>
</header>
<?php if ( function_exists( 'WC' ) ) : ?>
<div class="ru-cart-overlay" data-ru-cart-close hidden></div>
<aside id="ru-mini-cart" class="ru-mini-cart" aria-hidden="true" aria-labelledby="ru-mini-cart-title">
	<div class="ru-mini-cart__panel">
		<header class="ru-mini-cart__header">
			<div>
				<span class="ru-eyebrow"><?php esc_html_e( 'Boutique solidaire', 'ruunion-theme' ); ?></span>
				<h2 id="ru-mini-cart-title"><?php esc_html_e( 'Votre panier', 'ruunion-theme' ); ?></h2>
			</div>
			<button type="button" class="ru-mini-cart__close" data-ru-cart-close aria-label="<?php esc_attr_e( 'Fermer le panier', 'ruunion-theme' ); ?>">×</button>
		</header>
		<div class="ru-mini-cart__content" data-ru-cart-content>
			<?php echo wp_kses_post( ruunion_theme_mini_cart_markup() ); ?>
		</div>
	</div>
</aside>
<?php endif; ?>
<main id="main-content">
