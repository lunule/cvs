<?php

/**
 * The shortcode functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Calculator
 * @subpackage Clearviewsys_Calculator/public
 */

/**
 * The shortcode functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Calculator
 * @subpackage Clearviewsys_Calculator/public
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Calculator_Sc {

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

		add_shortcode( 'cvs-calc', array( $this, 'sc_cvs_calc') );

	}

	/**
	 * Helper function - Unnamed (aka No-Value) WordPress shortcode attributes
	 * @since  	1.0.0
	 * 
	 * @see https://richjenks.com/unnamed-wordpress-shortcode-attributes/
	 * 
	 * @param  [type]  $flag The queried attrbiute
	 * @param  [type]  $atts The attributes array
	 * @return boolean       true if flag exists ( meaning the no-value 
	 *                       attribute is specified )
	 */
	public function is_flag( $flag, $atts ) {

		if ( $atts ) :

			foreach ( $atts as $key => $value )
				if ( $value === $flag && is_int( $key ) ) return true;
		
		endif;

		return false;

	}

	/**
	 * Output address
	 * @param  [type] $atts    [description]
	 * @param  [type] $content [description]
	 * @return [type]          [description]
	 */
	public function sc_cvs_calc( $atts, $content = null ) {

		// Options
    	$gen_opts_Arr 	= get_option('cvs_general_options');
    	$opts_Arr 		= get_option('cvs_calc_options');

		/* General Settings 
		---------------------- */

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

		/* Calculator Settings 
		---------------------- */

		$ibuy_label 		= $opts_Arr['ibuy_label'];
		$isell_label 		= $opts_Arr['isell_label'];
		$youpay_label 		= $opts_Arr['youpay_label'];
		$youreceive_label 	= $opts_Arr['youreceive_label'];
		
		$freq 				= ( 0 == intval( $opts_Arr['freq'] ) ) 
								? 'false'
								: $opts_Arr['freq'];		

		ob_start(); ?>

		<div class="cvs-calculator" data-ibuy="<?php echo esc_attr($ibuy_label); ?>" data-isell="<?php echo esc_attr($isell_label); ?>" data-youpay="<?php echo esc_attr($youpay_label); ?>" data-youreceive="<?php echo esc_attr($youreceive_label); ?>" data-freq="<?php echo esc_attr($freq); ?>" data-cvsfolder="<?php echo esc_attr($cvs_folder); ?>"></div>

		<?php
		$output = ob_get_clean();
		
		return $output;

	}	

}
