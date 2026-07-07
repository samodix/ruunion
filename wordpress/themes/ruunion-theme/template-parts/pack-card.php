<?php
$product     = isset( $args['product'] ) ? $args['product'] : null;
$highlighted = ! empty( $args['highlighted'] );
if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
	return;
}
$image = wp_get_attachment_image_url( $product->get_image_id(), 'large' );
?>
<article class="ru-pack-card ru-card-premium<?php echo $highlighted ? ' is-highlighted' : ''; ?>" data-ru-reveal>
	<?php if ( $highlighted ) : ?><span class="ru-pack-card__badge">Recommandé</span><?php endif; ?>
	<div class="ru-pack-card__image" style="background-image:url(<?php echo esc_url( $image ?: ruunion_theme_asset_image( 'stock/cinematic-reference.jpg' ) ); ?>)"></div>
	<span class="ru-eyebrow">Pack de soutien</span>
	<h3><?php echo esc_html( $product->get_name() ); ?></h3>
	<div class="ru-pack-card__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div>
	<p><?php echo wp_kses_post( wp_trim_words( $product->get_short_description() ?: $product->get_description(), 28 ) ); ?></p>
	<a class="ru-button <?php echo $highlighted ? 'ru-button--primary' : 'ru-button--outline'; ?> add_to_cart_button ajax_add_to_cart" href="<?php echo esc_url( $product->add_to_cart_url() ); ?>" data-quantity="1" data-product_id="<?php echo esc_attr( $product->get_id() ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" aria-label="<?php echo esc_attr( sprintf( 'Ajouter %s au panier', $product->get_name() ) ); ?>">Ajouter au panier</a>
	<small>Panier AJAX · Checkout WooCommerce sécurisé</small>
</article>
