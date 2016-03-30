/* globals YappedKeen */
import Ember from 'ember';
import moment from 'moment';
import { pluralize } from '../../helpers/pluralize';
import _collection from 'lodash/collection';
// import config from 'dashboard/config/environment';

const { computed } = Ember;
// const KEEN_PROJECT_ID = config.yappConfig.keenProjectId;
const KEEN_PROJECT_ID = 'FANCYFOO';

const DATA_COLLECTION_PHASE_STARTS = {
  "phase0": new Date(2011, 5,  1), // beginning of Yapp time
  "phase1": new Date(2016, 1, 27)
};
export const DATA_COLLECTION_PHASE_1_STARTED_DATE = DATA_COLLECTION_PHASE_STARTS["phase1"];

export default Ember.Object.extend({
  keenApiKey: null,
  isEmpty: false, // set during parseData
  keenClient: computed('keenApiKey', function() {
    let keenApiKey = this.get('keenApiKey');
    if (!keenApiKey) {
      throw new Error('Attempted to construct keenClient without keenApiKey being set on data-source', this);
    }
    return new YappedKeen({
      projectId: KEEN_PROJECT_ID,
      readKey: this.get('keenApiKey')
    });
  }),
  emptyMessage: 'No data is available.',
  timeZone: new Date().getTimezoneOffset(),
  dataCollectionPhase: 0,
  timeframeStartsBeforeDataCollectionStarted: computed('timeframe', function() {
    let startDateThreshold = DATA_COLLECTION_PHASE_STARTS[`phase${this.get('dataCollectionPhase')}`];
    return moment(this.get('timeframe.start')).toDate() < startDateThreshold;
  }),
  firstColumnHeader: null, // overriden in subclasses
  formatFirstColumnValue(value) {
    return value;
  },
  processKeenMatrix(matrix) {
    matrix[0][0] = this.get('firstColumnHeader');
    return matrix;
  },
  fetch() {
    return this.performQuery().then((queryResponse) => {
      return this.parseData(queryResponse);
    });
  },

  performQuery() {
    let keenClient = this.get('keenClient');
    let queryType = this.get('queryType');
    let queryParameters = this.get('queryParameters');
    return keenClient.query(queryType, queryParameters);
  },

  parseData(queryResponse) {
    if (this.get('sortOrder')) {
      queryResponse.result = _collection.sortByOrder(queryResponse.result, ['result'], [this.get('sortOrder')]);
    }

    if (this.get('interval')) {
      return this.parseTimeSeriesData(queryResponse);
    } else {
      return this.parseGroupedMetricData(queryResponse);
    }
  },
  parseTimeSeriesData(queryResponse) {
    let dataset = new YappedKeen.Dataset();
    let groupByProperty;
    if (queryResponse.query.group_by) {
      groupByProperty = queryResponse.query.group_by[0];
    }
    let allEmpty = _collection.every(queryResponse.result, (record) => {
      if (record.value.forEach) {
        return record.value.length === 0;
      } else {
        return record.value === 0;
      }
    });
    if (allEmpty) {
      queryResponse.result.forEach((record) => {
        let index = moment(record.timeframe.start).format();
        dataset.set(['No Data', index], 0);
      });
    } else {
      queryResponse.result.forEach((record) => {
        let index = moment(record.timeframe.start).format();
        if (record.value.forEach) {
          record.value.forEach((group) => {
            // TODO: Clean up how this is lifted from parseGroupedInterval parser
            let labelKey = group[groupByProperty] || '';
            dataset.set([labelKey, index], group.result);
          });
        } else {
          // TODO: Clean up how this is lifted from parseInterval
          let labelText = pluralize(this.get('unit')) || 'Result';
          dataset.set([labelText, index], record.value);
        }
      });
    }
    this.set('isEmpty', allEmpty);
    return dataset;
  },
  parseGroupedMetricData(queryResponse) {
    let dataset = new YappedKeen.Dataset().type('grouped-metric');
    let unit = this.get('unit');
    let isEmpty = queryResponse.result.length === 0;
    if (isEmpty) {
      let labelText = pluralize(unit) || 'Result';
      dataset.set([labelText, 'No Data'], 0);
    } else {
      queryResponse.result.forEach((record) => {
        let label;
        Object.keys(record).forEach(function(key) {
          if (key !== 'result') {
            label = key;
          }
        });
        let labelText = pluralize(unit) || 'Result';
        dataset.set([labelText, String(record[label])], record.result);
      });
    }
    this.set('isEmpty', isEmpty);
    return dataset;
  }
});
