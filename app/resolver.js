import Ember from 'ember';
import Resolver from 'ember/resolver';

export default Resolver.extend({
  podBasedLookupWithPrefixWithName: function(podPrefix, parsedName) {
    var fullNameWithoutType = parsedName.fullNameWithoutType;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    return podPrefix + '/' + fullNameWithoutType + '/' + fullNameWithoutType + '-' + parsedName.type;
  },

  podBasedComponentsInSubdirWithName: function(parsedName) {
    var podPrefix = this.namespace.podModulePrefix || this.namespace.modulePrefix;
    podPrefix = podPrefix + '/components';

    if (parsedName.type === 'component' || parsedName.fullNameWithoutType.match(/^components/)) {
      return this.podBasedLookupWithPrefixWithName(podPrefix, parsedName);
    }
  },

  moduleNameLookupPatterns: Ember.computed(function(){
    var patterns = this._super();
    patterns.unshiftObject(this.podBasedComponentsInSubdirWithName);
    return patterns;
  })
});
