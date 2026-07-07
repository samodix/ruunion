<?php
/**
 * Template Name: Équipe RU Union
 */
get_header();
$members = ruunion_theme_team_members();
?>
<section class="ru-page-hero ru-page-hero--team">
	<div class="ru-container ru-page-hero__split">
		<div>
			<span class="ru-pill">Les visages du projet</span>
			<h1>Une équipe reliée par la même intention</h1>
			<p>Écriture, production, mentorat, image, coordination et terrain : RU Union avance grâce à des sensibilités complémentaires, toutes tournées vers l’humain.</p>
		</div>
		<figure class="ru-page-hero__image"><img src="<?php echo esc_url( ruunion_theme_asset_image( 'stock/cinematic-reference.jpg' ) ); ?>" alt="<?php esc_attr_e( 'Ambiance cinématographique RU Union', 'ruunion-theme' ); ?>" loading="eager"></figure>
	</div>
</section>
<section class="ru-section ru-team-section">
	<div class="ru-container">
		<div class="ru-section-heading ru-section-heading--split">
			<div><span class="ru-eyebrow">Collectif</span><h2>Des talents, des regards, une même chaleur.</h2></div>
			<p>Chaque fiche reprend les photos disponibles dans la médiathèque du projet et les associe à un rôle éditorial clair pour présenter le collectif.</p>
		</div>
		<div class="ru-team-grid">
			<?php foreach ( $members as $member ) : ?>
				<article class="ru-team-card" data-ru-reveal>
					<figure>
						<img src="<?php echo esc_url( ruunion_theme_asset_image( $member['image'] ) ); ?>" alt="<?php echo esc_attr( $member['name'] ); ?>" loading="lazy" width="640" height="760">
					</figure>
					<div class="ru-team-card__body">
						<span><?php echo esc_html( $member['role'] ); ?></span>
						<h3><?php echo esc_html( $member['name'] ); ?></h3>
						<p><?php echo esc_html( $member['bio'] ); ?></p>
						<a href="<?php echo esc_url( ruunion_theme_page_url( 'contact' ) ); ?>"><?php esc_html_e( 'Contacter l’équipe', 'ruunion-theme' ); ?></a>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
<?php get_footer(); ?>
