<?php get_header(); ?>
<?php while ( have_posts() ) : the_post(); ?>
<section class="ru-page-hero"><div class="ru-container"><span class="ru-eyebrow">RU Union</span><h1><?php the_title(); ?></h1></div></section>
<section class="ru-section"><div class="ru-container ru-prose"><article <?php post_class(); ?>><?php the_content(); ?></article></div></section>
<?php endwhile; ?>
<?php get_footer(); ?>
