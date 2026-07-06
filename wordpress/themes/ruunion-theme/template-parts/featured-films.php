<?php $featured_films = ruunion_theme_featured_films( 3 ); ?>
<section class="ru-section ru-section--dark">
	<div class="ru-container">
		<div class="ru-section-heading ru-section-heading--action"><div><span class="ru-eyebrow">À l’affiche</span><h2>Films en lumière</h2><p>Découvrez les films portés par RU Union et les projets humains qu’ils accompagnent.</p></div><a class="ru-button ru-button--dark-outline" href="<?php echo esc_url( get_post_type_archive_link( 'film' ) ?: ruunion_theme_page_url( 'films' ) ); ?>">Explorer tous les films</a></div>
		<div class="ru-film-grid">
		<?php if ( $featured_films->have_posts() ) : while ( $featured_films->have_posts() ) : $featured_films->the_post(); get_template_part( 'template-parts/film-card' ); endwhile; else : ?><p>Aucun film n’est encore publié.</p><?php endif; ?>
		</div>
	</div>
</section>
<?php wp_reset_postdata(); ?>
