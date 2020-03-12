<?php

/**
 * The shortcode functionality of the plugin.
 *
 * @link       http://www.clearviewsys.com
 * @since      1.0.0
 *
 * @package    Clearviewsys_Marquee
 * @subpackage Clearviewsys_Marquee/public
 */

/**
 * The shortcode functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Clearviewsys_Marquee
 * @subpackage Clearviewsys_Marquee/public
 * @author     ClearViewSys <info@clearviewsys.com>
 */
class Clearviewsys_Marquee_Sc {

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

		add_shortcode( 'cvs-ticker', array( $this, 'sc_marquee') );

	}

	/**
	 * Helper function - Unnamed (aka No-Value) WordPress shortcode attributes
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
	public function sc_marquee( $atts, $content = null ) {

		// We need strings for the top position value so that we can "transfer" it via the 
		// data attribute
		$is_on_top = $this->is_flag( 'top', $atts ) ? 'true' : 'false';	

		// var_dump( $is_on_top );

		// Options
    	$gen_opts_Arr 	= get_option('cvs_general_options');
    	$opts_Arr 		= get_option('cvs_marquee_options');

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

		/* Marquee settings 
		------------------------------------ */

		$freq 						= ( 
										is_numeric( $opts_Arr['freq'] ) &&  
										( absint( $opts_Arr['freq'] ) > 0 )
									  ) 
										? $opts_Arr['freq']
										: '3000';

		/* Marquee styles 
		--------------------------------- */

		$marquee_bck 				= ( 
										isset( $opts_Arr['cvs-marquee-bck'] ) && 
										( '' !== $opts_Arr['cvs-marquee-bck'] ) 
									  )
										? $opts_Arr['cvs-marquee-bck'] 
										: 'rgba(0, 0, 0, 1)';

		$marquee_col 				= ( 
										isset( $opts_Arr['cvs-marquee-col'] ) && 
										( '' !== $opts_Arr['cvs-marquee-col'] ) 
									  ) 
										? $opts_Arr['cvs-marquee-col'] 
										: 'rgba(255, 255, 255, 1)';

		$marquee_fsize 				= ( 
										is_numeric( $opts_Arr['cvs-marquee-fsize'] ) &&  
										( absint( $opts_Arr['cvs-marquee-fsize'] ) > 0 )
									  ) 
										? $opts_Arr['cvs-marquee-fsize']
										: '24';

		$marquee_vertpad 			= ( 
										is_numeric( $opts_Arr['cvs-marquee-vertpad'] ) &&  
										( absint( $opts_Arr['cvs-marquee-vertpad'] ) > 0 )
									  ) 
										? $opts_Arr['cvs-marquee-vertpad']
										: '18';	

		/* Marquee data
		---------------------------------- */

		/* Fields - Buy */
		$hide_webuy 		= isset( $opts_Arr['cvs-marquee-hide-webuy'] ) 
								? 'true' 
								: 'false';
		$hide_webuy_label 	= isset( $opts_Arr['cvs-marquee-hide-webuy-label'] ) 
								? 'true' 
								: 'false';
		$label_webuy 		= (
									isset( $opts_Arr['cvs-marquee-webuy-label'] ) &&
									( '' !== $opts_Arr['cvs-marquee-webuy-label'] ) 
								)
								? $opts_Arr['cvs-marquee-webuy-label'] 
								: 'Buy';

		/* Fields - Sell */
		$hide_wesell 		= isset( $opts_Arr['cvs-marquee-hide-wesell'] ) 
								? 'true' 
								: 'false';
		$hide_wesell_label 	= isset( $opts_Arr['cvs-marquee-hide-wesell-label'] ) 
								? 'true' 
								: 'false';
		$label_wesell 		= (
									isset( $opts_Arr['cvs-marquee-wesell-label'] ) &&
									( '' !== $opts_Arr['cvs-marquee-wesell-label'] ) 
								)
								? $opts_Arr['cvs-marquee-wesell-label'] 
								: 'Sell';

		/* Fields - InverseBuy */
		$hide_invbuy 		= isset( $opts_Arr['cvs-marquee-hide-invbuy'] ) 
								? 'true' 
								: 'false';
		$hide_invbuy_label 	= isset( $opts_Arr['cvs-marquee-hide-invbuy-label'] ) 
								? 'true' 
								: 'false';
		$label_invbuy 		= (
									isset( $opts_Arr['cvs-marquee-invbuy-label'] ) &&
									( '' !== $opts_Arr['cvs-marquee-invbuy-label'] ) 
								)
								? $opts_Arr['cvs-marquee-invbuy-label'] 
								: 'Inv. Buy';

 		/* Fields - Inverse Sell */
		$hide_invsell 		= isset( $opts_Arr['cvs-marquee-hide-invsell'] ) 
								? 'true' 
								: 'false';
		$hide_invsell_label = isset( $opts_Arr['cvs-marquee-hide-invsell-label'] ) 
								? 'true' 
								: 'false';		
		$label_invsell 		= (
									isset( $opts_Arr['cvs-marquee-invsell-label'] ) &&
									( '' !== $opts_Arr['cvs-marquee-invsell-label'] ) 
								)
								? $opts_Arr['cvs-marquee-invsell-label'] 
								: 'Inv. Sell';																									

		ob_start(); 
		?>

		<div class="cvs-marquee" 
			data-top="<?php echo esc_attr($is_on_top); ?>" 
			data-cvsfolder="<?php echo esc_attr($cvs_folder); ?>" 		
			data-freq="<?php echo esc_attr($freq); ?>" 
			data-bck="<?php echo esc_attr($marquee_bck); ?>" 
			data-col="<?php echo esc_attr($marquee_col); ?>" 
			data-fsize="<?php echo esc_attr($marquee_fsize); ?>" 
			data-vertpad="<?php echo esc_attr($marquee_vertpad); ?>" 
			data-hide-webuy="<?php echo esc_attr($hide_webuy); ?>" 
			data-hide-webuy-label="<?php echo esc_attr($hide_webuy_label); ?>" 
			data-label-webuy="<?php echo esc_attr($label_webuy); ?>" 
			data-hide-wesell="<?php echo esc_attr($hide_wesell); ?>" 
			data-hide-wesell-label="<?php echo esc_attr($hide_wesell_label); ?>" 
			data-label-wesell="<?php echo esc_attr($label_wesell); ?>" 
			data-hide-invbuy="<?php echo esc_attr($hide_invbuy); ?>" 
			data-hide-invbuy-label="<?php echo esc_attr($hide_invbuy_label); ?>" 
			data-label-invbuy="<?php echo esc_attr($label_invbuy); ?>" 
			data-hide-invsell="<?php echo esc_attr($hide_invsell); ?>" 
			data-hide-invsell-label="<?php echo esc_attr($hide_invsell_label); ?>" 
			data-label-invsell="<?php echo esc_attr($label_invsell); ?>" 									 
		>
		</div>
		
		<?php
		$output = ob_get_clean();
		
		return $output;

	}	

}
