var flatiron = require('broccoli-flatiron');
var funnel = require('broccoli-funnel');

module.exports = {
  name: 'article-markdown',

  treeForApp: function() {
    var articleTree = funnel('app/articles', {
      srcDir: '/',
      destDir: '/',
      include: [
        '*.md'
      ]
    });

    return flatiron(articleTree, {
      outputFile: 'article-markdown.js',
      trimExtensions: true
    });
  },

  isDevelopingAddon: function() {
    return true;
  }
};
