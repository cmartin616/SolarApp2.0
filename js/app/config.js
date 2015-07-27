define(['esri/symbols/PictureMarkerSymbol'],

  function(PMS) {

    var basemapURL = 'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/'; //imagery basemap
    var imgDisplayURL = 'http://gis.uspatial.umn.edu/arcgis/rest/services/solar/mn_solar/ImageServer/';
      //var imgDisplayURL = 'http://us-dspatialgis.oit.umn.edu:6080/arcgis/rest/services/solar/Solar/ImageServer/';  //solar data for display
      //var imgDisplayURL = 'https://us-spatial-test.oit.umn.edu/arcgis/rest/services/MN_Solar/ImageServer/';  //solar data for display (NEW)
    var imgIdentifyURL = imgDisplayURL + 'identify'; //solar data for querying insolation
    var vectorDataURL = 'http://us-dspatialgis.oit.umn.edu:6080/arcgis/rest/services/solar/solar_fgdb/MapServer/';
    var bareEarthCountyURL = vectorDataURL + '1'; //vector layer for identifying counties with only bare earth lidar
    var eusaURL = vectorDataURL + '0'; //utility service providers vector layer

    var pinSymbol = new PMS({
      'angle': 0,
      'xoffset': 2,
      'yoffset': 8,
      'type': 'esriPMS',
      'url': 'http://static.arcgis.com/images/Symbols/Shapes/BluePin1LargeB.png',
      'contentType': 'image/png',
      'width': 30,
      'height': 30
    });


    return {
      
      applicationTitle: 'MN Solar Suitability Analysis App',
      apiKey: 'AIzaSyCI5rFXoNNM-IGDP-BZ1opjXTtB9wZalEI',

      // Esri Basemap Urls
      imagery: 'http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
      streets: 'http://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/',
      basemapUrl: basemapURL,

      // Esri defaults
      geometryService: 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer',

      // Solar data
      gpTool: 'http://us-dspatialgis.oit.umn.edu:6080/arcgis/rest/services/solar/SolarPointQuery_fast/GPServer/Script',

      /* Solar raster - query*/
      solarImageryUrl: 'http://gis.uspatial.umn.edu/arcgis/rest/services/solar/mn_solar/ImageServer/',
      imgIdentifyUrl: imgIdentifyURL,
      vectorDataUrl: vectorDataURL,
      bareEarthCountyUrl: bareEarthCountyURL,
      eusaUrl: eusaURL,

      centerLat: 44.971795,
      centerLng: -93.243322,
      defaultZoom: 13,
      queryZoom: 18,

      pinSymbol: pinSymbol

    };
  });