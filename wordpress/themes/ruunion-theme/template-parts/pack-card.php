<?php
$product     = isset( $args['product'] ) ? $args['product'] : null;
$highlighted = ! empty( $args['highlighted'] );
if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
	return;
}
$image = wp_get_attachment_image_url( $product->get_image_id(), 'large' );
?>
<article class="ru-pack-card<?php echo $highlighted ? ' is-highlighted' : ''; ?>">
	<?php if ( $highlighted ) : ?><span class="ru-pack-card__badge">Recommandé</span><?php endif; ?>
	<?php if ( $image ) : ?><div class="ru-pack-card__image" style="background-image:url(<?php echo esc_url( $image ); ?>)"></div><?php endif; ?>
	<span class="ru-eyebrow">Pack de soutien</span><h3><?php echo esc_html( $product->get_name() ); ?></h3><div class="ru-pack-card__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div><p><?php echo wp_kses_post( wp_trim_words( $product->get_short_description() ?: $product->get_description(), 24 ) ); ?></p><a class="ru-button<?php echo $highlighted ? '' : ' ru-button--outline'; ?>" href="<?php echo esc_url( $product->add_to_cart_url() ); ?>" data-quantity="1" data-product_id="<?php echo esc_attr( $product->get_id() ); ?>">Ajouter au panier</a><small>Checkout WooCommerce · Paiement selon les moyens activés dans WordPress</small>
</article>
