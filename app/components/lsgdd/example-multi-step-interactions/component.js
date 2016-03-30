import Ember from 'ember';
import OfferComposition from '../../../lsgdd/models/offer-composition';

const EXAMPLE_OFFER_COMPOSITION = OfferComposition.create({
  contractType: 'sell',
  exclusivity: 'exclusive',
  classification: 'artwork',
  price: 25
});

export default Ember.Component.extend({
  mockOfferComposition: EXAMPLE_OFFER_COMPOSITION
});
