/**
 * @author Jacob Heater 
 * @since 10/13/2016
 * @file The main entry point for the URL Exapnder Chrome extension.
 */
(() => {
    "use strict";

    const api = {
        url: {
            inflate: function (shortenedUrl) {
                var url = `https://linkinflater.herokuapp.com/api/inflate?url=${shortenedUrl}`;
                var ajax = {
                    type: "GET",
                    url: url,
                    cache: false
                };

                return $.ajax(ajax);
            }
        }
    };

    const contextMenuDefinition = {
        id: "linkInflater",
        title: "Inflate this URL",
        contexts: ["link", "selection"],
        onclick: onContextMenuClick
    };

    chrome.contextMenus.create(contextMenuDefinition);

    function onContextMenuClick(event, tab) {
        var url = event.linkUrl || event.selectionText || "";

        if (url) {
            api
                .url
                .inflate(url)
                .then(function (data) {
                    if (data.success) {
                        prompt("Inflated URL", data.data.inflatedUrl);
                    } else {
                        alert("Something went wrong...");
                    }
                })
                .fail(function (xhr) {
                    alert("Something was wrong with your request...");
                });
        }
    }

})();