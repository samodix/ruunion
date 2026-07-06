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
		<a class="ru-brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'RU Union — Accueil', 'ruunion-theme' ); ?>">
			<span class="ru-brand__mark" aria-hidden="true">RU</span>
			<span class="ru-brand__text"><strong>RU Union</strong><small>L’union des plus humains</small></span>
		</a>
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
		<a class="ru-button ru-button--small" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>"><?php esc_html_e( 'Soutenir', 'ruunion-theme' ); ?></a>
	</div>
</header>
<main id="main-content">
