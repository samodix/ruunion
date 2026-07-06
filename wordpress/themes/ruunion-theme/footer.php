</main>
<footer class="ru-footer">
	<div class="ru-footer__glow" aria-hidden="true"></div>
	<div class="ru-container">
		<div class="ru-footer__intro"><span class="ru-eyebrow">RU Union</span><h2>L’union des plus humains</h2><p>Des films, des récits et des actions pour créer du lien, soutenir les projets humains et faire grandir une solidarité concrète.</p></div>
		<div class="ru-footer__grid">
			<div><h3><?php esc_html_e( 'Nous écrire', 'ruunion-theme' ); ?></h3><a href="mailto:contact@ruunion.com">contact@ruunion.com</a><p><?php esc_html_e( 'Une question, un partenariat ou une envie d’aider ? Notre équipe vous répond.', 'ruunion-theme' ); ?></p></div>
			<div><h3><?php esc_html_e( 'Navigation', 'ruunion-theme' ); ?></h3><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Accueil', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( ruunion_theme_page_url( 'association' ) ); ?>"><?php esc_html_e( 'Association', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( get_post_type_archive_link( 'film' ) ?: ruunion_theme_page_url( 'films' ) ); ?>"><?php esc_html_e( 'Films', 'ruunion-theme' ); ?></a></div>
			<div><h3><?php esc_html_e( 'Soutenir', 'ruunion-theme' ); ?></h3><a href="<?php echo esc_url( function_exists( 'wc_get_page_permalink' ) ? wc_get_page_permalink( 'shop' ) : ruunion_theme_page_url( 'boutique' ) ); ?>"><?php esc_html_e( 'Découvrir les packs', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( ruunion_theme_page_url( 'contact' ) ); ?>"><?php esc_html_e( 'Devenir partenaire', 'ruunion-theme' ); ?></a></div>
			<div><h3><?php esc_html_e( 'Informations', 'ruunion-theme' ); ?></h3><a href="<?php echo esc_url( ruunion_theme_page_url( 'mentions-legales' ) ); ?>"><?php esc_html_e( 'Mentions légales', 'ruunion-theme' ); ?></a><a href="<?php echo esc_url( ruunion_theme_page_url( 'politique-confidentialite' ) ); ?>"><?php esc_html_e( 'Confidentialité', 'ruunion-theme' ); ?></a></div>
		</div>
		<div class="ru-footer__bottom"><span>Copyright © RU Union. Tous droits réservés.</span><span>Cinéma · Solidarité · Projets humains</span></div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
