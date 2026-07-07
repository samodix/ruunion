<?php
/** Fonctions du thème RU Union. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ruunion_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 120,
			'width'       => 320,
			'flex-height' => true,
			'flex-width'  => true,
			'header-text' => array( 'site-title', 'site-description' ),
		)
	);
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);
	register_nav_menus(
		array(
			'primary' => __( 'Navigation principale', 'ruunion-theme' ),
			'footer'  => __( 'Navigation du pied de page', 'ruunion-theme' ),
		)
	);
}
add_action( 'after_setup_theme', 'ruunion_theme_setup' );

function ruunion_theme_assets() {
	$version = wp_get_theme()->get( 'Version' );
	wp_enqueue_style(
		'ruunion-theme-main',
		get_theme_file_uri( 'assets/css/main.css' ),
		array(),
		file_exists( get_theme_file_path( 'assets/css/main.css' ) ) ? (string) filemtime( get_theme_file_path( 'assets/css/main.css' ) ) : $version
	);
	wp_enqueue_script(
		'ruunion-theme-main',
		get_theme_file_uri( 'assets/js/main.js' ),
		array( 'jquery' ),
		file_exists( get_theme_file_path( 'assets/js/main.js' ) ) ? (string) filemtime( get_theme_file_path( 'assets/js/main.js' ) ) : $version,
		true
	);

	wp_localize_script(
		'ruunion-theme-main',
		'ruunionCart',
		array(
			'ajaxUrl'     => admin_url( 'admin-ajax.php' ),
			'wcAjaxUrl'   => class_exists( 'WC_AJAX' ) ? WC_AJAX::get_endpoint( '%%endpoint%%' ) : '',
			'nonce'       => wp_create_nonce( 'ruunion_cart_nonce' ),
			'cartUrl'     => function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : '',
			'checkoutUrl' => function_exists( 'wc_get_checkout_url' ) ? wc_get_checkout_url() : '',
			'i18n'        => array(
				'loading' => __( 'Chargement…', 'ruunion-theme' ),
				'empty'   => __( 'Votre panier est vide.', 'ruunion-theme' ),
				'error'   => __( 'Impossible de mettre à jour le panier.', 'ruunion-theme' ),
			),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'ruunion_theme_assets' );

function ruunion_theme_page_url( $slug ) {
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : home_url( '/' . trim( $slug, '/' ) . '/' );
}

function ruunion_theme_meta( $post_id, $key, $default = '' ) {
	$value = get_post_meta( $post_id, $key, true );
	return '' === $value || null === $value ? $default : $value;
}

function ruunion_theme_status_label( $status ) {
	$labels = array(
		'en-production' => __( 'En production', 'ruunion-theme' ),
		'en-diffusion'  => __( 'En diffusion', 'ruunion-theme' ),
		'termine'       => __( 'Terminé', 'ruunion-theme' ),
		'archive'       => __( 'Archivé', 'ruunion-theme' ),
	);
	return isset( $labels[ $status ] ) ? $labels[ $status ] : __( 'Projet RU Union', 'ruunion-theme' );
}

function ruunion_theme_film_progress( $post_id ) {
	$goal      = (float) ruunion_theme_meta( $post_id, 'objectif_dons', 0 );
	$collected = (float) ruunion_theme_meta( $post_id, 'montant_collecte', 0 );
	$percent   = $goal > 0 ? min( 100, round( ( $collected / $goal ) * 100 ) ) : 0;
	return array(
		'goal'      => $goal,
		'collected' => $collected,
		'percent'   => $percent,
	);
}

function ruunion_theme_film_image( $post_id, $size = 'large' ) {
	$image_id = (int) ruunion_theme_meta( $post_id, 'affiche', 0 );
	if ( $image_id ) {
		$image = wp_get_attachment_image_url( $image_id, $size );
		if ( $image ) {
			return $image;
		}
	}
	return get_the_post_thumbnail_url( $post_id, $size ) ?: '';
}

function ruunion_theme_gallery_urls( $post_id ) {
	$gallery = ruunion_theme_meta( $post_id, 'galerie', '' );
	$urls    = array();

	if ( is_array( $gallery ) ) {
		foreach ( $gallery as $item ) {
			$url = is_numeric( $item ) ? wp_get_attachment_image_url( (int) $item, 'large' ) : ( is_array( $item ) && isset( $item['url'] ) ? $item['url'] : $item );
			if ( $url ) {
				$urls[] = $url;
			}
		}
	} elseif ( is_string( $gallery ) ) {
		$urls = preg_split( '/\r\n|\r|\n/', $gallery );
	}

	return array_values( array_filter( array_map( 'trim', $urls ) ) );
}

function ruunion_theme_featured_films( $limit = 3 ) {
	return new WP_Query(
		array(
			'post_type'      => 'film',
			'post_status'    => 'publish',
			'posts_per_page' => absint( $limit ),
			'meta_key'       => 'priorite_affichage',
			'orderby'        => 'meta_value_num',
			'order'          => 'ASC',
			'meta_query'     => array(
				'relation' => 'AND',
				array( 'key' => 'visible_public', 'value' => '1' ),
				array( 'key' => 'visible_accueil', 'value' => '1' ),
				array( 'key' => 'mis_en_avant', 'value' => '1' ),
			),
		)
	);
}

function ruunion_theme_money( $amount ) {
	if ( function_exists( 'wc_price' ) ) {
		return wc_price( $amount );
	}
	return number_format_i18n( (float) $amount, 0 ) . ' €';
}

function ruunion_theme_asset_image( $relative_path ) {
	$relative_path = ltrim( (string) $relative_path, '/' );
	return get_theme_file_uri( 'assets/images/' . $relative_path );
}

function ruunion_theme_team_members() {
	return array(
		array( 'name' => 'ROLAND USTOK', 'role' => __( 'Président · Coordination artistique', 'ruunion-theme' ), 'image' => 'team/ROLAND USTOK.webp', 'bio' => __( 'Il porte la vision RU Union avec une énergie de terrain, entre création, lien humain et accompagnement des projets.', 'ruunion-theme' ) ),
		array( 'name' => 'Agnès Godey', 'role' => __( 'Production · Accompagnement', 'ruunion-theme' ), 'image' => 'team/Agnès Godey.webp', 'bio' => __( 'Elle relie les personnes, les calendriers et les besoins pour faire avancer les tournages avec douceur et précision.', 'ruunion-theme' ) ),
		array( 'name' => 'ALAIN DEPARDIEU', 'role' => __( 'Mentor', 'ruunion-theme' ), 'image' => 'team/ALAIN DEPARDIEU - Mentor.webp', 'bio' => __( 'Un regard d’expérience, une présence exigeante et bienveillante pour guider les choix artistiques et humains.', 'ruunion-theme' ) ),
		array( 'name' => 'Anna Lauble-QUINET', 'role' => __( 'Développement · Partenariats', 'ruunion-theme' ), 'image' => 'team/Anna Lauble-QUINET.webp', 'bio' => __( 'Elle accompagne les passerelles entre association, partenaires et publics autour de projets porteurs de sens.', 'ruunion-theme' ) ),
		array( 'name' => 'Delphine Depardieu', 'role' => __( 'Transmission · Image', 'ruunion-theme' ), 'image' => 'team/Delphine Depardieu.webp', 'bio' => __( 'Elle apporte une sensibilité artistique au service des récits, des visages et des émotions justes.', 'ruunion-theme' ) ),
		array( 'name' => 'France Renard', 'role' => __( 'Relations · Terrain', 'ruunion-theme' ), 'image' => 'team/France Renard.webp', 'bio' => __( 'Elle veille aux liens concrets avec les personnes, les lieux et les initiatives que RU Union accompagne.', 'ruunion-theme' ) ),
		array( 'name' => 'Huifang Liu', 'role' => __( 'Culture · Coordination', 'ruunion-theme' ), 'image' => 'team/Huifang Liu.webp', 'bio' => __( 'Elle nourrit l’ouverture culturelle du collectif et la rencontre entre les sensibilités.', 'ruunion-theme' ) ),
		array( 'name' => 'Lucie Peltier', 'role' => __( 'Création · Communication', 'ruunion-theme' ), 'image' => 'team/Lucie Peltier.webp', 'bio' => __( 'Elle transforme les intentions en messages clairs, chaleureux et fidèles à l’esprit RU Union.', 'ruunion-theme' ) ),
		array( 'name' => 'Magalie Lerbey', 'role' => __( 'Organisation · Suivi projets', 'ruunion-theme' ), 'image' => 'team/Magalie Lerbey.webp', 'bio' => __( 'Elle structure les étapes, sécurise les détails et garde le cap humain des projets.', 'ruunion-theme' ) ),
		array( 'name' => 'Marc De Panda', 'role' => __( 'Image · Création visuelle', 'ruunion-theme' ), 'image' => 'team/Marc De Panda.webp', 'bio' => __( 'Il accompagne l’univers visuel avec un regard contemporain, sensible et cinématographique.', 'ruunion-theme' ) ),
		array( 'name' => 'Marie Prajoux', 'role' => __( 'Écriture · Médiation', 'ruunion-theme' ), 'image' => 'team/Marie Prajoux.webp', 'bio' => __( 'Elle aide les histoires à trouver leur voix, leur rythme et leur justesse émotionnelle.', 'ruunion-theme' ) ),
		array( 'name' => 'MUSTAFA OZGUN', 'role' => __( 'Réalisateur', 'ruunion-theme' ), 'image' => 'team/MUSTAFA OZGUN - Réalisateur.webp', 'bio' => __( 'Il met en scène les récits avec une attention particulière aux silences, aux regards et à l’élan collectif.', 'ruunion-theme' ) ),
	);
}

function ruunion_theme_cart_count() {
	return function_exists( 'WC' ) && WC()->cart ? (int) WC()->cart->get_cart_contents_count() : 0;
}

function ruunion_theme_mini_cart_markup() {
	if ( ! function_exists( 'WC' ) || ! WC()->cart ) {
		return '<p class="ru-mini-cart__empty">' . esc_html__( 'Votre panier est vide.', 'ruunion-theme' ) . '</p>';
	}

	ob_start();
	if ( WC()->cart->is_empty() ) {
		echo '<p class="ru-mini-cart__empty">' . esc_html__( 'Votre panier est vide.', 'ruunion-theme' ) . '</p>';
	} else {
		echo '<div class="ru-mini-cart__items">';
		foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
			$product = $cart_item['data'];
			if ( ! $product || ! $product->exists() ) {
				continue;
			}
			$thumbnail = $product->get_image( 'woocommerce_thumbnail' );
			?>
			<article class="ru-mini-cart__item" data-cart-key="<?php echo esc_attr( $cart_item_key ); ?>">
				<div class="ru-mini-cart__thumb"><?php echo wp_kses_post( $thumbnail ); ?></div>
				<div class="ru-mini-cart__meta">
					<strong><?php echo esc_html( $product->get_name() ); ?></strong>
					<span><?php echo wp_kses_post( WC()->cart->get_product_price( $product ) ); ?></span>
					<div class="ru-mini-cart__qty">
						<button type="button" data-ru-cart-qty="-1" aria-label="<?php esc_attr_e( 'Réduire la quantité', 'ruunion-theme' ); ?>">−</button>
						<span><?php echo esc_html( $cart_item['quantity'] ); ?></span>
						<button type="button" data-ru-cart-qty="1" aria-label="<?php esc_attr_e( 'Augmenter la quantité', 'ruunion-theme' ); ?>">+</button>
						<button type="button" class="ru-mini-cart__remove" data-ru-cart-remove><?php esc_html_e( 'Retirer', 'ruunion-theme' ); ?></button>
					</div>
				</div>
			</article>
			<?php
		}
		echo '</div>';
		?>
		<div class="ru-mini-cart__total">
			<span><?php esc_html_e( 'Sous-total', 'ruunion-theme' ); ?></span>
			<strong><?php echo wp_kses_post( WC()->cart->get_cart_subtotal() ); ?></strong>
		</div>
		<a class="ru-button ru-button--primary" href="<?php echo esc_url( wc_get_checkout_url() ); ?>"><?php esc_html_e( 'Passer au checkout', 'ruunion-theme' ); ?></a>
		<a class="ru-button ru-button--ghost" href="<?php echo esc_url( wc_get_cart_url() ); ?>"><?php esc_html_e( 'Voir le panier complet', 'ruunion-theme' ); ?></a>
		<?php
	}
	return ob_get_clean();
}

function ruunion_theme_ajax_cart_payload() {
	return array(
		'count'    => ruunion_theme_cart_count(),
		'html'     => ruunion_theme_mini_cart_markup(),
		'subtotal' => function_exists( 'WC' ) && WC()->cart ? WC()->cart->get_cart_subtotal() : '',
	);
}

function ruunion_theme_ajax_cart_get() {
	check_ajax_referer( 'ruunion_cart_nonce', 'nonce' );
	wp_send_json_success( ruunion_theme_ajax_cart_payload() );
}
add_action( 'wp_ajax_ruunion_cart_get', 'ruunion_theme_ajax_cart_get' );
add_action( 'wp_ajax_nopriv_ruunion_cart_get', 'ruunion_theme_ajax_cart_get' );

function ruunion_theme_ajax_cart_update() {
	check_ajax_referer( 'ruunion_cart_nonce', 'nonce' );
	if ( ! function_exists( 'WC' ) || ! WC()->cart ) {
		wp_send_json_error();
	}
	$key      = isset( $_POST['cart_key'] ) ? sanitize_text_field( wp_unslash( $_POST['cart_key'] ) ) : '';
	$quantity = isset( $_POST['quantity'] ) ? max( 0, absint( $_POST['quantity'] ) ) : 0;
	if ( $key ) {
		WC()->cart->set_quantity( $key, $quantity, true );
		WC()->cart->calculate_totals();
	}
	wp_send_json_success( ruunion_theme_ajax_cart_payload() );
}
add_action( 'wp_ajax_ruunion_cart_update', 'ruunion_theme_ajax_cart_update' );
add_action( 'wp_ajax_nopriv_ruunion_cart_update', 'ruunion_theme_ajax_cart_update' );

function ruunion_theme_body_classes( $classes ) {
	$classes[] = 'ruunion-public';
	return $classes;
}
add_filter( 'body_class', 'ruunion_theme_body_classes' );

function ruunion_customize_register( $wp_customize ) {
	$wp_customize->add_setting(
		'ruunion_footer_logo',
		array(
			'sanitize_callback' => 'esc_url_raw',
			'transport'         => 'refresh',
		)
	);

	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize,
			'ruunion_footer_logo',
			array(
				'label'       => __( 'Logo du footer RU Union', 'ruunion-theme' ),
				'section'     => 'title_tagline',
				'settings'    => 'ruunion_footer_logo',
				'description' => __( 'Logo utilisé dans le footer. Si vide, le logo principal sera utilisé.', 'ruunion-theme' ),
			)
		)
	);
}
add_action( 'customize_register', 'ruunion_customize_register' );
