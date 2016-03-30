import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  size: 'normal',
  classNames: ['monegraph-button'],
  classNameBindings: ['size', 'color', 'waiting', 'inverse', 'purchased', 'transparent', 'noBorder', 'preview'],
  attributeBindings: ['disabled'],

  // click(){
  //   // I'm seeing buttons invoking this hook twice all over the place in mobile. I think Hammer might be resoponsible for this
  //   Ember.run.debounce(this, sendAction, 200, true);
  // }
});
