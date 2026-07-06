<?php
$products = function_exists( 'wc_get_products' ) ? wc_get_products( array( 'status' => 'publish', 'limit' => 3, 'orderby' => 'menu_order', 'order' => 'ASC' ) ) : array();
?>
<section class="ru-section ru-packs-section">
	<div class="ru-container">
		<div class="ru-section-heading ru-section-heading--action"><div><span class="ru-eyebrow">Packs de soutien</span><h2>Choisir un pack, soutenir une histoire</h2><p>Chaque pack participe au développement des films et des actions RU Union. Un geste simple peut aider une histoire à voir le jour.</p></div><a class="ru-button ru-button--outline" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>">Voir tous les packs</a></div>
		<div class="ru-pack-grid">
		<?php foreach ( $products as $index => $product ) { get_template_part( 'template-parts/pack-card', null, array( 'product' => $product, 'highlighted' => 1 === $index ) ); } ?>
		</div>
	</div>
</section>
