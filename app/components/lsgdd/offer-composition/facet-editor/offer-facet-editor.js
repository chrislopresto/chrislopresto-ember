import Ember from 'ember';

const { computed, defineProperty } = Ember;

export default Ember.Component.extend({
  classNames: ['facet-editor'],
  offerComposition: null, // passed in
  facet: null, // specified in subclasses

  init: function() {
    this._super();
    defineProperty(this, 'currentValue', computed(`offerComposition.${this.get('facet')}`, function() {
      return this.get(`offerComposition.${this.get('facet')}`);
    }));
  },

  actions: {
    update(value) {
      this.sendAction('update', this.get('facet'), value);
    },
    cancel() {
      this.sendAction('cancel');
    }
  }
});
