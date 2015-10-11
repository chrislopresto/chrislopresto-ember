import Ember from 'ember';
import Site from '../site';

export default Site.extend({
  articleParser: Ember.inject.service(),
  titleToken(model) {
    return model.get('title');
  },
  beforeModel() {
    this.get('articleParser').createArticles();
  },
  model(params) {
    return this.store.all('article', { slug: params.slug }).get('firstObject');
  }
});
