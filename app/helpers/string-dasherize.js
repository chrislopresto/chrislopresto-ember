import Ember from 'ember';

export function stringDasherize(params/*, hash*/) {
  return params.map((p) => {
    return Ember.String.dasherize(p);
  });
}

export default Ember.Helper.helper(stringDasherize);
