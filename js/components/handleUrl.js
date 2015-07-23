define([
    // 'esri/geometry/Point',

    'js/components/moveMap.js',

    'js/config.js',
    'js/globalFunctions.js'
  ],

  function(
    // Point,
    moveMap,
    config, gFunc) {

    return {

      checkCenterParams: function() {

        var paramLat = gFunc.getParameterByName('lat');
        var paramLng = gFunc.getParameterByName('long');
        // If coords supplied via param, zoom to them

        if (paramLng < -75 && paramLat > 35) {

          config.centerLat = paramLat;
          config.centerLng = paramLng;

          this.executeParams();
        }

      },

      executeParams: function() {
        setTimeout(function() {
          moveMap.zoomToCoords(config.centerLng, config.centerLat, 15);
        }, 4000);

        // // if getParameterByName('q') = 1 then call solar query here

        // if (gFunc.getParameterByName('q') === 1) {

        //   var pt = new Point(config.centerLng, config.centerLat);

        //   pixelQuery(pt);

        // }


      }
    };
  });