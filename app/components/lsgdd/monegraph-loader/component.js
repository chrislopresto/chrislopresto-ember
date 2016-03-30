import Ember from 'ember';

const { computed } = Ember;
// const { htmlSafe } = Ember.String;

export default Ember.Component.extend({
  classNames: ['monegraph-loader'],

  duration: '1.0s',
  size: '32px',

  // iconStyle: computed('size', function() {
  //   let size = this.get('size');
  //   size = parseInt(size.replace('px', ''), 10);
  //   let fontSize = size / 7;
  //   return htmlSafe(`font-size: ${fontSize}px;`);
  // })

  iconSize: computed('size', function() {
    let size = this.get('size');
    size = parseInt(size.replace('px', ''), 10);
    let fontSize = size / 7;
    return `${fontSize}px`;
  })
});
