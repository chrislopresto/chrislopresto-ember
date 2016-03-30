/* globals YappedKeen */
import Ember from 'ember';
// import config from 'dashboard/config/environment';
import moment from 'moment';
import hasChangedAttr from '../../../lsgdd/utils/has-changed-attr';
import { pluralize } from '../../../helpers/pluralize';

// const KEEN_PROJECT_ID = config.yappConfig.keenProjectId;
const KEEN_PROJECT_ID = 'FANCYFOO';

const { capitalize } = Ember.String;
const { computed, run, inject } = Ember;

function formatSeriesName(name) {
  return capitalize(name);
}

function hasMultipleSeries(dataset) {
  // matrix contains "Index" plus series name(s)
  return dataset.matrix[0].length > 2;
}

export default Ember.Component.extend({
  freestyle: inject.service('ember-freestyle'),
  classNames: ['KeenChart'],
  unit: computed.reads('dataSource.unit'),
  isEmpty: computed.readOnly('dataSource.isEmpty'),
  hasData: computed.not('isEmpty'),
  hasPartialData: computed.and('hasData', 'dataSource.timeframeStartsBeforeDataCollectionStarted'),
  height: 280,

  showingSpinner: true,
  allowExport: computed('isEmpty', 'showingSpinner', 'error', function() {
    let isEmpty = this.get('isEmpty');
    let showingSpinner = this.get('showingSpinner');
    let error = this.get('error');
    return !isEmpty && !showingSpinner && !error;
  }),
  // keenApiKey - passed in
  keenClient: computed('keenApiKey', function() {
    return new YappedKeen({
      projectId: KEEN_PROJECT_ID,
      readKey: this.get('keenApiKey')
    });
  }),

  didInsertElement() {
    this._super(...arguments);
    YappedKeen.ready(() => {
      this.prepareChart();
    });
  },

  didUpdateAttrs({newAttrs, oldAttrs}) {
    this._super(...arguments);

    if (hasChangedAttr(this, 'dataSource', newAttrs, oldAttrs)) {
      this.prepareChart();
    }
  },

  prepareChart() {
    this.get('chart').prepare(); // starts spinner
    this.set('showingSpinner', true);
    this.get('dataSource').fetch().then((dataset) => {
      this.renderChart(dataset);
    }).catch((err) => {
      console.error('keen-chart: error', err);
      this.set('error', err);
    }).finally(() => {
      this.set('showingSpinner', false);
    });
  },

  yappChartPalette: computed.alias('freestyle.yapp-chart-palette.YappChartPalette'),
  colors: computed('yappChartPalette', function() {
    let yappChartPalette = this.get('yappChartPalette');
    return Object.keys(yappChartPalette).map((k) => {
      return yappChartPalette[k].base;
    });
  }),
  theme: 'YappKeenChart',
  chartOptions: computed('chartType', 'unit', function(){
    let chartType = this.get('chartType');
    if (chartType === 'pie') {
      return {};
    } else {
      return {
        point: {
          r: 4
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {} // will be set once we have data
          }
        }
      };
    }
  }),
  stacked: false,

  chart: computed('title', 'chartType', 'colors', 'theme', 'chartOptions', 'height', function() {
    let title = this.get('title');
    let chartType = this.get('chartType');
    let chartOptions = this.get('chartOptions');
    let colors = this.get('colors');
    let theme = this.get('theme');
    let stacked = this.get('stacked');

    return new YappedKeen.Dataviz()
      .el(this.$('.js-KeenChart-placeholder')[0])
      .height(this.get('height'))
      .colors(colors)
      .title(title)
      .type(chartType)
      .theme(theme)
      .stacked(stacked)
      .chartOptions(chartOptions);
  }),

  getTickFormatFunction: function() {
    let timeZone = this.get('timeZone');
    let interval = this.get('dataSource.queryParameters.interval');
    if (interval === 'monthly') {
      return function(ms){
        let date = new Date(ms);
        return moment.tz(date, timeZone).format('MMM YYYY');
      };
    }
    else if (interval === 'weekly' || interval === 'daily') {
      return function(ms){
        let date = new Date(ms);
        return moment.tz(date, timeZone).format('MMM D');
      };
    }
    else if (interval === 'hourly') {
      return function(ms){
        var date = new Date(ms);
        let label = moment.tz(date, timeZone).format('ha');
        if (label === "12am") {
          return moment.tz(date, timeZone).format('MMM D');
        }
        return label;
      };
    }
  },

  configureTimeSeriesAxis(dataset) {
    let timeZone = this.get('timeZone');
    let chartOptions = this.get('chartOptions');
    let hourlyTickLabels = ["12am", "8am", "4am", "12pm", "8pm", "4pm"];
    if (dataset.matrix) {
      let matrix = dataset.matrix;
      if (this.get('dataSource.queryParameters.interval') === 'hourly') {
        let labelValues = matrix.filter((matrixEntry) => {
          if (matrixEntry[0] === "Index") {
            return false;
          }
          let label = moment.tz(matrixEntry[0], timeZone).format('ha');
          if (hourlyTickLabels.indexOf(label) !== -1) {
            return true;
          }
        }).map((matrixEntry) => {
          return moment.tz(matrixEntry[0], timeZone).toDate();
        });
        chartOptions.axis.x.tick.values = labelValues;
      } else {
        chartOptions.axis.x.tick.values = null;
      }
    } else {
      let results = dataset.result;
      if (this.get('dataSource.queryParameters.interval') === 'hourly') {
        let labelValues = results.filter(function(result) {
          let start = result.timeframe.start;
          let label = moment.tz(start, timeZone).format('ha');
          if (hourlyTickLabels.indexOf(label) !== -1) {
            return true;
          }
        }).map(function(result) {
          let start = result.timeframe.start;
          return moment.tz(start, timeZone).toDate();
        });
        chartOptions.axis.x.tick.values = labelValues;
      } else {
        chartOptions.axis.x.tick.values = null;
      }
    }
    chartOptions.axis.x.tick.format = this.getTickFormatFunction();
    this.get('chart').chartOptions(chartOptions);
  },

  configureLegend(dataset) {
    let chartOptions = this.get('chartOptions');
    let isPieChart = this.get('chartType') === 'pie';
    if (isPieChart || hasMultipleSeries(dataset)) {
      chartOptions.legend = { show: true };
    } else {
      chartOptions.legend = { show: false };
    }
    this.get('chart').chartOptions(chartOptions);
  },

  configureTooltip(dataset) {
    let timeZone = this.get('timeZone');
    let chartOptions = this.get('chartOptions');
    let chartType = this.get('chartType');
    let interval = this.get('dataSource.queryParameters.interval');
    let unit = this.get('unit');
    chartOptions.tooltip = {
      format: {
        title: function (d) {
          if (interval === 'hourly') {
            let m = moment.tz(d, timeZone);
            return `${m.format('MMM D h:mma')} - ${m.add(1, 'hour').format('h:mma')}`;
          }
          if (interval === 'daily') {
            return `${moment.tz(d, timeZone).format('MMM D, YYYY')}`;
          }
          if (interval === 'weekly') {
            return `Week of ${moment.tz(d, timeZone).format('MMM D, YYYY')}`;
          }
          if (interval === 'monthly') {
            return `${moment.tz(d, timeZone).format('MMMM YYYY')}`;
          }
        },
        name: function (name/*, ratio, id, index */) {
          return formatSeriesName(name);
        },
        value: function (value/*, ratio, id */) {
          if (chartType === 'pie') {
            unit = unit || 'Response';
            return `${value} ${pluralize(unit, value)}`;
          }
          if (hasMultipleSeries(dataset) && unit) {
            return `${value} ${pluralize(unit, value)}`;
          }
          return value;
        }
      }
    };
    this.get('chart').chartOptions(chartOptions);
  },

  formatLegendLabels(data) {
    if (!data.matrix) {
      return;
    }
    for(let i = 1; i < data.matrix[0].length; i++) {
      data.matrix[0][i] = formatSeriesName(data.matrix[0][i]);
    }
  },

  renderChart(dataset) {
    this.configureTooltip(dataset);
    this.configureLegend(dataset);
    let interval = this.get('dataSource.queryParameters.interval');
    if (interval) {
      this.configureTimeSeriesAxis(dataset);
    }

    this.set('error', null);
    this.formatLegendLabels(dataset);
    this.get('chart')
      .data(dataset)
      .render();

    this.set('updatedAt', new Date());

    let refreshInterval = this.get('refreshInterval');
    if (refreshInterval) {
      if (this._nextRefresh) {
        run.cancel(this._nextRefresh);
      }
      this._nextRefresh = run.later(this, this.prepareChart, refreshInterval * 1000);
    }
  },

  actions: {
    export() {
      let chart = this.get('chart');
      if (!chart || !chart.dataset || !chart.dataset.data()) { return; }

      this.sendAction('exportData', chart.dataset.data(), this.get('dataSource'), this.get('header'));
    },
    toggleShowPartialDataMessage() {
      this.toggleProperty('showPartialDataMessage');
      this.set('partialDataMessageTarget', this.element);
    }
  }
});
