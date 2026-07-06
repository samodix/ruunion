<?php get_header(); ?>
<section class="ru-page-hero"><div class="ru-container"><span class="ru-eyebrow">RU Union</span><h1><?php bloginfo( 'name' ); ?></h1></div></section>
<section class="ru-section"><div class="ru-container ru-prose">
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?><article <?php post_class(); ?>><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php the_excerpt(); ?></article><?php endwhile; else : ?><p><?php esc_html_e( 'Aucun contenu disponible.', 'ruunion-theme' ); ?></p><?php endif; ?>
</div></section>
<?php get_footer(); ?>
