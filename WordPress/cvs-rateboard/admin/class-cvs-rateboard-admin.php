<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Rateboard
 * @subpackage Clearviewsys_Rateboard/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Rateboard
 * @subpackage Clearviewsys_Rateboard/admin
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Rateboard_Admin {

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
		$this->options 		= get_option('cvs_rateboard_options');

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Clearviewsys_Rateboard_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Clearviewsys_Rateboard_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$screen = get_current_screen();

		if ( 'clearviewsys_page_cvs-rateboard-settings' == $screen->base ) :

			wp_enqueue_style( $this->plugin_name . '-dragula', plugin_dir_url( __FILE__ ) . 'css/dragula.min.css', NULL, $this->version, 'all' );

			wp_enqueue_style( $this->plugin_name . '-pickr-theme', plugin_dir_url( __FILE__ ) . 'css/nano.min.css', array(), $this->version, 'all' );

			wp_enqueue_style( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'css/cvs-rateboard-admin.css', 
				array(
					$this->plugin_name . '-pickr-theme',
					$this->plugin_name . '-dragula',
				), 
				$this->version, 
				'all' 
			);

		endif;

		wp_enqueue_style( 
			$this->plugin_name . '-general', 
			plugin_dir_url( __FILE__ ) . 'css/cvs-rateboard-admin-general.css', 
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

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Clearviewsys_Rateboard_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Clearviewsys_Rateboard_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$screen = get_current_screen();

		if ( 'clearviewsys_page_cvs-rateboard-settings' == $screen->base ) :

			wp_enqueue_media();

			wp_enqueue_script( $this->plugin_name . '-dragula', plugin_dir_url( __FILE__ ) . 'js/dragula.min.js', array( 'jquery' ), $this->version, false );

			wp_enqueue_script( $this->plugin_name . '-pickr', plugin_dir_url( __FILE__ ) . 'js/pickr.min.js', array( 'jquery' ), $this->version, false );

			wp_enqueue_script( $this->plugin_name . '-tabslet', plugin_dir_url( __FILE__ ) . 'js/jquery.tabslet.min.js', array( 'jquery' ), $this->version, false );			

			wp_enqueue_script( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'js/cvs-rateboard-admin.js', 
				array( 
					'jquery',				
					$this->plugin_name . '-dragula',					
					$this->plugin_name . '-pickr',
					$this->plugin_name . '-tabslet',					
				), 
				$this->version, 
				false 
			);

		endif;

	}

	/**
	 * HELPER function to check if the string passed as param is valid JSON.
	 *
	 * @since    1.0.0
	 */
	public function isJson($string) {
	 	json_decode($string);
	 	return ( json_last_error() == JSON_ERROR_NONE );
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
				__('ClearViewSys', 'cvs-rateboard' ), 			// page title
				__('ClearViewSys', 'cvs-rateboard' ),   		// menu title
				'manage_options', 								// capability
				'cvs-general', 									// menu-slug
				NULL, 											// callback function
				'none', 										// icon_url
				30 												// position
			);

			add_submenu_page(
				'cvs-general',
				__('ClearViewSys - General Info & Settings', 'cvs-rateboard' ),
				__('General', 'cvs-marquee' ),
				'manage_options', 							
				'cvs-general',
				array( $this, 'create_general_cb' ),
				0
			);		

		endif;

	    add_submenu_page(
	        'cvs-general', 										// parent slug
			__( 'CVS Rateboard', 'cvs-rateboard' ), 			// parent title
	        __( 'CVS Rateboard', 'cvs-rateboard' ), 			// menu title
	        'manage_options', 									// capability
	        'cvs-rateboard-settings', 							// menu slug
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
		
			<h1><?php printf( __('%s General Information', 'cvs-rateboard'), '<span>ClearViewSys</span>' ); ?></h1>
		
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
		$this->options = get_option( 'cvs_rateboard_options' );
		?>
		
		<div class="wrap">
		
			<h1><?php printf( __('%s Settings', 'cvs-rateboard'), '<span>ClearViewSys Rates Table</span>' ); ?></h1>
		
			<form method="post" action="options.php">

				<?php
				// This prints out all hidden setting fields
				settings_fields( 'cvs_rateboard_option_group' ); 		// Option group
				?>

				<div class="cvs-rateboard-opts-tabs">
					
					<ul>
						<li>
							<a href="#d-gentab">
								<?php _e( 'General Table Display Settings', 'cvs-rateboard'); ?>
							</a>
						</li>
						
						<li>
							<a href="#col-gentab">
								<?php _e( 'General Table Column Settings', 'cvs-rateboard'); ?>
							</a>
						</li>
						
						<li>
							<a href="#d-hometab">
								<?php _e( 'Front Page Table Display Settings', 'cvs-rateboard'); ?>
							</a>
						</li>
						
						<li>
							<a href="#col-hometab">
								<?php _e( 'Front Page Table Column Settings', 'cvs-rateboard'); ?>
							</a>
						</li>
						
						<li>
							<a href="#rateboard">
								<?php _e( 'Rateboard Settings', 'cvs-rateboard'); ?>
							</a>
						</li>

					</ul>
					
					<div id="d-gentab">
						<?php do_settings_sections( 'rb-section-general-table-display-settings' ); ?>
					</div>

					<div id="col-gentab">
						<?php do_settings_sections( 'rb-section-general-table-column-settings' ); ?>
					</div>
					
					<div id="d-hometab">
						<?php do_settings_sections( 'rb-section-front-page-table-display-settings' ); ?>
					</div>
					
					<div id="col-hometab">
						<?php do_settings_sections( 'rb-section-front-page-table-column-settings' ); ?>
					</div>
					
					<div id="rateboard">
						<?php do_settings_sections( 'rb-section-rateboard-settings' ); ?>
					</div>                                        
				
				</div>                
		
				<?php                
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

		/* General Table Display Settings ------------------------------------------------- */

		register_setting(
			'cvs_rateboard_option_group', 									// Option group
			'cvs_rateboard_options', 										// Option name
			array( $this, 'sanitize' ) 										// Sanitize
		);

		/* General Table Display Settings ------------------------------------------------- */

		add_settings_section(
			'section_general_display', 										// ID
			'General Table Display Settings', 						// Title
			array( $this, 'section_info_general_display' ), 		// Callback
			'rb-section-general-table-display-settings' 			// Section!!!
		);

		add_settings_field(
			'freq_general',
			'Update Frequency (in milliseconds)',
			array( $this, 'freq_general_cb' ),
			'rb-section-general-table-display-settings',
			'section_general_display'           
		);

		/* General Table Column Settings ------------------------------------------------- */

		add_settings_section(
			'section_general_cols',
			'General Table Column Settings',
			array( $this, 'section_info_general_cols' ),
			'rb-section-general-table-column-settings'
		);

		add_settings_field(
			'subheading_colsort_general',
			'<h3>Order of Table Columns</h3>', 
			array( $this, 'general_colsort_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'colsort_general', 
			'You can change the column order by drag & drop', 
			array( $this, 'general_colsort_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);		

		add_settings_field(
			'subheading_flag_general',
			'<h3>Country Flags Column</h3>', 
			array( $this, 'general_flag_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_flag_general', 
			'Disable Country Flag Column', 
			array( $this, 'general_hide_flag_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_flag_general', 
			'Custom Country Flags Column Label', 
			array( $this, 'general_collabel_flag_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_code_general',
			'<h3>Country Code Column</h3>', 
			array( $this, 'general_code_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'collabel_code_general', 
			'Custom Country Code Column Label', 
			array( $this, 'general_collabel_code_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_country_general',
			'<h3>Country Name Column</h3>', 
			array( $this, 'general_country_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_country_general', 
			'Disable Country Name Column', 
			array( $this, 'general_hide_country_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_country_general', 
			'Custom Country Name Column Label', 
			array( $this, 'general_collabel_country_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_currency_general',
			'<h3>Currency Name Column</h3>', 
			array( $this, 'general_currency_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_currency_general', 
			'Disable Currency Name Column', 
			array( $this, 'general_hide_currency_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_currency_general', 
			'Custom Currency Name Column Label', 
			array( $this, 'general_collabel_currency_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_webuy_general',
			'<h3>We Buy Column</h3>', 
			array( $this, 'general_webuy_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_webuy_general', 
			'Disable We Buy Column', 
			array( $this, 'general_hide_webuy_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_webuy_general', 
			'Custom We Buy Column Label', 
			array( $this, 'general_collabel_webuy_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_wesell_general',
			'<h3>We Sell Column</h3>', 
			array( $this, 'general_wesell_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_wesell_general', 
			'Disable We Sell Column', 
			array( $this, 'general_hide_wesell_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_wesell_general', 
			'Custom We Sell Column Label', 
			array( $this, 'general_collabel_wesell_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_invbuy_general',
			'<h3>' . __( 'We Buy Column (INVERSE RATES)', 'cvs-rateboard' ) . '</h3>',
			array( $this, 'general_invbuy_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'show_invbuy_general', 
			'Enable We Buy Column (INVERSE RATES)', 
			array( $this, 'general_show_invbuy_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_invbuy_general', 
			'Custom We Buy Column Label (INVERSE RATES)', 
			array( $this, 'general_collabel_invbuy_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_invsell_general',
			'<h3>' . __( 'We Sell Column (INVERSE RATES)', 'cvs-rateboard' ) . '</h3>',
			array( $this, 'general_invsell_header_cb' ),
			'rb-section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'show_invsell_general', 
			'Enable We Sell Column (INVERSE RATES)', 
			array( $this, 'general_show_invsell_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_invsell_general', 
			'Custom We Sell Column Label (INVERSE RATES)', 
			array( $this, 'general_collabel_invsell_cb' ), 
			'rb-section-general-table-column-settings', 
			'section_general_cols'
		);

		/* Front Page Table Display Settings ------------------------------------------------- */

		add_settings_section(
			'section_front', 							
			'Front Page Table Display Settings', 			
			array( $this, 'section_info_front' ),
			'rb-section-front-page-table-display-settings' 							
		);          

		add_settings_field(
			'freq_front',
			'Update Frequency (in milliseconds)',
			array( $this, 'freq_front_cb' ),
			'rb-section-front-page-table-display-settings',
			'section_front'           
		);		

		/* Front Page Table Column Settings ---------------------------------------------------- */

		add_settings_section(
			'section_front_cols',
			'Front Page Table Column Settings',
			array( $this, 'section_info_front_cols' ),
			'rb-section-front-page-table-column-settings'
		);

		add_settings_field(
			'subheading_colsort_front',
			'<h3>Order of Table Columns</h3>', 
			array( $this, 'front_colsort_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'colsort_front', 
			'You can change the column order by drag & drop', 
			array( $this, 'front_colsort_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);				

		add_settings_field(
			'subheading_flag_front',
			'<h3>Country Flags Column</h3>', 
			array( $this, 'front_flag_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_flag_front', 
			'Disable Country Flag Column', 
			array( $this, 'front_hide_flag_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_flag_front', 
			'Custom Country Flags Column Label', 
			array( $this, 'front_collabel_flag_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_code_front',
			'<h3>Country Code Column</h3>', 
			array( $this, 'front_code_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'collabel_code_front', 
			'Custom Country Code Column Label', 
			array( $this, 'front_collabel_code_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_country_front',
			'<h3>Country Name Column</h3>', 
			array( $this, 'front_country_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_country_front', 
			'Disable Country Name Column', 
			array( $this, 'front_hide_country_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_country_front', 
			'Custom Country Name Column Label', 
			array( $this, 'front_collabel_country_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_currency_front',
			'<h3>Currency Name Column</h3>', 
			array( $this, 'front_currency_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_currency_front', 
			'Disable Currency Name Column', 
			array( $this, 'front_hide_currency_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_currency_front', 
			'Custom Currency Name Column Label', 
			array( $this, 'front_collabel_currency_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_webuy_front',
			'<h3>We Buy Column</h3>', 
			array( $this, 'front_webuy_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_webuy_front', 
			'Disable We Buy Column', 
			array( $this, 'front_hide_webuy_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_webuy_front', 
			'Custom We Buy Column Label', 
			array( $this, 'front_collabel_webuy_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_wesell_front',
			'<h3>We Sell Column</h3>', 
			array( $this, 'front_wesell_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_wesell_front', 
			'Disable We Sell Column', 
			array( $this, 'front_hide_wesell_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_wesell_front', 
			'Custom We Sell Column Label', 
			array( $this, 'front_collabel_wesell_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_invbuy_front',
			'<h3>' . __( 'We Buy Column (INVERSE RATES)', 'cvs-rateboard' ) . '</h3>',
			array( $this, 'front_invbuy_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'show_invbuy_front', 
			'Enable We Buy Column (INVERSE RATES)', 
			array( $this, 'front_show_invbuy_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_invbuy_front', 
			'Custom We Buy Column Label (INVERSE RATES)', 
			array( $this, 'front_collabel_invbuy_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_invsell_front',
			'<h3>' . __( 'We Sell Column (INVERSE RATES)', 'cvs-rateboard' ) . '</h3>',
			array( $this, 'front_invsell_header_cb' ),
			'rb-section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'show_invsell_front', 
			'Enable We Sell Column (INVERSE RATES)', 
			array( $this, 'front_show_invsell_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_invsell_front', 
			'Custom We Sell Column Label (INVERSE RATES)', 
			array( $this, 'front_collabel_invsell_cb' ), 
			'rb-section-front-page-table-column-settings', 
			'section_front_cols'
		);		

		/* Rateboard Settings ------------------------------------------------- */

		add_settings_section(
			'section_rateboard',                                        // ID
			'Rateboard Settings',                                       // Title
			array( $this, 'section_info_rateboard' ),             		// Callback
			'rb-section-rateboard-settings'                                // Section!!!
		);

		add_settings_field(
			'rateboard_col', 
			'Rateboard Color', 
			array( $this, 'rateboard_col_cb' ), 
			'rb-section-rateboard-settings', 
			'section_rateboard'
		);

		add_settings_field(
			'rateboard_bck', 
			'Rateboard Background Color', 
			array( $this, 'rateboard_bck_cb' ), 
			'rb-section-rateboard-settings', 
			'section_rateboard'
		);

		add_settings_field(
			'rateboard_border_col', 
			'Rateboard Border Color', 
			array( $this, 'rateboard_border_col_cb' ), 
			'rb-section-rateboard-settings', 
			'section_rateboard'
		);		

		add_settings_field(
			'rateboard_table_th_bck', 
			'Rateboard Table Heading Background Color', 
			array( $this, 'rateboard_table_th_bck_cb' ), 
			'rb-section-rateboard-settings', 
			'section_rateboard'
		);

		add_settings_field(
			'rateboard_table_even_bck', 
			'Rateboard Table Even Rows Background Color', 
			array( $this, 'rateboard_table_even_bck_cb' ), 
			'rb-section-rateboard-settings', 
			'section_rateboard'
		);

		add_settings_field(
			'rateboard_table_odd_bck', 
			'Rateboard Table Odd Rows Background Color', 
			array( $this, 'rateboard_table_odd_bck_cb' ), 
			'rb-section-rateboard-settings', 
			'section_rateboard'
		);		

		add_settings_field(
			'rateboard_logo',                                           // ID
			'Rateboard Logo Image',                                     // Title 
			array( $this, 'rateboard_logo_cb' ),                  // Callback
			'rb-section-rateboard-settings',                               // Page
			'section_rateboard'                                         // Section           
		);

		add_settings_field(
			'slide_enable', 
			'Enable Image Slider', 
			array( $this, 'rateboard_slide_enable_cb' ), 
			'rb-section-rateboard-settings', 
			'section_rateboard'
		);

		add_settings_field(
			'slide_imgs',
			'Slider Images',
			array( $this, 'rateboard_slide_imgs_cb' ),
			'rb-section-rateboard-settings',
			'section_rateboard'   
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
	 * Sanitize each setting field as needed
	 *
	 * @param array $input Contains all settings fields as array keys
	 */
	public function sanitize( $input ) {

		$new_input = array();
		
		/* General Table Display Settings 
		--------------------------------- */

		if( isset( $input['freq_general'] ) ) :

			if ( 
					( '' !== $input['freq_general'] ) 	&&
					( intval( $input['freq_general'] ) >= 0 )
				) :
				$new_input['freq_general'] = absint( $input['freq_general'] );
			else :
				$new_input['freq_general'] = '3000';
			endif;

		else :

			$new_input['freq_general'] = '3000';

		endif;

		/* General Table Column Settings 
		-------------------------------- */

		if( 
			isset( $input['colsort_general'] ) &&
			$this->isJson( $input['colsort_general'] )
		  )
			$new_input['colsort_general'] = $input['colsort_general'];

		if( isset( $input['hide_flag_general'] ) )
			$new_input['hide_flag_general'] = sanitize_key( $input['hide_flag_general'] );

		if( isset( $input['collabel_flag_general'] ) )
			$new_input['collabel_flag_general'] = sanitize_text_field( $input['collabel_flag_general'] );

		if( isset( $input['collabel_code_general'] ) )
			$new_input['collabel_code_general'] = sanitize_text_field( $input['collabel_code_general'] );

		if( isset( $input['hide_country_general'] ) )
			$new_input['hide_country_general'] = sanitize_key( $input['hide_country_general'] );

		if( isset( $input['collabel_country_general'] ) )
			$new_input['collabel_country_general'] = sanitize_text_field( $input['collabel_country_general'] );

		if( isset( $input['hide_currency_general'] ) )
			$new_input['hide_currency_general'] = sanitize_key( $input['hide_currency_general'] );

		if( isset( $input['collabel_currency_general'] ) )
			$new_input['collabel_currency_general'] = sanitize_text_field( $input['collabel_currency_general'] );

		if( isset( $input['hide_webuy_general'] ) )
			$new_input['hide_webuy_general'] = sanitize_key( $input['hide_webuy_general'] );

		if( isset( $input['collabel_webuy_general'] ) )
			$new_input['collabel_webuy_general'] = sanitize_text_field( $input['collabel_webuy_general'] );

		if( isset( $input['hide_wesell_general'] ) )
			$new_input['hide_wesell_general'] = sanitize_key( $input['hide_wesell_general'] );

		if( isset( $input['collabel_wesell_general'] ) )
			$new_input['collabel_wesell_general'] = sanitize_text_field( $input['collabel_wesell_general'] );

		if( isset( $input['show_invbuy_general'] ) )
			$new_input['show_invbuy_general'] = sanitize_key( $input['show_invbuy_general'] );

		if( isset( $input['collabel_invbuy_general'] ) )
			$new_input['collabel_invbuy_general'] = sanitize_text_field( $input['collabel_invbuy_general'] );

		if( isset( $input['show_invsell_general'] ) )
			$new_input['show_invsell_general'] = sanitize_key( $input['show_invsell_general'] );

		if( isset( $input['collabel_invsell_general'] ) )
			$new_input['collabel_invsell_general'] = sanitize_text_field( $input['collabel_invsell_general'] );			        	        	        	        	        
		/* Front Page Table Display Settings 
		------------------------------------ */

		if( isset( $input['freq_front'] ) ) :

			if ( 
					( '' !== $input['freq_front'] ) 	&&
					( intval( $input['freq_front'] ) >= 0 )
				) :
				$new_input['freq_front'] = absint( $input['freq_front'] );
			else :
				$new_input['freq_front'] = '3000';
			endif;

		else :

			$new_input['freq_front'] = '3000';

		endif;

		/* Front Page Table Column Settings 
		----------------------------------- */

		if( 
			isset( $input['colsort_front'] ) &&
			$this->isJson( $input['colsort_front'] )
		  )
			$new_input['colsort_front'] = $input['colsort_front'];

		if( isset( $input['hide_flag_front'] ) )
			$new_input['hide_flag_front'] = sanitize_key( $input['hide_flag_front'] );

		if( isset( $input['collabel_flag_front'] ) )
			$new_input['collabel_flag_front'] = sanitize_text_field( $input['collabel_flag_front'] );

		if( isset( $input['collabel_code_front'] ) )
			$new_input['collabel_code_front'] = sanitize_text_field( $input['collabel_code_front'] );

		if( isset( $input['hide_country_front'] ) )
			$new_input['hide_country_front'] = sanitize_key( $input['hide_country_front'] );

		if( isset( $input['collabel_country_front'] ) )
			$new_input['collabel_country_front'] = sanitize_text_field( $input['collabel_country_front'] );

		if( isset( $input['hide_currency_front'] ) )
			$new_input['hide_currency_front'] = sanitize_key( $input['hide_currency_front'] );

		if( isset( $input['collabel_currency_front'] ) )
			$new_input['collabel_currency_front'] = sanitize_text_field( $input['collabel_currency_front'] );

		if( isset( $input['hide_webuy_front'] ) )
			$new_input['hide_webuy_front'] = sanitize_key( $input['hide_webuy_front'] );

		if( isset( $input['collabel_webuy_front'] ) )
			$new_input['collabel_webuy_front'] = sanitize_text_field( $input['collabel_webuy_front'] );

		if( isset( $input['hide_wesell_front'] ) )
			$new_input['hide_wesell_front'] = sanitize_key( $input['hide_wesell_front'] );

		if( isset( $input['collabel_wesell_front'] ) )
			$new_input['collabel_wesell_front'] = sanitize_text_field( $input['collabel_wesell_front'] );

		if( isset( $input['show_invbuy_front'] ) )
			$new_input['show_invbuy_front'] = sanitize_key( $input['show_invbuy_front'] );

		if( isset( $input['collabel_invbuy_front'] ) )
			$new_input['collabel_invbuy_front'] = sanitize_text_field( $input['collabel_invbuy_front'] );

		if( isset( $input['show_invsell_front'] ) )
			$new_input['show_invsell_front'] = sanitize_key( $input['show_invsell_front'] );

		if( isset( $input['collabel_invsell_front'] ) )
			$new_input['collabel_invsell_front'] = sanitize_text_field( $input['collabel_invsell_front'] );

		/* Rateboard Settings 
		--------------------- */

		if( isset( $input['cvs-rateboard-col'] ) ) :
		
			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-rateboard-col'] ) &&
					preg_match( $pattern, $input['cvs-rateboard-col'] ) 
				) :
				
				$new_input['cvs-rateboard-col'] = sanitize_text_field( $input['cvs-rateboard-col'] );

			else: 

				$new_input['cvs-rateboard-col'] = 'rgba(255, 255, 255, 1)';			
			
			endif;

		endif;

		if( isset( $input['cvs-rateboard-bck'] ) ) :

			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-rateboard-bck'] ) &&
					preg_match( $pattern, $input['cvs-rateboard-bck'] ) 
				) :
				
				$new_input['cvs-rateboard-bck'] = sanitize_text_field( $input['cvs-rateboard-bck'] );

			else: 

				$new_input['cvs-rateboard-bck'] = 'rgba(0, 0, 0, 1)';
			
			endif;

		endif;

		if( isset( $input['cvs-rateboard-border-col'] ) ) :

			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-rateboard-border-col'] ) &&
					preg_match( $pattern, $input['cvs-rateboard-border-col'] ) 
				) :
				
				$new_input['cvs-rateboard-border-col'] = sanitize_text_field( $input['cvs-rateboard-border-col'] );

			else: 

				$new_input['cvs-rateboard-border-col'] = 'rgba(42, 42, 42, 1)';
			
			endif;

		endif;		

		if( isset( $input['cvs-rateboard-table-th-bck'] ) ) :

			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-rateboard-table-th-bck'] ) &&
					preg_match( $pattern, $input['cvs-rateboard-table-th-bck'] ) 
				) :
				
				$new_input['cvs-rateboard-table-th-bck'] = sanitize_text_field( $input['cvs-rateboard-table-th-bck'] );

			else: 

				$new_input['cvs-rateboard-table-th-bck'] = 'rgba(1, 50, 67, 1)';
			
			endif;

		endif;

		if( isset( $input['cvs-rateboard-table-even-bck'] ) ) :

			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-rateboard-table-even-bck'] ) &&
					preg_match( $pattern, $input['cvs-rateboard-table-even-bck'] ) 
				) :
				
				$new_input['cvs-rateboard-table-even-bck'] = sanitize_text_field( $input['cvs-rateboard-table-even-bck'] );

			else: 

				$new_input['cvs-rateboard-table-even-bck'] = 'rgba(34, 34, 34, 1)';
			
			endif;

		endif;

		if( isset( $input['cvs-rateboard-table-odd-bck'] ) ) :

			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-rateboard-table-odd-bck'] ) &&
					preg_match( $pattern, $input['cvs-rateboard-table-odd-bck'] ) 
				) :
				
				$new_input['cvs-rateboard-table-odd-bck'] = sanitize_text_field( $input['cvs-rateboard-table-odd-bck'] );

			else: 

				$new_input['cvs-rateboard-table-odd-bck'] = 'rgba(51, 51, 51, 1)';
			
			endif;

		endif;				

		if( isset( $input['cvs-rateboard-logo__id'] ) ) :

			// image ID should be greater or equal to 1
			$ratlog_filter_options = array(
			    'options' => array( 
			    	'min_range' => 1,
					//'max_range' => 100 
				)
			);			
			$new_input['cvs-rateboard-logo__id'] = ( filter_var( 
														$input['cvs-rateboard-logo__id'], 
														FILTER_VALIDATE_INT, 
														$ratlog_filter_options 
													) !== FALSE ) 
														? $input['cvs-rateboard-logo__id'] 
														: false;
		endif;

		if( isset( $input['cvs-rateboard-slideimg__enable'] ) )
			$new_input['cvs-rateboard-slideimg__enable'] = sanitize_key( $input['cvs-rateboard-slideimg__enable'] );

		if( isset( $input['cvs-rateboard-slideimg__ids'] ) ) :

			$ids_Arr = explode( ',', $input['cvs-rateboard-slideimg__ids'] );
			$new_ids_Arr = [];

			foreach ( $ids_Arr as $id ) :

				// image ID should be greater or equal to 1
				$ratlog_filter_options = array(
				    'options' => array( 
				    	'min_range' => 1,
						//'max_range' => 100 
					)
				);			

				if ( filter_var( 
						intval( $id ), 
						FILTER_VALIDATE_INT, 
						$ratlog_filter_options 
						) !== FALSE ) :
					
					$new_ids_Arr[] = $id;

				endif;

			endforeach;

			$new_input['cvs-rateboard-slideimg__ids'] = implode( ',', $new_ids_Arr); 

		endif;

		return $new_input;
	}

/* General Settings ---------------------------------------------------------------------------- */

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

		$info_Str = __('Update this field\'s value if you move the base CVS folder anywhere else then the `wp-admin` subfolder of your website\'s WordPress root.<br /> The field accepts a full url or a location relative to the WordPress root.', 'cvs-rateboard' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}

/* General Table Display Settings -------------------------------------------------------------- */

	/** 
	 * Print the Section text
	 */
	public function section_info_general_display() {
		// print 'Enter your settings below:';
	}

	public function freq_general_cb() {
		printf(
			'<input type="number" id="freq_general" name="cvs_rateboard_options[freq_general]" value="%s" />',
			isset( $this->options['freq_general'] ) 
				? ( $this->options['freq_general'] >= 0 )
					? esc_attr( $this->options['freq_general'])
					: '3000' 
				: '3000'
		);

		$info_Str = __('Set this to 0 if you don\'t need rate values to be regularly refreshed.', 'cvs-rateboard' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	} 	 	

/* General Table Column Settings --------------------------------------------------------------- */

	/** 
	 * Print the Section text
	 */
	public function section_info_general_cols() {
		// print 'Enter your settings below:';
	}

	public function general_colsort_header_cb() {}

	public function general_colsort_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['colsort_general'] ) ? $opts_Arr['colsort_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<div class="wrap--cols-container">

		    <div class="cols-container cols-container--general flex-container">
				
				<div class="flex-item col-flag-general">
					<span>1</span>
					<span><?php _e( 'Flag', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-code-general">
					<span>2</span>
					<span><?php _e( 'Currency ISO', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-country-general">
					<span>3</span>
					<span><?php _e( 'Country', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-currency-general">
					<span>4</span>
					<span><?php _e( 'Currency Name', 'cvs-rateboard' ) ?></span>
				</div>			
				
				<div class="flex-item col-webuy-general">
					<span>5</span>
					<span><?php _e( 'We Buy', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-wesell-general">
					<span>6</span>
					<span><?php _e( 'We Sell', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-invbuy-general">
					<span>7</span>
					<span><?php _e( 'Inverse Buy', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-invsell-general">
					<span>8</span>
					<span><?php _e( 'Inverse Sell', 'cvs-rateboard' ) ?></span>
				</div>
		    
		    </div>		

		</div>

		<?php
		printf(
			'<input type="hidden" id="colsort_general" name="cvs_rateboard_options[colsort_general]" value="%s" />',
			isset( $this->options['colsort_general'] ) ? esc_attr( $this->options['colsort_general']) : ''
		);
		
	}	

	public function general_flag_header_cb() {}    

	public function general_hide_flag_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_flag_general'] ) ? $opts_Arr['hide_flag_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_flag_general]" id="hide_flag_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_flag_cb() {
		printf(
			'<input type="text" id="collabel_flag_general" name="cvs_rateboard_options[collabel_flag_general]" value="%s" />',
			isset( $this->options['collabel_flag_general'] ) ? esc_attr( $this->options['collabel_flag_general']) : ''
		);
	}

	public function general_code_header_cb() {}    

	public function general_collabel_code_cb() {
		printf(
			'<input type="text" id="collabel_code_general" name="cvs_rateboard_options[collabel_code_general]" value="%s" />',
			isset( $this->options['collabel_code_general'] ) ? esc_attr( $this->options['collabel_code_general']) : ''
		);
	}

	public function general_country_header_cb() {}    

	public function general_hide_country_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_country_general'] ) ? $opts_Arr['hide_country_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_country_general]" id="hide_country_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_country_cb() {
		printf(
			'<input type="text" id="collabel_country_general" name="cvs_rateboard_options[collabel_country_general]" value="%s" />',
			isset( $this->options['collabel_country_general'] ) ? esc_attr( $this->options['collabel_country_general']) : ''
		);
	}

	public function general_currency_header_cb() {}    

	public function general_hide_currency_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_currency_general'] ) ? $opts_Arr['hide_currency_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_currency_general]" id="hide_currency_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_currency_cb() {
		printf(
			'<input type="text" id="collabel_currency_general" name="cvs_rateboard_options[collabel_currency_general]" value="%s" />',
			isset( $this->options['collabel_currency_general'] ) ? esc_attr( $this->options['collabel_currency_general']) : ''
		);
	}

	public function general_webuy_header_cb() {}    

	public function general_hide_webuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_webuy_general'] ) ? $opts_Arr['hide_webuy_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_webuy_general]" id="hide_webuy_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_webuy_cb() {
		printf(
			'<input type="text" id="collabel_webuy_general" name="cvs_rateboard_options[collabel_webuy_general]" value="%s" />',
			isset( $this->options['collabel_webuy_general'] ) ? esc_attr( $this->options['collabel_webuy_general']) : ''
		);
	}

	public function general_wesell_header_cb() {}    

	public function general_hide_wesell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_wesell_general'] ) ? $opts_Arr['hide_wesell_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_wesell_general]" id="hide_wesell_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_wesell_cb() {
		printf(
			'<input type="text" id="collabel_wesell_general" name="cvs_rateboard_options[collabel_wesell_general]" value="%s" />',
			isset( $this->options['collabel_wesell_general'] ) ? esc_attr( $this->options['collabel_wesell_general']) : ''
		);
	}

	public function general_invbuy_header_cb() {}    

	public function general_show_invbuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invbuy_general'] ) ? $opts_Arr['show_invbuy_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[show_invbuy_general]" id="show_invbuy_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_invbuy_cb() {
		printf(
			'<input type="text" id="collabel_invbuy_general" name="cvs_rateboard_options[collabel_invbuy_general]" value="%s" />',
			isset( $this->options['collabel_invbuy_general'] ) ? esc_attr( $this->options['collabel_invbuy_general']) : ''
		);
	}

	public function general_invsell_header_cb() {}    

	public function general_show_invsell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invsell_general'] ) ? $opts_Arr['show_invsell_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[show_invsell_general]" id="show_invsell_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_invsell_cb() {
		printf(
			'<input type="text" id="collabel_invsell_general" name="cvs_rateboard_options[collabel_invsell_general]" value="%s" />',
			isset( $this->options['collabel_invsell_general'] ) ? esc_attr( $this->options['collabel_invsell_general']) : ''
		);
	}	                    

/* Front Page Table Display Settings ----------------------------------------------------------- */ 

	public function section_info_front() {
		// print 'Enter your settings below:';
	}

	public function freq_front_cb() {
		printf(
			'<input type="number" id="freq_front" name="cvs_rateboard_options[freq_front]" value="%s" />',
			isset( $this->options['freq_front'] ) 
				? ( $this->options['freq_front'] >= 0 )
					? esc_attr( $this->options['freq_front'])
					: '3000' 
				: '3000'
		);

		$info_Str = __('Set this to 0 if you don\'t need rate values to be regularly refreshed.', 'cvs-rateboard' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}	
	

/* Front Page Table Column Settings ------------------------------------------------------------ */

	/** 
	 * Print the Section text
	 */
	public function section_info_front_cols() {
		// print 'Enter your settings below:';
	}

	public function front_colsort_header_cb() {}

	public function front_colsort_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['colsort_front'] ) ? $opts_Arr['colsort_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<div class="wrap--cols-container">

		    <div class="cols-container cols-container--front flex-container">
				
				<div class="flex-item col-flag-front">
					<span>1</span>
					<span><?php _e( 'Flag', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-code-front">
					<span>2</span>
					<span><?php _e( 'Currency ISO', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-country-front">
					<span>3</span>
					<span><?php _e( 'Country', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-currency-front">
					<span>4</span>
					<span><?php _e( 'Currency Name', 'cvs-rateboard' ) ?></span>
				</div>			
				
				<div class="flex-item col-webuy-front">
					<span>5</span>
					<span><?php _e( 'We Buy', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-wesell-front">
					<span>6</span>
					<span><?php _e( 'We Sell', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-invbuy-front">
					<span>7</span>
					<span><?php _e( 'Inverse Buy', 'cvs-rateboard' ) ?></span>
				</div>
				
				<div class="flex-item col-invsell-front">
					<span>8</span>
					<span><?php _e( 'Inverse Sell', 'cvs-rateboard' ) ?></span>
				</div>
		    
		    </div>		

		</div>

		<?php
		printf(
			'<input type="hidden" id="colsort_front" name="cvs_rateboard_options[colsort_front]" value="%s" />',
			isset( $this->options['colsort_front'] ) ? esc_attr( $this->options['colsort_front']) : ''
		);
		
	}

	public function front_flag_header_cb() {}    

	public function front_hide_flag_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_flag_front'] ) ? $opts_Arr['hide_flag_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_flag_front]" id="hide_flag_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_flag_cb() {
		printf(
			'<input type="text" id="collabel_flag_front" name="cvs_rateboard_options[collabel_flag_front]" value="%s" />',
			isset( $this->options['collabel_flag_front'] ) ? esc_attr( $this->options['collabel_flag_front']) : ''
		);
	}

	public function front_code_header_cb() {}    

	public function front_collabel_code_cb() {
		printf(
			'<input type="text" id="collabel_code_front" name="cvs_rateboard_options[collabel_code_front]" value="%s" />',
			isset( $this->options['collabel_code_front'] ) ? esc_attr( $this->options['collabel_code_front']) : ''
		);
	}

	public function front_country_header_cb() {}    

	public function front_hide_country_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_country_front'] ) ? $opts_Arr['hide_country_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_country_front]" id="hide_country_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_country_cb() {
		printf(
			'<input type="text" id="collabel_country_front" name="cvs_rateboard_options[collabel_country_front]" value="%s" />',
			isset( $this->options['collabel_country_front'] ) ? esc_attr( $this->options['collabel_country_front']) : ''
		);
	}

	public function front_currency_header_cb() {}    

	public function front_hide_currency_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_currency_front'] ) ? $opts_Arr['hide_currency_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_currency_front]" id="hide_currency_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_currency_cb() {
		printf(
			'<input type="text" id="collabel_currency_front" name="cvs_rateboard_options[collabel_currency_front]" value="%s" />',
			isset( $this->options['collabel_currency_front'] ) ? esc_attr( $this->options['collabel_currency_front']) : ''
		);
	}

	public function front_webuy_header_cb() {}    

	public function front_hide_webuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_webuy_front'] ) ? $opts_Arr['hide_webuy_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_webuy_front]" id="hide_webuy_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_webuy_cb() {
		printf(
			'<input type="text" id="collabel_webuy_front" name="cvs_rateboard_options[collabel_webuy_front]" value="%s" />',
			isset( $this->options['collabel_webuy_front'] ) ? esc_attr( $this->options['collabel_webuy_front']) : ''
		);
	}

	public function front_wesell_header_cb() {}    

	public function front_hide_wesell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_wesell_front'] ) ? $opts_Arr['hide_wesell_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[hide_wesell_front]" id="hide_wesell_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_wesell_cb() {
		printf(
			'<input type="text" id="collabel_wesell_front" name="cvs_rateboard_options[collabel_wesell_front]" value="%s" />',
			isset( $this->options['collabel_wesell_front'] ) ? esc_attr( $this->options['collabel_wesell_front']) : ''
		);
	}

	public function front_invbuy_header_cb() {}    

	public function front_show_invbuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invbuy_front'] ) ? $opts_Arr['show_invbuy_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[show_invbuy_front]" id="show_invbuy_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_invbuy_cb() {
		printf(
			'<input type="text" id="collabel_invbuy_front" name="cvs_rateboard_options[collabel_invbuy_front]" value="%s" />',
			isset( $this->options['collabel_invbuy_front'] ) ? esc_attr( $this->options['collabel_invbuy_front']) : ''
		);
	}

	public function front_invsell_header_cb() {}    

	public function front_show_invsell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invsell_front'] ) ? $opts_Arr['show_invsell_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[show_invsell_front]" id="show_invsell_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_invsell_cb() {
		printf(
			'<input type="text" id="collabel_invsell_front" name="cvs_rateboard_options[collabel_invsell_front]" value="%s" />',
			isset( $this->options['collabel_invsell_front'] ) ? esc_attr( $this->options['collabel_invsell_front']) : ''
		);
	}	 		

/* Rateboard Settings -------------------------------------------------------------- */

	/** 
	 * Print the Section text
	 */
	public function section_info_rateboard() {
		// print 'Enter your settings below:';
	}

	public function rateboard_col_cb() {

		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-rateboard-col-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-col-picker--disabled" value="<?php echo isset( $this->options['cvs-rateboard-col'] ) ? esc_attr( $this->options['cvs-rateboard-col']) : 'rgba(255, 255, 255, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-rateboard-col" name="cvs_rateboard_options[cvs-rateboard-col]" value="<?php echo isset( $this->options['cvs-rateboard-col'] ) ? esc_attr( $this->options['cvs-rateboard-col']) : 'rgba(255, 255, 255, 1)'; ?>" />
		
		<?php
	}	

	public function rateboard_bck_cb() {
		
		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-rateboard-bck-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-col-picker--disabled" value="<?php echo isset( $this->options['cvs-rateboard-bck'] ) ? esc_attr( $this->options['cvs-rateboard-bck']) : 'rgba(0, 0, 0, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-rateboard-bck" name="cvs_rateboard_options[cvs-rateboard-bck]" value="<?php echo isset( $this->options['cvs-rateboard-bck'] ) ? esc_attr( $this->options['cvs-rateboard-bck']) : 'rgba(0, 0, 0, 1)'; ?>" />

		<?php
	}				

	public function rateboard_border_col_cb() {
		
		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-rateboard-border-col-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-border-col-picker--disabled" value="<?php echo isset( $this->options['cvs-rateboard-border-col'] ) ? esc_attr( $this->options['cvs-rateboard-border-col']) : 'rgba(255, 193, 7, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-rateboard-border-col" name="cvs_rateboard_options[cvs-rateboard-border-col]" value="<?php echo isset( $this->options['cvs-rateboard-border-col'] ) ? esc_attr( $this->options['cvs-rateboard-border-col']) : 'rgba(255, 193, 7, 1)'; ?>" />

		<?php
	}	

	public function rateboard_table_th_bck_cb() {
		
		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-rateboard-table-th-bck-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-col-picker--disabled" value="<?php echo isset( $this->options['cvs-rateboard-table-th-bck'] ) ? esc_attr( $this->options['cvs-rateboard-table-th-bck']) : 'rgba(1, 50, 67, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-rateboard-table-th-bck" name="cvs_rateboard_options[cvs-rateboard-table-th-bck]" value="<?php echo isset( $this->options['cvs-rateboard-table-th-bck'] ) ? esc_attr( $this->options['cvs-rateboard-table-th-bck']) : 'rgba(1, 50, 67, 1)'; ?>" />

		<?php
	}

	public function rateboard_table_even_bck_cb() {
		
		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-rateboard-table-even-bck-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-col-picker--disabled" value="<?php echo isset( $this->options['cvs-rateboard-table-even-bck'] ) ? esc_attr( $this->options['cvs-rateboard-table-even-bck']) : 'rgba(34, 34, 34, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-rateboard-table-even-bck" name="cvs_rateboard_options[cvs-rateboard-table-even-bck]" value="<?php echo isset( $this->options['cvs-rateboard-table-even-bck'] ) ? esc_attr( $this->options['cvs-rateboard-table-even-bck']) : 'rgba(34, 34, 34, 1)'; ?>" />

		<?php
	}

	public function rateboard_table_odd_bck_cb() {
		
		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-rateboard-table-odd-bck-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-col-picker--disabled" value="<?php echo isset( $this->options['cvs-rateboard-table-odd-bck'] ) ? esc_attr( $this->options['cvs-rateboard-table-odd-bck']) : 'rgba(51, 51, 51, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-rateboard-table-odd-bck" name="cvs_rateboard_options[cvs-rateboard-table-odd-bck]" value="<?php echo isset( $this->options['cvs-rateboard-table-odd-bck'] ) ? esc_attr( $this->options['cvs-rateboard-table-odd-bck']) : 'rgba(51, 51, 51, 1)'; ?>" />

		<?php
	}											

	public function rateboard_logo_cb() {
		$opts_Arr  			= $this->options;
		$this_opt   		= isset( $opts_Arr['cvs-rateboard-logo__id'] ) 
								? $opts_Arr['cvs-rateboard-logo__id'] 
								: '';

		$placeholder_img 	= 'https://via.placeholder.com/200x200?text=ClearViewSys.com';

		$img_src 			= wp_get_attachment_image_src( $this_opt, 'medium' ); 
		$img_src 			= $img_src[0];

		$img_src 			= filter_var( $img_src, FILTER_VALIDATE_URL) 
								? $img_src 
								: $placeholder_img;

		$dimg_class 		= ( $img_src !== $placeholder_img ) 
								? 'has-saved-attachment'
								: 'has-placeholder';

		$btn_label 			= ( $img_src !== $placeholder_img )
								? __( 'Replace image' )
								: __( 'Upload image' );

		//$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<div class="cvs-rateboard-logo <?php echo $dimg_class; ?>">

			<div>
				<img id='cvs-rateboard-logo__preview' src="<?php echo $img_src; ?>" width="" height="144" alt="" style="display: block; max-height: 200px; max-width: 240px; width: auto; height: auto; margin-bottom: 12px;" />
			</div>

			<input id="cvs-rateboard-logo__uploadbtn" type="button" class="button btn--upload" value="<?php echo $btn_label; ?>" />
			<input id="cvs-rateboard-logo__removebtn" type="button" class="button btn--remove" value="<?php _e( 'Remove image' ); ?>" />			
			<input type='hidden' name='cvs_rateboard_options[cvs-rateboard-logo__id]' id='cvs-rateboard-logo__id' value='<?php echo $opts_Arr['cvs-rateboard-logo__id']; ?>'>

		</div>
		
		<?php		
	}

	public function rateboard_slide_enable_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-rateboard-slideimg__enable'] ) ? $opts_Arr['cvs-rateboard-slideimg__enable'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_rateboard_options[cvs-rateboard-slideimg__enable]" id="cvs-rateboard-slideimg__enable" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function rateboard_slide_imgs_cb() {

		$opts_Arr  			= $this->options;
		$this_opt   		= isset( $opts_Arr['cvs-rateboard-slideimg__ids'] ) 
								? $opts_Arr['cvs-rateboard-slideimg__ids'] 
								: '';

		$placeholder_img 	= 'https://via.placeholder.com/256x144?text=ClearViewSys.com';
		?>

		<div id="rateboard-slide-imgs" class="repeater-container">

			<div class="flex-container">

				<?php
				$ids_val = isset ( $opts_Arr['cvs-rateboard-slideimg__ids'] ) 
							? $opts_Arr['cvs-rateboard-slideimg__ids']
							: '';
				$ids_Arr = explode(',', $ids_val);

				if ( !empty( $ids_Arr ) ) :

					$id_count 	= count( $ids_Arr );

					$i = 0;
					foreach ( $ids_Arr as $id ) :

						$j 					= ( $i + 1 );

						$img_src 			= wp_get_attachment_image_src( $id, 'medium' ); 
						$img_src 			= $img_src[0];

						$img_src 			= filter_var( $img_src, FILTER_VALIDATE_URL) 
												? $img_src 
												: $placeholder_img;

						$dimg_class 		= ( $img_src !== $placeholder_img ) 
												? 'has-saved-attachment'
												: 'has-placeholder';

						$btn_label 			= ( $img_src !== $placeholder_img )
												? __( 'Replace image' )
												: __( 'Upload image' );
						?>

						<div id="cvs-rateboard-slideimg-<?php echo $j; ?>" class="flex-item <?php echo $dimg_class; ?>">

							<div style="background: transparent url('<?php echo $img_src; ?>') center center/cover no-repeat;">
								<img id='cvs-rateboard-slideimg-<?php echo $j; ?>__preview' src="<?php echo $img_src; ?>" width="" height="144" alt="" style="display: block; height: 144px; width: auto; margin-bottom: 12px;" data-id="<?php echo $id; ?>" />
							</div>

							<input type="button" id="cvs-rateboard-slideimg-<?php echo $j; ?>__uploadbtn" class="button btn--upload" value="<?php echo $btn_label; ?>" />
							<input type="button" id="cvs-rateboard-slideimg-<?php echo $j; ?>__removebtn" class="button btn--remove" value="<?php _e( 'Remove image' ); ?>" />			

						</div>

						<?php
						$i++;

					endforeach;

				// No value saved
				else:

					$img_src 			= wp_get_attachment_image_src( $this_opt, 'medium' ); 
					$img_src 			= $img_src[0];

					$img_src 			= filter_var( $img_src, FILTER_VALIDATE_URL) 
											? $img_src 
											: $placeholder_img;

					$dimg_class 		= ( $img_src !== $placeholder_img ) 
											? 'has-saved-attachment'
											: 'has-placeholder';

					$btn_label 			= ( $img_src !== $placeholder_img )
											? __( 'Replace image' )
											: __( 'Upload image' );

					//$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
					?>

					<div id="cvs-rateboard-slideimg-01" class="flex-item <?php echo $dimg_class; ?>">

						<div style="background: transparent url('<?php echo $img_src; ?>') center center/cover no-repeat;">
							<img id='cvs-rateboard-slideimg-01__preview' src="<?php echo $img_src; ?>" width="" height="144" alt="" style="display: block; height: 144px; width: auto; margin-bottom: 12px;" data-id="" />
						</div>

						<input type="button" id="cvs-rateboard-slideimg-01__uploadbtn" class="button btn--upload" value="<?php echo $btn_label; ?>" />
						<input type="button" id="cvs-rateboard-slideimg-01__removebtn" class="button btn--remove" value="<?php _e( 'Remove image' ); ?>" />			

					</div>

				<?php
				endif; 

				// The clone template
				?>
				<div id="cvs-rateboard-slideimg-template" class="flex-item has-placeholder">

					<div style="background: transparent url('https://via.placeholder.com/256x144?text=ClearViewSys.com') center center/cover no-repeat;">
						<img id='cvs-rateboard-slideimg-template__preview' src="https://via.placeholder.com/256x144?text=ClearViewSys.com" width="" height="144" alt="" style="display: block; height: 144px; width: auto; margin-bottom: 12px;" data-id="" />
					</div>

					<input type="button" id="cvs-rateboard-slideimg-template__uploadbtn" class="button btn--upload" value="<?php _e( 'Upload image' ); ?>" />
					<input type="button" id="cvs-rateboard-slideimg-template__removebtn" class="button btn--remove" value="<?php _e( 'Remove image' ); ?>" />			

				</div>				

			</div>
			
			<div style="margin-top: 20px; padding-top: 30px; border-top: #ddd solid 1px; box-shadow: 0 -10px 5px -5px rgba(0, 0, 0, .01), 0 -1px 0px 0px rgba(255, 255, 255, 1);">
				<input id="cvs-rateboard-slideimg__addimg" type="button" class="button btn--addimg" value="Add Image" />
			</div>

			<input type='hidden' name='cvs_rateboard_options[cvs-rateboard-slideimg__ids]' id='cvs-rateboard-slideimg__ids' class="repeater-collector" value='<?php echo $opts_Arr['cvs-rateboard-slideimg__ids']; ?>'>

		</div>
		
		<?php

	}	

}
