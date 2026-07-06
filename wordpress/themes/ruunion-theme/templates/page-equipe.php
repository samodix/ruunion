<?php
/**
 * Template Name: Équipe RU Union
 */
get_header();
?>
<?php while ( have_posts() ) : the_post(); ?><section class="ru-page-hero"><div class="ru-container"><span class="ru-eyebrow">Les visages du projet</span><h1>Une équipe reliée par la même intention</h1><p>Écriture, production, accompagnement et partenariats : RU Union avance grâce à des sensibilités complémentaires.</p></div></section><section class="ru-section"><div class="ru-container ru-prose"><article <?php post_class(); ?>><?php the_content(); ?></article></div></section><?php endwhile; ?>
<?php get_footer(); ?>
