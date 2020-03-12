<?php

/**
 * The shortcode functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Rates_Table
 * @subpackage Clearviewsys_Rates_Table/public
 */

/**
 * The shortcode functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Rates_Table
 * @subpackage Clearviewsys_Rates_Table/public
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Rates_Table_Sc {

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

		add_shortcode( 'cvs-ratestable', array( $this, 'sc_rate_table') );

	}

	/**
	 * Output address
	 * @param  [type] $atts    [description]
	 * @param  [type] $content [description]
	 * @return [type]          [description]
	 */
	public function sc_rate_table( $atts, $content = null ) {

		// Options
    	$gen_opts_Arr 	= get_option('cvs_general_options');
    	$opts_Arr 		= get_option('cvs_ratestable_options');

		/* General Settings 
		------------------------------------ */

		$cvs_folder 		= $gen_opts_Arr['cvs_folder_url'];
		$cvs_folder 		= ( NULL == $cvs_folder ) ? '/wp-content' : $cvs_folder;

		// let's validate and update the base CVS folder url
		// Case 1 - relative location (NOT URL!!) - we complete it to a full url with the help 
		// of site_url()
		// Case 2 - valid url >> nothing to do, except trailingslashit
		if ( !filter_var( $cvs_folder, FILTER_VALIDATE_URL ) ) :

			$cvs_folder = ( '/wp-content' == $cvs_folder )
							? trailingslashit( get_site_url() . $cvs_folder . '/cvs/' )
							: trailingslashit( get_site_url() . $cvs_folder . '/' );

		else:

			$cvs_folder = trailingslashit( $cvs_folder . '/' );

		endif;

		/* General Table Display Settings 
		------------------------------------ */

		$freq_general 			= ( 
									is_numeric( $opts_Arr['freq_general'] ) &&  
									( absint( $opts_Arr['freq_general'] ) > 0 )
								  ) 
									? $opts_Arr['freq_general']
									: '3000';
		$hgen_showentries 		= isset( $opts_Arr['hide_showentries_general'] ) 
									? $opts_Arr['hide_showentries_general'] 
									: false;
		$hgen_search 			= isset( $opts_Arr['hide_search_general'] ) 
									? $opts_Arr['hide_search_general'] 
									: false;
		$hgen_info 				= isset( $opts_Arr['hide_info_general'] ) 
									? $opts_Arr['hide_info_general'] 
									: false;
		$hgen_pagi 				= isset( $opts_Arr['hide_pagi_general'] ) 
									? $opts_Arr['hide_pagi_general'] 
									: false;
		$currperpage_general 	= ( 
									is_numeric( $opts_Arr['currnumber_tpage_general'] ) &&  
									( absint( $opts_Arr['currnumber_tpage_general'] ) > 0 )
								  ) 
									? $opts_Arr['currnumber_tpage_general']
									: 10;

		/* General Table Column Settings 
		--------------------------------- */
		$sort_gen 			= isset( $opts_Arr['colsort_general'] ) 
								? $opts_Arr['colsort_general'] 
								: false;
		$hgen_flag 			= isset( $opts_Arr['hide_flag_general'] ) 
								? $opts_Arr['hide_flag_general'] 
								: false; 		
		$labgen_flag 		= isset( $opts_Arr['collabel_flag_general'] ) 
								? $opts_Arr['collabel_flag_general'] 
								: false; 
		$labgen_code 		= isset( $opts_Arr['collabel_code_general'] ) 
								? $opts_Arr['collabel_code_general'] 
								: false; 
		$hgen_country 		= isset( $opts_Arr['hide_country_general'] ) 
								? $opts_Arr['hide_country_general'] 
								: false; 
		$labgen_country 	= isset( $opts_Arr['collabel_country_general'] ) 
								? $opts_Arr['collabel_country_general'] 
								: false; 
		$hgen_currency 		= isset( $opts_Arr['hide_currency_general'] ) 
								? $opts_Arr['hide_currency_general'] 
								: false; 
		$labgen_currency 	= isset( $opts_Arr['collabel_currency_general'] ) 
								? $opts_Arr['collabel_currency_general'] 
								: false; 
		$hgen_webuy 		= isset( $opts_Arr['hide_webuy_general'] ) 
								? $opts_Arr['hide_webuy_general'] 
								: false; 
		$labgen_webuy 		= isset( $opts_Arr['collabel_webuy_general'] ) 
								? $opts_Arr['collabel_webuy_general'] 
								: false; 
		$hgen_wesell 		= isset( $opts_Arr['hide_wesell_general'] ) 
								? $opts_Arr['hide_wesell_general'] 
								: false; 
		$labgen_wesell 		= isset( $opts_Arr['collabel_wesell_general'] ) 
								? $opts_Arr['collabel_wesell_general'] 
								: false;
		$sgen_invbuy 		= isset( $opts_Arr['show_invbuy_general'] ) 
								? $opts_Arr['show_invbuy_general'] 
								: false; 
		$labgen_invbuy 		= isset( $opts_Arr['collabel_invbuy_general'] ) 
								? $opts_Arr['collabel_invbuy_general'] 
								: false;
		$sgen_invsell 		= isset( $opts_Arr['show_invsell_general'] ) 
								? $opts_Arr['show_invsell_general'] 
								: false; 
		$labgen_invsell 		= isset( $opts_Arr['collabel_invsell_general'] ) 
								? $opts_Arr['collabel_invsell_general'] 
								: false;			 

		/* Front Page Table Display Settings 
		------------------------------------ */								
		
		$freq_front 			= ( 
									is_numeric( $opts_Arr['freq_front'] ) &&  
									( absint( $opts_Arr['freq_front'] ) > 0 )
								  ) 
									? $opts_Arr['freq_front']
									: '3000';
		$hfront_showentries 	= isset( $opts_Arr['hide_showentries_front'] ) 
									? $opts_Arr['hide_showentries_front'] 
									: false;
		$hfront_search 			= isset( $opts_Arr['hide_search_front'] ) 
									? $opts_Arr['hide_search_front'] 
									: false;
		$hfront_info 			= isset( $opts_Arr['hide_info_front'] ) 
									? $opts_Arr['hide_info_front'] 
									: false;
		$hfront_pagi 			= isset( $opts_Arr['hide_pagi_front'] ) 
									? $opts_Arr['hide_pagi_front'] 
									: false;
		$currperpage_front 		= ( 
									is_numeric( $opts_Arr['currnumber_tpage_front'] ) &&  
									( absint( $opts_Arr['currnumber_tpage_front'] ) > 0 )
								  ) 
									? $opts_Arr['currnumber_tpage_front']
									: 10;

		/* Front Page Table Column Settings 
		------------------------------------ */
		$sort_front 			= isset( $opts_Arr['colsort_front'] ) 
								? $opts_Arr['colsort_front'] 
								: false;
		$hfront_flag 		= isset( $opts_Arr['hide_flag_front'] ) 
								? $opts_Arr['hide_flag_front'] 
								: false; 
		$labfront_flag 		= isset( $opts_Arr['collabel_flag_front'] ) 
								? $opts_Arr['collabel_flag_front'] 
								: false; 
		$labfront_code 		= isset( $opts_Arr['collabel_code_front'] ) 
								? $opts_Arr['collabel_code_front'] 
								: false; 
		$hfront_country 	= isset( $opts_Arr['hide_country_front'] ) 
								? $opts_Arr['hide_country_front'] 
								: false; 
		$labfront_country 	= isset( $opts_Arr['collabel_country_front'] ) 
								? $opts_Arr['collabel_country_front'] 
								: false; 
		$hfront_currency 	= isset( $opts_Arr['hide_currency_front'] ) 
								? $opts_Arr['hide_currency_front'] 
								: false; 
		$labfront_currency 	= isset( $opts_Arr['collabel_currency_front'] ) 
								? $opts_Arr['collabel_currency_front'] 
								: false; 
		$hfront_webuy 		= isset( $opts_Arr['hide_webuy_front'] ) 
								? $opts_Arr['hide_webuy_front'] 
								: false; 
		$labfront_webuy 	= isset( $opts_Arr['collabel_webuy_front'] ) 
								? $opts_Arr['collabel_webuy_front'] 
								: false; 
		$hfront_wesell 		= isset( $opts_Arr['hide_wesell_front'] ) 
								? $opts_Arr['hide_wesell_front'] 
								: false; 
		$labfront_wesell 	= isset( $opts_Arr['collabel_wesell_front'] ) 
								? $opts_Arr['collabel_wesell_front'] 
								: false; 
		$sfront_invbuy 		= isset( $opts_Arr['show_invbuy_front'] ) 
								? $opts_Arr['show_invbuy_front'] 
								: false; 
		$labfront_invbuy 	= isset( $opts_Arr['collabel_invbuy_front'] ) 
								? $opts_Arr['collabel_invbuy_front'] 
								: false;
		$sfront_invsell 	= isset( $opts_Arr['show_invsell_front'] ) 
								? $opts_Arr['show_invsell_front'] 
								: false; 
		$labfront_invsell 	= isset( $opts_Arr['collabel_invsell_front'] ) 
								? $opts_Arr['collabel_invsell_front'] 
								: false;								

		/* SIMPLIFY!!! => merge variables based on page type
		---------------------------------------------------- */

		$freq 				= is_front_page() ? $freq_front : $freq_general;
		$freq 				= ( 0 == intval( $freq ) )
								? 'false'
								: $freq;

		$h_showentries 		= is_front_page() ? $hfront_showentries : $hgen_showentries;
		$h_search 			= is_front_page() ? $hfront_search : $hgen_search;
		$h_info 			= is_front_page() ? $hfront_info : $hgen_info;
		$h_pagi 			= is_front_page() ? $hfront_pagi : $hgen_pagi;		
		$currperpage 		= is_front_page() ? $currperpage_front : $currperpage_general;

		$sort 				= is_front_page() ? $sort_front : $sort_gen;

		$h_flag 			= is_front_page() ? $hfront_flag : $hgen_flag;
		$lab_flag 			= is_front_page() ? $labfront_flag : $labgen_flag;
		$h_code 			= false; // code column is required, it's the one used 
									 //for pulling, sorting, and basically for the 
									 //whole table building/cell updating/row removal 
									 //processes
		$lab_code 			= is_front_page() ? $labfront_code : $labgen_code;
		$h_country 			= is_front_page() ? $hfront_country : $hgen_country;
		$lab_country 		= is_front_page() ? $labfront_country : $labgen_country;
		$h_currency 		= is_front_page() ? $hfront_currency : $hgen_currency;
		$lab_currency 		= is_front_page() ? $labfront_currency : $labgen_currency;
		$h_webuy 			= is_front_page() ? $hfront_webuy : $hgen_webuy;
		$lab_webuy 			= is_front_page() ? $labfront_webuy : $labgen_webuy;
		$h_wesell 			= is_front_page() ? $hfront_wesell : $hgen_wesell;
		$lab_wesell 		= is_front_page() ? $labfront_wesell : $labgen_wesell;
		$s_invbuy 			= is_front_page() ? $sfront_invbuy : $sgen_invbuy;
		$lab_invbuy 		= is_front_page() ? $labfront_invbuy : $labgen_invbuy;
		$s_invsell 			= is_front_page() ? $sfront_invsell : $sgen_invsell;
		$lab_invsell 		= is_front_page() ? $labfront_invsell : $labgen_invsell;		

		ob_start(); ?>

		<div class="cvs-ratestable" 
			data-freq="<?php echo esc_attr($freq); ?>" 
			data-cvsfolder="<?php echo esc_attr($cvs_folder); ?>" 
			data-sort="<?php echo htmlspecialchars( $sort, ENT_QUOTES, 'UTF-8' ); ?>" 
			data-pagelength="<?php echo esc_attr($currperpage); ?>" 			
			data-hide-showentries="<?php echo esc_attr($h_showentries); ?>" 
			data-hide-search="<?php echo esc_attr($h_search); ?>" 
			data-hide-info="<?php echo esc_attr($h_info); ?>" 
			data-hide-pagi="<?php echo esc_attr($h_pagi); ?>" 
			data-hide-flag="<?php echo esc_attr($h_flag); ?>" 
			data-hide-code="<?php echo esc_attr($h_code); ?>" 
			data-hide-country="<?php echo esc_attr($h_country); ?>" 
			data-hide-currency="<?php echo esc_attr($h_currency); ?>" 
			data-hide-webuy="<?php echo esc_attr($h_webuy); ?>" 
			data-hide-wesell="<?php echo esc_attr($h_wesell); ?>" 
			data-show-invbuy="<?php echo esc_attr($s_invbuy); ?>" 
			data-show-invsell="<?php echo esc_attr($s_invsell); ?>" 
			data-label-flag="<?php echo esc_attr($lab_flag); ?>" 
			data-label-code="<?php echo esc_attr($lab_code); ?>" 
			data-label-country="<?php echo esc_attr($lab_country); ?>" 
			data-label-currency="<?php echo esc_attr($lab_currency); ?>" 
			data-label-webuy="<?php echo esc_attr($lab_webuy); ?>" 
			data-label-wesell="<?php echo esc_attr($lab_wesell); ?>" 
			data-label-invbuy="<?php echo esc_attr($lab_invbuy); ?>" 
			data-label-invsell="<?php echo esc_attr($lab_invsell); ?>" 
		>
		</div>
		
		<?php
		$output = ob_get_clean();
		
		return $output;

	}	

}
