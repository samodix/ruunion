<?php
$product     = isset( $args['product'] ) ? $args['product'] : null;
$highlighted = ! empty( $args['highlighted'] );
if ( ! $product || ! is_a( $product, 'WC_Product' ) ) {
	return;
}

$product_image = wp_get_attachment_image_url( $product->get_image_id(), 'large' );
$pack_image    = ruunion_theme_pack_image_for_product( $product );
$image         = $product_image ?: $pack_image['src'];
$image_alt     = $product_image ? sprintf( __( 'Pack %s — RU Union', 'ruunion-theme' ), $product->get_name() ) : $pack_image['alt'];
?>
<article class="ru-pack-card ru-card-premium<?php echo $highlighted ? ' is-highlighted' : ''; ?>" data-ru-reveal>
	<?php if ( $highlighted ) : ?><span class="ru-pack-card__badge"><?php esc_html_e( 'Recommandé', 'ruunion-theme' ); ?></span><?php endif; ?>
	<figure class="ru-pack-card__image">
		<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $image_alt ); ?>" loading="lazy">
	</figure>
	<span class="ru-eyebrow"><?php esc_html_e( 'Pack de soutien', 'ruunion-theme' ); ?></span>
	<h3><?php echo esc_html( $product->get_name() ); ?></h3>
	<div class="ru-pack-card__price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div>
	<p><?php echo wp_kses_post( wp_trim_words( $product->get_short_description() ?: $product->get_description(), 28 ) ); ?></p>
	<a class="ru-button <?php echo $highlighted ? 'ru-button--primary' : 'ru-button--outline'; ?> add_to_cart_button ajax_add_to_cart" href="<?php echo esc_url( $product->add_to_cart_url() ); ?>" data-quantity="1" data-product_id="<?php echo esc_attr( $product->get_id() ); ?>" data-product_sku="<?php echo esc_attr( $product->get_sku() ); ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Ajouter %s au panier', 'ruunion-theme' ), $product->get_name() ) ); ?>"><?php esc_html_e( 'Ajouter au panier', 'ruunion-theme' ); ?></a>
	<small><?php esc_html_e( 'Soutien simple, clair et sécurisé', 'ruunion-theme' ); ?></small>
</article>
