/**
 * You won't believe but there's no function in JavaScript to simply remove 
 * duplicates from an array of strings or numbers. LOL.
 *
 * The below function fills the void.
 * @see https://www.devcurry.com/2010/04/remove-duplicate-elements-from-array.html
 * 
 * @return {[type]} [description]
 */
Array.prototype.unique = function () {
    var arrVal = this;
    var uniqueArr = [];
    for (var i = arrVal.length; i--; ) {
        var val = arrVal[i];
        if (jQuery.inArray(val, uniqueArr) === -1) {
            uniqueArr.unshift(val);
        }
    }
    return uniqueArr;
}

/**
 * Callback function for the 'click' event of the 'Set Footer Image'
 * anchor in its meta box.
 *
 * Displays the media uploader for selecting an image.
 *
 * @since 0.1.0
 */
function renderMediaUploader( targetImgID, targetInputID, parentIsRepeater ) {
    'use strict';
 
    let file_frame, 
    	image_data;
 
    /**
     * If an instance of file_frame already exists, then we can open it
     * rather than creating a new instance.
     */
    if ( undefined !== file_frame ) {
 
        file_frame.open();
        return;
 
    }
 
    /**
     * If we're this far, then an instance does not exist, so we need to
     * create our own.
     *
     * Here, use the wp.media library to define the settings of the Media
     * Uploader. We're opting to use the 'post' frame which is a template
     * defined in WordPress core and are initializing the file frame
     * with the 'insert' state.
     *
     * We're also not allowing the user to select more than one image.
     */
    file_frame = wp.media.frames.file_frame = wp.media({
        frame:    'post',
        state:    'insert',
		title:    'Insert Media',    // For production, this needs i18n.
		button:   {
			text: 'Upload Image'     // For production, this needs i18n.
		},
        multiple: false,
    });
 
    /**
     * Setup an event handler for what to do when an image has been
     * selected.
     *
     * Since we're using the 'view' state when initializing
     * the file_frame, we need to make sure that the handler is attached
     * to the insert event.
     */
    file_frame.on( 'insert', function() { console.log(targetImgID);
 
		image_data = file_frame.state().get( 'selection' ).first().toJSON();
		
		for ( var image_property in image_data ) {

			/**
			 * Here, you have access to all of the properties
			 * provided by WordPress to the selected image.
			 *
			 * This is generally where you take the data and so whatever
			 * it is that you want to do.
			 *
			 * For purposes of example, we're just going to dump the
			 * properties into the console.
			 */
			//console.log( image_property + ': ' + image_data[ image_property ] );

		}

		const imgUrl 	= image_data['sizes']['full']['url'],
    		  imgId 	= image_data['id'];     

    	// Update preview image sources
    	jQuery('#' + targetImgID).attr('src', imgUrl);

    	if ( true == parentIsRepeater ) {

	    	// In repeater sections images themselves are hidden - so we need to 
	    	// uptade the parent element's style properties as well
	    	jQuery('#' + targetImgID).closest('div').removeAttr('style').css({
	    		backgroundImage: 'url("' + imgUrl + '")', 
	    		backgroundPosition: 'center center',
	    		backgroundSize: 'cover',
	    		backgroundRepeat: 'no-repeat',
	    	});

    		let collectorVal = jQuery('#' + targetInputID).val();

	    	// Forward image ID to data attribute 
	    	jQuery('#' + targetImgID).attr('data-id', imgId);	    	
	    	
	    	// no value scenario
	    	if ( 
	    			( '' == collectorVal ) ||
	    			( !collectorVal ) 
	    		) { 

		    	jQuery('#' + targetInputID).val(imgId);

		    // one id or multiple ids scenario >> the input is of type hidden, so its value is 
		    // always of type string
			} else if ( typeof collectorVal == 'string' ) { 

				// init empty array
				let valsArr = [];
				
				// Let's see if collectorVal is one number or a stringified version of an 
				// array of numbers
				
				// if cast-to-number doesn't work => meaning collectorVal is not a number
				if ( !isNaN( parseInt(collectorVal) ) ) {

					const exploded = collectorVal.split(','); console.log( typeof exploded );

					jQuery.each( exploded, function(i, v) {
						valsArr.push( parseInt(v) );
					})					

				// if is number => it's one id - let's make it an array
				} else {

					valsArr.push( parseInt(collectorVal) );				

				}

				valsArr.push( parseInt(imgId) ); 
				valsArr = valsArr.unique();

		    	jQuery('#' + targetInputID).val('').val( valsArr );	console.log( valsArr );

			}

	    	// Update upload button label
	    	jQuery('#' + targetImgID).closest('div').siblings('.btn--upload').val('Replace image');
	 		
	 		// Fade in the image remove button
		   	jQuery('#' + targetImgID).closest('div').siblings('.btn--remove').fadeIn(); 

    	} else {

	    	// Forward image ID to hidden input
	    	jQuery('#' + targetInputID).val(imgId);

	    	// Update upload button label
	    	jQuery('#' + targetInputID).siblings('.btn--upload').val('Replace image');
	 		
	 		// Fade in the image remove button
		   	jQuery('#' + targetInputID).siblings('.btn--remove').fadeIn();    			    	

		}

    });
 
    // Now display the actual file_frame
    file_frame.open();
 
}

jQuery(document).ready( function($) {
	'use strict';

	/* ========================================================================================
	# Tabslet
	======================================================================================== */

	/*if (sessionStorage.clickcount) {
	  sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
	} else {
	  sessionStorage.clickcount = 1;
	}
	document.getElementById("result").innerHTML = "You have clicked the button " +
	sessionStorage.clickcount + " time(s) in this session.";*/

	$('.cvs-rateboard-opts-tabs').tabslet({
		active: sessionStorage.clickedTab ? sessionStorage.clickedTab : 1,
		animation: true,
	});

	$('.cvs-rateboard-opts-tabs').on("_after", function(e) {

		const clickedTabHTML 	= e.target.outerHTML,
			  clickedTabId 		= $(clickedTabHTML).find('a').attr('href'),
			  clickedTabIndex 	= $(this).find('[href="' + clickedTabId + '"]').closest('li').index(),
			  clickedTab 		= Number(clickedTabIndex) + 1;

	  	sessionStorage.clickedTab = clickedTab;
		// console.log( clickedTab );
		// console.log( sessionStorage );
	});	

	/* ========================================================================================
	# Drag&Drop functionality for the column order control
	======================================================================================== */

	const colsArr = [ 
		'flag', 
		'code', 
		'country', 
		'currency', 
		'webuy', 
		'wesell', 
		'invbuy', 
		'invsell' 
	]

	/**
	 * I. 	If the column order setter control has a saved value on page load, we can use this 
	 * 		value to display the correct column order
	 * ˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘
	 * 
	 * 		FYKI: if there's no saved value we don't need to do anything on page load, the 
	 * 		column order is the default one.
	 */

	// HELPER function to check if the string passed as param is valid JSON
	function isJson(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

	const colsortGenVal 	= $('#colsort_general').val(),
		  colsortFrontVal 	= $('#colsort_front').val(),
		  controlsArr 		= {
		  						0: {
		  							type: 'general',
		  							val: colsortGenVal,
		  						},
		  						1: {
		  							type: 'front',
		  							val: colsortFrontVal,
		  						},
		  					  };

	$.each( controlsArr, function(i, v) {

		if ( isJson( this.val ) ) {

			const colsObj 		= JSON.parse( this.val ),
				  flagArr 		= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'flag' );
							  	  }),
				  flagIndex 	= flagArr[0].index,
				  codeArr 		= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'code' );
							  	  }),
				  codeIndex 	= codeArr[0].index,
				  countryArr 	= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'country' );
							  	  }),
				  countryIndex 	= countryArr[0].index,
				  currencyArr 	= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'currency' );
							  	  }),
				  currencyIndex = currencyArr[0].index,
				  webuyArr 		= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'webuy' );
							  	  }),
				  webuyIndex 	= webuyArr[0].index,
				  wesellArr 	= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'wesell' );
							  	  }),
				  wesellIndex 	= wesellArr[0].index,
				  invbuyArr 	= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'invbuy' );
							  	  }),
				  invbuyIndex 	= invbuyArr[0].index,
				  invsellArr 	= $.grep( colsObj, function( i, v ) {
									return ( i['col'] === 'invsell' );
							  	  }),
				  invsellIndex 	= invsellArr[0].index,
				  pageType 		= this.type,
				  // Set up the array of correct indexes - we can use this together with 
				  // the colsArr array to pair the DOM items with their correct index 
				  // value
				  indexesArr 	= [
				  					flagIndex,
				  					codeIndex,
				  					countryIndex,
				  					currencyIndex,
				  					webuyIndex,
				  					wesellIndex,
				  					invbuyIndex,
				  					invsellIndex,
				  				  ];

			// Add the correct index as data attribute value
			$.each( colsArr, function(i, v) {
				$( '.col-' + v + '-' + pageType ).attr('data-index', indexesArr[i]);
			})

			// Get array of elements
			const colDivsArr = $('.cols-container--' + pageType + ' > div');

			// Sort the DOM elements based on their data-index attribute value
			colDivsArr.sort(function (a, b) {
			    
			    a = $(a).data('index');
			    b = $(b).data('index');

			    // compare
			    if(a > b) {
			        return 1;
			    } else if(a < b) {
			        return -1;
			    } else {
			        return 0;
			    }

			});

			// Empty the container and re-append the elems, this time in the correct order
			$( '.cols-container--' + pageType ).html('').append(colDivsArr);

			// Update the index display in the elements
			$('.cols-container--' + pageType + ' span:first-child').each( function() {
				$(this).text( $(this).closest('div').data('index') );
			});

		}	

	});

	/**
	 * II. 	Save the new column order on each drop event. Dragula stuff.
	 * ˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘ 
	 */

	var dragGeneral = dragula({
		isContainer: function (el) {
			return el.classList.contains('cols-container--general');
  		}
	}).on('drop', function (el) {

		//el.className += ' ex-moved';
			
		$('.cols-container--general .flex-item span:first-child').each( function() {

			const newVal = ( $(this).closest('.flex-item').index() + 1 );
			$(this).text( newVal );

		})

		const valArr = [];

		$.each( colsArr, function(i, v) {

			const thisVal = {
				col: v,
				index: ( $('.col-' + v + '-general').index() + 1 ),
			};
			valArr.push( thisVal );

		})

		$('#colsort_general').val( JSON.stringify(valArr) );

	});	

	var dragFront = dragula({
		isContainer: function (el) {
			return el.classList.contains('cols-container--front');
  		}
	}).on('drop', function (el) {
			
		$('.cols-container--front .flex-item span:first-child').each( function() {

			const newVal = ( $(this).closest('.flex-item').index() + 1 );
			$(this).text( newVal );

		})

		const valArr = [];

		$.each( colsArr, function(i, v) {

			const thisVal = {
				col: v,
				index: ( $('.col-' + v + '-front').index() + 1 ),
			};
			valArr.push( thisVal );

		})

		$('#colsort_front').val( JSON.stringify(valArr) );

	});		

	/* ========================================================================================
	# Pickr
	======================================================================================== */

	const pickrClassArr = [
			'.cvs-rateboard-col-picker',
			'.cvs-rateboard-bck-picker',
			'.cvs-rateboard-border-col-picker',
			'.cvs-rateboard-table-th-bck-picker',
			'.cvs-rateboard-table-even-bck-picker',
			'.cvs-rateboard-table-odd-bck-picker',	
		  ];	

    $(function() {

		$.each( pickrClassArr, function( i, v ) {

			const defaultCol 	= $(v).siblings('input:not(:disabled)').val(),
				  pickr 		= Pickr.create({

				    el: v,
				    default: defaultCol ? defaultCol : 'rgba(255, 255, 255, 1)',
				    theme: 'nano', // or 'monolith', or 'nano'

				    swatches: [
				        'rgba(244, 67, 54, 1)',
				        'rgba(233, 30, 99, 0.95)',
				        'rgba(156, 39, 176, 0.9)',
				        'rgba(103, 58, 183, 0.85)',
				        'rgba(63, 81, 181, 0.8)',
				        'rgba(33, 150, 243, 0.75)',
				        'rgba(3, 169, 244, 0.7)',
				        'rgba(0, 188, 212, 0.7)',
				        'rgba(0, 150, 136, 0.75)',
				        'rgba(76, 175, 80, 0.8)',
				        'rgba(139, 195, 74, 0.85)',
				        'rgba(205, 220, 57, 0.9)',
				        'rgba(255, 235, 59, 0.95)',
				        'rgba(255, 193, 7, 1)'
				    ],

				    components: {

				        // Main components
				        preview: 	true,
				        opacity: 	true,
				        hue: 		true,

				        // Input / output Options
				        interaction: {
				            hex: 	false,
				            rgba: 	true,
				            hsla: 	false,
				            hsva: 	false,
				            cmyk: 	false,
				            input: 	true,
				            clear: 	true,
				            save: 	false
				        }
				    }

				}).on( 'change', (color, instance) => {

					const parentEl 			= instance['_root']['root'],
						  $disabledInput 	= $(parentEl).next(),
						  $targetInput 		= $(parentEl).next().next();

					$disabledInput.val( color.toRGBA().toString(0) );
					$targetInput.val( color.toRGBA().toString(0) );		

					// !!! IMPORTANT !!! Without the below line change event won't change 
					// the button color (the one the user considers as The Saved/Set Color),
					// only the '.pcr-current-color' preview item within the color selector 
					// dialog. CONFUSING!!!
					pickr.applyColor(true);

					console.log(color);
					console.log(color.toRGBA().toString(0));			

				}).on( 'swatchselect', (color, instance) => {
					
				}).on( 'clear', instance => {
					
					const parentEl 			= instance['_root']['root'],
						  $disabledInput 	= $(parentEl).next(),
						  $targetInput 		= $(parentEl).next().next();

					$disabledInput.val( '' );
					$targetInput.val( '' );
				
				});

		})	

	})
	
	/* ============================================================================================
	# Media uploader
	============================================================================================ */
				
    $(function() {

		/* ========================================================================================
		# Logo Upload
		======================================================================================== */

        $( '#cvs-rateboard-logo__uploadbtn' ).on( 'click', function( evt ) {
 
            evt.preventDefault();
 
            // Display the media uploader
            renderMediaUploader('cvs-rateboard-logo__preview', 'cvs-rateboard-logo__id');
 
        });

		$( '#cvs-rateboard-logo__removebtn' ).on( 'click', function( evt ) {

			evt.preventDefault();

			$(this)
				.siblings('div').find('img').attr('src', 'https://via.placeholder.com/200x200?text=ClearViewSys.com');

			$(this)
				.siblings('input:hidden').val('');

			$(this)
				.siblings('.btn--upload').val('Upload image');	

			$(this)
				.fadeOut();

		});

		/* ========================================================================================
		# Rateboard Slide Images repeater
		======================================================================================== */

		$( '#rateboard-slide-imgs .btn--addimg' ).on( 'click', function( evt ) {

			evt.preventDefault();

			const $template = $(this).closest('div').prev().find('#cvs-rateboard-slideimg-template'),
				  imgCount 	= $(this).closest('div').prev().find('.flex-item:not(#cvs-rateboard-slideimg-template)').length,
				  timestamp = new Date().getUTCMilliseconds();

			// $.clone( true, true ) => both withDataAndEvents and deepWithDataAndEvents are set to true; 
			// @see https://api.jquery.com/clone/
			$template.clone( true ).insertBefore($template).attr('id', 'cvs-rateboard-slideimg-' + timestamp ).show();

			// Update the classes on/in the cloned instance
			$template.prev().find('#cvs-rateboard-slideimg-template__preview').attr('id', 'cvs-rateboard-slideimg-' + timestamp + '__preview');
			$template.prev().find('#cvs-rateboard-slideimg-template__uploadbtn').attr('id', 'cvs-rateboard-slideimg-' + timestamp + '__uploadbtn');
			$template.prev().find('#cvs-rateboard-slideimg-template__removebtn').attr('id', 'cvs-rateboard-slideimg-' + timestamp + '__removebtn');						

		});		

		$('#rateboard-slide-imgs .flex-item [id*="__uploadbtn"]').each(function() {

			$(this).on('click', function( evt ) {

	            evt.preventDefault();
	 
	            // Get preview img class
				const previewId = $(this).closest('.flex-item').find('img').attr('id');

				/** 
				 * TASKS
				 *
				 * POINTS 1-6 => WE NEED TO HANDLE THE CASE WHERE THE USER CLICKS OVER AN 
				 * ALREADY-SAVED IMAGE, USING THE "REPLACE IMAGE" BUTTON!!!
				 * 
				 * 1. get the collector's value
				 * 2. make it array
				 * 3. get the current image ID
				 * 4. check if the array includes the ID
				 * 5. if it does, remove the ID from the array
				 * 6. forward the new array to the collector
				 * -------------------------------------------------------------------
				 * 7. NOW call the media uploader function
				 */

				let collectorVal 	= $('#cvs-rateboard-slideimg__ids').val(),
					exploded 		= collectorVal.split(',');

				const removeId 		= $(this).siblings('div').find('img').attr('data-id'),
					  contains 		= exploded.includes( removeId );

				for( var i = 0; i < exploded.length; i++){ 
				   if ( exploded[i] === removeId ) {
				     exploded.splice( i, 1 ); 
				   }
				} console.log( exploded );

				$('#cvs-rateboard-slideimg__ids').val( exploded );

	            // Display the media uploader - we set the targetInputID to false and 
	            // will handle the target input from within the uploader's 'insert' event 
	            renderMediaUploader( previewId, 'cvs-rateboard-slideimg__ids', true);

			})

		})

		$('#rateboard-slide-imgs .flex-item [id*="__removebtn"]').each(function() {

			$(this).on('click', function( evt ) {

				/** 
				 * TASKS
				 *
				 * 1. get the collector's value
				 * 2. make it array
				 * 3. get the removable image ID
				 * 4. check if the array includes the ID
				 * 5. if it does, remove the ID from the array
				 * 6. forward the new array to the collector
				 * 7. check if the same image is specified elsewhere in the uploaded images 
				 * 		section - if it does, remove the block
				 * 8. removal:
				 * 		- there are multiple images > remove itself
				 *  	- this is the only image? fade the button etc., but no removal!!
				 */

				evt.preventDefault();

				let collectorVal 	= $('#cvs-rateboard-slideimg__ids').val(),
					exploded 		= collectorVal.split(',');

				const removeId 		= $(this).siblings('div').find('img').attr('data-id'),
					  contains 		= exploded.includes( removeId );

				for( var i = 0; i < exploded.length; i++){ 
				   if ( exploded[i] === removeId ) {
				     exploded.splice( i, 1 ); 
				   }
				} console.log( exploded );

				$('#cvs-rateboard-slideimg__ids').val( exploded );

				$(this)
					.closest('.flex-item')
					.siblings(':not(#cvs-rateboard-slideimg-template)')
					.each( function() {

					if ( removeId == $(this).find('img').attr('data-id') )
						$(this).fadeOut().remove();

				})

				if ( 0 == $(this).closest('.flex-item').siblings('.flex-item:not(#cvs-rateboard-slideimg-template)').length ) {

					$(this)
						.siblings('div').find('img').attr('src', 'https://via.placeholder.com/256x144?text=ClearViewSys.com');

					$(this)
						.siblings('.btn--upload').val('Upload image');	

					$(this)
						.fadeOut();

				} else {

					$(this).closest('.flex-item').fadeOut().remove();

				}

			})

		})		
 
    });

});