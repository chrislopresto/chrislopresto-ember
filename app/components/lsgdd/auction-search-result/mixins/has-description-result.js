import Ember from 'ember';

const {
  get,
  computed,
  Mixin
  } = Ember;

export default Mixin.create({
  description: computed('document.artwork_description.length', function() {
    const descriptions = get(this, 'document.artwork_description');
    return descriptions && descriptions[0];
  })
});
