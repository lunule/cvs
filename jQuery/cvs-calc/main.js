/* ================================================================================================
# CVS Calculator jQuery Plugin
================================================================================================ */

(function( $ ) {
	'use strict';

	$.fn.cvsCalc = function(options){

		options = $.extend({
			calcLabels: {
				iBuy: 			'I Buy',
				iSell:	 		'I Sell',
				youPay: 		'You pay',
				youReceive:		'You Receive',
			},
			updateFrequency: 	false,		
			cvsFolder: 			'cvs',	
		}, options);	

		return this.each(function() {

			// Set up constants and build the calcualtor skeleton
			const $this 	= $(this),
				  calcHtml 	= '<form class="cvs-currencies-form"><div class="currency-toggle"><a href="#" class="btn buy active">'+options.calcLabels['iBuy']+'</a><a href="#" class="btn sell">'+options.calcLabels['iSell']+'</a></div><div class="form-field clearfix"> <label for="pay">'+options.calcLabels['youPay']+'</label><div class="flex-container"><div class="form-field-input"><input value="" class="pay"></div><div class="form-field-select"><select class="pay-currency"><option value="">Select Currency</option></select></div></div></div><div class="form-field clearfix"><label for="receive">'+options.calcLabels['youReceive']+'</label><div class="flex-container"><div class="form-field-input"><input placeholder="" class="receive"></div><div class="form-field-select"><select class="receive-currency" disabled><option value="CAD">CAD</option></select></div></div></div></form>';

		    $( '<div class="cvs-widget--calculator cvs-widget" />' )
				.appendTo( $this )
				.prepend( calcHtml );		

			const $thisCalc = $this.find('.cvs-currencies-form'); 
			let newVal;	  

			/* Get the XML content and fill the array xmlRates array 
			-------------------------------------------------------- */

	    	let xmlRates = [],
				flag,
				code,
				country,
				currency,
				webuy,
				wesell,
				invbuy,
				invsell,
				isflagged,
				timestamp;

	    	// The initial AJAX request
			const firstAjax = $.ajax({
				type: 'GET',
				url: options.cvsFolder.replace(/\/?$/, '/') + 'rateswithcss.xml',
				dataType: 'xml',
			});

			// Reusable function to fill the xmlRates array - this way we don't repeat 
			// ourselves when managing the multiple Ajax requests.
			function fillXmlRatesArr( data ) {

				$(data).find('RATE').each(function(i, v){

					let xmlText 	= new XMLSerializer().serializeToString(v),
						parser 		= new DOMParser(), 
						xmlDoc 		= parser.parseFromString( xmlText,"text/xml"),
						flagOrig 	= xmlDoc.getElementsByTagName("FLAGURL")[0].childNodes[0].nodeValue,
						// update uppercase extensions to lowercase (XML includes uc 
						// flag extensions, while the real extensions are in lc )
						extOrig 	= flagOrig.split('.').pop(),
						extLc 		= extOrig.toLowerCase();

					flag 	 	= options.cvsFolder.replace(/\/?$/, '/') + 'flags/' + flagOrig.substr(0, flagOrig.lastIndexOf(".")) + '.' + extLc,
					code 		= xmlDoc.getElementsByTagName("ISO")[0].childNodes[0].nodeValue,
					country 	= xmlDoc.getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue,
					currency 	= xmlDoc.getElementsByTagName("NAME")[0].childNodes[0].nodeValue,
					webuy 		= xmlDoc.getElementsByTagName("WEBUY")[0].childNodes[0].nodeValue,
					wesell 		= xmlDoc.getElementsByTagName("WESELL")[0].childNodes[0].nodeValue,
					invbuy 		= xmlDoc.getElementsByTagName("INVBUY")[0].childNodes[0].nodeValue,
					invsell 	= xmlDoc.getElementsByTagName("INVSELL")[0].childNodes[0].nodeValue;

					xmlRates
						.push( 
							{ 
								'flag': 	'<img src="' + flag + '" width="" height="" alt="" />', 
								'code': 	code,
								'country': 	country, 
								'currency': currency,
								'webuy': 	webuy, 
								'wesell': 	wesell,
								'invbuy': 	invbuy,
								'invsell': 	invsell,
							} 
						);

				}); 

				timestamp = $(data).find('TIMESTAMP');

			}

			// Build the currency select options on initial Ajax success
			function loadCurrencySelectOptions_initAjax( xmlRates, $thisCalc ) {

				// Remove placeholder-option
				$thisCalc
					.find('.pay-currency')
					.find('option')
					.each( function() {
						$(this).remove();
					});

				/* Load the default input values
				-------------------------------- */
				xmlRates.sort(function(a, b) {

					var codeA = a.code;
					var codeB = b.code;

					if ( codeA < codeB ) {
						return -1;
					}
					
					if ( codeA > codeB ) {
						return 1;
					}

					// ISO codes must be equal
					return 0;

				});

				$.each( xmlRates, function( index, value ) {

					const $this 	= $(this),
						  iso 		= value['code'];

					let $currOption = $( '<option value="' + iso + '" data-webuy="' + value['webuy'] + '" data-wesell="' + value['wesell'] + '">' + iso + '</option>' );
					
					$thisCalc.find('.pay-currency').append( $currOption );

				});

				if ( $thisCalc.find('.pay-currency').find('option[value="USD"]').length > 0 )
					$thisCalc.find('.pay-currency').val('USD');		

			}				

			// Update the currency select options on looped Ajx success
			function loadCurrencySelectOptions_loopedAjax( newTimestamp, oldXmlRates, newXmlRates, $thisCalc ) {

				/* 0. Update timestamp
				---------------------- */

				$thisCalc.closest('.cvs-widget--calculator').find('.cvs-timestamp').find('p').text( newTimestamp[0].textContent );

				/* 1. Sort the new XML array
				---------------------------- */
				newXmlRates.sort(function(a, b) {

					var codeA = a.code;
					var codeB = b.code;

					if ( codeA < codeB ) {
						return -1;
					}
					
					if ( codeA > codeB ) {
						return 1;
					}

					// ISO codes must be equal
					return 0;

				});

				/*var css_y = "color: yellow";
				console.log( '%c' + oldXmlRates[0]['webuy'], css_y );

				var css_g = "color: green";
				console.log( '%c' + newXmlRates[0]['webuy'], css_g );*/

				const $s = $thisCalc.find('.pay-currency');					

				/**
				 * Calc values updates
				 * ===================
				 */
				
				const sOpts = $s.find('option');

				// Update only if the new rates array is not undefined, and its length is 
				// not zero.
				if ( 
						( typeof newXmlRates !== undefined ) &&
						( newXmlRates.length !== 0 ) 
					) {

					let newCodes 	= [],
						currCodes 	= [];

					$.each( newXmlRates, function(i, v) {
						newCodes.push( v['code'] );
					} )

					$.each( sOpts, function(i, v) {
						currCodes.push( $(v).val() );
					} )

					// IMPORTANT! array_diff return positive also if a currency gets removed 
					// from the new XML rates array. 
					// 
					// We need to handle 3 different scenarios here:
					// s1:  the new array's length is longer than that of the current array
					// 		AKA a new currency/new currencies got pushed to the XML 	 
					// s2: 	the new array's length is shorter than that of the current array
					// 		AKA some currently available currency/currencies got removed
					// s3:  INDEPENDENTLY of the length comparison result, if some currently 
					// 		available currency's buy/sell value got changed, we need to handle 
					// 		this update as well.
					
					// scenario 1 -> a new currency/new currencies got pushed to the XML
					// 
					// - 	the new rates array length is higher than the current array 
					// 		length
					// ----------------------------------------------------------------------------
					// 
					// Add the new option(s) & display temp notice

					if ( newCodes.length > currCodes.length ) {

						let newCurrArr 		= array_diff( currCodes, newCodes ),
							currSelected 	= $s.val();

						// We have the difference of the two arrays - now let's loop thorugh the 
						// array of new/difference currencies, and identify the new rate array's
						// rates where ['code'] equals to the currently parsed new/difference
						// currency.
						// Once we have it - let's add it to the currency selector.
						$.each( newCurrArr, function(i, v) {

						    let optVal 	= v,
						    	theRate = $.grep( newXmlRates, function( i, v ) {
								return ( i['code'] === optVal );
						  	});

						  	$s.append( '<option value="' + v + '" data-webuy="' + theRate[0]['webuy'] + '" data-wesell="' + theRate[0]['wesell'] + '">' + v + '</option>' );

							// Re-sort the select options
							$s.html( $s.find('option').sort(function(x, y) {
								// to change to descending order switch "<" for ">"
								return $(x).text() > $(y).text() ? 1 : -1;
							}));

						    // KEEP THE SELECTED VALUE SELECTED - without the below 
						    // one-liner, at this point, for some mysterious reason, 
						    // the select resets to 'USD'!!!!!!!!!
						    $s.val( currSelected );						

							currencyUpdatedNotice( 'added', false, false, optVal );

						})

					// scenario 2 -> some currently available currency got removed
					// 
					// - 	the new rates array length is smaller than the current array 
					// 		length
					// - 	the grep lookup results ( rate where the ['code'] value equals to
					// 		the currently parsed option's value ) either an undefined or a 
					// 		zero length newRate value   
					// ----------------------------------------------------------------------------
					// 
					// Remove the option(s) & display temp notice

					} else if ( newCodes.length < currCodes.length ) {

						$.each( sOpts, function( i, v ) {					

							let currVal 		= $(this).val(),
							    newRate 		= $.grep( newXmlRates, function( i, v ) {
									return ( i['code'] === currVal )
							  	}),
							  	currSelected 	= $s.val();

							if ( 
									( typeof newRate == undefined ) ||
									( newRate.length == 0 ) 
								) {

								// We need to handle the selected option as well:
								// 1. 	If the removeable item IS the item currently selected in the 
								// 		.pay-currency selector:
								// 		1A - 	is USD available AND THE REMOVEABLE CURRENCY IS 
								// 				NOT USD? >> Set selected to USD
								// 		1B - 	in any other case set selected to the first 
								// 				option DIFFERENT FROM THE REMOVEABLE ITEM 
								// 				in the option set
								// 2. 	If the removeable item IS NOT the item currently selected in
								// 		the .pay-currency selector:
								// 		Keep the selection!! 
								if ( v == currSelected ) {

									if ( 
											( $s.find('option[value="USD"]').length > 0 ) &&
											( v !== 'USD' ) 
										) {

										$s.val('USD');
									
									} else {

										$s.val( $s.find('option:first:not([value="' + v + '"])') );

									}

								} else {

									$s.val( currVal );
								
								}

								$(this).remove();

								currencyUpdatedNotice( 'removed', false, false, currVal );
								
							}
							
						});

					}

					// scenario 3 -> INDEPENDENTLY of the length comparison result, if some 
					// currently available currency's buy/sell value got changed, we need to
					// handle this update as well.
					// ----------------------------------------------------------------------------
					// 
					// We have two options here:
					// Opt1 - 	If the `webuy` value gets updated, we need to update
					// 			the `I Sell` tab's `You Receive` value!!!
					// Opt2 - 	If the `wesell` value gets updated, we need to update
					// 			the `I Buy` tab's `You Receive` value!!!				
					$.each( sOpts, function( i, v ) {

						let currVal 	= $(this).val(),
							currWebuy 	= $(this).attr('data-webuy'),
							currWesell 	= $(this).attr('data-wesell'),
						    newRate 	= $.grep( newXmlRates, function( i, v ) {
								return ( i['code'] === currVal );
						  	});

						// If a rate with the current option's currency value is found
						// in the new rate array - time to update the option values.
						if ( 
								( typeof newRate !== undefined ) &&
								( newRate.length !== 0 ) 
							) {

						  	let newWebuy 	= newRate[0]['webuy'],
						  		newWesell 	= newRate[0]['wesell'];

							if ( 
									( currWebuy !== newWebuy ) ||
									( currWesell !== newWesell )
								) {

							  	if ( currWebuy !== newWebuy ) 
							  		$(this).attr('data-webuy', newWebuy);

							  	if ( currWesell !== newWesell )			  	
							  		$(this).attr('data-wesell', newWesell);	

							  	// Don't forget to update the value in the .receive field.
								const currPay 		= $thisCalc.find('.pay').val(),
									  webuy 		= $s.find('option:selected').attr('data-webuy'),
									  wesell 		= $s.find('option:selected').attr('data-wesell'),
									  isSell		= $thisCalc.find('.currency-toggle').find('.sell').is('.active'),
									  multiplier 	= isSell ? webuy : wesell,
									  newReceive	= ( currPay * multiplier ).toFixed(2);

								$thisCalc.find('.receive').val( newReceive );	

								//console.log( currWesell + ' ' + newWesell );

								// Update notices
								if ( currWebuy > newWebuy ) 
									currencyUpdatedNotice( 'updated', 'buy', 'dropped', currVal );

								if ( currWebuy < newWebuy ) 
									currencyUpdatedNotice( 'updated', 'buy', 'risen', currVal );

								if ( currWesell > newWesell ) 
									currencyUpdatedNotice( 'updated', 'sell', 'dropped', currVal );

								if ( currWesell < newWesell ) 
									currencyUpdatedNotice( 'updated', 'sell', 'risen', currVal );

							}

						}
									
					})

				}

			}		

			// Looped Ajax Request Success Callback
			function loopedAjaxSuccess(xml) {

				let oldXmlRates = xmlRates,
					newXmlRates,
					newTimestamp;

				xmlRates = [];

				fillXmlRatesArr( xml );

				newXmlRates 	= xmlRates;
				newTimestamp 	= timestamp;

				/* var css_y = "color: yellow";
				console.log( '%c' + oldXmlRates[0]['webuy'], css_y ); */

				//var css_g = "color: green";
				//console.log( '%c' + newXmlRates[0]['webuy'], css_g );

				// Rebuild currency select options
				loadCurrencySelectOptions_loopedAjax( newTimestamp, oldXmlRates, newXmlRates, $thisCalc );

			}

			// Display the notice(s) - helper function to be used in the looped Ajax request
			function currencyUpdatedNotice( type, changedItem, dir, currVal ) {

				let appendClass,
					noticeContent,
					removeClass;

				if ( 'updated' == type ) {

					appendClass 	= 'cvs-notice cvs-notice--currency-' + type + ' ' + dir + ' ' + changedItem;
					noticeContent 	= 'Currency ' + currVal + '\'s ' + changedItem + ' value has ' + dir;
					removeClass 	= '.cvs-notice--currency-updated.' + dir;

				} else {

					appendClass = 'cvs-notice cvs-notice--currency-' + type;
					noticeContent 	= 'Currency ' + currVal + ' has been ' + type;	
					removeClass 	= '.cvs-notice--currency-' + type;

				}

				$('<div class="' + appendClass + '">' + noticeContent + '</div>')
					.appendTo( $thisCalc )
					.fadeIn( function() {

						$thisCalc.find('.pay').trigger('keyup');

						setTimeout( function() {

							$thisCalc.find( removeClass ).fadeOut(function() {
								$(this).remove();
							});

						}, 2000);

					} ).css('display', 'table');

			}	

			function array_diff( a1, a2 ) {

			    let a 		= [], 
			    	diff 	= [];

			    for ( let i = 0; i < a1.length; i++ ) {
			        a[ a1[i] ] = true;
			    }

			    for ( var i = 0; i < a2.length; i++ ) {
			        if ( a[a2[i]] ) {
			            delete a[a2[i]];
			        } else {
			            a[ a2[i] ] = true;
			        }
			    }

			    for ( let k in a ) {
			        diff.push(k);
			    }

			    return diff;

			}			

			firstAjax
				// ================================================================================
				// Success callback 1 - fill the xmlRates array
				.done( function(data) {

					fillXmlRatesArr( data );

					//var css = 'color: orange';
					//console.log( '%c' + xmlRates[0]['webuy'], css );

				})
				// ================================================================================
				// Success callback 2 - build the calculator markup and set up the initial field values
				.done( function(data) {

					/* Load the currency select options
					----------------------------------- */
					loadCurrencySelectOptions_initAjax( xmlRates, $thisCalc );

					const $s = $thisCalc.find('.pay-currency');

					/* Currency onselect event handler
					---------------------------------- */

					$thisCalc.find('.pay-currency').on('change', function() {

						const selectedCurr 	= $(this).find(':selected').val(),
							  newDef 		= $thisCalc.find('.pay').val(),
							  newWesell 	= $s.find('option:selected').attr('data-wesell'),
							  newWebuy 		= $s.find('option:selected').attr('data-webuy'),
							  isSell		= $thisCalc.find('.currency-toggle').find('.sell').is('.active'),
							  multiplier 	= isSell ? newWebuy : newWesell;
						
						newVal = ( newDef * multiplier ).toFixed(2); 

						if ( '' !== $thisCalc.find('.pay').val() ) {
							$thisCalc.find('.receive').val( newVal );
						} else {
							$thisCalc.find('.receive').val('');						
						}		
					
					})	

					/* "You Pay" input onkeyup and blur event handler
					------------------------------------------------- */	

					$thisCalc.find('.pay').on('keyup blur', function() {

						const thisVal 		= $(this).val(),
							  selectedCurr 	= $thisCalc.find('.pay-currency').find(':selected').val(),
							  wesell 		= $s.find('option:selected').attr('data-wesell'),
							  webuy 		= $s.find('option:selected').attr('data-webuy'),
							  isSell		= $thisCalc.find('.currency-toggle').find('.sell').is('.active'),
							  multiplier 	= isSell ? webuy : wesell;

						newVal = ( thisVal * multiplier ).toFixed(2);

						if ( '' !== $thisCalc.find('.pay').val() ) {				 
							$thisCalc.find('.receive').val( newVal );	
						} else {
							$thisCalc.find('.receive').val('');						
						}

						// console.log('data-webuy value: ' + webuy);	

					})

					/* "You Receive" input onkeyup and blur event handler
					------------------------------------------------- */	

					$thisCalc.find('.receive').on('keyup blur', function() {

						const thisVal 		= $(this).val(),
							  selectedCurr 	= $thisCalc.find('.pay-currency').find(':selected').val(),
							  wesell 		= $s.find('option:selected').attr('data-wesell'),
							  webuy 		= $s.find('option:selected').attr('data-webuy'),
							  isSell		= $thisCalc.find('.currency-toggle').find('.sell').is('.active'),
							  multiplier 	= isSell ? webuy : wesell;

						newVal = ( thisVal / multiplier ).toFixed(2); 

						if ( '' !== $thisCalc.find('.pay').val() ) {				
							$thisCalc.find('.pay').val( newVal );
						} else {
							$thisCalc.find('.receive').val('');						
						}						

					})	

					/* "I Buy" & "I Sell" buttons click event handler
					------------------------------------------------- */

					$thisCalc.find('.currency-toggle').find('.btn').on('click', function(e) {

						e.preventDefault();

						const $this = $(this);

						// Update only if the clicked button is not the currently active one.
						if ( $this.not('.active') ) {

							$this
								.addClass('active')
								.siblings()
								.removeClass('active');

							const payVal 		= $thisCalc.find('.pay').val(),
								  selectedCurr 	= $thisCalc.find('.pay-currency').find(':selected').val(),
								  multiplier 	= $this.hasClass('buy') 
								  					? $s.find('option:selected').attr('data-wesell')
								  					: $s.find('option:selected').attr('data-webuy');

							newVal = ( payVal * multiplier ).toFixed(2); 

							if ( '' !== $thisCalc.find('.pay').val() ) {					
								$thisCalc.find('.receive').val( newVal );
							} else {
								$thisCalc.find('.receive').val('');						
							}							

						}

					})

				})
				// ================================================================================
				// Success callback 3 - append timestamp
				.done( function(data) {

					$this.find('.cvs-widget--calculator').append( '<div class="cvs-timestamp"><p style="margin: 0;">' + timestamp[0].textContent + '</p></div>' );

				})
				// ================================================================================
				// Success callback 4 - looped Ajax request
				.done( function(data) {

					if ( false !== options.updateFrequency ) {

						let i = 0;
						setInterval(function() { 

					    	// The looped Ajax request - here we use the defualt `success` 
					    	// and `error` callbacks. Why?
					    	// Because using `done` and `fail` here would only make sense if we 
					    	// could set them up outside the setInterval function. But this
					    	// can't be done - it has been tested, and such setup outside just
					    	// doesn't work. Blimey. 
							$.ajax({
								type: 'GET',
								url: options.cvsFolder.replace(/\/?$/, '/') + 'rateswithcss.xml',
								dataType: 'xml',
								success: loopedAjaxSuccess,
								error: function() {

									console.log( 'Looped Ajax request failed :(' );

								}						
							});

							i++;					

						}, options.updateFrequency);

					}

				})
				// ================================================================================
				// Error callback - looped Ajax request
				.fail( function() {

					console.log( 'Request failed :(' );

				})

		}) // EOF return this.each(function()

	};

})( jQuery );
