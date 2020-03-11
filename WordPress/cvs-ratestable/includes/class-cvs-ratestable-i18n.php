<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Rates_Table
 * @subpackage Clearviewsys_Rates_Table/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Clearviewsys_Rates_Table
 * @subpackage Clearviewsys_Rates_Table/includes
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Rates_Table_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'cvs-ratestable',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
