<?php get_header(); ?>
<?php while ( have_posts() ) : the_post();
	$film_id  = get_the_ID();
	$status   = ruunion_theme_status_label( ruunion_theme_meta( $film_id, 'statut', 'en-production' ) );
	$year     = ruunion_theme_meta( $film_id, 'annee', get_the_date( 'Y' ) );
	$synopsis = ruunion_theme_meta( $film_id, 'synopsis_long', get_the_content() );
	$image    = ruunion_theme_film_image( $film_id, 'full' ) ?: ruunion_theme_asset_image( 'illustrations/illustrations-ruunion.webp' );
	$progress = ruunion_theme_film_progress( $film_id );
	$gallery  = ruunion_theme_gallery_urls( $film_id );
	$trailer  = ruunion_theme_meta( $film_id, 'bande_annonce', '' );
	$team     = array_slice( ruunion_theme_team_members(), 0, 4 );
?>
<section class="ru-film-hero ru-film-hero--premium">
	<div class="ru-container ru-film-hero__grid">
		<div data-ru-reveal>
			<span class="ru-pill"><?php echo esc_html( $status ); ?> آ· <?php echo esc_html( $year ); ?></span>
			<span class="ru-eyebrow">Une production RU Union</span>
			<h1><?php the_title(); ?></h1>
			<div class="ru-film-hero__synopsis"><?php echo wp_kses_post( wpautop( $synopsis ) ); ?></div>
			<div class="ru-actions"><a class="ru-button ru-button--primary" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>">Soutenir ce film</a><a class="ru-button ru-button--outline" href="#making-of">Voir le making-of</a></div>
		</div>
		<div class="ru-film-hero__poster has-image" style="background-image:url('<?php echo esc_url( $image ); ?>')" data-ru-parallax><span>Une histoire أ  faire vivre</span></div>
	</div>
</section>
<section class="ru-section">
	<div class="ru-container ru-film-layout">
		<div>
			<div class="ru-trailer-card" data-ru-reveal>
				<span class="ru-eyebrow">Bande annonce</span>
				<?php if ( $trailer ) : ?>
					<div class="ru-video-embed"><?php echo wp_kses_post( wp_oembed_get( esc_url( $trailer ) ) ?: '<a class="ru-button ru-button--outline" href="' . esc_url( $trailer ) . '">Voir la bande annonce</a>' ); ?></div>
				<?php else : ?>
					<div class="ru-video-placeholder"><span>RU</span><p><?php esc_html_e( 'Bande annonce prochainement disponible.', 'ruunion-theme' ); ?></p></div>
				<?php endif; ?>
			</div>
			<span class="ru-eyebrow">Photos آ· Galerie آ· Coulisses</span>
			<h2><?php esc_html_e( 'Galerie du projet', 'ruunion-theme' ); ?></h2>
			<div class="ru-gallery ru-gallery--cinematic">
				<?php if ( $gallery ) : foreach ( array_slice( $gallery, 0, 8 ) as $index => $gallery_url ) : ?><figure data-ru-reveal><img src="<?php echo esc_url( $gallery_url ); ?>" alt="<?php echo esc_attr( sprintf( 'Photo de tournage %1$s â€” image %2$d', get_the_title(), $index + 1 ) ); ?>" loading="lazy"></figure><?php endforeach; else : foreach ( array( 'illustrations/illustrations-ruunion.webp', 'team/ROLAND USTOK.webp', 'team/MUSTAFA OZGUN - Rأ©alisateur.webp' ) as $index => $fallback ) : ?><figure data-ru-reveal><img src="<?php echo esc_url( ruunion_theme_asset_image( $fallback ) ); ?>" alt="<?php echo esc_attr( sprintf( 'Image de coulisses %d', $index + 1 ) ); ?>" loading="lazy"></figure><?php endforeach; endif; ?>
			</div>
			<div id="making-of" class="ru-impact ru-making-of" data-ru-reveal><span class="ru-eyebrow">Making Of</span><h2>Pourquoi soutenir ce film ?</h2><p>Ce projet se construit avec ses futurs publics. Les soutiens financent lâ€™أ©criture, le tournage, la postproduction, la crأ©ation de supports et les projections accompagnأ©es sur le terrain.</p></div>
			<div class="ru-team-mini">
				<?php foreach ( $team as $member ) : ?><article><img src="<?php echo esc_url( ruunion_theme_asset_image( $member['image'] ) ); ?>" alt="<?php echo esc_attr( $member['name'] ); ?>" loading="lazy"><strong><?php echo esc_html( $member['name'] ); ?></strong><span><?php echo esc_html( $member['role'] ); ?></span></article><?php endforeach; ?>
			</div>
		</div>
		<aside class="ru-donation"><span class="ru-eyebrow">La collecte du film</span><strong><?php echo wp_kses_post( ruunion_theme_money( $progress['collected'] ) ); ?></strong><p>rأ©unis sur un objectif de <?php echo wp_kses_post( ruunion_theme_money( $progress['goal'] ) ); ?></p><span class="ru-progress"><i style="width:<?php echo esc_attr( $progress['percent'] ); ?>%"></i></span><div><span>Progression</span><b><?php echo esc_html( $progress['percent'] ); ?> %</b></div><p>Chaque soutien rapproche le film de son tournage, de sa diffusion et de ses futures rencontres avec le public.</p><a class="ru-button ru-button--primary" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>">Choisir un pack</a></aside>
	</div>
</section>
<?php endwhile; get_footer(); ?>

