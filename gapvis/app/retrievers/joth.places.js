define([
        "util/addAnnotator"
    ],
    function(addAnnotator) {
    /**
     * Retrieve places reference and link using the cts identifier of a book
     *     Parse them as it need to
     *     This retriever does not need OpenAnnotation. Through, if you want to see links in your text
     *     you will need to call it. The attributes created in Page
     * @param  {Object.<string, any>}   options         List of options for ajax call / retrieval
     * @param  {function}               options.success Callback
     * @return {Object}  Return an updated/synced object passed as "this"
     */
    var PleiadesIDMatcher = new RegExp("^http://pleiades\.stoa\.org/places/([0-9]+)")
    return function(options) {
        options = options || {};
        var collection = this,
            book = collection.book,
            success = options.success;

        var options = _.extend({
                dataType: "json",
                cache: true
            }, options);

        options.error = function(dat) {
            if (DEBUG) console.log(dat)
        }
        options.success = function(resp, status, xhr) {
            if(typeof collection.add !== "undefined") {
                /**
                 * No we parse what we can from the items :)
                 */
                var pages = {}
                var placesId = [];
                //For each annotation
                _.each(resp.places, function(annotation) {
                    //For each annotation, we have a source !
                    var target = annotation["hasTarget"]["hasSource"]["@id"],
                        annotators = _.map(annotation.annotatedBy["foaf:member"], function(annotator) { return annotator["foaf:name"]; })

                    if(!pages[target]) { pages[target] = []; }

                    // We have a body
                    _.each(annotation.hasBody, function(body){
                        var id = body["@id"].match(PleiadesIDMatcher)[1] || body["@id"];
                        var item = {
                            id : id,
                            title : id,
                            ll : [32.5, 32.5]
                        }
                        if (!collection.get(item.id)) {
                            collection.add(item, {silent:true});
                            placesId.push(item.id)
                        }
                        //We put the place into the list of annotation for one page.
                        pages[target].push({
                            id : item.id,
                            selector : annotation["hasTarget"]["hasSelector"],
                            annotators : annotators
                        });
                    });
                });

                // So now we have registered the places. 
                // We need now to load annotations links for each page now.
                // For that we need the collection pages to be ready !
                
                // Now we use another retrieving method : We retrieve the places data. 
                // Note that we should be make this function much more externaly "available"
                
                // First we setup a callback to avoid code repetition
                var cb = function() {
                    _.each(Object.keys(pages), function(pageId) {
                        book.pages.getOrCreate(pageId).set({
                            "places" : _.map(pages[pageId], function(val) { return val.id; }),
                            "placesAnnotations" : pages[pageId]
                        });
                        addAnnotator(book.pages.get(pageId), pages[pageId]);
                    });
                    if (success) success(collection, resp);
                }

                var placesId = placesId.join(",")
                $.ajax(
                    "/apps-stage/joth/pleiades?places=" + placesId,
                    {
                        "success" : function(data) {
                            _.each(data.places, function(place, placeId) {
                                var ll = (place.reprPoint) ? [place.reprPoint[1], place.reprPoint[0]] : [0,0];
                                collection.get(placeId).set({
                                    title : place.title,
                                    description : place.description || "",
                                    ll : ll
                                })
                            })

                            if(book._fetched["pages"] !== true) {
                                book.on("ready.pages", function() {
                                    cb();
                                    if (!options.silent) collection.trigger('reset', collection, options);
                                });
                            } else {
                                cb();
                                if (!options.silent) collection.trigger('reset', collection, options);
                            }
                        },
                        error : options.error || function() { return; }
                    }
                )
                
            }
        };

        return (this.sync || Backbone.sync).call(this, 'read', this, options);
    }
});
