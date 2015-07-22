var stew = require('broccoli-stew');

module.exports = {
  name: 'asset-paths',

  isDevelopingAddon: function() {
    return true;
  },
  postprocessTree: function(type, tree) {
    if (type === 'all') {
      return stew.mv(tree, 'ember-reveal-js/*', 'assets/ember-reveal-js/');
    } else {
      return tree;
    }
  }
};
