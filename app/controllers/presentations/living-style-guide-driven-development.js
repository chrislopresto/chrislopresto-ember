import Ember from 'ember';
import RevealPresentation from 'ember-reveal-js/controllers/reveal-presentation';

const { computed, inject } = Ember;

export default RevealPresentation.extend({
  emberFreestyle: inject.service(),
  showLabels: computed.alias('emberFreestyle.showLabels'),
  showNotes: computed.alias('emberFreestyle.showNotes'),
  showCode: computed.alias('emberFreestyle.showCode'),

  queryParams: ['f', 's', 'ss', 'm'],

  f: computed.alias('emberFreestyle.focus'),
  m: computed.alias('emberFreestyle.showMenu'),

  s: computed.alias('emberFreestyle.section'),
  ss: computed.alias('emberFreestyle.subsection'),

  monegraphPalette: computed.alias('emberFreestyle.monegraph-palette.MonegraphPalette'),
  monegraphPaletteColors: computed('monegraphPalette', function() {
    return Ember.A(
      Object.keys(this.get('monegraphPalette')).map((k) => {
        return this.get('monegraphPalette')[k];
      })
    );
  }),

  showExampleAnimationsHint: true,

  actions: {
    resetPulse() {
      this.toggleProperty('showExampleAnimationsHint');
      Ember.run.next(() => {
        this.toggleProperty('showExampleAnimationsHint');
      });
    }
  }
});
