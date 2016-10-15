/**
 * @author Jacob Heater
 * @since 10/15/2016
 * @file Does all of the zip work for our chrome extensions using gulp.
 */
(() => {
    "use strict";

    const gulp = require("gulp");
    const zip = require("gulp-zip");
    const FILE_EXTENSION = ".zip";
    const MANIFEST_LINK_INFLATER = require("../LinkInflater/manifest.json");
    const FILE_PATHS = {
        LINK_INFLATER: "LinkInflater/**/*",
        OUTPUT: "dist"
    };
    const TASK_NAMES = {
        LINK_INFLATER: "zip-link-inflater",
        ALL: "zip-all",
        WATCH: "watch-zip"
    };

    let productName;
    let productVersion;
    let productFileName = () => {
        //Returns a formatted string
        //Output example: LinkInflater-1.0.zip
        return `${productName}-${productVersion}${FILE_EXTENSION}`;
    };

    //Zip link inflater
    gulp.task(TASK_NAMES.LINK_INFLATER, () => {

        productName = MANIFEST_LINK_INFLATER.buildName;
        productVersion = MANIFEST_LINK_INFLATER.version;

        return gulp
            .src(FILE_PATHS.LINK_INFLATER)
            .pipe(zip(productFileName()))
            .pipe(gulp.dest(FILE_PATHS.OUTPUT));

    });

    //Zip all extensions
    gulp.task(TASK_NAMES.ALL, [
        TASK_NAMES.LINK_INFLATER
    ]);

    gulp.task(TASK_NAMES.WATCH, () => {
        gulp.watch([FILE_PATHS.LINK_INFLATER], [TASK_NAMES.LINK_INFLATER]);
    });
})();