<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Calculator
 * @subpackage Clearviewsys_Calculator/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Calculator
 * @subpackage Clearviewsys_Calculator/admin
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Calculator_Admin {

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
	 * Holds the values to be used in the fields callbacks
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      array    $options    The values to be used in the fields callbacks.
	 */
	private $options;	

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    		The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;		

		$this->gen_options 	= get_option('cvs_general_options');
		$this->options 		= get_option('cvs_calc_options');

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		$screen = get_current_screen();

		if ( 'clearviewsys_page_cvs-calc-settings' == $screen->base ) :

			wp_enqueue_style( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'css/cvs-calc-admin.css', 
				null, 
				$this->version, 
				'all' 
			);

		endif;

		wp_enqueue_style( 
			$this->plugin_name . '-general', 
			plugin_dir_url( __FILE__ ) . 'css/cvs-calc-admin-general.css', 
			null, 
			$this->version, 
			'all' 
		);

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		$screen = get_current_screen();

		if ( 'clearviewsys_page_cvs-calc-settings' == $screen->base ) :

			wp_enqueue_script( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'js/cvs-calc-admin.js', 
				array( 
					'jquery',				
				), 
				$this->version, 
				false 
			);

		endif;

	}

/* ================================================================================================
# Settings API - Options Page
================================================================================================ */

	/**
	 * Add options page
	 */
	public function add_plugin_page() {

		if ( empty( $GLOBALS['admin_page_hooks']['cvs-general'] ) ) :

			add_menu_page(
				__('ClearViewSys', 'cvs-calc' ), 				// page title
				__('ClearViewSys', 'cvs-calc' ),   				// menu title
				'manage_options', 								// capability
				'cvs-general', 									// menu-slug
				NULL, 											// callback function
				'none', 										// icon_url
				30 												// position
			);

			add_submenu_page(
				'cvs-general',
				__('ClearViewSys - General Info & Settings', 'cvs-calc' ),
				__('General', 'cvs-marquee' ),
				'manage_options', 							
				'cvs-general',
				array( $this, 'create_general_cb' ),
				0
			);		

		endif;

	    add_submenu_page(
	        'cvs-general', 										// parent slug
			__( 'CVS Calculator', 'cvs-calc' ), 				// parent title
	        __( 'CVS Calculator', 'cvs-calc' ), 				// menu title
	        'manage_options', 									// capability
	        'cvs-calc-settings', 								// menu slug
	        array( $this, 'create_admin_page_cb'),				// callback function
	        20 													// position
		);
		
	}

	/**
	 * Options page callback
	 */
	public function create_general_cb() {
		
		// Set class property
		// $this->options = get_option( 'cvs_gen_options' );
		?>
		
		<div class="wrap">
		
			<h1><?php printf( __('%s General Information', 'cvs-calc'), '<span>ClearViewSys</span>' ); ?></h1>
		
			<form method="post" action="options.php">

				<?php
				// This prints out all hidden setting fields
				
				settings_fields( 'cvs_general_option_group' ); 			// Option group
				do_settings_sections( 'section-general-settings' );
				
				submit_button(); 
				?>
			
			</form>
		
		</div>
		
		<?php
	}	
	
	/**
	 * Options page callback
	 */
	public function create_admin_page_cb() {
		
		// Set class property
		$this->options = get_option( 'cvs_calc_options' );
		?>
		
		<div class="wrap">
		
			<h1><?php printf( __('%s Settings', 'cvs-calc'), '<span>ClearViewSys Rates Table</span>' ); ?></h1>
		
			<form method="post" action="options.php">

				<?php
				// This prints out all hidden setting fields
				settings_fields( 'cvs_calc_option_group' ); 			// Option group
				do_settings_sections( 'section-calculator-labels' ); 
				do_settings_sections( 'section-calculator-settings' ); 				 
				
				submit_button(); ?>
			
			</form>
		
		</div>

		<div class="attributions" style="border-top: #ddd solid 1px; margin-top: 30px; padding: 10px 0 30px; box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, .5);">
			
			<div class="attr-flaticon">

				<p style="margin: 0; font-size: .84em; line-height: 1.56em; font-style: italic;">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>

			</div>

		</div>		
		
		<?php
	}

/* ================================================================================================
# Settings API - Register Settings
================================================================================================ */

	/**
	 * Register and add settings
	 */
	public function page_init() {        

		/* General Settings -------------------------------------------------------------------- */

		// We only resgister general plugin settings if the current one is the first CVS plugin.
		// Constants are good to work this out.
		if ( !defined('GENERAL_CVS_OPTIONS_DEFINED') ) :

			// Setting
			register_setting(
				'cvs_general_option_group', 						// Option group
				'cvs_general_options', 								// Option name
				array( $this, 'sanitize_general' ) 					// Sanitize
			);

			// Sections
			add_settings_section(
				'section_general', 									// id
				'General Settings', 								// title
				array( $this, 'section_info_general' ), 			// callback
				'section-general-settings' 							// page
			);

			// Fields
			add_settings_field(
				'cvs_folder_url',
				'CVS base folder location', 
				array( $this, 'cvs_folder_url_cb' ),
				'section-general-settings',
				'section_general'           
			);

			define( 'GENERAL_CVS_OPTIONS_DEFINED', true );		

		endif;

		/* Calculator Settings ----------------------------------------------------------------- */

		// Setting
		register_setting(
			'cvs_calc_option_group', 							// Option group
			'cvs_calc_options', 								// Option name
			array( $this, 'sanitize' ) 							// Sanitize
		);

		// Sections
		add_settings_section(
			'section_calc', 									// id
			'Calculator Labels', 								// title
			array( $this, 'section_info_calc' ), 				// callback
			'section-calculator-labels' 						// page
		);

		add_settings_section(
			'section_calc_settings',
			'Calculator Settings',
			array( $this, 'section_info_calc_settings' ),
			'section-calculator-settings'
		);		

		// Fields
		add_settings_field(
			'ibuy_label',
			'Custom "We Buy" Button Label', 
			array( $this, 'ibuy_label_cb' ),
			'section-calculator-labels',
			'section_calc'           
		);

		add_settings_field(
			'isell_label',
			'Custom "We Sell" Button Label', 
			array( $this, 'isell_label_cb' ),
			'section-calculator-labels',
			'section_calc'           
		);

		add_settings_field(
			'youpay_label',
			'Custom "You Pay" Field Label', 
			array( $this, 'youpay_label_cb' ),
			'section-calculator-labels',
			'section_calc'           
		);

		add_settings_field(
			'youreceive_label',
			'Custom "You Receive" Field Label', 
			array( $this, 'youreceive_label_cb' ),
			'section-calculator-labels',
			'section_calc'           
		);

		add_settings_field(
			'freq',
			'Update Frequency (in milliseconds)', 
			array( $this, 'freq_cb' ),
			'section-calculator-settings',
			'section_calc_settings'           
		);		     

	}

/* ================================================================================================
# Settings API - Callbacks
================================================================================================ */

/* Sanitize ------------------------------------------------------------------------------------ */

	/**
	 * Sanitize general settings
	 *
	 * @param array $input Contains all settings fields as array keys
	 */
	public function sanitize_general( $input ) {

		$new_input = array();

		if( isset( $input['cvs_folder_url'] ) ) :

			if ( '' !== $input['cvs_folder_url'] ) :
				$new_input['cvs_folder_url'] = sanitize_text_field( $input['cvs_folder_url'] );
			else :
				$new_input['cvs_folder_url'] = '/wp-content';
			endif;

		else :

			$new_input['cvs_folder_url'] = '/wp-content';

		endif;

		return $new_input;	

	}

	/**
	 * Sanitize calc settings
	 *
	 * @param array $input Contains all settings fields as array keys
	 */
	public function sanitize( $input ) {

		$new_input = array();
		
		if( isset( $input['ibuy_label'] ) )
			$new_input['ibuy_label'] = sanitize_text_field( $input['ibuy_label'] );

		if( isset( $input['isell_label'] ) )
			$new_input['isell_label'] = sanitize_text_field( $input['isell_label'] );

		if( isset( $input['youpay_label'] ) )
			$new_input['youpay_label'] = sanitize_text_field( $input['youpay_label'] );

		if( isset( $input['youreceive_label'] ) )
			$new_input['youreceive_label'] = sanitize_text_field( $input['youreceive_label'] );

		if( isset( $input['freq'] ) ) :

			if ( 
					( '' !== $input['freq'] ) 	&&
					( intval( $input['freq'] ) >= 0 )
				) :
				$new_input['freq'] = absint( $input['freq'] );
			else :
				$new_input['freq'] = '3000';
			endif;

		else :

			$new_input['freq'] = '3000';

		endif;

		return $new_input;	

	}

/* General Settings ---------------------------------------------------------------------------- */

	// Callbacks
	public function section_info_general() {
		//print 'Enter your settings below:';
	}

	public function cvs_folder_url_cb() {
		printf(
			'<input type="text" id="cvs_folder_url" name="cvs_general_options[cvs_folder_url]" value="%s" />',
			isset( $this->gen_options['cvs_folder_url'] ) 
				? ( '' == $this->gen_options['cvs_folder_url'] ) 
					? '/wp-content'
					: esc_attr( $this->gen_options['cvs_folder_url']) 
				: '/wp-content'
		);

		$info_Str = __('Update this field\'s value if you move the base CVS folder anywhere else then the `wp-admin` subfolder of your website\'s WordPress root.<br /> The field accepts a full url or a location relative to the WordPress root.', 'cvs-calc' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}

/* Calculator Settings ------------------------------------------------------------------------- */

	/** 
	 * Print the Section text
	 */
	public function section_info_calc() {
		// print 'Enter your settings below:';
	}

	public function ibuy_label_cb() {
		printf(
			'<input type="text" id="ibuy_label" name="cvs_calc_options[ibuy_label]" value="%s" />',
			isset( $this->options['ibuy_label'] ) ? esc_attr( $this->options['ibuy_label']) : ''
		);
	}

	public function isell_label_cb() {
		printf(
			'<input type="text" id="isell_label" name="cvs_calc_options[isell_label]" value="%s" />',
			isset( $this->options['isell_label'] ) ? esc_attr( $this->options['isell_label']) : ''
		);
	}

	public function youpay_label_cb() {
		printf(
			'<input type="text" id="youpay_label" name="cvs_calc_options[youpay_label]" value="%s" />',
			isset( $this->options['youpay_label'] ) ? esc_attr( $this->options['youpay_label']) : ''
		);
	}

	public function youreceive_label_cb() {
		printf(
			'<input type="text" id="youreceive_label" name="cvs_calc_options[youreceive_label]" value="%s" />',
			isset( $this->options['youreceive_label'] ) ? esc_attr( $this->options['youreceive_label']) : ''
		);
	}  

	public function section_info_calc_settings() {
		//print 'Set the frequency of checking for rate updates (in milliseconds):';
	}	          

	public function freq_cb() {
		printf(
			'<input type="number" id="freq" name="cvs_calc_options[freq]" value="%s" />',
			isset( $this->options['freq'] ) 
				? ( $this->options['freq'] >= 0 )
					? esc_attr( $this->options['freq'])
					: '3000' 
				: '3000'
		);

		$info_Str = __('Set this to 0 if you don\'t need rate values to be regularly refreshed.', 'cvs-calc' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	} 	

}
