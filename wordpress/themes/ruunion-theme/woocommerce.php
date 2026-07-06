<?php
/** Enveloppe WooCommerce compatible avec le thème RU Union. */
get_header();
?>
<section class="ru-page-hero ru-page-hero--shop"><div class="ru-container"><span class="ru-pill">Boutique solidaire · WooCommerce</span><h1><?php woocommerce_page_title(); ?></h1><p>Chaque pack aide à faire avancer une histoire, une production et un engagement humain.</p></div></section>
<section class="ru-section"><div class="ru-container ru-woocommerce"><?php woocommerce_content(); ?></div></section>
<?php get_footer(); ?>
