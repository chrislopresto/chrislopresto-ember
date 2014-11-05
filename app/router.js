import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('music');
  this.resource('technology');
  this.resource('resume');
});

export default Router;
