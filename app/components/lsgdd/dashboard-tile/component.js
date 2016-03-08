import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: ['DashboardTile'],
  color: 'teal',
  statSize: computed('stat', function() {
    let stat = this.get('stat');
    if (stat < 100000) {
      return 'large';
    } else if (stat < 100000000) {
      return 'medium';
    }
    return 'small';
  })
});
