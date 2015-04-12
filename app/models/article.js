import Ember from 'ember';
import DS from 'ember-data';

var computed = Ember.computed;
var get = Ember.get;
var ARTICLE_SUMMARY_DELIMITER = '## ---';

export default DS.Model.extend({
  title: DS.attr('string'),
  slug: DS.attr('string'),
  body: DS.attr('string'),
  status: DS.attr('string'),
  publishedAt: DS.attr('date'),
  tags: DS.attr(),

  summary: computed('body', function() {
    return get(this, 'body').split(ARTICLE_SUMMARY_DELIMITER)[0].trim();
  }),

  displayBody: computed('body', function() {
    return get(this, 'body').replace(`${ARTICLE_SUMMARY_DELIMITER}\n`, '');
  })
});
