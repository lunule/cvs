<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Calculator
 * @subpackage Clearviewsys_Calculator/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Calculator
 * @subpackage Clearviewsys_Calculator/public
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Calculator_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Clearviewsys_Calculator_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Clearviewsys_Calculator_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name . '-googlefonts', 'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap', array(), $this->version, 'all' );

		wp_enqueue_style( 
			$this->plugin_name, 
			plugin_dir_url( __FILE__ ) . 'css/cvs-calc-public.css', 
			null, 
			$this->version, 
			'all' 
		);

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Clearviewsys_Calculator_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Clearviewsys_Calculator_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_register_script( 
			$this->plugin_name, 
			plugin_dir_url( __FILE__ ) . 'js/cvs-calc-public.js', 
			array('jquery'), 
			$this->version, 
			true 
		);

		$translation_array = array(
			'xmlUrl' 			=> CVS_CALC_XML_URL,
		);
		wp_localize_script( $this->plugin_name, 'cvsCalc', $translation_array );

		wp_enqueue_script( $this->plugin_name );

	}

}
