import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('site');
    this.render(this.routeName, { into: 'site' });
  }
});
