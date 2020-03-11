<?php

/**
 * The shortcode functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Rateboard
 * @subpackage Clearviewsys_Rateboard/public
 */

/**
 * The shortcode functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Rateboard
 * @subpackage Clearviewsys_Rateboard/public
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Rateboard_Sc {

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

		add_shortcode( 'cvs-rateboard', array( $this, 'sc_rateboard') );

	}

	/**
	 * Output address
	 * @param  [type] $atts    [description]
	 * @param  [type] $content [description]
	 * @return [type]          [description]
	 */
	public function sc_rateboard( $atts, $content = null ) {

		// Options
    	$gen_opts_Arr 	= get_option('cvs_general_options');
    	$opts_Arr 		= get_option('cvs_rateboard_options');

		/* General Settings 
		------------------------------------ */

		$cvs_folder 		= $gen_opts_Arr['cvs_folder_url'];
		$cvs_folder 		= ( NULL == $cvs_folder ) ? '/wp-content' : $cvs_folder;

		// let's validate and update the base CVS folder url
		// Case 1 - relative location (NOT URL!!) - we complete it to a full url with the help 
		// of site_url()
		// Case 2 - valid url >> nothing to do, except trailingslashit
		if ( !filter_var( $cvs_folder, FILTER_VALIDATE_URL ) ) :
			$cvs_folder = trailingslashit( get_site_url() . $cvs_folder . '/cvs/' ); 
		else:
			$cvs_folder = trailingslashit( $cvs_folder . '/cvs/' );
		endif;

		/* General Table Display Settings 
		------------------------------------ */

		$freq_general 			= ( 
									is_numeric( $opts_Arr['freq_general'] ) &&  
									( absint( $opts_Arr['freq_general'] ) > 0 )
								  ) 
									? $opts_Arr['freq_general']
									: '3000';

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

		/* Rateboard Settings 
		--------------------- */
		$rateboard_col 				= ( 
										isset( $opts_Arr['cvs-rateboard-col'] ) && 
										( '' !== $opts_Arr['cvs-rateboard-col'] ) 
									  ) 
										? $opts_Arr['cvs-rateboard-col'] 
										: 'rgba(255, 255, 255, 1)';
		$rateboard_bck_col 			= ( 
										isset( $opts_Arr['cvs-rateboard-bck'] ) && 
										( '' !== $opts_Arr['cvs-rateboard-bck'] ) 
									  )
										? $opts_Arr['cvs-rateboard-bck'] 
										: 'rgba(0, 0, 0, 1)';
		$rateboard_border_col 		= ( 
										isset( $opts_Arr['cvs-rateboard-border-col'] ) && 
										( '' !== $opts_Arr['cvs-rateboard-border-col'] ) 
									  )
										? $opts_Arr['cvs-rateboard-border-col'] 
										: 'rgba(255, 193, 7, 1)';
		$rateboard_table_th_bck 	= ( 
										isset( $opts_Arr['cvs-rateboard-table-th-bck'] ) && 
										( '' !== $opts_Arr['cvs-rateboard-table-th-bck'] ) 
									  ) 
										? $opts_Arr['cvs-rateboard-table-th-bck'] 
										: 'rgba(1, 50, 67, 1)';
		$rateboard_table_even_bck 	= ( 
										isset( $opts_Arr['cvs-rateboard-table-even-bck'] ) && 
										( '' !== $opts_Arr['cvs-rateboard-table-even-bck'] ) 
									  )
										? $opts_Arr['cvs-rateboard-table-even-bck'] 
										: 'rgba(34, 34, 34, 1)';
		$rateboard_table_odd_bck 	= ( 
										isset( $opts_Arr['cvs-rateboard-table-odd-bck'] ) && 
										( '' !== $opts_Arr['cvs-rateboard-table-odd-bck'] ) 
									  )
										? $opts_Arr['cvs-rateboard-table-odd-bck'] 
										: 'rgba(51, 51, 51, 1)';								
		$rateboard_logo_id   		= isset( $opts_Arr['cvs-rateboard-logo__id'] ) 
										? $opts_Arr['cvs-rateboard-logo__id'] 
										: '';
		$rateboard_logo_url 		= wp_get_attachment_image_src( $rateboard_logo_id, 'medium' ); 
		$rateboard_logo_url 		= $rateboard_logo_url[0];
		$rateboard_logo_url 		= filter_var( $rateboard_logo_url, FILTER_VALIDATE_URL) 
										? $rateboard_logo_url 
										: false;
		$rateboard_dslider 			= isset( $opts_Arr['cvs-rateboard-slideimg__enable'] ) 
										? $opts_Arr['cvs-rateboard-slideimg__enable'] 
										: false;
		$rateboard_slide_ids 		= isset( $opts_Arr['cvs-rateboard-slideimg__ids'] ) 
										? $opts_Arr['cvs-rateboard-slideimg__ids'] 
										: ''; 

		if ( '' !== $rateboard_slide_ids ) :

			$slide_ids 				= explode( ',', $rateboard_slide_ids );
			$rateboard_slide_urls 	= [];

			foreach ( $slide_ids as $id ) :				

				$slide_url 	= wp_get_attachment_image_src( $id, 'large' ); 
				$slide_url 	= $slide_url[0];

				if ( filter_var( $slide_url, FILTER_VALIDATE_URL ) )
					$rateboard_slide_urls[] = $slide_url;

			endforeach;

		endif;

		/* SIMPLIFY!!! => merge variables based on page type
		---------------------------------------------------- */

		$freq 				= is_front_page() ? $freq_front : $freq_general;
		$freq 				= ( 0 == intval( $freq ) )
								? 'false'
								: $freq;

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

		<div class="cvs-rateboard" 
			data-freq="<?php echo esc_attr($freq); ?>" 
			data-cvsfolder="<?php echo esc_attr($cvs_folder); ?>" 
			data-sort="<?php echo htmlspecialchars( $sort, ENT_QUOTES, 'UTF-8' ); ?>" 
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
			data-rb-col="<?php echo esc_attr($rateboard_col); ?>" 
			data-rb-bck-col="<?php echo esc_attr($rateboard_bck_col); ?>" 
			data-rb-border-col="<?php echo esc_attr($rateboard_border_col); ?>" 
			data-rb-table-th-back="<?php echo esc_attr($rateboard_table_th_bck); ?>" 
			data-rb-table-even-bck="<?php echo esc_attr($rateboard_table_even_bck); ?>" 
			data-rb-table-odd-bck="<?php echo esc_attr($rateboard_table_odd_bck); ?>" 
			data-rb-logo-url="<?php echo esc_attr($rateboard_logo_url); ?>" 
			data-rb-show-slider="<?php echo esc_attr($rateboard_dslider); ?>" 
			data-rb-slide-urls="<?php echo htmlspecialchars( json_encode( $rateboard_slide_urls ), ENT_QUOTES, 'UTF-8' ); ?>" 
		>
		</div>
		
		<?php
		$output = ob_get_clean();
		
		return $output;

	}	

}
