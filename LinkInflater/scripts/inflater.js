/**
 * @author Jacob Heater
 * @since 10/14/2016
 * @file Adds the inflater namespace to the global scope.
 */
(global => {

    if (!global.inflater) {
        //Assuming there is no global.inflater namespace already there, let's
        //create it below.

        //Define an immutable property in the global scope.
        Object.defineProperty(global, "inflater", {
            writable: false,
            value: {}
        });

    }
})(this);