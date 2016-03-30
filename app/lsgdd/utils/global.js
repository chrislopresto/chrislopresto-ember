import Ember from 'ember';
const {
  A
  } = Ember;

export const CURRENCIES = new A([
  { key: 'chf', label: 'CHF', sign: 'Fr' },
  { key: 'eur', label: 'EUR', sign: '€' },
  { key: 'gbp', label: 'GBP', sign: '£' },
  { key: 'hkd', label: 'HKD', sign: 'HK$' },
  { key: 'usd', label: 'USD', sign: '$' }
]);
