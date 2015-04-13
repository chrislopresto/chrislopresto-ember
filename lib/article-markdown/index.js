var pickFiles = require('broccoli-static-compiler');

module.exports = {
  name: 'article-markdown',

  treeForApp: function() {
    var flatiron = require('broccoli-flatiron');
    return flatiron('app/articles', {
      outputFile: 'article-markdown.js',
      trimExtensions: true
    });
  },

  isDevelopingAddon: function() {
    return true;
  }
};
