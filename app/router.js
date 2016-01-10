import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('music');
  this.route('technology');
  this.route('resume');
  this.route('blog', function() {
    this.route('article', { path: '/:id' });
    this.route('archive');
  });
  this.route('styleguide');
  this.route('presentations', function() {
    this.route('demo');
  });
});

export default Router;
