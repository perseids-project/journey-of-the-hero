/*
 * Book Summary Map View
 */
define(['gv', 'views/BookView'], function(gv, BookView) {
    var state = gv.state,
        settings = gv.settings,
        // map styles
        mapStyle = settings.mapStyle,
        colorThemes = settings.colorThemes;
    
    return BookView.extend({
        className: 'summary-map-view panel fill',
        
        render: function() {
			// if (DEBUG) console.log("render");
            if (DEBUG && !window.google) return;
            var view = this,
                book = view.model,
                markers = view.markers = [],
                gmaps = google.maps,
                colorScale = d3.scale.quantize()
                    .domain([1, book.places.first().get('frequency')])
                    .range(colorThemes),
                bounds = book.gmapBounds(),
                $container = $('<div></div>').appendTo(view.el);
                
            // deal with layout issues - div must be visible in DOM before map initialization
            setTimeout(function() {

                // init map
                var gmap = new gmaps.Map($container[0], {
                        center: bounds.getCenter(),
                        zoom: 4,
                        mapTypeId: gmaps.MapTypeId.TERRAIN,
                        streetViewControl: false,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE
                        },
                        styles: mapStyle
                    });
                    
                // set bounds
				
				gmap.fitBounds(bounds);

                book.places.each(function(place) {
                    var theme = {},
                        w = 10,
                        c = w/2;
					
					// if themes by type is enabled
					if(state.get('placeTheme') == 'feature'){
						theme = settings.themeByType(place);
					} else {
						theme = colorScale(place.get('frequency'));
					}
                    var icon = TimeMapTheme.getCircleUrl(w, theme.color, '99');
                        size = new gmaps.Size(w, w),
                        anchor = new gmaps.Point(c, c),
                        marker = new gmaps.Marker({
                            icon: new gmaps.MarkerImage(
                                icon,
                                size,
                                new gmaps.Point(0,0),
                                anchor,
                                size
                            ),
                            position: place.gmapLatLng(), 
                            map: gmap, 
                            title: place.get('title')
                        });
                        
					
                    // UI listener
                    gmaps.event.addListener(marker, 'click', function() {
                        state.set({ placeid: place.id });
                        state.set({ view: 'place-view' });
                    });
                    markers.push(marker);
                });
            }, 0);
        }
    });
    
});