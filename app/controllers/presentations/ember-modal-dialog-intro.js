import Ember from 'ember';
import RevealPresentation from 'ember-reveal-js/controllers/reveal-presentation';

const { computed } = Ember;
const SLIDES_TO_SHOW_OUTSIDE_WORLD = new Ember.A(['1']);

export default RevealPresentation.extend({
  outsideWorldClass: computed('h', function() {
    if (SLIDES_TO_SHOW_OUTSIDE_WORLD.contains(this.get('h'))) {
      return 'the-outside-world-show';
    }
    return 'the-outside-world-hide';
  })
});
