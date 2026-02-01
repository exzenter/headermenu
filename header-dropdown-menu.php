<?php
/**
 * Plugin Name: Header Dropdown Menu Block
 * Description: Professional header dropdown menu with two-part trigger/content blocks and overlay positioning.
 * Version: 1.0.0
 * Author: Antigravity
 * Text Domain: header-dropdown-menu
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the blocks using their metadata.
 */
function header_dropdown_menu_register_blocks() {
	// Register Trigger Block
	register_block_type( __DIR__ . '/build/trigger' );

	// Register Dropdown Block
	register_block_type( __DIR__ . '/build/dropdown' );
}
add_action( 'init', 'header_dropdown_menu_register_blocks' );

/**
 * Enqueue frontend scripts for interactivity
 */
function header_dropdown_menu_enqueue_assets() {
    // Check if the trigger block is present on the page before loading the view script
    // Note: WordPress 6.0+ usually handles view scripts automatically via block.json 'viewScript',
    // but we ensure it's properly handled here if needed or for extra global logic.
    // In our case, block.json handles it using the Script Modules API or standard wp_enqueue_script.
    
    // We can rely on block.json's "viewScript" to load build/trigger-view.js
}
add_action( 'wp_enqueue_scripts', 'header_dropdown_menu_enqueue_assets' );

/**
 * Add unique ID to blocks if not manually set (fallback helper, though JS side handles this best usually)
 */
function header_dropdown_render_callback( $block_content, $block ) {
	// Implementation note: We are relying on JS helper to generate IDs for editing experience,
    // but if we need PHP render callbacks they would go here. 
    // Currently relying on static rendering save methods in JS.
	return $block_content;
}
