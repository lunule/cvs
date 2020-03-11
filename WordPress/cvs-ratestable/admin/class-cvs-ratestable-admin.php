<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Rates_Table
 * @subpackage Clearviewsys_Rates_Table/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Rates_Table
 * @subpackage Clearviewsys_Rates_Table/admin
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Rates_Table_Admin {

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
		$this->options 		= get_option('cvs_ratestable_options');

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
		 * defined in Clearviewsys_Rates_Table_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Clearviewsys_Rates_Table_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$screen = get_current_screen();

		if ( 'clearviewsys_page_cvs-ratestable-settings' == $screen->base ) :

			wp_enqueue_style( $this->plugin_name . '-dragula', plugin_dir_url( __FILE__ ) . 'css/dragula.min.css', NULL, $this->version, 'all' );

			wp_enqueue_style( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'css/cvs-ratestable-admin.css', 
				array(
					$this->plugin_name . '-dragula',
				), 
				$this->version, 
				'all' 
			);

		endif;

		wp_enqueue_style( 
			$this->plugin_name . '-general', 
			plugin_dir_url( __FILE__ ) . 'css/cvs-ratestable-admin-general.css', 
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
		 * defined in Clearviewsys_Rates_Table_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Clearviewsys_Rates_Table_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		$screen = get_current_screen();

		if ( 'clearviewsys_page_cvs-ratestable-settings' == $screen->base ) :

			wp_enqueue_media();

			wp_enqueue_script( $this->plugin_name . '-tabslet', plugin_dir_url( __FILE__ ) . 'js/jquery.tabslet.min.js', array( 'jquery' ), $this->version, false );

			wp_enqueue_script( $this->plugin_name . '-dragula', plugin_dir_url( __FILE__ ) . 'js/dragula.min.js', array( 'jquery' ), $this->version, false );			

			wp_enqueue_script( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'js/cvs-ratestable-admin.js', 
				array( 
					'jquery',				
					$this->plugin_name . '-tabslet',
					$this->plugin_name . '-dragula',					
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
				__('ClearViewSys', 'cvs-ratestable' ), 			// page title
				__('ClearViewSys', 'cvs-ratestable' ),   		// menu title
				'manage_options', 								// capability
				'cvs-general', 									// menu-slug
				NULL, 											// callback function
				'none', 										// icon_url
				30 												// position
			);

			add_submenu_page(
				'cvs-general',
				__('ClearViewSys - General Info & Settings', 'cvs-ratestable' ),
				__('General', 'cvs-marquee' ),
				'manage_options', 							
				'cvs-general',
				array( $this, 'create_general_cb' ),
				0
			);		

		endif;

	    add_submenu_page(
	        'cvs-general', 										// parent slug
			__( 'CVS Rates Table', 'cvs-ratestable' ), 			// parent title
	        __( 'CVS Rates Table', 'cvs-ratestable' ), 			// menu title
	        'manage_options', 									// capability
	        'cvs-ratestable-settings', 							// menu slug
	        array( $this, 'create_admin_page_cb'),				// callback function
	        20 													// position
		);

	}

	/**
	 * Options page callback
	 */
	public function create_general_cb() {
		
		// Set class property
		$this->options = get_option( 'cvs_gen_options' );
		?>
		
		<div class="wrap">
		
			<h1><?php printf( __('%s General Information', 'cvs-ratestable'), '<span>ClearViewSys</span>' ); ?></h1>
		
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
		$this->options = get_option( 'cvs_ratestable_options' );
		?>
		
		<div class="wrap">
		
			<h1><?php printf( __('%s Settings', 'cvs-ratestable'), '<span>ClearViewSys Rates Table</span>' ); ?></h1>
		
			<form method="post" action="options.php">

				<?php
				// This prints out all hidden setting fields
				settings_fields( 'cvs_ratestable_option_group' ); 		// Option group
				?>

				<div class="cvs-ratestable-opts-tabs">
					
					<ul>
						<li>
							<a href="#d-gentab">
								<?php _e( 'General Table Display Settings', 'cvs-ratestable'); ?>
							</a>
						</li>
						
						<li>
							<a href="#col-gentab">
								<?php _e( 'General Table Column Settings', 'cvs-ratestable'); ?>
							</a>
						</li>
						
						<li>
							<a href="#d-hometab">
								<?php _e( 'Front Page Table Display Settings', 'cvs-ratestable'); ?>
							</a>
						</li>
						
						<li>
							<a href="#col-hometab">
								<?php _e( 'Front Page Table Column Settings', 'cvs-ratestable'); ?>
							</a>
						</li>
						
					</ul>
					
					<div id="d-gentab">
						<?php do_settings_sections( 'section-general-table-display-settings' ); ?>
					</div>

					<div id="col-gentab">
						<?php do_settings_sections( 'section-general-table-column-settings' ); ?>
					</div>
					
					<div id="d-hometab">
						<?php do_settings_sections( 'section-front-page-table-display-settings' ); ?>
					</div>
					
					<div id="col-hometab">
						<?php do_settings_sections( 'section-front-page-table-column-settings' ); ?>
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
			'cvs_ratestable_option_group', 									// Option group
			'cvs_ratestable_options', 										// Option name
			array( $this, 'sanitize' ) 										// Sanitize
		);

		/* General Table Display Settings ------------------------------------------------- */

		add_settings_section(
			'section_general_display', 												// ID
			'General Table Display Settings', 								// Title
			array( $this, 'section_info_general_display' ), 				// Callback
			'section-general-table-display-settings' 						// Section!!!
		);

		add_settings_field(
			'freq_general',
			'Update Frequency (in milliseconds)',
			array( $this, 'freq_general_cb' ),
			'section-general-table-display-settings',
			'section_general_display'           
		);

		add_settings_field(
			'hide_showentries_general', 									// ID
			'Disable "Show (...) entries" Dropdown', 						// Title 
			array( $this, 'general_hide_showentries_cb' ), 					// Callback
			'section-general-table-display-settings', 			   			// Page
			'section_general_display'	 											// Section           
		);      

		add_settings_field(
			'hide_search_general', 
			'Disable Search Box', 
			array( $this, 'general_hide_search_cb' ), 
			'section-general-table-display-settings', 
			'section_general_display'
		);

		add_settings_field(
			'hide_info_general', 
			'Disable Entry Info', 
			array( $this, 'general_hide_info_cb' ), 
			'section-general-table-display-settings', 
			'section_general_display'
		);

		add_settings_field(
			'hide_pagi_general', 
			'Disable Pagination', 
			array( $this, 'general_hide_pagi_cb' ), 
			'section-general-table-display-settings', 
			'section_general_display'
		);          

		add_settings_field(
			'currnumber_tpage_general',
			'Number of Currencies to Display on a Table Page', 
			array( $this, 'general_currnumber_tpage_cb' ),
			'section-general-table-display-settings',
			'section_general_display'           
		);

		/* General Table Column Settings ------------------------------------------------- */

		add_settings_section(
			'section_general_cols',
			'General Table Column Settings',
			array( $this, 'section_info_general_cols' ),
			'section-general-table-column-settings'
		);

		add_settings_field(
			'subheading_colsort_general',
			'<h3>Order of Table Columns</h3>', 
			array( $this, 'general_colsort_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'colsort_general', 
			'You can change the column order by drag & drop', 
			array( $this, 'general_colsort_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_flag_general',
			'<h3>Country Flags Column</h3>', 
			array( $this, 'general_flag_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_flag_general', 
			'Disable Country Flag Column', 
			array( $this, 'general_hide_flag_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_flag_general', 
			'Custom Country Flags Column Label', 
			array( $this, 'general_collabel_flag_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_code_general',
			'<h3>Country Code Column</h3>', 
			array( $this, 'general_code_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'collabel_code_general', 
			'Custom Country Code Column Label', 
			array( $this, 'general_collabel_code_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_country_general',
			'<h3>Country Name Column</h3>', 
			array( $this, 'general_country_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_country_general', 
			'Disable Country Name Column', 
			array( $this, 'general_hide_country_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_country_general', 
			'Custom Country Name Column Label', 
			array( $this, 'general_collabel_country_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_currency_general',
			'<h3>Currency Name Column</h3>', 
			array( $this, 'general_currency_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_currency_general', 
			'Disable Currency Name Column', 
			array( $this, 'general_hide_currency_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_currency_general', 
			'Custom Currency Name Column Label', 
			array( $this, 'general_collabel_currency_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_webuy_general',
			'<h3>We Buy Column</h3>', 
			array( $this, 'general_webuy_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_webuy_general', 
			'Disable We Buy Column', 
			array( $this, 'general_hide_webuy_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_webuy_general', 
			'Custom We Buy Column Label', 
			array( $this, 'general_collabel_webuy_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_wesell_general',
			'<h3>We Sell Column</h3>', 
			array( $this, 'general_wesell_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'hide_wesell_general', 
			'Disable We Sell Column', 
			array( $this, 'general_hide_wesell_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_wesell_general', 
			'Custom We Sell Column Label', 
			array( $this, 'general_collabel_wesell_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_invbuy_general',
			'<h3>' . __( 'We Buy Column (INVERSE RATES)', 'cvs-ratestable' ) . '</h3>',
			array( $this, 'general_invbuy_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'show_invbuy_general', 
			'Enable We Buy Column (INVERSE RATES)', 
			array( $this, 'general_show_invbuy_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_invbuy_general', 
			'Custom We Buy Column Label (INVERSE RATES)', 
			array( $this, 'general_collabel_invbuy_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'subheading_invsell_general',
			'<h3>' . __( 'We Sell Column (INVERSE RATES)', 'cvs-ratestable' ) . '</h3>',
			array( $this, 'general_invsell_header_cb' ),
			'section-general-table-column-settings',
			'section_general_cols'           
		);

		add_settings_field(
			'show_invsell_general', 
			'Enable We Sell Column (INVERSE RATES)', 
			array( $this, 'general_show_invsell_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		add_settings_field(
			'collabel_invsell_general', 
			'Custom We Sell Column Label (INVERSE RATES)', 
			array( $this, 'general_collabel_invsell_cb' ), 
			'section-general-table-column-settings', 
			'section_general_cols'
		);

		/* Front Page Table Display Settings ------------------------------------------------- */

		add_settings_section(
			'section_front', 							
			'Front Page Table Display Settings', 			
			array( $this, 'section_info_front' ),
			'section-front-page-table-display-settings' 							
		);          

		add_settings_field(
			'freq_front',
			'Update Frequency', 
			array( $this, 'freq_front_cb' ),
			'section-front-page-table-display-settings',
			'section_front'           
		);		

		add_settings_field(
			'hide_showentries_front',
			'Disable "Show (...) entries" Dropdown', 
			array( $this, 'front_hide_showentries_cb' ),
			'section-front-page-table-display-settings',
			'section_front'           
		);      

		add_settings_field(
			'hide_search_front', 
			'Disable Search Box', 
			array( $this, 'front_hide_search_cb' ), 
			'section-front-page-table-display-settings', 
			'section_front'
		);

		add_settings_field(
			'hide_info_front', 
			'Disable Entry Info', 
			array( $this, 'front_hide_info_cb' ), 
			'section-front-page-table-display-settings', 
			'section_front'
		);

		add_settings_field(
			'hide_pagi_front', 
			'Disable Pagination', 
			array( $this, 'front_hide_pagi_cb' ), 
			'section-front-page-table-display-settings', 
			'section_front'
		);          

		add_settings_field(
			'currnumber_tpage_front',
			'Number of Currencies to Display on a Table Page', 
			array( $this, 'front_currnumber_tpage_cb' ),
			'section-front-page-table-display-settings',
			'section_front'           
		);    

		/* Front Page Table Column Settings ---------------------------------------------------- */

		add_settings_section(
			'section_front_cols',
			'Front Page Table Column Settings',
			array( $this, 'section_info_front_cols' ),
			'section-front-page-table-column-settings'
		);

		add_settings_field(
			'subheading_colsort_front',
			'<h3>Order of Table Columns</h3>', 
			array( $this, 'front_colsort_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'colsort_front', 
			'You can change the column order by drag & drop', 
			array( $this, 'front_colsort_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);		

		add_settings_field(
			'subheading_flag_front',
			'<h3>Country Flags Column</h3>', 
			array( $this, 'front_flag_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_flag_front', 
			'Disable Country Flag Column', 
			array( $this, 'front_hide_flag_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_flag_front', 
			'Custom Country Flags Column Label', 
			array( $this, 'front_collabel_flag_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_code_front',
			'<h3>Country Code Column</h3>', 
			array( $this, 'front_code_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'collabel_code_front', 
			'Custom Country Code Column Label', 
			array( $this, 'front_collabel_code_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_country_front',
			'<h3>Country Name Column</h3>', 
			array( $this, 'front_country_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_country_front', 
			'Disable Country Name Column', 
			array( $this, 'front_hide_country_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_country_front', 
			'Custom Country Name Column Label', 
			array( $this, 'front_collabel_country_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_currency_front',
			'<h3>Currency Name Column</h3>', 
			array( $this, 'front_currency_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_currency_front', 
			'Disable Currency Name Column', 
			array( $this, 'front_hide_currency_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_currency_front', 
			'Custom Currency Name Column Label', 
			array( $this, 'front_collabel_currency_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_webuy_front',
			'<h3>We Buy Column</h3>', 
			array( $this, 'front_webuy_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_webuy_front', 
			'Disable We Buy Column', 
			array( $this, 'front_hide_webuy_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_webuy_front', 
			'Custom We Buy Column Label', 
			array( $this, 'front_collabel_webuy_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_wesell_front',
			'<h3>We Sell Column</h3>', 
			array( $this, 'front_wesell_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'hide_wesell_front', 
			'Disable We Sell Column', 
			array( $this, 'front_hide_wesell_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_wesell_front', 
			'Custom We Sell Column Label', 
			array( $this, 'front_collabel_wesell_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_invbuy_front',
			'<h3>' . __( 'We Buy Column (INVERSE RATES)', 'cvs-ratestable' ) . '</h3>',
			array( $this, 'front_invbuy_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'show_invbuy_front', 
			'Enable We Buy Column (INVERSE RATES)', 
			array( $this, 'front_show_invbuy_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_invbuy_front', 
			'Custom We Buy Column Label (INVERSE RATES)', 
			array( $this, 'front_collabel_invbuy_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'subheading_invsell_front',
			'<h3>' . __( 'We Sell Column (INVERSE RATES)', 'cvs-ratestable' ) . '</h3>',
			array( $this, 'front_invsell_header_cb' ),
			'section-front-page-table-column-settings',
			'section_front_cols'           
		);

		add_settings_field(
			'show_invsell_front', 
			'Enable We Sell Column (INVERSE RATES)', 
			array( $this, 'front_show_invsell_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
		);

		add_settings_field(
			'collabel_invsell_front', 
			'Custom We Sell Column Label (INVERSE RATES)', 
			array( $this, 'front_collabel_invsell_cb' ), 
			'section-front-page-table-column-settings', 
			'section_front_cols'
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

		if( isset( $input['hide_showentries_general'] ) )
			$new_input['hide_showentries_general'] = sanitize_key( $input['hide_showentries_general'] );

		if( isset( $input['hide_search_general'] ) )
			$new_input['hide_search_general'] = sanitize_key( $input['hide_search_general'] );

		if( isset( $input['hide_info_general'] ) )
			$new_input['hide_info_general'] = sanitize_key( $input['hide_info_general'] );

		if( isset( $input['hide_pagi_general'] ) )
			$new_input['hide_pagi_general'] = sanitize_key( $input['hide_pagi_general'] );

		if( isset( $input['currnumber_tpage_general'] ) )
			$new_input['currnumber_tpage_general'] = ( absint( $input['currnumber_tpage_general'] ) > 0 )
												? absint( $input['currnumber_tpage_general'] )
												: '';

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

		if( isset( $input['hide_showentries_front'] ) )
			$new_input['hide_showentries_front'] = sanitize_key( $input['hide_showentries_front'] );

		if( isset( $input['hide_search_front'] ) )
			$new_input['hide_search_front'] = sanitize_key( $input['hide_search_front'] );

		if( isset( $input['hide_info_front'] ) )
			$new_input['hide_info_front'] = sanitize_key( $input['hide_info_front'] );

		if( isset( $input['hide_pagi_front'] ) )
			$new_input['hide_pagi_front'] = sanitize_key( $input['hide_pagi_front'] );

		if( isset( $input['currnumber_tpage_front'] ) )
			$new_input['currnumber_tpage_front'] = ( absint( $input['currnumber_tpage_front'] ) > 0 )
												? absint( $input['currnumber_tpage_front'] )
												: '';

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

		$info_Str = __('Update this field\'s value if you move the base CVS folder anywhere else then the `wp-admin` subfolder of your website\'s WordPress root.<br /> The field accepts a full url or a location relative to the WordPress root.', 'cvs-ratestable' );
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
			'<input type="number" id="freq_general" name="cvs_ratestable_options[freq_general]" value="%s" />',
			isset( $this->options['freq_general'] ) 
				? ( $this->options['freq_general'] >= 0 )
					? esc_attr( $this->options['freq_general'])
					: '3000' 
				: '3000'
		);

		$info_Str = __('Set this to 0 if you don\'t need rate values to be regularly refreshed.', 'cvs-ratestable' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	} 	

	/** 
	 * Get the settings option array and print one of its values
	 */
	public function general_hide_showentries_cb() {
		$opts_Arr  	= $this->options;
		$this_opt 	= isset( $opts_Arr['hide_showentries_general'] ) ? $opts_Arr['hide_showentries_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_showentries_general]" id="hide_showentries_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function general_hide_search_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_search_general'] ) ? $opts_Arr['hide_search_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_search_general]" id="hide_search_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function general_hide_info_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_info_general'] ) ? $opts_Arr['hide_info_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_info_general]" id="hide_info_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function general_hide_pagi_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_pagi_general'] ) ? $opts_Arr['hide_pagi_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_pagi_general]" id="hide_pagi_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_currnumber_tpage_cb() {
		printf(
			'<input type="number" id="currnumber_tpage_general" name="cvs_ratestable_options[currnumber_tpage_general]" value="%s" />',
			isset( $this->options['currnumber_tpage_general'] ) ? esc_attr( $this->options['currnumber_tpage_general']) : ''
		);

		echo '<p><em><small>Works only if table pagination is enabled</small></em></p>';
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
					<span><?php _e( 'Flag', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-code-general">
					<span>2</span>
					<span><?php _e( 'Currency ISO', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-country-general">
					<span>3</span>
					<span><?php _e( 'Country', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-currency-general">
					<span>4</span>
					<span><?php _e( 'Currency Name', 'cvs-ratestable' ) ?></span>
				</div>			
				
				<div class="flex-item col-webuy-general">
					<span>5</span>
					<span><?php _e( 'We Buy', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-wesell-general">
					<span>6</span>
					<span><?php _e( 'We Sell', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-invbuy-general">
					<span>7</span>
					<span><?php _e( 'Inverse Buy', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-invsell-general">
					<span>8</span>
					<span><?php _e( 'Inverse Sell', 'cvs-ratestable' ) ?></span>
				</div>
		    
		    </div>		

		</div>

		<?php
		printf(
			'<input type="hidden" id="colsort_general" name="cvs_ratestable_options[colsort_general]" value="%s" />',
			isset( $this->options['colsort_general'] ) ? esc_attr( $this->options['colsort_general']) : ''
		);
		
	}            

	public function general_flag_header_cb() {}    

	public function general_hide_flag_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_flag_general'] ) ? $opts_Arr['hide_flag_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_flag_general]" id="hide_flag_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_flag_cb() {
		printf(
			'<input type="text" id="collabel_flag_general" name="cvs_ratestable_options[collabel_flag_general]" value="%s" />',
			isset( $this->options['collabel_flag_general'] ) ? esc_attr( $this->options['collabel_flag_general']) : ''
		);
	}

	public function general_code_header_cb() {}    

	public function general_collabel_code_cb() {
		printf(
			'<input type="text" id="collabel_code_general" name="cvs_ratestable_options[collabel_code_general]" value="%s" />',
			isset( $this->options['collabel_code_general'] ) ? esc_attr( $this->options['collabel_code_general']) : ''
		);
	}

	public function general_country_header_cb() {}    

	public function general_hide_country_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_country_general'] ) ? $opts_Arr['hide_country_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_country_general]" id="hide_country_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_country_cb() {
		printf(
			'<input type="text" id="collabel_country_general" name="cvs_ratestable_options[collabel_country_general]" value="%s" />',
			isset( $this->options['collabel_country_general'] ) ? esc_attr( $this->options['collabel_country_general']) : ''
		);
	}

	public function general_currency_header_cb() {}    

	public function general_hide_currency_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_currency_general'] ) ? $opts_Arr['hide_currency_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_currency_general]" id="hide_currency_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_currency_cb() {
		printf(
			'<input type="text" id="collabel_currency_general" name="cvs_ratestable_options[collabel_currency_general]" value="%s" />',
			isset( $this->options['collabel_currency_general'] ) ? esc_attr( $this->options['collabel_currency_general']) : ''
		);
	}

	public function general_webuy_header_cb() {}    

	public function general_hide_webuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_webuy_general'] ) ? $opts_Arr['hide_webuy_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_webuy_general]" id="hide_webuy_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_webuy_cb() {
		printf(
			'<input type="text" id="collabel_webuy_general" name="cvs_ratestable_options[collabel_webuy_general]" value="%s" />',
			isset( $this->options['collabel_webuy_general'] ) ? esc_attr( $this->options['collabel_webuy_general']) : ''
		);
	}

	public function general_wesell_header_cb() {}    

	public function general_hide_wesell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_wesell_general'] ) ? $opts_Arr['hide_wesell_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_wesell_general]" id="hide_wesell_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_wesell_cb() {
		printf(
			'<input type="text" id="collabel_wesell_general" name="cvs_ratestable_options[collabel_wesell_general]" value="%s" />',
			isset( $this->options['collabel_wesell_general'] ) ? esc_attr( $this->options['collabel_wesell_general']) : ''
		);
	}

	public function general_invbuy_header_cb() {}    

	public function general_show_invbuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invbuy_general'] ) ? $opts_Arr['show_invbuy_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[show_invbuy_general]" id="show_invbuy_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_invbuy_cb() {
		printf(
			'<input type="text" id="collabel_invbuy_general" name="cvs_ratestable_options[collabel_invbuy_general]" value="%s" />',
			isset( $this->options['collabel_invbuy_general'] ) ? esc_attr( $this->options['collabel_invbuy_general']) : ''
		);
	}

	public function general_invsell_header_cb() {}    

	public function general_show_invsell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invsell_general'] ) ? $opts_Arr['show_invsell_general'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[show_invsell_general]" id="show_invsell_general" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function general_collabel_invsell_cb() {
		printf(
			'<input type="text" id="collabel_invsell_general" name="cvs_ratestable_options[collabel_invsell_general]" value="%s" />',
			isset( $this->options['collabel_invsell_general'] ) ? esc_attr( $this->options['collabel_invsell_general']) : ''
		);
	}	                    

/* Front Page Table Display Settings ----------------------------------------------------------- */ 

	public function section_info_front() {
		// print 'Enter your settings below:';
	}

	public function freq_front_cb() {
		printf(
			'<input type="number" id="freq_front" name="cvs_ratestable_options[freq_front]" value="%s" />',
			isset( $this->options['freq_front'] ) 
				? ( $this->options['freq_front'] >= 0 )
					? esc_attr( $this->options['freq_front'])
					: '3000' 
				: '3000'
		);

		$info_Str = __('Set this to 0 if you don\'t need rate values to be regularly refreshed.', 'cvs-ratestable' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}	

	public function front_hide_showentries_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_showentries_front'] ) ? $opts_Arr['hide_showentries_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_showentries_front]" id="hide_showentries_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function front_hide_search_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_search_front'] ) ? $opts_Arr['hide_search_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_search_front]" id="hide_search_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function front_hide_info_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_info_front'] ) ? $opts_Arr['hide_info_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_info_front]" id="hide_info_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function front_hide_pagi_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_pagi_front'] ) ? $opts_Arr['hide_pagi_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_pagi_front]" id="hide_pagi_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}    

	public function front_currnumber_tpage_cb() {
		printf(
			'<input type="number" id="currnumber_tpage_front" name="cvs_ratestable_options[currnumber_tpage_front]" value="%s" />',
			isset( $this->options['currnumber_tpage_front'] ) ? esc_attr( $this->options['currnumber_tpage_front']) : ''
		);

		echo '<p style="display: inline-block; margin-left: 7px;">* <span style="font-style: italic;">Works only if table pagination is enabled.</span></p>';

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
					<span><?php _e( 'Flag', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-code-front">
					<span>2</span>
					<span><?php _e( 'Currency ISO', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-country-front">
					<span>3</span>
					<span><?php _e( 'Country', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-currency-front">
					<span>4</span>
					<span><?php _e( 'Currency Name', 'cvs-ratestable' ) ?></span>
				</div>			
				
				<div class="flex-item col-webuy-front">
					<span>5</span>
					<span><?php _e( 'We Buy', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-wesell-front">
					<span>6</span>
					<span><?php _e( 'We Sell', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-invbuy-front">
					<span>7</span>
					<span><?php _e( 'Inverse Buy', 'cvs-ratestable' ) ?></span>
				</div>
				
				<div class="flex-item col-invsell-front">
					<span>8</span>
					<span><?php _e( 'Inverse Sell', 'cvs-ratestable' ) ?></span>
				</div>
		    
		    </div>		

		</div>

		<?php
		printf(
			'<input type="hidden" id="colsort_front" name="cvs_ratestable_options[colsort_front]" value="%s" />',
			isset( $this->options['colsort_front'] ) ? esc_attr( $this->options['colsort_front']) : ''
		);
		
	}	

	public function front_flag_header_cb() {}    

	public function front_hide_flag_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_flag_front'] ) ? $opts_Arr['hide_flag_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_flag_front]" id="hide_flag_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_flag_cb() {
		printf(
			'<input type="text" id="collabel_flag_front" name="cvs_ratestable_options[collabel_flag_front]" value="%s" />',
			isset( $this->options['collabel_flag_front'] ) ? esc_attr( $this->options['collabel_flag_front']) : ''
		);
	}

	public function front_code_header_cb() {}    

	public function front_collabel_code_cb() {
		printf(
			'<input type="text" id="collabel_code_front" name="cvs_ratestable_options[collabel_code_front]" value="%s" />',
			isset( $this->options['collabel_code_front'] ) ? esc_attr( $this->options['collabel_code_front']) : ''
		);
	}

	public function front_country_header_cb() {}    

	public function front_hide_country_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_country_front'] ) ? $opts_Arr['hide_country_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_country_front]" id="hide_country_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_country_cb() {
		printf(
			'<input type="text" id="collabel_country_front" name="cvs_ratestable_options[collabel_country_front]" value="%s" />',
			isset( $this->options['collabel_country_front'] ) ? esc_attr( $this->options['collabel_country_front']) : ''
		);
	}

	public function front_currency_header_cb() {}    

	public function front_hide_currency_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_currency_front'] ) ? $opts_Arr['hide_currency_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_currency_front]" id="hide_currency_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_currency_cb() {
		printf(
			'<input type="text" id="collabel_currency_front" name="cvs_ratestable_options[collabel_currency_front]" value="%s" />',
			isset( $this->options['collabel_currency_front'] ) ? esc_attr( $this->options['collabel_currency_front']) : ''
		);
	}

	public function front_webuy_header_cb() {}    

	public function front_hide_webuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_webuy_front'] ) ? $opts_Arr['hide_webuy_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_webuy_front]" id="hide_webuy_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_webuy_cb() {
		printf(
			'<input type="text" id="collabel_webuy_front" name="cvs_ratestable_options[collabel_webuy_front]" value="%s" />',
			isset( $this->options['collabel_webuy_front'] ) ? esc_attr( $this->options['collabel_webuy_front']) : ''
		);
	}

	public function front_wesell_header_cb() {}    

	public function front_hide_wesell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['hide_wesell_front'] ) ? $opts_Arr['hide_wesell_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[hide_wesell_front]" id="hide_wesell_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_wesell_cb() {
		printf(
			'<input type="text" id="collabel_wesell_front" name="cvs_ratestable_options[collabel_wesell_front]" value="%s" />',
			isset( $this->options['collabel_wesell_front'] ) ? esc_attr( $this->options['collabel_wesell_front']) : ''
		);
	}

	public function front_invbuy_header_cb() {}    

	public function front_show_invbuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invbuy_front'] ) ? $opts_Arr['show_invbuy_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[show_invbuy_front]" id="show_invbuy_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_invbuy_cb() {
		printf(
			'<input type="text" id="collabel_invbuy_front" name="cvs_ratestable_options[collabel_invbuy_front]" value="%s" />',
			isset( $this->options['collabel_invbuy_front'] ) ? esc_attr( $this->options['collabel_invbuy_front']) : ''
		);
	}

	public function front_invsell_header_cb() {}    

	public function front_show_invsell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['show_invsell_front'] ) ? $opts_Arr['show_invsell_front'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_ratestable_options[show_invsell_front]" id="show_invsell_front" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}            

	public function front_collabel_invsell_cb() {
		printf(
			'<input type="text" id="collabel_invsell_front" name="cvs_ratestable_options[collabel_invsell_front]" value="%s" />',
			isset( $this->options['collabel_invsell_front'] ) ? esc_attr( $this->options['collabel_invsell_front']) : ''
		);
	}	 	

}
