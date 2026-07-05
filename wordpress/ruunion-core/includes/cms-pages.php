<?php
/** Pages CMS/headless et métadonnées Yoast de RU Union. */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function ruunion_cms_pages_definition() {
	return array(
		'accueil' => array(
			'title'       => 'Accueil',
			'seo_title'   => 'RU Union — Films solidaires et projets humains',
			'description' => 'RU Union crée des films porteurs de sens pour soutenir des projets humains, solidaires et associatifs.',
			'content'     => '<h1>Des films pour raconter, relier et soutenir</h1><p>RU Union développe des projets cinématographiques porteurs de sens. Chaque film devient une passerelle entre les histoires humaines, la solidarité et le soutien concret aux actions de l’association.</p><p>Nous faisons du cinéma un espace de rencontre : un lieu où les fragilités peuvent être entendues, où les aidants trouvent un écho et où l’inclusion devient une histoire partagée.</p><p><strong>Découvrir les films</strong> · <strong>Soutenir le projet</strong></p>',
		),
		'association' => array(
			'title'       => 'Association',
			'seo_title'   => 'Association RU Union — L’union des plus humains',
			'description' => 'Découvrez RU Union, une association qui utilise le cinéma, la solidarité et la narration pour porter des projets humains.',
			'content'     => '<h1>Une union au service de l’humain</h1><p>RU Union est née d’une conviction simple : les histoires peuvent ouvrir des portes, créer du lien et donner de la force à celles et ceux que la vie met à l’épreuve.</p><p>Nos films et nos actions rapprochent les publics, les artistes, les familles, les aidants et les partenaires autour de projets concrets. Nous avançons avec écoute, dignité et transparence.</p>',
		),
		'equipe' => array(
			'title'       => 'Équipe',
			'seo_title'   => 'Équipe RU Union — Les visages derrière le projet',
			'description' => 'Rencontrez les personnes qui portent RU Union, ses films, ses actions et son engagement humain.',
			'content'     => '<h1>Des sensibilités réunies par un même engagement</h1><p>RU Union rassemble des personnes venues du cinéma, de la création, du monde associatif et de l’accompagnement. Chacune apporte son regard pour transformer une intention généreuse en action juste.</p><p>Cette équipe se construit dans le dialogue, au plus près des histoires racontées et des personnes concernées.</p>',
		),
		'films' => array(
			'title'       => 'Films',
			'seo_title'   => 'Films RU Union — Cinéma solidaire et histoires humaines',
			'description' => 'Découvrez les films produits ou accompagnés par RU Union, leurs histoires, leurs objectifs et les manières de les soutenir.',
			'content'     => '<h1>Nos films solidaires</h1><p>Chaque film porté par RU Union raconte une part d’humanité. Certains sont en production, d’autres déjà terminés ou en diffusion. Tous participent à faire vivre un projet plus grand : soutenir l’association et ses actions.</p><p>Les objectifs de collecte rendent visible le chemin qui reste à parcourir et la force de chaque contribution.</p>',
		),
		'boutique' => array(
			'title'       => 'Boutique',
			'seo_title'   => 'Soutenir RU Union — Packs de soutien et dons',
			'description' => 'Participez aux projets RU Union grâce aux packs de soutien liés aux films et aux actions de l’association.',
			'content'     => '<h1>Soutenir RU Union</h1><p>Choisissez un pack de soutien et participez au développement des films et des actions de RU Union. Chaque contribution aide à faire avancer une histoire, une production et un engagement humain.</p><p>Les paiements réels ne sont pas encore activés dans cet environnement local.</p>',
		),
		'contact' => array(
			'title'       => 'Contact',
			'seo_title'   => 'Contact RU Union — Soutenir, proposer, échanger',
			'description' => 'Contactez RU Union pour soutenir un projet, devenir partenaire ou poser une question à l’association.',
			'content'     => '<h1>Parlons de votre soutien</h1><p>Une question, une proposition, un partenariat ou une envie d’aider ? L’équipe RU Union est à votre écoute.</p><p>Écrivez-nous à <a href="mailto:contact@ruunion.com">contact@ruunion.com</a>. Nous prendrons le temps de comprendre votre démarche et de vous répondre avec attention.</p>',
		),
		'mentions-legales' => array(
			'title'       => 'Mentions légales',
			'seo_title'   => 'Mentions légales — RU Union',
			'description' => 'Consultez les mentions légales du site RU Union.',
			'content'     => '<h1>Mentions légales</h1><p>Cette page centralise les informations légales de RU Union. Les informations définitives relatives à l’éditeur, à l’hébergement et à la direction de publication seront complétées avant la mise en production.</p><p>Contact : <a href="mailto:contact@ruunion.com">contact@ruunion.com</a>.</p>',
		),
		'politique-confidentialite' => array(
			'title'       => 'Politique de confidentialité',
			'seo_title'   => 'Politique de confidentialité — RU Union',
			'description' => 'Découvrez comment RU Union traite et protège les données personnelles.',
			'content'     => '<h1>Politique de confidentialité</h1><p>RU Union limite la collecte de données aux informations nécessaires pour répondre aux messages et accompagner les soutiens. Aucune donnée n’est vendue et aucun paiement réel n’est actif dans la version locale.</p><p>Pour toute question sur vos données, écrivez à <a href="mailto:contact@ruunion.com">contact@ruunion.com</a>.</p>',
		),
	);
}

function ruunion_find_existing_cms_page( $slug, $title ) {
	$page = get_page_by_path( $slug, OBJECT, 'page' );
	if ( $page ) {
		return $page;
	}

	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => array( 'publish', 'draft', 'private', 'pending' ),
			'posts_per_page' => -1,
		)
	);
	foreach ( $pages as $candidate ) {
		if ( 0 === strcasecmp( trim( $candidate->post_title ), $title ) ) {
			return $candidate;
		}
	}
	return null;
}

function ruunion_sync_cms_pages() {
	if ( '1.1.0' === get_option( 'ruunion_cms_pages_version' ) ) {
		return;
	}

	$page_ids = array();
	foreach ( ruunion_cms_pages_definition() as $slug => $definition ) {
		$existing = ruunion_find_existing_cms_page( $slug, $definition['title'] );
		$post     = array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $definition['title'],
			'post_name'    => $slug,
			'post_content' => $definition['content'],
			'post_excerpt' => $definition['description'],
		);
		if ( $existing ) {
			$post['ID'] = $existing->ID;
			$page_id    = wp_update_post( $post, true );
		} else {
			$page_id = wp_insert_post( $post, true );
		}

		if ( is_wp_error( $page_id ) ) {
			continue;
		}
		update_post_meta( $page_id, '_ruunion_headless_page', 1 );
		update_post_meta( $page_id, '_yoast_wpseo_title', $definition['seo_title'] );
		update_post_meta( $page_id, '_yoast_wpseo_metadesc', $definition['description'] );
		$page_ids[ $slug ] = $page_id;
	}

	if ( ! empty( $page_ids['boutique'] ) ) {
		update_option( 'woocommerce_shop_page_id', $page_ids['boutique'] );
	}
	update_option( 'ruunion_cms_page_ids', $page_ids );
	update_option( 'ruunion_cms_pages_version', '1.1.0' );
	flush_rewrite_rules( false );
}
add_action( 'init', 'ruunion_sync_cms_pages', 60 );
