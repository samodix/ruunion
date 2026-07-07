---
name: wordpress-theme-builder
description: Construction et maintenance de thème WordPress custom, notamment RU Union Theme. À utiliser pour templates PHP, Customizer, logo, WooCommerce templates, sécurité PHP, responsive et intégration WordPress sans Elementor.
---

# WordPress Theme Builder

Créer un thème WordPress classique, léger et maintenable. Ne pas dépendre d’Elementor ni d’un page builder.

## Fichiers clés

- `style.css`
- `functions.php`
- `header.php`
- `footer.php`
- `front-page.php`
- `page.php`
- `single-film.php`
- `archive-film.php`
- templates WooCommerce si nécessaire

## Obligatoire

- `wp_head()`
- `wp_footer()`
- `body_class()`
- `post_class()` quand pertinent
- `esc_html()`, `esc_url()`, `esc_attr()`, `wp_kses_post()`
- `add_theme_support('title-tag')`
- `add_theme_support('post-thumbnails')`
- `add_theme_support('custom-logo')`
- `add_theme_support('woocommerce')`
- menus WordPress via `register_nav_menus`
- assets via `wp_enqueue_scripts`

## Logo / Customizer

Intégrer le logo principal via `custom-logo`. Ajouter les options spécifiques seulement si nécessaires, avec sanitization. Prévoir fallback local thème.

## Sécurité

Échapper toute sortie. Ne pas faire de requêtes SQL directes sans nécessité. Ne jamais coder de secrets.

## Responsive

Tester mobile, tablette, desktop. Aucun débordement horizontal. Images fluides et non déformées.

