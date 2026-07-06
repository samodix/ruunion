<?php
/**
 * Template Name: Boutique RU Union
 */
get_header();
$products = function_exists( 'wc_get_products' ) ? wc_get_products( array( 'status' => 'publish', 'limit' => -1, 'orderby' => 'menu_order', 'order' => 'ASC' ) ) : array();
?>
<section class="ru-page-hero ru-page-hero--shop"><div class="ru-container"><span class="ru-pill">Packs de soutien · Boutique WooCommerce</span><h1>Soutenir RU Union</h1><p>Choisissez un pack et participez au développement des films, des actions et des projets humains portés par RU Union.</p></div></section>
<section class="ru-section"><div class="ru-container"><div class="ru-pack-grid"><?php foreach ( $products as $index => $product ) { get_template_part( 'template-parts/pack-card', null, array( 'product' => $product, 'highlighted' => 1 === $index ) ); } ?></div></div></section>
<?php get_footer(); ?>
