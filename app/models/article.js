import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  summary: DS.attr('string'),
  slug: DS.attr('string'),
  body: DS.attr('string'),
  status: DS.attr('string'),
  publishedAt: DS.attr('date'),
  tags: DS.attr()
});
