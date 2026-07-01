<?php
/**
 * Angling Destinations Custom Theme Functions
 *
 * This file handles asset management, navigation refactoring, and security
 * structures implemented during the legacy platform migration.
 *
 * @package AnglingDestinations
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Defensive Design: Prevent direct script access
}

class Angling_Destinations_Theme {

    /**
     * Initialize theme hooks
     */
    public function __construct() {
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_theme_assets' ] );
        add_action( 'after_setup_theme', [ $this, 'register_optimized_navigation' ] );
        add_filter( 'script_loader_tag', [ $this, 'enable_asynchronous_scripts' ], 10, 2 );
    }

    /**
     * Enqueue CSS styles and native JavaScript asset loops cleanly
     */
    public function enqueue_theme_assets() {
        // Enqueue global layout stylesheets
        wp_enqueue_style( 
            'angling-destinations-main', 
            get_template_directory_uri() . '/style.css', 
            [], 
            '1.0.0' 
        );

        // Enqueue custom JavaScript engine for handling recovered archive data structures
        wp_enqueue_script( 
            'archival-viewer-engine', 
            get_template_directory_uri() . '/js/archive-engine.js', 
            [], 
            '1.0.0', 
            true // Load in footer for optimized critical rendering path performance
        );
    }

    /**
     * Refactor legacy "maze-like" menu systems into normalized WordPress navigation objects
     */
    public function register_optimized_navigation() {
        register_nav_menus( [
            'primary-menu' => esc_html__( 'Primary Header Navigation', 'angling-destinations' ),
            'footer-menu'  => esc_html__( 'Optimized Footer Directory', 'angling-destinations' ),
        ] );

        // Add support for semantic HTML5 elements and high-fidelity images
        add_theme_support( 'html5', [ 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ] );
        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'title-tag' );
    }

    /**
     * Performance Engineering: Inject async attributes into enqueued script compilation layers
     *
     * @param string $tag    The <script> tag.
     * @param string $handle The script identifier handle.
     */
    public function enable_asynchronous_scripts( $tag, $handle ) {
        if ( 'archival-viewer-engine' !== $handle ) {
            return $tag;
        }
        return str_replace( ' src', ' async="async" src', $tag );
    }
}

// Instantiation of the theme engine object layer
new Angling_Destinations_Theme();
