<?php
$film_id  = get_the_ID();
$status   = ruunion_theme_status_label( ruunion_theme_meta( $film_id, 'statut', 'en-production' ) );
$year     = ruunion_theme_meta( $film_id, 'annee', get_the_date( 'Y' ) );
$synopsis = ruunion_theme_meta( $film_id, 'synopsis_court', get_the_excerpt() );
$image    = ruunion_theme_film_image( $film_id, 'large' );
$progress = ruunion_theme_film_progress( $film_id );
?>
<article <?php post_class( 'ru-film-card' ); ?>>
	<a class="ru-film-card__visual<?php echo $image ? ' has-image' : ''; ?>" href="<?php the_permalink(); ?>"<?php echo $image ? ' style="background-image:url(' . esc_url( $image ) . ')"' : ''; ?>><span class="ru-status"><?php echo esc_html( $status ); ?></span><span class="ru-film-card__arrow" aria-hidden="true">↗</span></a>
	<div class="ru-film-card__body"><span class="ru-eyebrow">Film solidaire · <?php echo esc_html( $year ); ?></span><h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3><p><?php echo esc_html( $synopsis ); ?></p><div class="ru-film-card__collection"><div><span><?php echo wp_kses_post( ruunion_theme_money( $progress['collected'] ) ); ?> collectés</span><strong><?php echo esc_html( $progress['percent'] ); ?> %</strong></div><span class="ru-progress"><i style="width:<?php echo esc_attr( $progress['percent'] ); ?>%"></i></span></div><div class="ru-actions"><a class="ru-button ru-button--small" href="<?php the_permalink(); ?>">Découvrir</a><a class="ru-button ru-button--outline ru-button--small" href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>">Soutenir</a></div></div>
</article>
