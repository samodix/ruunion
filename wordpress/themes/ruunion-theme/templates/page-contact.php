<?php
/**
 * Template Name: Contact RU Union
 */
get_header();
?>
<?php while ( have_posts() ) : the_post(); ?><section class="ru-page-hero"><div class="ru-container"><span class="ru-eyebrow">Entrons en contact</span><h1>Parlons de votre soutien</h1><p>Une question, une proposition, un partenariat ou une envie d’aider ? L’équipe RU Union est à votre écoute.</p><a class="ru-button" href="mailto:contact@ruunion.com">contact@ruunion.com</a></div></section><section class="ru-section"><div class="ru-container ru-prose"><article <?php post_class(); ?>><?php the_content(); ?></article></div></section><?php endwhile; ?>
<?php get_footer(); ?>
