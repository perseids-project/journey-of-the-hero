define(
    [
        "retrievers/sync",
        "retrievers/cts.reff",
        "retrievers/cts.page",
        "retrievers/cts.book",
        "retrievers/joth.places",
        "retrievers/joth.persons",
        "retrievers/joth.citations"
    ], 
    function(
        sync,
        ctsReff,
        ctsPage,
        ctsBook,
        jothPlaces,
        jothPersons,
        jothCitations
    ) {
        /*
           
         */
        var retrievers = {
            "sync" : sync,
            "cts.reff" : ctsReff,
            "cts.page" : ctsPage,
            "cts.book" : ctsBook,
            "joth.places" : jothPlaces,
            "joth.persons" : jothPersons,
            "joth.citations" : jothCitations
        }
        /**
         * Load a retriever based on a string.
         * @param  {string}   Identifier for the retriever to be used
         * @return {function}
         */
        return function(retriever) {
            if (DEBUG) console.log("Retriever called : " + retriever)
            if(typeof retrievers[retriever] !== "undefined") {
                return retrievers[retriever];
            } else {
                if (DEBUG) console.log("Retriever not set or not existing :" + retriever)
                return sync;
            }
        }
    }
)