var path = require('path');
var Funnel = require('broccoli-funnel');
var pickFiles = require('broccoli-static-compiler');
var unwatchedTree  = require('broccoli-unwatched-tree');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'breakpoint-sass',

  isDevelopingAddon: function() {
    return true;
  },

  treeForStyles: function() {
    var stylesPath = path.join('app', 'styles');
    var stylesTree = new Funnel(this.treeGenerator(stylesPath), {
      srcDir: '/',
      destDir: '/app/styles'
    });

    var breakpointSassTree = pickFiles(unwatchedTree(path.join('node_modules/breakpoint-sass/stylesheets')), {
      srcDir: '/',
      destDir: '/app/styles/breakpoint'
    });

    return mergeTrees([
        stylesTree,
        breakpointSassTree
      ],
      { overwrite: true }
    );
  }
};
