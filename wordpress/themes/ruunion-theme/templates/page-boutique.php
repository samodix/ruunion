<?php
/**
 * Template Name: Boutique RU Union
 */
get_header();
$products = function_exists( 'wc_get_products' ) ? wc_get_products( array( 'status' => 'publish', 'limit' => -1, 'orderby' => 'menu_order', 'order' => 'ASC' ) ) : array();
$terms    = function_exists( 'get_terms' ) ? get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => true ) ) : array();
?>
<section class="ru-page-hero ru-page-hero--shop">
	<div class="ru-container ru-page-hero__split">
		<div>
			<span class="ru-pill">Packs de soutien آ· Boutique WooCommerce</span>
			<h1>Soutenir les films avec un geste simple et beau</h1>
			<p>Choisissez un pack, ouvrez le panier fluide et accompagnez concrأ¨tement les productions, projections et actions humaines de RU Union.</p>
			<div class="ru-actions"><button class="ru-button ru-button--primary" type="button" data-ru-cart-open>Ouvrir le panier</button><a class="ru-button ru-button--outline" href="<?php echo esc_url( function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : '#' ); ?>">Checkout</a></div>
		</div>
		<figure class="ru-page-hero__image"><img src="<?php echo esc_url( ruunion_theme_asset_image( 'illustrations/illustrations-ruunion.webp' ) ); ?>" alt="<?php esc_attr_e( 'Pack de soutien RU Union', 'ruunion-theme' ); ?>" loading="eager"></figure>
	</div>
</section>
<section class="ru-section ru-shop-section">
	<div class="ru-container">
		<div class="ru-shop-filters" aria-label="<?php esc_attr_e( 'Filtres boutique', 'ruunion-theme' ); ?>">
			<button class="is-active" type="button" data-ru-filter="all"><?php esc_html_e( 'Tous les packs', 'ruunion-theme' ); ?></button>
			<?php if ( ! is_wp_error( $terms ) ) : foreach ( $terms as $term ) : ?>
				<button type="button" data-ru-filter="<?php echo esc_attr( $term->slug ); ?>"><?php echo esc_html( $term->name ); ?></button>
			<?php endforeach; endif; ?>
		</div>
		<div class="ru-pack-grid ru-pack-grid--premium">
			<?php foreach ( $products as $index => $product ) :
				$classes = array();
				foreach ( wp_get_post_terms( $product->get_id(), 'product_cat' ) as $term ) {
					$classes[] = $term->slug;
				}
				?>
				<div class="ru-product-filter-item" data-ru-cats="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
					<?php get_template_part( 'template-parts/pack-card', null, array( 'product' => $product, 'highlighted' => 1 === $index ) ); ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
<?php get_footer(); ?>

