/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp({
  emberCliFontAwesome: { includeFontAwesomeAssets: false },
  fingerprint: {
    prepend: 'https://s3.amazonaws.com/chrislopresto.com-assets/'
  }
});

app.import("bower_components/highlightjs/styles/tomorrow-night-eighties.css");

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
