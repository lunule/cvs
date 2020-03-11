<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://www.clearviewsys.com/
 * @since             1.0.0
 * @package           Clearviewsys_Marquee
 *
 * @wordpress-plugin
 * Plugin Name:       Clearviewsys Marquee
 * Plugin URI:        http://www.clearviewsys.com/
 * Description:       ClearViewSys marquee/ticker plugin.
 * Version:           1.0.0
 * Author:            ClearViewSys
 * Author URI:        http://www.clearviewsys.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cvs-marquee
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'CVS_MARQUEE_VERSION', '1.0.0' );

/**
 * Define XML url
 */
define( 'CVS_MARQUEE_XML_URL', plugin_dir_url( __FILE__ ) . 'public/xml/rateswithcss.xml' );

/**
 * Define flags parent folder url
 */
define( 'CVS_MARQUEE_IMGS_URL', plugin_dir_url( __FILE__ ) . 'public/img/' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-cvs-marquee-activator.php
 */
function activate_cvs_marquee() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cvs-marquee-activator.php';
	Clearviewsys_Marquee_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-cvs-marquee-deactivator.php
 */
function deactivate_cvs_marquee() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cvs-marquee-deactivator.php';
	Clearviewsys_Marquee_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_cvs_marquee' );
register_deactivation_hook( __FILE__, 'deactivate_cvs_marquee' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-cvs-marquee.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_cvs_marquee() {

	$plugin = new Clearviewsys_Marquee();
	$plugin->run();

}
run_cvs_marquee();
