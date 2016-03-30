import Ember from 'ember';
import OfferSentenceMixin from '../../../../lsgdd/mixins/offer-sentence';

export default Ember.Component.extend(OfferSentenceMixin, {
  classNames: ['offer-composition-overview'],

  sendActiveFacetAction: function(facet) {
    this.sendAction('setActiveFacet', facet);
  },

  actions: {
    setActiveFacet: function(facet) {
      Ember.run.debounce(this, 'sendActiveFacetAction', facet, 200, true);
    }
  }
});
