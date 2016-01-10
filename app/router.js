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
  this.route('presentations', function() {
    this.route('ember-modal-dialog-intro');
    this.route('demo');
  });
  this.route('resume');
});

export default Router;
