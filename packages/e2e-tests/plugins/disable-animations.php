<?php
/**
 * Plugin Name: Gutenberg Test Plugin, Disables the CSS animations
 * Plugin URI: https://github.com/WordPress/gutenberg
 * Author: Gutenberg Team
 *
 * @package gutenberg-test-disable-animations
 */

/**
 * Enqueue CSS stylesheet disabling animations.
 */
function enqueue_disable_animations_stylesheet() {
	wp_register_style( 'gutenberg-disable-animations', null, array() );
	wp_enqueue_style( 'gutenberg-disable-animations' );
	$custom_css = '* { animation-duration: 0ms !important; }';
	wp_add_inline_style( 'gutenberg-disable-animations', $custom_css );
}

add_action( 'enqueue_block_editor_assets', 'enqueue_disable_animations_stylesheet' );
