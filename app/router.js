import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('music');
  this.route('technology');
  this.route('resume');
  this.route('blog', function() {
    this.route('article', { path: '/:slug' });
    this.route('archive');
  });
  this.route('styleguide');
  this.route('presentations', function() {
    this.route('demo');
    this.route('tacos');
  });
});

export default Router;
