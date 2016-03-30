import Ember from 'ember';
import {
  labelForStatus
} from '../../../lsgdd/utils/value-converter';

const {
  computed,
  get,
  Component
  } = Ember;

export default Component.extend({
  saleStatus: computed('document.status', function() {
    const status = get(this, 'document.status');
    return labelForStatus(status);
  }),
  priceDiff: computed('document{estimate_low,estimate_high,price}', function() {
    const low = get(this, 'document.estimate_low');
    const high = get(this, 'document.estimate_high');
    const price = get(this, 'document.price');
    if (price && low && price < low) {
      return -parseInt((low - price) / low * 100, 10);
    }
    if (price && high && price > high) {
      return parseInt((price - high) / high * 100, 10);
    }
  })
});
