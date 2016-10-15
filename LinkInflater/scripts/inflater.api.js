/**
 * @author Jacob Heater
 * @since 10/14/2016
 * @file Contains functionality for our API calls for expanding URLs.
 */
(global => {

    if (global.inflater) {
        //As long as the global.inflater namespace is there, let's add our api namespace to it.

        //Add the api namespace to the global.inflater namespace
        Object.defineProperty(global.inflater, "api", {
            writable: false,
            value: {
                //The url namespace added to the global.inflater.api namespace.
                url: {
                    /**
                     * Calls the REST API to expand the given URL.
                     * 
                     * @param {String} shortenedUrl The url to expand.
                     * @returns {Promise} The $.ajax promise.
                     */
                    inflate: function (shortenedUrl) {
                        //We are using the link inflater api to expand our shortened urls.
                        const URL = `https://linkinflater.herokuapp.com/api/inflate?url=${shortenedUrl}`;
                        //Define the type of ajax call to make.
                        const AJAX_DEFINITION = {
                            type: "GET",
                            url: URL,
                            cache: false
                        };
                        //Returns the $.ajax promise here.
                        return $.ajax(AJAX_DEFINITION);
                    }
                }
            }
        });

    }
})(this);