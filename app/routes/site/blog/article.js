import Ember from 'ember';

export default Ember.Route.extend({
  articleParser: Ember.inject.service(),
  titleToken(model) {
    return model.get('title');
  },
  beforeModel() {
    this.get('articleParser').createArticles();
  },
  model(params) {
    return this.store.peekRecord('article', params.id);
  }
});
