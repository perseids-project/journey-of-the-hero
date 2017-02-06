/*
 * Top-level namespace for the GapVis application
 */
define(function() {

//     // removed in production by uglify
//     if (DEBUG) {
// //        API_ROOT = '/api';
// //        REPORT_URL = '/api/flags/';
// //        API_DATA_TYPE = 'json';
//     	API_ROOT = 'tests/api';
//     	REPORT_URL = 'tests/api/flags/';
//     	API_DATA_TYPE = 'json';
//     }
    
    // map styles
    var novisibility = [{ visibility: "off" }],
        mapStyle = [
            {
                elementType: "labels",
                stylers: novisibility
            },{
                featureType: "administrative",
                elementType: "geometry",
                stylers: novisibility
            },{
                featureType: "road",
                elementType: "geometry",
                stylers: novisibility
            },{
                featureType: "transit",
                elementType: "geometry",
                stylers: novisibility
            },{
                featureType: "poi",
                elementType: "geometry",
                stylers: novisibility
            },{
                featureType: "water",
                stylers: [
                    { hue: "#0033ff" },
                    { saturation: 82 },
                    { lightness: 95 }
                ]
            },{
                featureType: "landscape",
                stylers: [
                    { hue: "#80ff00" },
                    { saturation: 15 },
                    { lightness: -20 }
                ]
            }
        ],
        // colors for frequency scale
        scaleColors = ["090066", "6b0051", "ce003c", "cc0020", "ee0000"],
        colorThemes = scaleColors.map(function(color) {
            return TimeMapTheme.createCircleTheme({ color: color });
        });

		// colors for types
		placeTypes = { "SETTLEMENT": "0000ee", "NATURAL_FEATURE" : "ee0000", "REGION" : "00ee00" };
		themeByType = function(place){
			var color = "555555",
			 	ptypes = this.placeTypes,
				ptypecolor = ptypes[place.get('type')];
			if( typeof ptypecolor != 'undefined' ){
				color = ptypecolor;
			}
			return TimeMapTheme.createCircleTheme({ color: color });
		};
    var gv = window.gv = spf;
    
    gv.settings = _.extend(spf.config, {
        // core settings (set from config)
        API_ROOT: API_ROOT,
        REPORT_URL: REPORT_URL,
        API_DATA_TYPE: API_DATA_TYPE,
        disableChangeLink: (typeof disableChangeLink!=='undefined')?!!disableChangeLink:false,
        VIEW_ON: (typeof VIEW_ON!=='undefined')?VIEW_ON:null,
		REPORT_BAD_TOKEN_URL: (typeof REPORT_BAD_TOKEN_URL !== 'undefined')?REPORT_BAD_TOKEN_URL:false,
		REPORT_PROBLEM_PLACE_URL: (typeof REPORT_PROBLEM_PLACE_URL !== 'undefined')?REPORT_PROBLEM_PLACE_URL:false,		
		PLACE_THEME: (typeof PLACE_THEME == 'undefined') ? 'frequency' : PLACE_THEME,
		SUMMARY_TEMPLATE: (typeof SUMMARY_TEMPLATE == 'undefined') ? 'book-summary-text-template' : SUMMARY_TEMPLATE,
		BOOK_TITLE_TEMPLATE: (typeof BOOK_TITLE_TEMPLATE == 'undefined') ? 'book-title-template' : BOOK_TITLE_TEMPLATE,
		READING_VIEW_INTRO: (typeof READING_VIEW_INTRO == 'undefined') ? '' : READING_VIEW_INTRO,
		PLACE_VIEW_INTRO: (typeof PLACE_VIEW_INTRO == 'undefined') ? '' : PLACE_VIEW_INTRO,		
		viewOnLink : (typeof VIEW_ON_LINK === 'function') ? VIEW_ON_LINK : false,
         // google maps style settings
        mapStyle: mapStyle,
        scaleColors: scaleColors,
        colorThemes: colorThemes,
	    placeTypes: placeTypes,
		themeByType: themeByType,
        /*
            Retrievers
         */
        models : SETTINGS_MODELS,
        relatedCount : 15 // Number of related top places to show ? (Can be undefined)
    });
    
    return gv;
});