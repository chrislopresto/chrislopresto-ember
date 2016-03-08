import Ember from 'ember';
import { CURRENCIES } from '../../../../lsgdd/utils/global';
import {
  labelForStatus
} from '../../../../lsgdd/utils/value-converter';

const {
  get,
  computed,
  Component
  } = Ember;

export default Component.extend({
  saleStatus: computed('document.status', function() {
    const status = get(this, 'document.status');
    return labelForStatus(status);
  }),
  _soldCurrency: computed('soldCurrency', function() {
    const currency = get(this, 'soldCurrency');
    return CURRENCIES.findBy('key', currency ? currency[0] : 'usd');
  }),
  _estimationCurrency: computed('estimationCurrency', function() {
    const currency = get(this, 'estimationCurrency');
    return CURRENCIES.findBy('key', currency ? currency[0] : 'usd');
  }),
  calculatedPrice: computed('document{price_chf,price_eur,price_gbp,price_hkd,price_usd}', '_soldCurrency', function() {
    const currency = get(this, '_soldCurrency');
    return get(this, `document.price_${currency.key}`);
  }),
  calculatedEstimations: computed('document{estimate_high_chf,estimate_high_eur,estimate_high_gbp,estimate_high_hkd,estimate_high_usd,estimate_low,estimate_low_chf,estimate_low_eur,estimate_low_gbp,estimate_low_hkd,estimate_low_usd}', '_estimationCurrency', function() {
    const currency = get(this, '_estimationCurrency');
    return {
      low: get(this, `document.estimate_low_${currency.key}`),
      high: get(this, `document.estimate_high_${currency.key}`)
    };
  })
});
