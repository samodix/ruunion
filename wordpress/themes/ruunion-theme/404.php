<?php get_header(); ?>
<section class="ru-section ru-error"><div class="ru-container"><span class="ru-eyebrow">404</span><h1><?php esc_html_e( 'Cette scène n’existe pas encore.', 'ruunion-theme' ); ?></h1><p><?php esc_html_e( 'Revenez à l’accueil pour retrouver les films et les projets RU Union.', 'ruunion-theme' ); ?></p><a class="ru-button" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Retour à l’accueil', 'ruunion-theme' ); ?></a></div></section>
<?php get_footer(); ?>
