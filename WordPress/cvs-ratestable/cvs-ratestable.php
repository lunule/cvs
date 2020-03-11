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
 * @package           Clearviewsys_Ratestable
 *
 * @wordpress-plugin
 * Plugin Name:       Clearviewsys Ratestable
 * Plugin URI:        http://www.clearviewsys.com/
 * Description:       ClearViewSys rates table plugin.
 * Version:           1.0.0
 * Author:            ClearViewSys
 * Author URI:        http://www.clearviewsys.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       cvs-ratestable
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
define( 'CVS_RATES_TABLE_VERSION', '1.0.0' );

/**
 * Define XML url
 */
define( 'CVS_RATES_TABLE_XML_URL', plugin_dir_url( __FILE__ ) . 'public/xml/rateswithcss.xml' );

/**
 * Define flags parent folder url
 */
define( 'CVS_RATES_TABLE_IMGS_URL', plugin_dir_url( __FILE__ ) . 'public/img/' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-cvs-ratestable-activator.php
 */
function activate_cvs_ratestable() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cvs-ratestable-activator.php';
	Clearviewsys_Rates_Table_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-cvs-ratestable-deactivator.php
 */
function deactivate_cvs_ratestable() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-cvs-ratestable-deactivator.php';
	Clearviewsys_Rates_Table_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_cvs_ratestable' );
register_deactivation_hook( __FILE__, 'deactivate_cvs_ratestable' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-cvs-ratestable.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_cvs_ratestable() {

	$plugin = new Clearviewsys_Rates_Table();
	$plugin->run();

}
run_cvs_ratestable();
