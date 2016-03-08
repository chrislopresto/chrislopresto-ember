import OfferFacetEditor from '../offer-facet-editor';
import Ember from 'ember';
const { get, computed } = Ember;

export default OfferFacetEditor.extend({
  classNames: ['remix-editor'],
  facet: 'remix',
  remixChoices: [{
    label: 'Allow Remix',
    value: 'allowRemix'
  },{
    label: 'No Remix',
    value: 'noRemix',
    isProhibition: true
  }],

  allowRemix: computed.readOnly('offerComposition.remix'),
  initialChoiceIndex: computed('currentValue', function() {
    const allowRemix = get(this, 'currentValue');
    return allowRemix ? 0 : 1;
  }),

  actions: {
    itemSelected(value) {
      this.sendAction('update', get(this, 'facet'), value === 'allowRemix');
    }
  }
});
