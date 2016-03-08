import Ember from 'ember';
import KeenDataSource from './keen';
import moment from 'moment';
const { computed } = Ember;

export default KeenDataSource.extend({
  timeZone: computed(function() {
    return moment.tz.guess();
  }),
  timeframe: null,
  firstColumnHeader: computed('interval', function() {
    let interval = this.get('interval');
    if (interval === "hourly") {
      return "Time";
    }
    return "Date";
  }),
  formatFirstColumnValue(value) {
    let timeZone = this.get('timeZone');
    if (this.get('interval') === 'hourly') {
      return moment.tz(value, timeZone).format("YYYY/MM/DD HH:mm");
    } else {
      return moment.tz(value, timeZone).format("YYYY/MM/DD");
    }
  },
  processKeenRow(row) {
    let result = [];

    row.forEach((item) => {
      result.push(item);
    });

    result[0] = this.formatFirstColumnValue(result[0]);

    return result;
  },
  processKeenMatrix(matrix) {
    let superMatrix = this._super(matrix);
    let resultMatrix = [];
    // start with i=1 because the first row is headers
    for(let i = 1; i < superMatrix.length; i++) {
      resultMatrix.push(this.processKeenRow(superMatrix[i]));
    }
    return resultMatrix;
  },
  emptyMessage: 'No data is available for the selected date range.',
  interval: computed('timeframe', function() {
    let timeframe = this.get('timeframe');
    if (!timeframe) {
      Ember.error('You must provide a timeframe to this time-series data-source', this);
    }
    let momentStart = moment.utc(timeframe.start);
    let momentEnd = moment.utc(timeframe.end);

    let durationMs = momentEnd.diff(momentStart);
    let duration = moment.duration(durationMs);
    let days = duration.asDays();

    if (days > 120) {
      return 'monthly';
    } else if (days > 35) {
      return 'weekly';
    } else if (days > 2) {
      return 'daily';
    }

    return 'hourly';
  })
});
