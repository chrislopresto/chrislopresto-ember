import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('music');
  this.route('technology');
  this.route('resume');
  this.route('blog');
  this.route('styleguide');
});

export default Router;
