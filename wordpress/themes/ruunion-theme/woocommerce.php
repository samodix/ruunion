<?php
/** Enveloppe WooCommerce compatible avec le thأ¨me RU Union. */
get_header();
?>
<section class="ru-page-hero ru-page-hero--shop">
	<div class="ru-container ru-page-hero__split">
		<div>
			<span class="ru-pill">Boutique solidaire آ· WooCommerce</span>
			<h1><?php woocommerce_page_title(); ?></h1>
			<p>Chaque pack aide أ  faire avancer une histoire, une production et un engagement humain. Lâ€™expأ©rience reste WooCommerce, avec une interface RU Union plus fluide.</p>
			<div class="ru-actions"><button class="ru-button ru-button--primary" type="button" data-ru-cart-open>Ouvrir le panier</button><a class="ru-button ru-button--outline" href="<?php echo esc_url( function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : '#' ); ?>">Checkout</a></div>
		</div>
		<figure class="ru-page-hero__image"><img src="<?php echo esc_url( ruunion_theme_asset_image( 'illustrations/illustrations-ruunion.webp' ) ); ?>" alt="" loading="eager"></figure>
	</div>
</section>
<section class="ru-section ru-shop-section"><div class="ru-container ru-woocommerce"><?php woocommerce_content(); ?></div></section>
<?php get_footer(); ?>

