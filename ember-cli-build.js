/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var jsonImporter = require('node-sass-json-importer');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    nodeAssets: {
      'cssgram': {
        srcDir: 'source/scss',
        import: [
          '1977.scss',
          '_shared.scss',
          'aden.scss',
          'brooklyn.scss',
          'clarendon.scss',
          'cssgram.scss',
          'earlybird.scss',
          'gingham.scss',
          'hudson.scss',
          'inkwell.scss',
          'lark.scss',
          'lofi.scss',
          'mayfair.scss',
          'moon.scss',
          'nashville.scss',
          'perpetua.scss',
          'reyes.scss',
          'rise.scss',
          'slumber.scss',
          'toaster.scss',
          'walden.scss',
          'willow.scss',
          'xpro2.scss'
        ]
      }
    },
    emberCliFontAwesome: {
      useScss: true
    },
    fingerprint: {
      prepend: 'https://s3.amazonaws.com/chrislopresto.com-assets/',
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'woff', 'woff2', 'otf', 'eot', 'ttf', 'svg', 'swf', 'ico']
    },
    autoprefixer: {
      browsers: ['last 2 ios version'],
      cascade: false
    },
    sassOptions: {
      importer: jsonImporter,
      includePaths: [
        'freestyle',
        'node_modules/mappy-breakpoints'
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

  app.import('bower_components/highlightjs/styles/tomorrow-night-eighties.css');
  app.import('bower_components/remarkable/dist/remarkable.js');

  app.import('vendor/cssgram/cssgram.scss');

  app.import('vendor/yapp-keen-shim.js');

  return app.toTree();
};
