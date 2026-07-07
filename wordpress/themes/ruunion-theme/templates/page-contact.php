<?php
/**
 * Template Name: Contact RU Union
 */
get_header();
?>
<?php while ( have_posts() ) : the_post(); ?>
<section class="ru-page-hero ru-contact-hero">
	<div class="ru-container ru-page-hero__split">
		<div>
			<span class="ru-eyebrow"><?php esc_html_e( 'Entrons en contact', 'ruunion-theme' ); ?></span>
			<h1><?php esc_html_e( 'Parlons de votre soutien', 'ruunion-theme' ); ?></h1>
			<p><?php esc_html_e( 'Une question, une proposition, un partenariat ou une envie d’aider ? L’équipe RU Union est à votre écoute.', 'ruunion-theme' ); ?></p>
			<a class="ru-button ru-button--primary" href="mailto:contact@ruunion.com">contact@ruunion.com</a>
		</div>
		<figure class="ru-page-hero__image">
			<img src="<?php echo esc_url( ruunion_theme_asset_image( 'illustrations/illustrations-ruunion.webp' ) ); ?>" alt="<?php esc_attr_e( 'Illustrations RU Union — solidarité, cinéma et engagement humain', 'ruunion-theme' ); ?>" loading="eager">
		</figure>
	</div>
</section>

<section class="ru-section ru-contact-section">
	<div class="ru-container ru-contact-grid">
		<form class="ru-contact-form ru-card-premium" action="mailto:contact@ruunion.com" method="post" enctype="text/plain">
			<span class="ru-eyebrow"><?php esc_html_e( 'Message', 'ruunion-theme' ); ?></span>
			<h2><?php esc_html_e( 'Écrire à RU Union', 'ruunion-theme' ); ?></h2>
			<p><?php esc_html_e( 'Décrivez votre demande, nous reviendrons vers vous dès que possible.', 'ruunion-theme' ); ?></p>

			<label for="ru-contact-name"><?php esc_html_e( 'Nom', 'ruunion-theme' ); ?> <span aria-hidden="true">*</span></label>
			<input id="ru-contact-name" name="nom" type="text" autocomplete="name" required>

			<label for="ru-contact-email"><?php esc_html_e( 'Email', 'ruunion-theme' ); ?> <span aria-hidden="true">*</span></label>
			<input id="ru-contact-email" name="email" type="email" autocomplete="email" required>

			<label for="ru-contact-phone"><?php esc_html_e( 'Téléphone', 'ruunion-theme' ); ?> <small><?php esc_html_e( 'optionnel', 'ruunion-theme' ); ?></small></label>
			<input id="ru-contact-phone" name="telephone" type="tel" autocomplete="tel">

			<label for="ru-contact-subject"><?php esc_html_e( 'Sujet', 'ruunion-theme' ); ?> <span aria-hidden="true">*</span></label>
			<input id="ru-contact-subject" name="sujet" type="text" required>

			<label for="ru-contact-message"><?php esc_html_e( 'Message', 'ruunion-theme' ); ?> <span aria-hidden="true">*</span></label>
			<textarea id="ru-contact-message" name="message" rows="7" required></textarea>

			<button class="ru-button ru-button--primary" type="submit"><?php esc_html_e( 'Envoyer le message', 'ruunion-theme' ); ?></button>
		</form>

		<aside class="ru-contact-map ru-card-premium">
			<span class="ru-eyebrow"><?php esc_html_e( 'Localisation', 'ruunion-theme' ); ?></span>
			<h2><?php esc_html_e( 'RU Union agit depuis le terrain', 'ruunion-theme' ); ?></h2>
			<p><?php esc_html_e( 'La localisation précise sera confirmée selon les rendez-vous, tournages ou événements.', 'ruunion-theme' ); ?></p>
			<div class="ru-map-placeholder" role="img" aria-label="<?php esc_attr_e( 'Carte illustrative de localisation RU Union', 'ruunion-theme' ); ?>">
				<div>
					<strong><?php esc_html_e( 'Localisation RU Union', 'ruunion-theme' ); ?></strong>
					<span><?php esc_html_e( 'Rencontres, projections et actions solidaires', 'ruunion-theme' ); ?></span>
				</div>
			</div>
		</aside>
	</div>
	<?php if ( trim( get_the_content() ) ) : ?>
	<div class="ru-container ru-prose ru-contact-content">
		<article <?php post_class(); ?>><?php the_content(); ?></article>
	</div>
	<?php endif; ?>
</section>
<?php endwhile; ?>
<?php get_footer(); ?>
