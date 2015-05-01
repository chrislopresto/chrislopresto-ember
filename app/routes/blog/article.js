import Ember from 'ember';
import Site from '../site';

export default Site.extend({
  articleParser: Ember.inject.service(),
  beforeModel: function() {
    this.get('articleParser').createArticles();
  },
  model: function(params) {
    return this.store.all('article', { slug: params.slug }).get('firstObject');
  }
});
