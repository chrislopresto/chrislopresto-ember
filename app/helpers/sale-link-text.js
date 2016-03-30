import Ember from 'ember';

export function saleLinkText(params) {
  const [model] = params;
  const { lot_number, sale_name, sale_number } = model;
  let text = sale_name;
  if (sale_number && lot_number) {
    text = `${text} (Sale No. ${sale_number}, Lot No. ${lot_number})`;
  } else if (sale_number) {
    text = `${text} (Sale No. ${sale_number})`;
  } else if (lot_number) {
    text = `${text} (Lot No. ${lot_number})`;
  }
  return text;
}

export default Ember.Helper.helper(saleLinkText);
