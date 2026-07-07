<?php
$films = ruunion_theme_featured_films( 1 );
$film  = $films->have_posts() ? $films->posts[0] : null;
$image = $film ? ruunion_theme_film_image( $film->ID, 'full' ) : ruunion_theme_asset_image( 'stock/cinematic-reference.jpg' );
$stats = $film ? ruunion_theme_film_progress( $film->ID ) : array( 'goal' => 0, 'collected' => 0, 'percent' => 0 );
$packs = function_exists( 'wc_get_products' ) ? wc_get_products( array( 'status' => 'publish', 'limit' => -1, 'return' => 'ids' ) ) : array();
?>
<section class="ru-hero ru-hero--cinematic">
	<div class="ru-hero__backdrop" aria-hidden="true"></div>
	<div class="ru-hero__grain" aria-hidden="true"></div>
	<div class="ru-container ru-hero__grid">
		<div class="ru-hero__copy" data-ru-reveal>
			<span class="ru-pill">Films solidaires · Projets humains</span>
			<h1>Des histoires qui rapprochent <em>les plus humains</em></h1>
			<p>RU Union produit et accompagne des récits cinématographiques qui transforment l’émotion en soutien concret. Chaque image ouvre une rencontre, chaque contribution fait avancer un projet.</p>
			<div class="ru-actions">
				<a class="ru-button ru-button--primary" href="<?php echo esc_url( get_post_type_archive_link( 'film' ) ?: ruunion_theme_page_url( 'films' ) ); ?>">Découvrir les films <span aria-hidden="true">→</span></a>
				<a class="ru-button ru-button--outline" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>">Soutenir maintenant</a>
			</div>
			<div class="ru-hero__markers" aria-label="<?php esc_attr_e( 'Axes du projet', 'ruunion-theme' ); ?>">
				<span>Production indépendante</span><span>Impact humain</span><span>Élan collectif</span>
			</div>
			<div class="ru-stats">
				<div><strong><?php echo esc_html( str_pad( (string) $films->found_posts, 2, '0', STR_PAD_LEFT ) ); ?></strong><span>Films</span></div>
				<div><strong><?php echo esc_html( str_pad( (string) count( $packs ), 2, '0', STR_PAD_LEFT ) ); ?></strong><span>Packs</span></div>
				<div><strong><?php echo wp_kses_post( ruunion_theme_money( $stats['goal'] ) ); ?></strong><span>Objectif</span></div>
				<div><strong><?php echo esc_html( $stats['percent'] ); ?> %</strong><span>Collecte</span></div>
			</div>
		</div>
		<div class="ru-hero__visual has-image" style="background-image:url('<?php echo esc_url( $image ); ?>')" data-ru-parallax>
			<div class="ru-hero__shade"></div>
			<span class="ru-status">En lumière</span>
			<span class="ru-clapper" aria-hidden="true">RU</span>
			<div class="ru-hero__frame" aria-hidden="true"><span></span><span></span></div>
			<div class="ru-hero__film">
				<span>Film sélectionné</span>
				<h2><?php echo esc_html( $film ? get_the_title( $film ) : 'Parce que c’est toi' ); ?></h2>
				<p><?php echo esc_html( $film ? ruunion_theme_meta( $film->ID, 'synopsis_court', $film->post_excerpt ) : 'Un récit intime sur les liens qui nous relèvent.' ); ?></p>
			</div>
			<div class="ru-collection">
				<div><strong>Collecte active</strong><strong><?php echo esc_html( $stats['percent'] ); ?> %</strong></div>
				<span class="ru-progress"><i style="width:<?php echo esc_attr( $stats['percent'] ); ?>%"></i></span>
				<small><?php echo wp_kses_post( ruunion_theme_money( $stats['collected'] ) ); ?> réunis</small>
			</div>
		</div>
	</div>
</section>
<?php wp_reset_postdata(); ?>
