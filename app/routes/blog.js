import Ember from 'ember';
import Site from './site';

export default Site.extend({
  articleParser: Ember.inject.service(),
  titleToken: 'Blog',
  activate: function() {
    this.get('articleParser').createArticles();
  },
  model: function() {
    return this.store.all('article');
  }
});
