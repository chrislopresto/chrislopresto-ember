import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  emberFreestyle: inject.service(),

  emberConfPalette: computed.alias('emberFreestyle.ember-conf-palette.EmberConfPalette'),
  emberConfPaletteColors: computed('emberConfPalette', function() {
    return Ember.A(
      Object.keys(this.get('emberConfPalette')).map((k) => {
        return this.get('emberConfPalette')[k];
      })
    );
  })
});
