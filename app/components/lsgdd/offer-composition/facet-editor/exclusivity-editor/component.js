import Ember from 'ember';
import OfferFacetEditor from '../offer-facet-editor';
import { INFINITY } from '../../../exclusivity-slider/component';

const { observer, set, get, getWithDefault, computed } = Ember;
const defaultEditionSize = 2;

const EXCLUSIVE_INDEX = 0;
const LIMITED_INDEX = 1;
const UNLIMITED_INDEX = 2;
const EXCLUSIVITY_EDITOR_MAX = 1000;
const EXCLUSIVITY_EDITOR_MIN = 2;

export default OfferFacetEditor.extend({
  classNames: ['exclusivity-editor'],
  facet: 'exclusivity',
  exclusivityChoices: [{
    label: 'Exclusive',
    value: 'exclusive'
  },{
    label: 'Limited Edition',
    value: 'limited edition'
  },{
    label: 'Unlimited',
    value: 'unlimited'
  }],

  lastValidValue: null, // initialized

  init() {
    this._super(...arguments);
    const initialValue = get(this, 'offerComposition.exclusivity');
    if (initialValue) {
      const matches = initialValue.match(/\((\d+)\)/);
      const editionSize = matches && matches.length ? parseInt(matches[matches.length -1], 10) : defaultEditionSize;
      const previousEditionSize = get(this, 'offerComposition.previousEditionSize');
      set(this, 'editionSize', previousEditionSize || editionSize);
      set(this, 'lastValidValue', editionSize);
      set(this, 'selectedIndex', get(this, 'initialChoiceIndex'));
      this._renderSliderTips(editionSize);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    if (get(this, 'exclusivityType') === get(this, 'exclusivityChoices')[LIMITED_INDEX]['value']) {
      setTimeout(()=> {
        const input = this.$('.exclusivity-editor-input');
        input.focus();
      }, 500);
    }
  },

  inputChanged: observer('editionSize', function() {
    this.updateValue(false);
  }),

  whileSliding: observer('isSliding', function() {
    const isSliding = get(this, 'isSliding');
    const input = this.$('.exclusivity-editor-input');
    if (isSliding) {
      input.blur();
    } else {
      input.focus();
    }
  }),

  selectedIndexChanged: observer('selectedIndex', function() {
    const isSliding = get(this, 'isSliding');
    const input = this.$('.exclusivity-editor-input');
    if (input.length && get(this, 'selectedIndex') === LIMITED_INDEX && !isSliding) {
      input.focus();
    }
    if (!isSliding) {
      this._renderSliderTips();
    }
  }),

  updateValue(forceValidValue = true) {
    const selectedIndex = get(this, 'selectedIndex');
    if (selectedIndex !== LIMITED_INDEX) { return; }

    let value = get(this, 'editionSize');
    const valueStr = value + '';
    const isValidValue = Ember.isPresent(value) && value > 1 && value <= EXCLUSIVITY_EDITOR_MAX && valueStr.match(/^\d+$/);
    if (isValidValue) {
      set(this, 'lastValidValue', value);
      this.sendAction('update', get(this, 'facet'), `limited edition (${value})`);
    } else if (forceValidValue) {
      if (value < EXCLUSIVITY_EDITOR_MIN) {
        set(this, 'editionSize', EXCLUSIVITY_EDITOR_MIN);
      } else if (value > EXCLUSIVITY_EDITOR_MAX) {
        set(this, 'editionSize', EXCLUSIVITY_EDITOR_MAX);
      } else {
        set(this, 'editionSize', get(this, 'lastValidValue'));
      }
    }
  },

  exclusivity: computed.readOnly('offerComposition.exclusivity'),

  disabledIndex: computed('offerComposition.expressedSublicense', function() {
    const expressedSublicense = get(this, 'offerComposition.expressedSublicense');
    if (expressedSublicense === 'open') {
      return LIMITED_INDEX;
    } else if (expressedSublicense === 'limited') {
      return UNLIMITED_INDEX;
    }
  }),

  expressedSublicenseName: computed('offerComposition.expressedSublicense', function() {
    const expressedSublicense = get(this, 'offerComposition.expressedSublicense');
    if (expressedSublicense === 'open') {
      return get(this, 'exclusivityChoices')[UNLIMITED_INDEX]['value'];
    } else if (expressedSublicense === 'limited') {
      return get(this, 'exclusivityChoices')[LIMITED_INDEX]['value'];
    }
  }),

  exclusivityType: computed('exclusivity', function() {
    const exclusivity = get(this, 'exclusivity');
    const exclusive = get(this, 'exclusivityChoices')[EXCLUSIVE_INDEX]['value'];
    const limitedEdition = get(this, 'exclusivityChoices')[LIMITED_INDEX]['value'];
    const openEdition = get(this, 'exclusivityChoices')[UNLIMITED_INDEX]['value'];
    if (exclusivity.indexOf(exclusive) > -1) {
      return exclusive;
    } else if (exclusivity.indexOf(limitedEdition) > -1) {
      return limitedEdition;
    } else if (exclusivity.indexOf(openEdition) > -1 ){
      return openEdition;
    }
  }),

  sliderEditionSize: computed('editionSize', 'exclusivity', 'isSliding', function() {
    if(get(this, 'isSliding')) { return; }

    const exclusivity = get(this, 'exclusivity');
    const editionSize = parseInt(get(this, 'editionSize'), 10);
    if (exclusivity.indexOf(get(this, 'exclusivityChoices')[EXCLUSIVE_INDEX]['value']) > -1) {
      return 1;
    } else if (exclusivity.indexOf(get(this, 'exclusivityChoices')[UNLIMITED_INDEX]['value']) > -1) {
      return INFINITY;
    } else {
      return editionSize ? Math.min(editionSize, INFINITY - 1) : 2;
    }
  }),

  initialChoiceIndex: computed('currentValue', function() {
    const exclusivity = get(this, 'currentValue');
    const firstChoice = get(this, 'exclusivityChoices.firstObject.value');
    const lastChoice = get(this, 'exclusivityChoices.lastObject.value');

    if (exclusivity.indexOf(firstChoice) > -1) {
      return 0;
    } else if (exclusivity.indexOf(lastChoice) > -1) {
      return 2;
    }
    return 1;
  }),

  _renderSliderTips: function(editionSize) {
    const selectedIndex = get(this, 'selectedIndex');
    if (selectedIndex === EXCLUSIVE_INDEX || editionSize === 1) {
      set(this, 'raiseExclusiveTip', true);
      set(this, 'raiseUnlimitedTip', false);
    } else if (selectedIndex === UNLIMITED_INDEX || editionSize >= INFINITY) {
      set(this, 'raiseUnlimitedTip', true);
      set(this, 'raiseExclusiveTip', false);
    } else {
      // I'm trying to eliminate as many `set`s as possible using these guards so that the
      // slider action is smooth
      if (get(this, 'raiseExclusiveTip')) {
        set(this, 'raiseExclusiveTip', false);
      }
      if (get(this, 'raiseUnlimitedTip')) {
        set(this, 'raiseUnlimitedTip', false);
      }
    }
  },

  actions: {
    itemSelected(value) {
      if (value.indexOf(get(this, 'exclusivityChoices')[LIMITED_INDEX]['value']) > -1) {
        this.sendAction('update', get(this, 'facet'), value + ` (${getWithDefault(this, 'editionSize', defaultEditionSize)})`);
      } else {
        this.sendAction('update', get(this, 'facet'), value);
      }
    },

    exclusivitySliderHasChanged() {
      set(this, 'isSliding', false);
    },

    exclusivitySliderIsSliding(value) {
      set(this, 'isSliding', true);
      const editionSize = Math.round(value);
      this._renderSliderTips(editionSize);

      if (editionSize === 1) {
        set(this, 'selectedIndex', 0);
        this.sendAction('update', get(this, 'facet'), 'exclusive');
      } else if (editionSize === INFINITY) {
        this.sendAction('update', get(this, 'facet'), 'unlimited');
        set(this, 'selectedIndex', 2);
      } else {
        set(this, 'selectedIndex', 1);
        set(this, 'editionSize', editionSize);
      }
    },

    didFocusOutLimitedEditionField() {
      this.updateValue();
    }
  }
});
