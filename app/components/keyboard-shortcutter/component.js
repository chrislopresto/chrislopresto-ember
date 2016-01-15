import Ember from 'ember';
import { EKMixin, keyUp } from 'ember-keyboard';

const { computed } = Ember;
const KEYBOARD_NAVIGATION_MODE_DURATION = 2;

export default Ember.Component.extend(EKMixin, {
  tagName: '',

  showCheatSheet: false,
  inKeyboardNavigationMode: computed('inKeyboardNavigationModeUntil', function() {
    return this.get('inKeyboardNavigationModeUntil') >= Date.now();
  }),

  activateKeyboard: Ember.on('init', function() {
    this.set('keyboardActivated', true);
  }),

  onG: Ember.on(keyUp('g'), function() {
    let d = new Date();
    this.set('inKeyboardNavigationModeUntil',
      d.setSeconds(d.getSeconds() + KEYBOARD_NAVIGATION_MODE_DURATION));
  }),

  onB: Ember.on(keyUp('b'), function() {
    this.handleNavigateTo('site.blog');
  }),

  onH: Ember.on(keyUp('h'), function() {
    this.handleNavigateTo('site.index');
  }),

  onT: Ember.on(keyUp('t'), function() {
    this.handleNavigateTo('site.talks');
  }),

  onQuestionMark: Ember.on(keyUp('shift+/'), function() {
    this.set('showCheatSheet', true);
  }),

  dismissCheatSheet: Ember.on(keyUp('Escape'), function() {
    this.set('showCheatSheet', false);
  }),

  handleNavigateTo: function(route) {
    if (!this.get('inKeyboardNavigationMode')) {
      return;
    }
    this.set('inKeyboardNavigationModeUntil', Date.now());
    Ember.getOwner(this).lookup('route:application').transitionTo(route);
  }
});
