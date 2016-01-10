import Ember from 'ember';

export default Ember.Route.extend({
  articleParser: Ember.inject.service(),
  titleToken: 'Blog',
  activate: function() {
    this.get('articleParser').createArticles();
  },
  model: function() {
    return this.store.peekAll('article');
  }
});
