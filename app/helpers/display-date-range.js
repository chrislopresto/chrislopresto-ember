import Ember from 'ember';

export function displayDateRange(params) {
  const [start, end] = params;
  if (start && end) {
    return `${start}-${end}`;
  } else if (start) {
    return `from ${start}`;
  } else if (end) {
    return `to ${end}`;
  } else {
    return 'unknown';
  }
}

export default Ember.Helper.helper(displayDateRange);
