</main>
<footer class="ru-footer">
	<div class="ru-footer__glow" aria-hidden="true"></div>
	<div class="ru-container">
		<div class="ru-footer__intro">
			<a class="footer-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="<?php esc_attr_e( 'Accueil RU Union', 'ruunion-theme' ); ?>">
				<?php
				$footer_logo_url = get_theme_mod( 'ruunion_footer_logo' );
				if ( ! empty( $footer_logo_url ) ) {
					printf( '<img src="%s" alt="%s" width="440" height="240">', esc_url( $footer_logo_url ), esc_attr__( 'RU Union — L’union des plus humains', 'ruunion-theme' ) );
				} elseif ( has_custom_logo() ) {
					$custom_logo_id = get_theme_mod( 'custom_logo' );
					$logo_img       = wp_get_attachment_image_src( $custom_logo_id, 'full' );
					if ( $logo_img ) {
						printf( '<img src="%s" alt="%s" width="440" height="240">', esc_url( $logo_img[0] ), esc_attr__( 'RU Union — L’union des plus humains', 'ruunion-theme' ) );
					} else {
						?><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo-ruunion.webp' ); ?>" alt="<?php echo esc_attr__( 'RU Union — L’union des plus humains', 'ruunion-theme' ); ?>" width="440" height="240"><?php
					}
				} else {
					?><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo-ruunion.webp' ); ?>" alt="<?php echo esc_attr__( 'RU Union — L’union des plus humains', 'ruunion-theme' ); ?>" width="440" height="240"><?php
				}
				?>
			</a>
			<h2><?php esc_html_e( 'L’union des plus humains', 'ruunion-theme' ); ?></h2>
			<p><?php esc_html_e( 'Des films, des récits et des actions pour créer du lien, soutenir les projets humains et faire grandir une solidarité concrète.', 'ruunion-theme' ); ?></p>
		</div>
		<div class="ru-footer__grid">
			<div class="ru-footer__mission"><h3><?php esc_html_e( 'Mission', 'ruunion-theme' ); ?></h3><p><?php esc_html_e( 'Réunir les personnes autour de films, d’actions solidaires et de récits capables de remettre l’humain au centre.', 'ruunion-theme' ); ?></p><a href="mailto:contact@ruunion.com">contact@ruunion.com</a></div>
			<div><h3><?php esc_html_e( 'Vision', 'ruunion-theme' ); ?></h3><p><?php esc_html_e( 'Créer un pont sensible entre cinéma, entraide et engagement concret.', 'ruunion-theme' ); ?></p><a href="<?php echo esc_url( ruunion_theme_page_url( 'association' ) ); ?>"><?php esc_html_e( 'Découvrir l’association', 'ruunion-theme' ); ?></a></div>
			<div><h3><?php esc_html_e( 'Liens utiles', 'ruunion-theme' ); ?></h3><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Accueil', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( get_post_type_archive_link( 'film' ) ?: ruunion_theme_page_url( 'films' ) ); ?>"><?php esc_html_e( 'Films', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>"><?php esc_html_e( 'Packs de soutien', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( ruunion_theme_page_url( 'contact' ) ); ?>"><?php esc_html_e( 'Contact', 'ruunion-theme' ); ?></a></div>
			<div>
				<h3><?php esc_html_e( 'Newsletter', 'ruunion-theme' ); ?></h3>
				<p><?php esc_html_e( 'Recevoir les nouvelles des tournages, projections et appels à soutien.', 'ruunion-theme' ); ?></p>
				<form class="ru-newsletter" action="<?php echo esc_url( ruunion_theme_page_url( 'contact' ) ); ?>" method="get">
					<label class="screen-reader-text" for="ru-newsletter-email"><?php esc_html_e( 'Email', 'ruunion-theme' ); ?></label>
					<input id="ru-newsletter-email" type="email" placeholder="email@exemple.com">
					<button class="ru-button ru-button--primary" type="submit"><?php esc_html_e( 'Suivre', 'ruunion-theme' ); ?></button>
				</form>
				<div class="ru-socials" aria-label="<?php esc_attr_e( 'Réseaux sociaux', 'ruunion-theme' ); ?>">
					<a href="#" aria-label="<?php esc_attr_e( 'Facebook RU Union', 'ruunion-theme' ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h2V5h-2c-2.8 0-4 1.7-4 4v2H8v3h2v7h3v-7h2.3l.7-3h-3V9c0-.7.3-1 1-1Z"/></svg></a>
					<a href="#" aria-label="<?php esc_attr_e( 'Instagram RU Union', 'ruunion-theme' ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z"/></svg></a>
					<a href="#" aria-label="<?php esc_attr_e( 'LinkedIn RU Union', 'ruunion-theme' ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9H3.3v12h3.2V9ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3Zm15.8 11c0-3.2-1.7-5.2-4.4-5.2-1.7 0-2.8.9-3.3 1.8V9H9.8v12H13v-6.4c0-1.7.8-2.8 2.2-2.8 1.3 0 2.2.9 2.2 2.8V21h3.3v-7Z"/></svg></a>
					<a href="#" aria-label="<?php esc_attr_e( 'YouTube RU Union', 'ruunion-theme' ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1C2 9 2 12 2 12s0 3 .4 4.8a3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1C22 15 22 12 22 12s0-3-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"/></svg></a>
					<a href="mailto:contact@ruunion.com" aria-label="<?php esc_attr_e( 'Envoyer un email à RU Union', 'ruunion-theme' ); ?>"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm8 7 8-5H4l8 5Zm0 2.3L4 9.4V17h16V9.4l-8 4.9Z"/></svg></a>
				</div>
			</div>
		</div>
		<div class="ru-footer__bottom"><span><?php esc_html_e( 'Copyright © RU Union. Tous droits réservés.', 'ruunion-theme' ); ?></span><span><a href="<?php echo esc_url( ruunion_theme_page_url( 'mentions-legales' ) ); ?>"><?php esc_html_e( 'Mentions', 'ruunion-theme' ); ?></a> · <a href="<?php echo esc_url( ruunion_theme_page_url( 'politique-confidentialite' ) ); ?>"><?php esc_html_e( 'Politique', 'ruunion-theme' ); ?></a> · <?php esc_html_e( 'Développé avec cœur', 'ruunion-theme' ); ?></span></div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
