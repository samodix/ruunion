<?php
/**
 * Template Name: Association RU Union
 */
get_header();
?>
<?php while ( have_posts() ) : the_post(); ?><section class="ru-page-hero"><div class="ru-container"><span class="ru-eyebrow">Notre association</span><h1>Une union au service de l’humain</h1><p>RU Union est née d’une conviction simple : les histoires peuvent ouvrir des portes, créer du lien et donner de la force.</p></div></section><section class="ru-section"><div class="ru-container ru-prose"><article <?php post_class(); ?>><?php the_content(); ?></article><div class="ru-three-grid"><article class="ru-basic-card"><h2>Écouter</h2><p>Partir des personnes, de leurs récits et de leurs réalités.</p></article><article class="ru-basic-card"><h2>Créer</h2><p>Donner une forme cinématographique sensible aux histoires humaines.</p></article><article class="ru-basic-card"><h2>Agir</h2><p>Prolonger chaque film par une rencontre ou un soutien concret.</p></article></div></div></section><?php endwhile; ?>
<?php get_footer(); ?>
