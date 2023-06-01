<?php

/*
Plugin Name: Dynamic Iframe for Gutenberg
Plugin URI: https://wordpress.org/plugins/dynamic-iframe-for-wp/
Description: Easily insert iframes into the block editor.
Author: Adeleye Ayodeji
Version: 1.0.0
Author URI: http://adeleyeayodeji.com
License: GPLv2 or later
Text Domain: dynamic-iframe-for-wp
*/

//security
if (!defined('ABSPATH')) {
    exit('You must not access this file directly.');
}

/*
 * Init plugin
 */

class DynamicIframeForGutenbergBlocks
{

    private $slug;

    public function __construct($slug)
    {

        $this->slug = $slug;
        add_action('enqueue_block_assets', array($this, 'enqueue_block_assets'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_block_editor_assets'));
    }

    function enqueue_block_assets()
    {
        wp_enqueue_style(
            $this->slug . '-style',
            plugin_dir_url(__FILE__) . 'build/style-index.css',
            array('wp-editor')
        );
    }

    function enqueue_block_editor_assets()
    {

        wp_enqueue_script(
            $this->slug,
            plugin_dir_url(__FILE__) . 'build/index.js',
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor')
        );

        wp_enqueue_style(
            $this->slug . '-editor',
            plugin_dir_url(__FILE__) . 'build/index.css',
            array('wp-edit-blocks')
        );
    }
}

//init
new DynamicIframeForGutenbergBlocks('dynamic-iframe-for-wp');
