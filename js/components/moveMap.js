define([
    'esri/geometry/Point'
  ],

  function(
    Point
    ) {

    return {


      zoomToCoords: function(x, y, zoomLevel) {

        var pt = new Point(x, y);

        map.centerAndZoom(pt, zoomLevel);

        var evt = {};
        evt.mapPoint = pt;

        pixelQuery(evt);

      }
    }
  });