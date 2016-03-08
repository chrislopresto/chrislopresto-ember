import Ember from 'ember';
import { EKMixin, keyUp } from 'ember-keyboard';

const { inject, on } = Ember;

export default Ember.Component.extend(EKMixin, {
  tagName: '',
  emberFreestyle: inject.service(),

  activateKeyboard: on('init', function() {
    this.set('keyboardActivated', true);
  }),

  onL: on(keyUp('ctrl+l'), function() {
    let emberFreestyle = this.get('emberFreestyle');
    emberFreestyle.toggleProperty('showLabels');
  }),

  onN: on(keyUp('ctrl+n'), function() {
    let emberFreestyle = this.get('emberFreestyle');
    emberFreestyle.toggleProperty('showNotes');
  }),

  onC: on(keyUp('ctrl+c'), function() {
    let emberFreestyle = this.get('emberFreestyle');
    emberFreestyle.toggleProperty('showCode');
  }),

});
