import Ember from 'ember';

const get = Ember.get;
const set = Ember.set;
const computed = Ember.computed;
const not = computed.not;

export default Ember.Component.extend({
  // hintService: Ember.inject.service('hint'),
  slug: null, // injected
  // showHints: computed.alias('hintService.showHints'),
  // seenHints: computed.alias('hintService.seenHints'),
  showHints: true,
  seenHints: Ember.A([]),
  seenThisHint: computed('seenHints.[]', 'slug', function() {
    var seenHints = this.get('seenHints');
    if (!seenHints) { // still loading
      return true;    // assume already seen until we get actual data
    }
    return seenHints.contains(this.get('slug'));
  }),
  hasNotSeenThisHint: not('seenThisHint'),

  // showCallout: computed.and('showHints', 'hasNotSeenThisHint'),
  // showHint: false,
  showCallout: true,
  showHint: true,

  classNames: ['hint-callout'],
  pulseFor: null, // injected
  isPulsing: true,
  'pulsing': computed.alias('isPulsing'),
  targetAttachment: 'middle right',
  attachment: 'top left',
  target: computed(function() {
    return `#${this.get('elementId')} .boundary`;
  }),
  title: null, // injected
  keepShowingHints: true,
  isOptingOut: not('keepShowingHints'),

  didInsertElement() {
    var pulseForSeconds;
    if (get(this, 'pulseFor')) {
      pulseForSeconds = get(this, 'pulseFor') * 1000;
    }
    if (pulseForSeconds) {
      Ember.run.later(() => {
        set(this, 'isPulsing', false);
      }, pulseForSeconds);
    }
  },

  click() {
    this.toggleProperty('showHint');
    Ember.run.next(() => {
      set(this, 'isPulsing', false);
    });
  },

  actions: {
    dismiss() {
      this.toggleProperty('showHint');
      // this.get('hintService').processHintInteraction(this.get('slug'), this.get('isOptingOut'));
    }
  }

});
