import OfferFacetEditor from '../offer-facet-editor';
import Ember from 'ember';
const { computed, get, set } = Ember;
const { gt, reads } = computed;

// Symbolic hack to prevent lofty numbers from colliding with the $ watermark
const PRICE_EDITOR_THRESHOLD_LONG = 99999;
const PRICE_EDITOR_MAX = 1000000;

export default OfferFacetEditor.extend({
  classNames: ['price-editor'],
  facet: 'price',
  inputValue: reads('currentValue'),
  long: gt('inputValue', PRICE_EDITOR_THRESHOLD_LONG),
  initialMax: null, // initialized
  sliderMax: reads('offerComposition.priceRange.max'),

  lastValidValue: null, // initialized

  init() {
    this._super(...arguments);
    let initialValue = get(this, 'offerComposition.price');
    set(this, 'lastValidValue', initialValue);
    let initialMax = get(this, 'offerComposition.priceRange.max');
    set(this, 'initialMax', initialMax);
  },

  inputChanged: Ember.observer('inputValue', function() {
    this.updateValue(false);
  }),

  updateValue(forceValidValue = true) {
    let value = get(this, 'inputValue');
    let isValidValue = Ember.isPresent(value) && value > 0 && value <= PRICE_EDITOR_MAX;
    if (isValidValue) {
      set(this, 'lastValidValue', value);
      this.sendAction('update', this.get('facet'), value);
    } else if (forceValidValue) {
      set(this, 'inputValue', get(this, 'lastValidValue'));
    }
  },

  actions: {
    didFocusPriceField() {
      let input = this.$('input.price-editor-input')[0];
      setTimeout(() => {
        input.select();
      }, 0);
    },
    didFocusOutPriceField() {
      this.updateValue();
    },
    priceFieldKeyUp() {
      let input = this.$('input.price-editor-input');
      if (Ember.isBlank(input.val())) {
        return;
      }
      let value = parseInt(get(this, 'inputValue'), 10);
      let isValidValue = Ember.isPresent(value) && value > 0 && value <= PRICE_EDITOR_MAX;
      if (!isValidValue) {
        this.updateValue();
        return false;
      }

      let original = get(this, 'initialMax');
      let candidate = parseInt(this.$('input.price-editor-input')[0].value, 10);
      set(this, 'sliderMax', Math.max(original, candidate));
      set(this, 'inputValue', candidate);
    },
    priceSliderChange(value) {
      set(this, 'inputValue', Math.round(value));
    }
  }
});
