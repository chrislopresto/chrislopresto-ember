import Ember from 'ember';
import OfferFacetEditor from '../offer-facet-editor';

const { get, set, computed } = Ember;

export default OfferFacetEditor.extend({
  classNames: ['contract-type-editor'],
  facet: 'contractType',
  newWorkOptions: Ember.A(['sell', 'transfer', 'register']),
  existingWorkOptions: Ember.A(['sell', 'transfer', 'retain ownership of']),

  options: computed('offerComposition.isAlreadyRegistered', function() {
    const isAlreadyRegistered = get(this, 'offerComposition.isAlreadyRegistered');
    return isAlreadyRegistered ? get(this, 'existingWorkOptions') : get(this, 'newWorkOptions');
  }),

  updateClassification(contractType) {
    if (contractType === 'register' || contractType === 'retain ownership of') {
      set(this, 'offerComposition.classification', 'work');
    } else {
      const defaultClassification = get(this, 'offerComposition.defaultClassification');
      set(this, 'offerComposition.classification', defaultClassification);
    }
  },

  actions: {
    update(value) {
      this.updateClassification(value);
      this.sendAction('update', this.get('facet'), value);
    }
  }
});
