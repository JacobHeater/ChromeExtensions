# Chrome Extensions

This project is a collection of extensions for the Google Chrome browser. All of the
extensions in this project are license under the MIT license, and input from the 
community is highly encouraged. I am very responsive to pull requests, so please
feel free to contribute your thoughts and feedback.

## Extensions that are Actively Maintained

1. **LinkInflater**

## Using Gulp for Releases

Chrome expects the extensions to be uploaded in `.zip` format, and `gulp` tasks have
been created to streamline this process. It is highly encouraged that you use those
tasks to ensure that the release files are output correctly. All release files should
be placed in the `dist` directory.

### Gulp Tasks

All gulp tasks are defined in the `gulp/gulp-zip` directory.

1. `zip-link-inflater`
1. `zip-all`
1. `watch-zip`

A `gulp watcher` (`watch-zip`) has been created to ensure that any changes made to the file tree
will be picked up and those changes will be correctly output in the `dist` folder.
All `.zip` files must be put in the `dist` directory to ensure that admins can
upload all release files. 

Our `package.json` file describes all of the dependencies to get the `ChromeExtensions`
project up and running. `node_modules` will not be tracked in `git` and any dependencies
that are added to the project will need to be reflected in the `package.json` file.

## Manifest files

Don't foget to update the `manifest.json` files in each of the extensions, as this is 
what Chrome uses for the metadata about our extensions. It is important to update the
version number in the `manifest.json` file accordingly to reflect major/minor updates. 


&copy; Jacob Heater 2016