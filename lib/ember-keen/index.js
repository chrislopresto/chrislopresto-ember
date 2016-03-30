/*jshint node:true*/
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-keen',

  included: function(app/*, parentAddon*/) {
    this._super.included(app);

    app.import(path.join(app.bowerDirectory, 'keen-analysis/dist/keen-analysis.js'));
    app.import(path.join(app.bowerDirectory, 'keen-dataviz/dist/keen-dataviz.js'));
    app.import(path.join(app.bowerDirectory, 'keen-dataviz/dist/keen-dataviz.css'));
  },

  isDevelopingAddon: function() {
    return true;
  }
};
