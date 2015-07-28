/* global define, app, Backbone, _ */
define([
    'app/config',

    'components/report/controller/reportController',
    'components/calculator/controller/calculatorController',

    'dojo/text!../templates/resultsSmallTemplate.html'
  ],

  function(
    config,

    reportController, calculatorController,

    viewTemplate

  ) {
    var resultsSmall = Backbone.View.extend({

      events: {},

      initialize: function() {
        this.render();
      },

      render: function() {
        var template = _.template(viewTemplate);

        /* Options are model variables accessible from html templates */
        var options = {
          emailAddress: config.emailAddress,
          emailSubject: 'Testing',
          emailBody: 'Still testing'
        };

        this.$el.html(template(options));
        this.$el.hide();
        this.startup();
      },

      startup: function() {
        this.initComponents();
      },

      initComponents: function() {
        // Initalize event to close results with close X div
        $('#closeResults').on('click',function(){
          $('#resultsSmall').hide();
        });

        // Initalize event to toggle results with results ^ div
        $('#resultsButton').on('click', function(){
          $('#resultsSmall').toggle();
        });

        $('#calculateButton').on('click', function(){
          calculatorController.toggleCalculator();
        });

        $('#viewReport').on('click', function(){
          reportController.buildReport();
          $('#reportModal').modal('show');
        });

        // Old methods for report/email
        // $('#viewReportLink').html('<a class="fancybox fancybox.iframe" href="' + resultsiFrameURL + '&m=' + JSON.stringify(data) + '">View Report</a>');
        // $('#emailReportLink').html('<a href="http://solar.maps.umn.edu/share_point.php?x=' + params.PointX + '&y=' + params.PointY + '">Email Report</a>');
      }

    });
    return resultsSmall;
  });