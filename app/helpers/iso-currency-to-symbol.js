import Ember from 'ember';
import { symbolForISO } from '../lsgdd/utils/value-converter';

export function isoCurrencyToSymbol(params) {
  const [isoCurrency] = params;
  return symbolForISO(isoCurrency);
}
export default Ember.Helper.helper(isoCurrencyToSymbol);
