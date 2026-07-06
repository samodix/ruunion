<?php
get_header();
$films = new WP_Query(
	array(
		'post_type'      => 'film',
		'post_status'    => 'publish',
		'posts_per_page' => -1,
		'meta_key'       => 'priorite_affichage',
		'orderby'        => 'meta_value_num',
		'order'          => 'ASC',
		'meta_query'     => array( array( 'key' => 'visible_public', 'value' => '1' ) ),
	)
);
?>
<section class="ru-page-hero ru-page-hero--films"><div class="ru-container"><span class="ru-eyebrow">Nos productions</span><h1>Nos films solidaires</h1><p>Chaque film raconte une part d’humanité et participe à un projet plus grand : soutenir des actions, faire circuler les voix et créer des rencontres durables.</p><strong class="ru-page-hero__number"><?php echo esc_html( str_pad( (string) $films->found_posts, 2, '0', STR_PAD_LEFT ) ); ?></strong></div></section>
<section class="ru-section"><div class="ru-container"><div class="ru-film-filters" aria-label="Filtres visuels"><span class="is-active">Tous</span><span>En production</span><span>En diffusion</span><span>Terminés</span></div><div class="ru-film-grid">
	<?php if ( $films->have_posts() ) : while ( $films->have_posts() ) : $films->the_post(); get_template_part( 'template-parts/film-card' ); endwhile; else : ?><p>Aucun film public pour le moment.</p><?php endif; ?>
</div></div></section>
<?php wp_reset_postdata(); get_footer(); ?>
