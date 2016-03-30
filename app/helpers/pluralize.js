import Ember from 'ember';

export function pluralize(string, count) {
  if (count === 1) {
    return string;
  } else {
    return Ember.String.pluralize(string);
  }
}

function pluralizeHelper(params) {
  return pluralize(params[0], params[1]);
}

export default Ember.Helper.helper(pluralizeHelper);
