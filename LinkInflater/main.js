/**
 * @author Jacob Heater 
 * @since 10/13/2016
 * @file The main entry point for the URL Exapnder Chrome extension.
 */
(global => {
    "use strict";

    if (global.inflater) {
        //Assuming everything went down as expected, we should have access to the global.inflater namespace,
        //that is defined in our scripts/inflater.js file.
        //Other scripts (scripts/*.js) add additional functionality to the global.inflater namespace.

        //Since our extension is really only a context menu, we really only
        //need to make one call to construct the context menu.
        //Everything else is done in those scripts.
        global.inflater.contextMenu.create();
    } else {
        //Something's wrong. global.inflater namespace was not defined.
        console.error("global.inflater was not defined... Initialization cannot proceed.");
    }

})(this);