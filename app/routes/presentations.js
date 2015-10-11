import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: 'Presentations',
  renderTemplate: function() {
    this.render('presentations');
  }
});
