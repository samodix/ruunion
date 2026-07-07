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
						?>
						<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo-ruunion.webp' ); ?>" alt="<?php echo esc_attr__( 'RU Union — L’union des plus humains', 'ruunion-theme' ); ?>" width="440" height="240">
						<?php
					}
				} else {
					?>
					<img src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo-ruunion.webp' ); ?>" alt="<?php echo esc_attr__( 'RU Union — L’union des plus humains', 'ruunion-theme' ); ?>" width="440" height="240">
					<?php
				}
				?>
			</a>
			<h2>L’union des plus humains</h2>
			<p>Des films, des récits et des actions pour créer du lien, soutenir les projets humains et faire grandir une solidarité concrète.</p>
		</div>
		<div class="ru-footer__grid">
			<div class="ru-footer__mission"><h3><?php esc_html_e( 'Mission', 'ruunion-theme' ); ?></h3><p><?php esc_html_e( 'Réunir les personnes autour de films, d’actions solidaires et de récits capables de remettre l’humain au centre.', 'ruunion-theme' ); ?></p><a href="mailto:contact@ruunion.com">contact@ruunion.com</a></div>
			<div><h3><?php esc_html_e( 'Vision', 'ruunion-theme' ); ?></h3><p><?php esc_html_e( 'Créer un pont sensible entre cinéma, entraide et engagement concret.', 'ruunion-theme' ); ?></p><a href="<?php echo esc_url( ruunion_theme_page_url( 'association' ) ); ?>"><?php esc_html_e( 'Découvrir l’association', 'ruunion-theme' ); ?></a></div>
			<div><h3><?php esc_html_e( 'Liens utiles', 'ruunion-theme' ); ?></h3><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Accueil', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( get_post_type_archive_link( 'film' ) ?: ruunion_theme_page_url( 'films' ) ); ?>"><?php esc_html_e( 'Films', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>"><?php esc_html_e( 'Packs de soutien', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( ruunion_theme_page_url( 'contact' ) ); ?>"><?php esc_html_e( 'Contact', 'ruunion-theme' ); ?></a></div>
			<div><h3><?php esc_html_e( 'Newsletter', 'ruunion-theme' ); ?></h3><p><?php esc_html_e( 'Recevoir les nouvelles des tournages, projections et appels à soutien.', 'ruunion-theme' ); ?></p><form class="ru-newsletter" action="<?php echo esc_url( ruunion_theme_page_url( 'contact' ) ); ?>" method="get"><label class="screen-reader-text" for="ru-newsletter-email"><?php esc_html_e( 'Email', 'ruunion-theme' ); ?></label><input id="ru-newsletter-email" type="email" placeholder="email@exemple.com"><button class="ru-button ru-button--primary" type="submit"><?php esc_html_e( 'Suivre', 'ruunion-theme' ); ?></button></form><div class="ru-socials" aria-label="<?php esc_attr_e( 'Réseaux sociaux', 'ruunion-theme' ); ?>"><a href="#" aria-label="Instagram">Instagram</a><a href="#" aria-label="Facebook">Facebook</a><a href="#" aria-label="YouTube">YouTube</a></div></div>
		</div>
		<div class="ru-footer__bottom"><span>Copyright © RU Union. Tous droits réservés.</span><span><a href="<?php echo esc_url( ruunion_theme_page_url( 'mentions-legales' ) ); ?>"><?php esc_html_e( 'Mentions', 'ruunion-theme' ); ?></a> · <a href="<?php echo esc_url( ruunion_theme_page_url( 'politique-confidentialite' ) ); ?>"><?php esc_html_e( 'Politique', 'ruunion-theme' ); ?></a> · <?php esc_html_e( 'Développé avec cœur', 'ruunion-theme' ); ?></span></div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
    
