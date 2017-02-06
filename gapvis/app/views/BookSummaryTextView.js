/*
 * Book Summary Text View
 */
define([
'gv', 
'views/BookView' ], 
function( gv, BookView ) {
	
    var state = gv.state,
		settings = gv.settings;
    
    // View: BookSummaryTextView ( text content for the book summary )
		
    return BookView.extend({
        template: '#' +  settings.SUMMARY_TEMPLATE,
        
        // render and update functions
        
        render: function() {
            var view = this,
                book = view.model, 
                context = _.extend({}, book.toJSON(), {
                    pageCount: book.pages.length,
                    topPlaces: book.places.toJSON().slice( 0, 4 )
                });
						
            // fill in template
						
            view.renderTemplate( context );
        },
        
        // UI Event Handlers - update state
        
        events: {
            'click span.place':'uiPlaceClick',
            'click button.goto-reading':'uiGoToReading'
        },
        
        uiPlaceClick: function( e ){
            var placeId = $( e.target ).attr( 'data-place-id' );
            if ( placeId ){
                state.set('placeid', placeId);
                state.set({ 'view': 'place-view' });
            }
        },
        
        uiGoToReading: function(){
            state.set({ 'view': 'reading-view' });
        }
    });
    
});