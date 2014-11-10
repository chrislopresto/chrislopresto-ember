/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp({
  emberCliFontAwesome: { includeFontAwesomeAssets: false },
  compassOptions: {
    importPath: [
      process.cwd() + '/bower_components'
    ]
  }
});

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.
app.import('bower_components/font-awesome/css/font-awesome.css');
var fontAwesome = pickFiles('bower_components/font-awesome/fonts/', {
  srcDir: '/',
  // files: isn't strictly necessary (if left out will load all files), but leaving in to be explicit.
  files: [
    'fontawesome-webfont.ttf',
    'fontawesome-webfont.woff',
    'fontawesome-webfont.eot',
    'FontAwesome.otf',
    'fontawesome-webfont.svg'
  ],
  destDir: '/fonts'
});

module.exports = app.toTree(fontAwesome);
