/**
 * @author Jacob Heater
 * @since 10/14/2016
 * @file Contains functionality for the context menu for our chrome extension.
 */
(global => {
    if (global.inflater) {

        //Add the contextMeny namespace to the global.inflater namespace.
        //This will house all of the logic for the context menu for our extension.
        //This is an immutable property.
        Object.defineProperty(global.inflater, "contextMenu", {
            writable: false,
            value: {
                definition: {
                    //The context menu id.
                    id: "linkInflater",
                    //The context menu text %s is the string text.
                    title: "Inflate this Link",
                    //The contexts that the context menu will be created in.
                    //Either hyperlinks, or text selection.
                    contexts: ["link", "selection"],
                    //A function to call when the context menu is clicked.
                    onclick: onContextMenuClick
                },
                /**
                 * A helper function for creating the chrome context menu.
                 * 
                 * @returns {Object} The current instance of the context menu object.
                 */
                create: function() {
                    //Use our definition above to create the extension context menu.
                    chrome.contextMenus.create(this.definition);
                    return this;
                }
            }
        });

        /**
         * This function is called when the extension context menu
         * item is clicked in the chrome context menu.
         * 
         * Internally we are getting the URL from either the link that was
         * clicked or the selection text. We don't want to attempts to expand
         * the url if it has no value.
         * 
         * @param {Object} event Contains event information related to the contextMenu click.
         */
        function onContextMenuClick(event) {
            /*
            Get the url from the link, if that's what was clicked on to create the context menu.
            Otherwise, we need to get the selection text, if that's what was clicked on to create
            the context menu.

            Our extension only allows the context menu to be created in these two scenarios, so we
            know that the click event will contain something for this URL.
            */
            const URL = event.linkUrl || event.selectionText;
            const NEW_LINE = "\r\n";

            var promptTitle;
            var errorMessage;

            //If there is a URL value, then let's call the api to get the expanded URL.
            if (URL) {
                
                global
                    .inflater
                    .api
                    .url
                    .inflate(URL)
                    .then(function (data) {
                        if (data.success) {
                            promptTitle = "Your Inflated Link Is Below";
                            //Looks like the URL was expanded just fine. Let's
                            //give the user back their data in a prompt. That
                            //way it will be easier to select the expanded URL text.
                            prompt(promptTitle, data.data.inflatedUrl);
                        } else {
                            //The call to the API was fine, but the URL expander wasn't 
                            //able to parse the given URL.
                            //Construct a meaningful error message for the user to see.
                            errorMessage = "Something went wrong."
                            .concat(NEW_LINE)
                            .concat("A detailed error message can be found below.")
                            .concat(NEW_LINE)
                            .concat(data.data)
                            .concat(NEW_LINE)
                            .concat("Please try to inflate the URL again.");

                            alert(errorMessage);
                        }
                    })
                    .fail(function (xhr) {
                        //Something was wrong with the XmlHttpRequest, let's get some details about it.
                        //Give back the user some meaningful error message.
                        errorMessage = "Something was wrong with the API request..."
                        .concat(NEW_LINE)
                        .concat("Error message can be found below")
                        .concat(NEW_LINE)
                        .concat(xhr.statusText);

                        alert(errorMessage);
                    });
            }
        }
    }
})(this);