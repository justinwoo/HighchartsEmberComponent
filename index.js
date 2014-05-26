App = Ember.Application.create();

App.Router.map(function () {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function () {
    return ['red', 'yellow', 'blue'];
  }
});

App.IndexController = Ember.Controller.extend({
  showChart: true,
  selectedSeries: series,
  chartOptions: chartOptions,

  actions: {
    toggleChart: function () {
      this.toggleProperty("showChart");
    },

    swapSeries: function () {
      if (this.get('selectedSeries') === series) {
        this.set('selectedSeries', series2);
      } else {
        this.set('selectedSeries', series);
      }
    }
  }
});

App.ChartComponent = Ember.Component.extend({
  chartOptions: null,
  series: null,
  chartInstance: null,

  updateSeries: function () {
    // TODO: a better updateSeries
    this.initializeChart();
  },

  initializeChart: function () {
    var chart = this.get('chartOptions');
    chart.series = this.get('series');
    chart.chart = {
      renderTo: this.$('.chart').get(0)
    };
//     $('.chart').highcharts(chart);
    var chartInstance = new Highcharts.Chart(chart);
    this.set('chartInstance', chartInstance);
  },

  didInsertElement: function () {
    console.log('didInsertElement');
    this.initializeChart();
    this.addObserver('series', this, this.updateSeries);
  },

  willClearRender: function () {
    console.log('willClearRender');
  },

  willDestroyElement: function () {
    console.log('willDestroyElement');
    this.removeObserver('series');
    this.get('chartInstance').destroy();
  },

  willInsertElement: function () {
    console.log('willInsertElement');
  }
});
