/* global define, app, Backbone, _ */
define([
    'app/config',
    'app/utils/draw',

    'dojo/text!../templates/navbarTemplate.html',

    'esri/geometry/Point',
    'esri/map',

    'esri/dijit/Geocoder'
  ],

  function(
    config, draw,

    viewTemplate,

    Point, Map,

    Geocoder

  ) {
    var Navbar = Backbone.View.extend({

      events: {},

      initialize: function() {
        this.render();
      },

      render: function() {

        var template = _.template(viewTemplate);
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
        // Home button
        $('#homeButton').on('click', function() {
          app.map.centerAndZoom(new Point([config.centerLng, config.centerLat]), config.defaultZoom);
        });

        // Find Me button       
        $('#currentLoc').click(function() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(zoomToLocation, locationError);
          } else {
            alert('Browser doesn\'t support Geolocation.  Visit http: //caniuse.com to see browser support for the Geolocation API.');
          }
        });

        function locationError(error) {
          //error occurred so stop watchPosition
          if (navigator.geolocation) {
            navigator.geolocation.clearWatch(watchId);
          }
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Location not provided');
              break;

            case error.POSITION_UNAVAILABLE:
              alert('Current location not available');
              break;

            case error.TIMEOUT:
              alert('Timeout');
              break;

            default:
              alert('unknown error');
              break;
          }
        }

        // Zoom to current location
        function zoomToLocation(location) {
          var pt = new Point(location.coords.longitude, location.coords.latitude);
          app.map.centerAndZoom(pt, config.queryZoom);
          draw.addGraphic(pt);
          // var evt = {};
          // pixelQuery(evt);
        }

        // Geolocator
        // ---------------------------------------------------
        var geocoder = new Geocoder({
          map: app.map,
          autoComplete: true,
          autoNavigate: true,
          arcgisGeocoder: {
            name: 'Esri World Geocoder',
            placeholder: 'Search'
          },
          highlightLocation: true,
        },'searchBar');
        geocoder.startup();
        // var geocoder;
        // $('#searchBar').keypress(function(e) {
        //   //Autocomplete variables
        //   var input = document.getElementById('searchBar');
        //   var place;
        //   var autocomplete = new google.maps.places.Autocomplete(input);

        //   //Add listener to detect autocomplete selection
        //   google.maps.event.addListener(autocomplete, 'place_changed', function() {
        //     place = autocomplete.getPlace();
        //     autocompleteLng = place.geometry.location.lng();
        //     autocompleteLat = place.geometry.location.lat();
        //     var pt = new Point(autocompleteLng, autocompleteLat);
        //     app.map.centerAndZoom(pt, config.queryZoom);
        //     draw.addGraphic(pt);
        //   });

        //   //Reset the inpout box on click
        //   input.addEventListener('click', function() {
        //     input.value = "";
        //   });

        //   // Go to address if 'enter' is pressed
        //   if (e.which == 13) {
        //     codeAddress();
        //   }
        // });

        // // Click Go on search bar
        // $('#searchGo').on('click', function() {
        //   codeAddress();
        // });

        // function codeAddress() {
        //   console.log('codeAddress');
        //   swBounds = new google.maps.LatLng({
        //     lat: 42,
        //     lng: -95
        //   });
        //   neBounds = new google.maps.LatLng({
        //     lat: 46,
        //     lng: -91
        //   });
        //   extent = new google.maps.LatLngBounds(swBounds, neBounds);

        //   geocoder = new google.maps.Geocoder();
        //   var address = document.getElementById("searchBar").value;
        //   geocoder.geocode({
        //     'address': address,
        //     'bounds': extent
        //   }, function(results, status) {
        //     // if (status == google.maps.GeocoderStatus.OK) {
        //     //   geocodeLong = results[0].geometry.location.lng();
        //     //   geocodeLat = results[0].geometry.location.lat();
        //     //   var pt = new Point(geocodeLong, geocodeLat);
        //     //   map.centerAndZoom(pt, 18);
        //     //   addGraphic(pt);
        //     //   console.log(results);

        //     //   // call bare earth query to check in-state status
        //     //   beQuery(pt);
        //     // } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
        //     //   alert('No addresses were found.')
        //     // } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        //     //   alert('Over query limit (2,500/mo). Please donate or wait till next month.');

        //     // } else {
        //     //   alert("Geocode was not successful for the following reason: " + status);
        //     // }
        //   });
        // }

      }
    });
    return Navbar;
  });