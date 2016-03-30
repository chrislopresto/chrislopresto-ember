import Ember from 'ember';
const { on, get, set } = Ember;

export default Ember.Component.extend({
  itemSelected: 'itemSelected',
  classNames: ['circle-list'],
  selectedIndex: 0,

  _initializeChoice: on('init', function() {
    this._isReadOnly = get(this, 'readOnly');
    const initialChoice = get(this, 'initialChoice') || 0;
    set(this, 'selectedIndex', initialChoice);
  }),

  click(evt) {
    if (!this._isReadOnly) {
      const tappedIndex = Ember.$(evt.target).closest('.circle').index();
      if (tappedIndex > -1 && tappedIndex !== get(this, 'disabledIndex')) {
        this._selectItem(tappedIndex, true);
      }
    }
  },

  touchStart(evt) { this.click(evt); },

  _selectItem(newSelectedIndex) {
    set(this, 'selectedIndex', newSelectedIndex);
    const value = get(get(this, 'items').objectAt(newSelectedIndex), 'value');
    this.sendAction('itemSelected', value);
  }
});
