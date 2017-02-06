/*
 * Book Navigation View
 */
define(['gv', 'views/BookView'], function(gv, BookView) {
    var state = gv.state;
    
    // View: NavigationView
    return BookView.extend({
        template: '#navigation-view-template',
    
        initialize: function() {
            var view = this;
            // listen for all state changes
            view.bindState('change', view.updatePermalink, view);
            view.bindState('change:placeid', view.updateNavButtons, view);
            view.bindState('change:view', view.updateNavButtons, view);
        },
        
        render: function() {
            var view = this;
            // render content and append to parent
            view.renderTemplate();
            // button it
            view.$('.btn-group').button();
            // update
            view.updatePermalink();
            view.updateNavButtons();
            return view;
        },
        
        updatePermalink: function() {
            this.$('a.permalink').attr('href', gv.router.getPermalink());
        },
        
        updateNavButtons: function() {
            // enable/disable place view
            var $placeButton = this.$('[data-view-id=place-view]'),
                d = 'disabled';
            state.get('placeid') ?
                $placeButton.removeClass(d).removeAttr(d) :
                $placeButton.addClass(d).attr(d, d);
            // check the appropriate button
            this.$('button').each(function() {
                var $this = $(this);
                $this.toggleClass('active', $this.attr('data-view-id') == state.get('view'));
            });
        },
        
        // UI event handlers
        
        events: {
            "click button":      "uiGoToView"
        },
        
        uiGoToView: function(evt) {
            // get view from id
            var viewKey = $(evt.target)
                .closest('[data-view-id]')
                .attr('data-view-id');
            state.set({ 'view': viewKey });
        }
        
    
    });
    
});