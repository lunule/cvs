<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Marquee
 * @subpackage Clearviewsys_Marquee/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Marquee
 * @subpackage Clearviewsys_Marquee/admin
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Marquee_Admin {

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
		$this->options 		= get_option('cvs_marquee_options');

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		$screen = get_current_screen();

		if ( 'clearviewsys_page_cvs-marquee-settings' == $screen->base ) :

			wp_enqueue_style( $this->plugin_name . '-pickr-theme', plugin_dir_url( __FILE__ ) . 'css/nano.min.css', array(), $this->version, 'all' );

			wp_enqueue_style( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'css/cvs-marquee-admin.css', 
				array(
					$this->plugin_name . '-pickr-theme',
				), 
				$this->version, 
				'all' 
			);

		endif;

		wp_enqueue_style( 
			$this->plugin_name . '-general', 
			plugin_dir_url( __FILE__ ) . 'css/cvs-marquee-admin-general.css', 
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

		if ( 'clearviewsys_page_cvs-marquee-settings' == $screen->base ) :

			wp_enqueue_script( $this->plugin_name . '-pickr', plugin_dir_url( __FILE__ ) . 'js/pickr.min.js', array( 'jquery' ), $this->version, false );

			wp_enqueue_script( 
				$this->plugin_name, 
				plugin_dir_url( __FILE__ ) . 'js/cvs-marquee-admin.js', 
				array( 
					'jquery',				
					$this->plugin_name . '-pickr',
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
				__('ClearViewSys', 'cvs-marquee' ), 			// page title
				__('ClearViewSys', 'cvs-marquee' ),   			// menu title
				'manage_options', 								// capability
				'cvs-general', 									// menu-slug
				NULL, 											// callback function
				'none', 										// icon_url
				30 												// position
			);

			add_submenu_page(
				'cvs-general',
				__('ClearViewSys - General Info & Settings', 'cvs-marquee' ),
				__('General', 'cvs-marquee' ),
				'manage_options', 							
				'cvs-general',
				array( $this, 'create_general_cb' ),
				0
			);		

		endif;

	    add_submenu_page(
	        'cvs-general', 										// parent slug
			__( 'CVS Ticker', 'cvs-marquee' ), 					// parent title
	        __( 'CVS Ticker', 'cvs-marquee' ), 					// menu title
	        'manage_options', 									// capability
	        'cvs-marquee-settings', 							// menu slug
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
		
			<h1><?php printf( __('%s General Information', 'cvs-marquee'), '<span>ClearViewSys</span>' ); ?></h1>
		
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
		$this->options = get_option( 'cvs_marquee_options' );
		?>
		
		<div class="wrap">
		
			<h1><?php printf( __('%s Settings', 'cvs-marquee'), '<span>ClearViewSys Rates Ticker</span>' ); ?></h1>
		
			<form method="post" action="options.php">

				<?php
				// This prints out all hidden setting fields
				settings_fields( 'cvs_marquee_option_group' ); 			// Option group
				do_settings_sections( 'section-marquee-settings' ); 
				do_settings_sections( 'section-marquee-styles' );
				do_settings_sections( 'section-marquee-data' );				 				 
				
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

		/* Register marquee option group ------------------------------------------------------- */

		// Setting
		register_setting(
			'cvs_marquee_option_group', 								// Option group
			'cvs_marquee_options', 										// Option name
			array( $this, 'sanitize' ) 									// Sanitize
		);

		/* Add marquee settings section -------------------------------------------------------- */

		// Section
		add_settings_section(
			'marquee_settings', 										// id
			'Ticker Settings', 											// title
			array( $this, 'section_info_marquee_settings_cb' ), 		// callback
			'section-marquee-settings' 									// page
		);

		// Fields
		add_settings_field(
			'freq',
			'Update Frequency (in milliseconds)', 
			array( $this, 'freq_cb' ),
			'section-marquee-settings',
			'marquee_settings'           
		);		    

		/* Add marquee styles section ---------------------------------------------------------- */

		// Section
		add_settings_section(
			'marquee_styles',
			'Ticker Styles',
			array( $this, 'section_info_marquee_styles_cb' ),
			'section-marquee-styles'
		);

		// Fields
		add_settings_field(
			'marquee_bck', 
			'Ticker Background Color', 
			array( $this, 'marquee_bck_cb' ), 
			'section-marquee-styles', 
			'marquee_styles'
		);

		add_settings_field(
			'marquee_col', 
			'Ticker Color', 
			array( $this, 'marquee_col_cb' ), 
			'section-marquee-styles', 
			'marquee_styles'
		);

		add_settings_field(
			'marquee_fsize', 
			'Font Size', 
			array( $this, 'marquee_fsize_cb' ), 
			'section-marquee-styles', 
			'marquee_styles'
		);

		add_settings_field(
			'marquee_vertpad', 
			'Vertical Padding', 
			array( $this, 'marquee_vertpad_cb' ), 
			'section-marquee-styles', 
			'marquee_styles'
		);	

		/* Add marquee data section ------------------------------------------------------------ */

		// Section		
		add_settings_section(
			'marquee_data',
			'Ticker Data',
			array( $this, 'section_info_marquee_data_cb' ),
			'section-marquee-data'
		);

		// Fields - Buy
		add_settings_field(
			'marquee_data_subheading_webuy',
			'<h3 class="cvs-admin-subheading">Buy</h3>', 
			array( $this, 'marquee_data_subheading_webuy_cb' ),
			'section-marquee-data',
			'marquee_data'           
		);

		add_settings_field(
			'marquee_data_hide_webuy', 
			'Hide Buy Data', 
			array( $this, 'marquee_data_hide_webuy_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);

		add_settings_field(
			'marquee_data_hide_webuy_label', 
			'Hide Buy Data Label', 
			array( $this, 'marquee_data_hide_webuy_label_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);		

		add_settings_field(
			'marquee_data_label_webuy', 
			'Custom Buy Data Label', 
			array( $this, 'marquee_data_label_webuy_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);

		// Fields - Sell
		add_settings_field(
			'marquee_data_subheading_wesell',
			'<h3 class="cvs-admin-subheading">Sell</h3>', 
			array( $this, 'marquee_data_subheading_wesell_cb' ),
			'section-marquee-data',
			'marquee_data'           
		);

		add_settings_field(
			'marquee_data_hide_wesell', 
			'Hide Sell Data', 
			array( $this, 'marquee_data_hide_wesell_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);

		add_settings_field(
			'marquee_data_hide_wesell_label', 
			'Hide Sell Data Label', 
			array( $this, 'marquee_data_hide_wesell_label_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);		

		add_settings_field(
			'marquee_data_label_wesell', 
			'Custom Sell Data Label', 
			array( $this, 'marquee_data_label_wesell_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);

		// Fields - Inverse Buy
		add_settings_field(
			'marquee_data_subheading_invbuy',
			'<h3 class="cvs-admin-subheading">Inverse Buy</h3>', 
			array( $this, 'marquee_data_subheading_invbuy_cb' ),
			'section-marquee-data',
			'marquee_data'           
		);

		add_settings_field(
			'marquee_data_hide_invbuy', 
			'Hide Inverse Buy Data', 
			array( $this, 'marquee_data_hide_invbuy_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);

		add_settings_field(
			'marquee_data_hide_invbuy_label', 
			'Hide Inverse Buy Data Label', 
			array( $this, 'marquee_data_hide_invbuy_label_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);		

		add_settings_field(
			'marquee_data_label_invbuy', 
			'Custom Inverse Buy Data Label', 
			array( $this, 'marquee_data_label_invbuy_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);

		// Fields - Inverse Sell
		add_settings_field(
			'marquee_data_subheading_invsell',
			'<h3 class="cvs-admin-subheading">Inverse Sell</h3>', 
			array( $this, 'marquee_data_subheading_invsell_cb' ),
			'section-marquee-data',
			'marquee_data'           
		);

		add_settings_field(
			'marquee_data_hide_invsell', 
			'Hide Inverse Sell Data', 
			array( $this, 'marquee_data_hide_invsell_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);

		add_settings_field(
			'marquee_data_hide_invsell_label', 
			'Hide Inverse Sell Data Label', 
			array( $this, 'marquee_data_hide_invsell_label_cb' ), 
			'section-marquee-data', 
			'marquee_data'
		);		

		add_settings_field(
			'marquee_data_label_invsell', 
			'Custom Inverse Sell Data Label', 
			array( $this, 'marquee_data_label_invsell_cb' ), 
			'section-marquee-data', 
			'marquee_data'
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
	 * Sanitize marquee settings
	 *
	 * @param array $input Contains all settings fields as array keys
	 */
	public function sanitize( $input ) {

		$new_input = array();
		
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

		if( isset( $input['cvs-marquee-bck'] ) ) :

			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-marquee-bck'] ) &&
					preg_match( $pattern, $input['cvs-marquee-bck'] ) 
				) :
				
				$new_input['cvs-marquee-bck'] = sanitize_text_field( $input['cvs-marquee-bck'] );

			else: 

				$new_input['cvs-marquee-bck'] = 'rgba(0, 0, 0, 1)';
			
			endif;

		endif;

		if( isset( $input['cvs-marquee-col'] ) ) :

			$pattern = '/^(\#[\da-f]{3}|\#[\da-f]{6}|rgba\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2} ((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)(,\s*(0\.\d+|1))\)|hsla\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)(,\s*(0\.\d+|1))\)|rgb\(((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*,\s*){2}((\d{1,2}|1\d\d|2([0-4]\d|5[0-5]))\s*)|hsl\(\s*((\d{1,2}|[1-2]\d{2}|3([0-5]\d|60)))\s*,\s*((\d{1,2}|100)\s*%)\s*,\s*((\d{1,2}|100)\s*%)\))$/';
			
			if ( 
					isset( $input['cvs-marquee-col'] ) &&
					preg_match( $pattern, $input['cvs-marquee-col'] ) 
				) :
				
				$new_input['cvs-marquee-col'] = sanitize_text_field( $input['cvs-marquee-col'] );

			else: 

				$new_input['cvs-marquee-col'] = 'rgba(255, 255, 255, 1)';
			
			endif;

		endif;		

		if( isset( $input['cvs-marquee-fsize'] ) ) :

			if ( 
					( '' !== $input['cvs-marquee-fsize'] ) 	&&
					( intval( $input['cvs-marquee-fsize'] ) >= 0 )
				) :
				$new_input['cvs-marquee-fsize'] = absint( $input['cvs-marquee-fsize'] );
			else :
				$new_input['cvs-marquee-fsize'] = '24';
			endif;

		else :

			$new_input['cvs-marquee-fsize'] = '24';

		endif;

		if( isset( $input['cvs-marquee-vertpad'] ) ) :

			if ( 
					( '' !== $input['cvs-marquee-vertpad'] ) 	&&
					( intval( $input['cvs-marquee-vertpad'] ) >= 0 )
				) :
				$new_input['cvs-marquee-vertpad'] = absint( $input['cvs-marquee-vertpad'] );
			else :
				$new_input['cvs-marquee-vertpad'] = '18';
			endif;

		else :

			$new_input['cvs-marquee-vertpad'] = '18';

		endif;				

		/* Fields - Buy */
		if( isset( $input['cvs-marquee-hide-webuy'] ) )
			$new_input['cvs-marquee-hide-webuy'] = sanitize_key( $input['cvs-marquee-hide-webuy'] );

		if( isset( $input['cvs-marquee-hide-webuy-label'] ) )
			$new_input['cvs-marquee-hide-webuy-label'] = sanitize_key( $input['cvs-marquee-hide-webuy-label'] );		

		if( isset( $input['cvs-marquee-webuy-label'] ) )
			$new_input['cvs-marquee-webuy-label'] = sanitize_text_field( $input['cvs-marquee-webuy-label'] );

		/* Fields - Sell */
		if( isset( $input['cvs-marquee-hide-wesell'] ) )
			$new_input['cvs-marquee-hide-wesell'] = sanitize_key( $input['cvs-marquee-hide-wesell'] );

		if( isset( $input['cvs-marquee-hide-wesell-label'] ) )
			$new_input['cvs-marquee-hide-wesell-label'] = sanitize_key( $input['cvs-marquee-hide-wesell-label'] );		

		if( isset( $input['cvs-marquee-wesell-label'] ) )
			$new_input['cvs-marquee-wesell-label'] = sanitize_text_field( $input['cvs-marquee-wesell-label'] );

		/* Fields - Inverse Buy */
		if( isset( $input['cvs-marquee-hide-invbuy'] ) )
			$new_input['cvs-marquee-hide-invbuy'] = sanitize_key( $input['cvs-marquee-hide-invbuy'] );

		if( isset( $input['cvs-marquee-hide-invbuy-label'] ) )
			$new_input['cvs-marquee-hide-invbuy-label'] = sanitize_key( $input['cvs-marquee-hide-invbuy-label'] );		

		if( isset( $input['cvs-marquee-invbuy-label'] ) )
			$new_input['cvs-marquee-invbuy-label'] = sanitize_text_field( $input['cvs-marquee-invbuy-label'] );

		/* Fields - Inverse Sell */
		if( isset( $input['cvs-marquee-hide-invsell'] ) )
			$new_input['cvs-marquee-hide-invsell'] = sanitize_key( $input['cvs-marquee-hide-invsell'] );

		if( isset( $input['cvs-marquee-hide-invsell-label'] ) )
			$new_input['cvs-marquee-hide-invsell-label'] = sanitize_key( $input['cvs-marquee-hide-invsell-label'] );		

		if( isset( $input['cvs-marquee-invsell-label'] ) )
			$new_input['cvs-marquee-invsell-label'] = sanitize_text_field( $input['cvs-marquee-invsell-label'] );								

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

		$info_Str = __('Update this field\'s value if you move the base CVS folder anywhere else then the `wp-admin` subfolder of your website\'s WordPress root.<br /> The field accepts a full url or a location relative to the WordPress root.', 'cvs-marquee' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}

/* Callbacks ----------------------------------------------------------------------------------- */

	/* Marquee Settings section callback
	------------------------------------ */
	public function section_info_marquee_settings_cb() {
		// print 'Set the frequency of checking for rate updates (in milliseconds):';
	}	          

	/* Marquee Settings fields callbacks
	------------------------------------ */
	public function freq_cb() {
		printf(
			'<input type="number" id="freq" name="cvs_marquee_options[freq]" value="%s" />',
			isset( $this->options['freq'] ) 
				? ( $this->options['freq'] >= 0 )
					? esc_attr( $this->options['freq'])
					: '3000' 
				: '3000'
		);

		$info_Str = __('Set this to 0 if you don\'t need rate values to be regularly refreshed.', 'cvs-marquee' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}

	/* Marquee Styles section callback 
	---------------------------------- */
	public function section_info_marquee_styles_cb() {
		// print 'Set the frequency of checking for rate updates (in milliseconds):';
	}	          

	/* Marquee Styles fields callbacks 
	---------------------------------- */
	public function marquee_bck_cb() {
		
		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-marquee-bck-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-col-picker--disabled" value="<?php echo isset( $this->options['cvs-marquee-bck'] ) ? esc_attr( $this->options['cvs-marquee-bck']) : 'rgba(0, 0, 0, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-marquee-bck" name="cvs_marquee_options[cvs-marquee-bck]" value="<?php echo isset( $this->options['cvs-marquee-bck'] ) ? esc_attr( $this->options['cvs-marquee-bck']) : 'rgba(0, 0, 0, 1)'; ?>" />

		<?php
	}

	public function marquee_col_cb() {
		
		/**
		 * We need 3 inputs to implement a color picker:
		 *
		 * 1. 	The one we initiate the picker script on
		 * 2. 	The disabled one we use to show the selected/saved value to the user
		 * 3. 	As the Settings API doesn't save a value of a disabled control, we 
		 * 		need a third input, a hidden one, for the actual value saving
		 */
		?>

		<input type="text" class="cvs-marquee-col-picker cvs-col-picker" value="" />

		<input type="text" class="cvs-col-picker--disabled" value="<?php echo isset( $this->options['cvs-marquee-col'] ) ? esc_attr( $this->options['cvs-marquee-col']) : 'rgba(0, 0, 0, 1)'; ?>" disabled />

		<input type="hidden" id="cvs-marquee-col" name="cvs_marquee_options[cvs-marquee-col]" value="<?php echo isset( $this->options['cvs-marquee-col'] ) ? esc_attr( $this->options['cvs-marquee-col']) : 'rgba(255, 255, 255, 1)'; ?>" />

		<?php
	}	

	public function marquee_fsize_cb() {
		printf(
			'<input type="number" id="cvs-marquee-fsize" name="cvs_marquee_options[cvs-marquee-fsize]" value="%s" />',
			isset( $this->options['cvs-marquee-fsize'] ) 
				? ( $this->options['cvs-marquee-fsize'] >= 0 )
					? esc_attr( $this->options['cvs-marquee-fsize'])
					: '24' 
				: '24'
		);

		$info_Str = __('(In pixels)', 'cvs-marquee' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}

	public function marquee_vertpad_cb() {
		printf(
			'<input type="number" id="cvs-marquee-vertpad" name="cvs_marquee_options[cvs-marquee-vertpad]" value="%s" />',
			isset( $this->options['cvs-marquee-vertpad'] ) 
				? ( $this->options['cvs-marquee-vertpad'] >= 0 )
					? esc_attr( $this->options['cvs-marquee-vertpad'])
					: '18' 
				: '18'
		);

		$info_Str = __('(In pixels)', 'cvs-marquee' );
		echo "<p><em><small>{$info_Str}</small></em></p>";		
	}	

	/* Marquee Data section callback 
	-------------------------------- */
	public function section_info_marquee_data_cb() {}

	/* Marquee Data fields callbacks 
	-------------------------------- */

	/* Callbacks - Buy */
	public function marquee_data_subheading_webuy_cb() {}	          

	public function marquee_data_hide_webuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-webuy'] ) ? $opts_Arr['cvs-marquee-hide-webuy'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-webuy]" id="cvs-marquee-hide-webuy" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function marquee_data_hide_webuy_label_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-webuy-label'] ) ? $opts_Arr['cvs-marquee-hide-webuy-label'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-webuy-label]" id="cvs-marquee-hide-webuy-label" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}	            

	public function marquee_data_label_webuy_cb() {
		printf(
			'<input type="text" id="cvs-marquee-webuy-label" name="cvs_marquee_options[cvs-marquee-webuy-label]" value="%s" />',
			isset( $this->options['cvs-marquee-webuy-label'] ) ? esc_attr( $this->options['cvs-marquee-webuy-label']) : ''
		);
	}

	/* Callbacks - Buy */
	public function marquee_data_subheading_wesell_cb() {}	          

	public function marquee_data_hide_wesell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-wesell'] ) ? $opts_Arr['cvs-marquee-hide-wesell'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-wesell]" id="cvs-marquee-hide-wesell" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function marquee_data_hide_wesell_label_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-wesell-label'] ) ? $opts_Arr['cvs-marquee-hide-wesell-label'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-wesell-label]" id="cvs-marquee-hide-wesell-label" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}	            

	public function marquee_data_label_wesell_cb() {
		printf(
			'<input type="text" id="cvs-marquee-wesell-label" name="cvs_marquee_options[cvs-marquee-wesell-label]" value="%s" />',
			isset( $this->options['cvs-marquee-wesell-label'] ) ? esc_attr( $this->options['cvs-marquee-wesell-label']) : ''
		);
	}

	/* Callbacks - Buy */
	public function marquee_data_subheading_invbuy_cb() {}	          

	public function marquee_data_hide_invbuy_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-invbuy'] ) ? $opts_Arr['cvs-marquee-hide-invbuy'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-invbuy]" id="cvs-marquee-hide-invbuy" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function marquee_data_hide_invbuy_label_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-invbuy-label'] ) ? $opts_Arr['cvs-marquee-hide-invbuy-label'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-invbuy-label]" id="cvs-marquee-hide-invbuy-label" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}	            

	public function marquee_data_label_invbuy_cb() {
		printf(
			'<input type="text" id="cvs-marquee-invbuy-label" name="cvs_marquee_options[cvs-marquee-invbuy-label]" value="%s" />',
			isset( $this->options['cvs-marquee-invbuy-label'] ) ? esc_attr( $this->options['cvs-marquee-invbuy-label']) : ''
		);
	}

	/* Callbacks - Buy */
	public function marquee_data_subheading_invsell_cb() {}	          

	public function marquee_data_hide_invsell_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-invsell'] ) ? $opts_Arr['cvs-marquee-hide-invsell'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-invsell]" id="cvs-marquee-hide-invsell" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}

	public function marquee_data_hide_invsell_label_cb() {
		$opts_Arr  	= $this->options;
		$this_opt   = isset( $opts_Arr['cvs-marquee-hide-invsell-label'] ) ? $opts_Arr['cvs-marquee-hide-invsell-label'] : '';

		$is_checked = ( isset( $this_opt ) && ( 'yes' == $this_opt ) );
		?>

		<input type="checkbox" name="cvs_marquee_options[cvs-marquee-hide-invsell-label]" id="cvs-marquee-hide-invsell-label" value="yes" <?php if ( $is_checked ) checked( $this_opt, 'yes' ); ?>" />
		
		<?php
	}	            

	public function marquee_data_label_invsell_cb() {
		printf(
			'<input type="text" id="cvs-marquee-invsell-label" name="cvs_marquee_options[cvs-marquee-invsell-label]" value="%s" />',
			isset( $this->options['cvs-marquee-invsell-label'] ) ? esc_attr( $this->options['cvs-marquee-invsell-label']) : ''
		);
	}				


}
