import Ember from 'ember';
import moment from 'moment';
import InstallsDataSource from '../../../lsgdd/data-sources/installs';

const { computed } = Ember;

export default Ember.Component.extend({
  deviceInstallsFirstTime: computed('timeframe', function() {
    let performQuery = function() {
      return Ember.RSVP.resolve({"query":{"analysis_type":"count_unique","event_collection":"Opened Yapp","timeframe":{"start":"2016-02-23T05:00:00.000Z","end":"2016-02-25T04:59:59.999Z"},"interval":"hourly","target_property":"client_id","timezone":"UTC","filters":[{"operator":"eq","property_name":"first_time","property_value":true}]},"result":[{"value":7,"timeframe":{"start":"2016-02-23T05:00:00.000Z","end":"2016-02-23T06:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-23T06:00:00.000Z","end":"2016-02-23T07:00:00.000Z"}},{"value":8,"timeframe":{"start":"2016-02-23T07:00:00.000Z","end":"2016-02-23T08:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-23T08:00:00.000Z","end":"2016-02-23T09:00:00.000Z"}},{"value":5,"timeframe":{"start":"2016-02-23T09:00:00.000Z","end":"2016-02-23T10:00:00.000Z"}},{"value":5,"timeframe":{"start":"2016-02-23T10:00:00.000Z","end":"2016-02-23T11:00:00.000Z"}},{"value":11,"timeframe":{"start":"2016-02-23T11:00:00.000Z","end":"2016-02-23T12:00:00.000Z"}},{"value":5,"timeframe":{"start":"2016-02-23T12:00:00.000Z","end":"2016-02-23T13:00:00.000Z"}},{"value":10,"timeframe":{"start":"2016-02-23T13:00:00.000Z","end":"2016-02-23T14:00:00.000Z"}},{"value":6,"timeframe":{"start":"2016-02-23T14:00:00.000Z","end":"2016-02-23T15:00:00.000Z"}},{"value":9,"timeframe":{"start":"2016-02-23T15:00:00.000Z","end":"2016-02-23T16:00:00.000Z"}},{"value":7,"timeframe":{"start":"2016-02-23T16:00:00.000Z","end":"2016-02-23T17:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-23T17:00:00.000Z","end":"2016-02-23T18:00:00.000Z"}},{"value":3,"timeframe":{"start":"2016-02-23T18:00:00.000Z","end":"2016-02-23T19:00:00.000Z"}},{"value":7,"timeframe":{"start":"2016-02-23T19:00:00.000Z","end":"2016-02-23T20:00:00.000Z"}},{"value":12,"timeframe":{"start":"2016-02-23T20:00:00.000Z","end":"2016-02-23T21:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-23T21:00:00.000Z","end":"2016-02-23T22:00:00.000Z"}},{"value":5,"timeframe":{"start":"2016-02-23T22:00:00.000Z","end":"2016-02-23T23:00:00.000Z"}},{"value":3,"timeframe":{"start":"2016-02-23T23:00:00.000Z","end":"2016-02-24T00:00:00.000Z"}},{"value":6,"timeframe":{"start":"2016-02-24T00:00:00.000Z","end":"2016-02-24T01:00:00.000Z"}},{"value":5,"timeframe":{"start":"2016-02-24T01:00:00.000Z","end":"2016-02-24T02:00:00.000Z"}},{"value":2,"timeframe":{"start":"2016-02-24T02:00:00.000Z","end":"2016-02-24T03:00:00.000Z"}},{"value":7,"timeframe":{"start":"2016-02-24T03:00:00.000Z","end":"2016-02-24T04:00:00.000Z"}},{"value":6,"timeframe":{"start":"2016-02-24T04:00:00.000Z","end":"2016-02-24T05:00:00.000Z"}},{"value":8,"timeframe":{"start":"2016-02-24T05:00:00.000Z","end":"2016-02-24T06:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-24T06:00:00.000Z","end":"2016-02-24T07:00:00.000Z"}},{"value":6,"timeframe":{"start":"2016-02-24T07:00:00.000Z","end":"2016-02-24T08:00:00.000Z"}},{"value":6,"timeframe":{"start":"2016-02-24T08:00:00.000Z","end":"2016-02-24T09:00:00.000Z"}},{"value":7,"timeframe":{"start":"2016-02-24T09:00:00.000Z","end":"2016-02-24T10:00:00.000Z"}},{"value":7,"timeframe":{"start":"2016-02-24T10:00:00.000Z","end":"2016-02-24T11:00:00.000Z"}},{"value":10,"timeframe":{"start":"2016-02-24T11:00:00.000Z","end":"2016-02-24T12:00:00.000Z"}},{"value":8,"timeframe":{"start":"2016-02-24T12:00:00.000Z","end":"2016-02-24T13:00:00.000Z"}},{"value":5,"timeframe":{"start":"2016-02-24T13:00:00.000Z","end":"2016-02-24T14:00:00.000Z"}},{"value":6,"timeframe":{"start":"2016-02-24T14:00:00.000Z","end":"2016-02-24T15:00:00.000Z"}},{"value":9,"timeframe":{"start":"2016-02-24T15:00:00.000Z","end":"2016-02-24T16:00:00.000Z"}},{"value":3,"timeframe":{"start":"2016-02-24T16:00:00.000Z","end":"2016-02-24T17:00:00.000Z"}},{"value":8,"timeframe":{"start":"2016-02-24T17:00:00.000Z","end":"2016-02-24T18:00:00.000Z"}},{"value":3,"timeframe":{"start":"2016-02-24T18:00:00.000Z","end":"2016-02-24T19:00:00.000Z"}},{"value":13,"timeframe":{"start":"2016-02-24T19:00:00.000Z","end":"2016-02-24T20:00:00.000Z"}},{"value":10,"timeframe":{"start":"2016-02-24T20:00:00.000Z","end":"2016-02-24T21:00:00.000Z"}},{"value":6,"timeframe":{"start":"2016-02-24T21:00:00.000Z","end":"2016-02-24T22:00:00.000Z"}},{"value":8,"timeframe":{"start":"2016-02-24T22:00:00.000Z","end":"2016-02-24T23:00:00.000Z"}},{"value":5,"timeframe":{"start":"2016-02-24T23:00:00.000Z","end":"2016-02-25T00:00:00.000Z"}},{"value":8,"timeframe":{"start":"2016-02-25T00:00:00.000Z","end":"2016-02-25T01:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-25T01:00:00.000Z","end":"2016-02-25T02:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-25T02:00:00.000Z","end":"2016-02-25T03:00:00.000Z"}},{"value":3,"timeframe":{"start":"2016-02-25T03:00:00.000Z","end":"2016-02-25T04:00:00.000Z"}},{"value":4,"timeframe":{"start":"2016-02-25T04:00:00.000Z","end":"2016-02-25T04:59:59.999Z"}}]});
    };
    return InstallsDataSource.create({
      interval: 'hourly',
      performQuery
    });
  }),

  deviceInstallsFirstTimeNoData: computed(function() {
    let result = [];
    for (let i = 4; i >= 0; i--) {
      let start = moment.utc().subtract(i, 'days').startOf('day').format();
      let end = moment.utc().subtract(i, 'days').endOf('day').format();
      result.push({
        timeframe: { start, end },
        value: 0
      });
    }
    let queryResponse = {
      result,
      query: {}
    };
    let performQuery = function() {
      return Ember.RSVP.resolve(queryResponse);
    };
    return InstallsDataSource.create({
      interval: 'hourly',
      performQuery
    });
  }),

  waitingDataSource: computed('timeframe', function() {
    let performQuery = function() {
      return new Ember.RSVP.Promise(function() {});
    };
    return InstallsDataSource.create({
      interval: 'daily',
      unit: 'install',
      performQuery
    });
  })
});
