<?php $featured_films = ruunion_theme_featured_films( 3 ); ?>
<section class="ru-section ru-section--dark ru-featured-films">
	<div class="ru-featured-films__backdrop" aria-hidden="true" style="background-image:url('<?php echo esc_url( ruunion_theme_asset_image( 'illustrations/illustrations-ruunion.webp' ) ); ?>')"></div>
	<div class="ru-container">
		<div class="ru-section-heading ru-section-heading--action">
			<div>
				<span class="ru-eyebrow"><?php esc_html_e( 'À l’affiche', 'ruunion-theme' ); ?></span>
				<h2><?php esc_html_e( 'Films en lumière', 'ruunion-theme' ); ?></h2>
				<p><?php esc_html_e( 'Découvrez les films portés par RU Union et les projets humains qu’ils accompagnent.', 'ruunion-theme' ); ?></p>
			</div>
			<a class="ru-button ru-button--dark-outline" href="<?php echo esc_url( get_post_type_archive_link( 'film' ) ?: ruunion_theme_page_url( 'films' ) ); ?>"><?php esc_html_e( 'Explorer tous les films', 'ruunion-theme' ); ?></a>
		</div>
		<div class="ru-film-grid">
		<?php if ( $featured_films->have_posts() ) : while ( $featured_films->have_posts() ) : $featured_films->the_post(); get_template_part( 'template-parts/film-card' ); endwhile; else : ?><p><?php esc_html_e( 'Aucun film n’est encore publié.', 'ruunion-theme' ); ?></p><?php endif; ?>
		</div>
	</div>
</section>
<?php wp_reset_postdata(); ?>
