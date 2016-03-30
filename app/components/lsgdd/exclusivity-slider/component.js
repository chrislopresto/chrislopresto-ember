import RangeSlider from 'ember-cli-nouislider/components/range-slider';

export const MAX_LIMITED_EDITION_SLIDER_VALUE = 25;
export const INFINITY = MAX_LIMITED_EDITION_SLIDER_VALUE + 1; // lol

export default RangeSlider.extend({
  classNames: ['exclusivity-slider'],
  start: 1,
  range: {
    min: 1,
    max: INFINITY
  },
  animate: false, // avoids lag while dragging handle
});
