import Ember from 'ember';

const { computed } = Ember;
const { readOnly, gt, and, not } = computed;

export default Ember.Mixin.create({
  offerComposition: null, // passed in

  isSelling: readOnly('offerComposition.isSelling'),
  isRegistering: readOnly('offerComposition.isRegistering'),
  isTransferring: readOnly('offerComposition.isTransferring'),
  allowRemix: readOnly('offerComposition.remix'),
  multipleMedia: gt('work.mediaCollection.length', 1),
  aggregateMedia: readOnly('offerComposition.aggregateMedia'),
  separateMedia: not('aggregateMedia'),
  multipleWorks: and('multipleMedia', 'separateMedia')
});
