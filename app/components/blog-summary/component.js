import Ember from 'ember';

const computed = Ember.computed;

export default Ember.Component.extend({
  showDetails: true,
  hasImage: computed.bool('article.mainImageSrc')
});
