import Ember from 'ember';
import TimeSeriesDataSource from './time-series';
const { computed } = Ember;

export default TimeSeriesDataSource.extend({
  queryType: 'count_unique',
  unit: 'install',
  emptyMessage: 'There were no installs during the selected date range.',
  queryParameters: computed('timeframe', 'interval', function(){
    return {
      event_collection: 'Opened Yapp',
      timeframe: this.get('timeframe'),
      interval: this.get('interval'),
      target_property: 'client_id',
      filters: [{
        "operator": "eq",
        "property_name": "first_time",
        "property_value": true
      }]
    };
  })
});
