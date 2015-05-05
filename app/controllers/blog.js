import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Controller.extend({
  articlesSortBy: ['publishedAt:desc'],
  articles: computed.sort('model', 'articlesSortBy')
});
