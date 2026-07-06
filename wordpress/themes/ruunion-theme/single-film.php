<?php get_header(); ?>
<?php while ( have_posts() ) : the_post();
	$film_id  = get_the_ID();
	$status   = ruunion_theme_status_label( ruunion_theme_meta( $film_id, 'statut', 'en-production' ) );
	$year     = ruunion_theme_meta( $film_id, 'annee', get_the_date( 'Y' ) );
	$synopsis = ruunion_theme_meta( $film_id, 'synopsis_long', get_the_content() );
	$image    = ruunion_theme_film_image( $film_id, 'full' );
	$progress = ruunion_theme_film_progress( $film_id );
	$gallery  = ruunion_theme_gallery_urls( $film_id );
?>
<section class="ru-film-hero"><div class="ru-container ru-film-hero__grid"><div><span class="ru-pill"><?php echo esc_html( $status ); ?> · <?php echo esc_html( $year ); ?></span><span class="ru-eyebrow">Une production RU Union</span><h1><?php the_title(); ?></h1><div class="ru-film-hero__synopsis"><?php echo wp_kses_post( wpautop( $synopsis ) ); ?></div><a class="ru-button" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>">Soutenir ce film</a></div><div class="ru-film-hero__poster<?php echo $image ? ' has-image' : ''; ?>"<?php echo $image ? ' style="background-image:url(' . esc_url( $image ) . ')"' : ''; ?>><span>Une histoire à faire vivre</span></div></div></section>
<section class="ru-section"><div class="ru-container ru-film-layout"><div><span class="ru-eyebrow">Dans les coulisses</span><h2>Galerie du projet</h2><div class="ru-gallery">
	<?php if ( $gallery ) : foreach ( array_slice( $gallery, 0, 6 ) as $index => $gallery_url ) : ?><figure><img src="<?php echo esc_url( $gallery_url ); ?>" alt="<?php echo esc_attr( sprintf( 'Photo de tournage %1$s — image %2$d', get_the_title(), $index + 1 ) ); ?>" loading="lazy"></figure><?php endforeach; else : ?><div class="ru-gallery__placeholder">Écriture</div><div class="ru-gallery__placeholder">Tournage</div><div class="ru-gallery__placeholder">Rencontres</div><?php endif; ?>
</div><div class="ru-impact"><span class="ru-eyebrow">L’impact derrière l’image</span><h2>Pourquoi soutenir ce film ?</h2><p>Ce projet se construit avec ses futurs publics. Les soutiens financent l’écriture, le tournage, la postproduction et des projections accompagnées sur le terrain.</p></div><div class="ru-three-grid ru-film-facts"><article><span>Année</span><strong><?php echo esc_html( $year ); ?></strong></article><article><span>Statut</span><strong><?php echo esc_html( $status ); ?></strong></article><article><span>Engagement</span><strong>Solidaire</strong></article></div></div>
	<aside class="ru-donation"><span class="ru-eyebrow">La collecte du film</span><strong><?php echo wp_kses_post( ruunion_theme_money( $progress['collected'] ) ); ?></strong><p>réunis sur un objectif de <?php echo wp_kses_post( ruunion_theme_money( $progress['goal'] ) ); ?></p><span class="ru-progress"><i style="width:<?php echo esc_attr( $progress['percent'] ); ?>%"></i></span><div><span>Progression</span><b><?php echo esc_html( $progress['percent'] ); ?> %</b></div><p>Chaque soutien rapproche le film de son tournage, de sa diffusion et de ses futures rencontres avec le public.</p><a class="ru-button" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>">Choisir un pack</a></aside>
</div></section>
<?php endwhile; get_footer(); ?>
