/* global define, app, Backbone, _ */
define([
    'app/config',

    'components/report/views/resultsView',
    'components/report/controller/reportController',

    'esri/layers/ArcGISImageServiceLayer',
    // 'esri/layers/ImageServiceParameters',
    'esri/map',

    'dojo/text!../templates/reportTemplate.html'
  ],

  function(
    config,

    Results, reportController,

    ImageLayer, Map,

    reportTemplate

  ) {
    var report = Backbone.View.extend({

      events: {},

      initialize: function() {
        this.render();
      },

      render: function() {

        var template = _.template(reportTemplate);
        var options = {
          title: config.applicationTitle
        };

        this.$el.html(template(options));
        this.startup();
      },

      startup: function() {
        this.initComponents();
      },

      initComponents: function() {

        $('#siteName').on('keyup', function(){
          app.query.siteName = $(this).val();
        });

        $('#siteNotes').on('keyup', function(){
          app.query.siteNotes = $(this).val();
        });

        $('.downloadButton').on('click', function(){
          var doc = reportController.createPdf();
          reportController.saveToPdf(doc);
        });

        $('.printButton').on('click', function(){
          var doc = reportController.createPdf();
          reportController.printPdf(doc);
        });

        // results template
        this.results = new Results({
          el: $('.reportResults-container'),
        });

        // var solarMap = new Map('reportSolarMap-container', {
        //   basemap: 'solar',
        //   center: [app.query.point.x, app.query.point.y],
        //   showAttribution: false,
        //   zoom: 13
        //     // extent: new Extent(this.config.extent)
        // });

        // // var params = new ImageParams();

        // var solarLayer = new ImageLayer(config.solarImageryUrl, {
        //   id: 'solar',
        //   // imageServiceParameters: params,
        //   showAttribution: false,
        //   opacity: 1.0
        // });

        // // Add solar to the map
        // solarMap.addLayer(solarLayer);

        // var aerialMap = new Map('reportAerialMap-container', {
        //   basemap: 'hybrid',
        //   center: [config.centerLng, config.centerLat],
        //   showAttribution: false,
        //   zoom: 13
        //     // extent: new Extent(this.config.extent)
        // });

      },

    });
    return report;
  });