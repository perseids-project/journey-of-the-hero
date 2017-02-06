/*
 * Book View
 */
define(['gv'], 
function(gv){

    // View: BookView (parent class for book views)
  
    return gv.View.extend({
      
      // utility - render an underscore template to this el's html
      
      renderTemplate: function( context ){
        var view = this,
            book = view.model,
            template = _.template( view.template );
            context = context || view.model.toJSON();
        
        
        if ( !gv.settings.VIEW_ON ){
          context.viewon = 'Google Books';
        }
        else {
          context.viewon = gv.settings.VIEW_ON;
        }
        context.viewonlink = context.uri;
        
        
        if ( typeof gv.settings.viewOnLink == 'function' ){
          
          // Current view? 
          
          if ( gv.state.get('view') == 'reading-view') {

            var page = gv.state.get( 'pageid' );
            if ( book.supportsSections() ){
              page = book.pageIdToRef( page ).label; // We set like 1.2
            }
            context.viewonlink = gv.settings.viewOnLink( context.uri, page );         
          // or no URI in context?
          } else if (! context.uri) {
            context.viewonlink = gv.settings.viewOnLink( context.uri, page );         
          }
        }

        context.datalinks = {};
        for (var i=0; i<gv.settings.models.injections.book.length; i++) {
            var type = gv.settings.models.injections.book[i];
            context.datalinks[type] = book[type].url();
        }
        
        $( view.el ).html( template(context) );
      },
      
      /**
       * Load the page when the data is ready by executing the callback
       * @param  {Function}
       */
      ready: function( callback ){
        var view = this,
            state = gv.state,
            bookId = state.get( 'bookid' ),
            book = view.model;
            
        if ( !book || book.id != bookId || !book.isFullyLoaded() ){
          book = view.model = gv.books.getOrCreate( bookId );
          
          // set the page id if not set
          view.lastBookStatus = false;
          book.ready(view.cid, function() {
            // This limits the situation to only one callback called !
            if(view.lastBookStatus !== book.isFullyLoaded() && book.isFullyLoaded()) {
              view.lastBookStatus = true;
              if ( !state.get( 'pageid' ) ){
                state.set({ pageid: book.firstId()});
              }
              callback.call(view);
            }
          });
          
        } else {
          callback.call(view);
        }
      }
        
    });
    
});
