import Ember from 'ember';
import OfferFacetEditor from '../offer-facet-editor';

const { computed } = Ember;

export default OfferFacetEditor.extend({
  classNames: ['classification-editor'],
  facet: 'classification',
  options: Ember.A([{
      label: 'Artwork',
      value: 'artwork',
      description: 'For non-commercial use and personal enjoyment. Only the original author can sell editions of the work.'
    },{
      label: 'News Photo',
      value: 'news photo',
      description: 'For editorial, not commercial use'
    },{
      label: 'Product Image',
      value: 'product image',
      description: 'A more typical commercial rights-managed (RM) license'
    },{
      label: 'Snapshot',
      value: 'snapshot',
      description: 'A commercial agreement that gives virtually all rights over to the buyer'
    }
  ]),
  canChangeClassification: computed.readOnly('offerComposition.canAmendTitle'),
  initialChoiceIndex: computed('currentValue', function() {
    const options = this.get('options');
    let currentValue = this.get('currentValue');

    return options.map(function(o) { return o.value; }).indexOf(currentValue);
  }),

  actions: {
    update(value) {
      this.set('showClassificationList', true);

      this.sendAction('update', this.get('facet'), value);
    }
  }
});
