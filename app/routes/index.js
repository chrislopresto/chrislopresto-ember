import Ember from 'ember';

var IndexRoute = Ember.Route.extend({
  model: function() {
    return ['music', 'technology'];
  }
});

export default IndexRoute;
