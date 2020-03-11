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

	$('.cvs-ratestable-opts-tabs').tabslet({
		active: sessionStorage.clickedTab ? sessionStorage.clickedTab : 1,
		animation: true,
	});

	$('.cvs-ratestable-opts-tabs').on("_after", function(e) {

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

});