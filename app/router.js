import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('site', { path: '' }, function() {
    this.route('music');
    this.route('technology');
    this.route('blog', function() {
      this.route('article', { path: '/:id' });
      this.route('archive');
    });
    this.route('talks');
  });
  this.route('styleguide');
  this.route('living-style-guide-driven-development-freestyle-guide');
  this.route('presentations', function() {
    this.route('ember-modal-dialog-intro');
    this.route('demo');
    this.route('code');
    this.route('living-style-guide-driven-development');
  });
  this.route('resume');
});

export default Router;
