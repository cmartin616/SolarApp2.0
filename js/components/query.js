define([],

  function() {

    return {

      pixelQuery: function() {
        function pixelQuery(e) {


          var mp = esri.geometry.webMercatorToGeographic(e.mapPoint);

          // Clear results div
          $('#results').html('');

          //setup insolation query
          var query = new Query();
          var queryTask = new QueryTask(imgIdentifyURL);
          query.geometry = e.mapPoint;
          query.geometryType = 'esriGeometryPoint';
          query.mosaicRule = '';
          query.sr = 102100;
          query.imageDisplay = 1;
          query.tolerance = 1;
          query.returnGeometry = false;
          query.returnZ = false;
          query.returnM = false;
          query.f = 'pjson';

          //setup bare earth county layer query
          var BEquery = new Query();
          var BEQueryTask = new QueryTask(bareEarthCountyURL);
          BEquery.geometry = e.mapPoint;
          BEquery.geometryType = 'esriGeometryPoint';
          BEquery.outFields = ['bare_earth', 'COUNTYNAME'];
          BEquery.spatialRelationship = query.SPATIAL_REL_INTERSECTS;
          BEquery.mosaicRule = '';
          BEquery.sr = 102100;
          BEquery.imageDisplay = 1;
          BEquery.tolerance = 1;
          BEquery.returnGeometry = false;
          BEquery.returnZ = false;
          BEquery.returnM = false;
          BEquery.f = 'pjson';

          BEQueryTask.execute(BEquery, function(results) {

            //first make sure clicked point is within the state
            if (results.features && results.features.length > 0) {

              bareEarth = results.features[0].attributes["bare_earth"];
              county = results.features[0].attributes["COUNTYNAME"];

              //then check if clicked point is within a bare earth county, if so add disclaimer
              if (bareEarth === 1) {
                var warning = "**";
                var warningMsg = "<p>**<span id='smText'>The lidar data available for " + county + " County includes only bare earth points. Hence, this insolation value does not take shade from nearby surface features into consideration.</span></p>";

                if (county == "Pine") {
                  var warningMsg = "<p>**<span id='smText'>The lidar data available for " + county + " County was inconsistently classified across different flight lines. Hence, insolation accuracy is variable as shade from nearby surface features may not be taken into consideration.</span></p>";
                }

              } else {
                var warning = "";
                var warningMsg = "";
              }

              queryTask.execute(query, function(results) {

                var val = results.value;
                var v = val / 1000 / 365;
                var y = val / 1000;
                var quality = 0;
                switch (true) {
                  case (v > 2.7):
                    quality = "Optimal";
                    break;
                  case (v < 1.7):
                    quality = "Poor";
                    break;
                  default:
                    quality = "Good";
                    break;
                }

                var result = '<div><strong>INSOLATION (kWh/m<sup>2</sup>)</strong></div><div class="resultsDisplay" style="display:block">Total per Year: ' + y.toFixed(2) + warning + '<br>Avg per Day: ' + v.toFixed(2) + ' <div class="valueHelp" style="display:inline-block;">(' + quality + ')</div>' + warning + warningMsg + '</div>';

                // <div id="questionMark"><img src="/assets/img/help.png" style = "width:20px; height:20px; display:inline"></div>

                $("#results").html(result);

                //setup Utility Service Provider query
                var query = new Query();
                var queryTask = new QueryTask(eusaURL);
                query.geometry = e.mapPoint;
                query.geometryType = "esriGeometryPoint";
                query.outFields = ["*"];
                query.spatialRelationship = query.SPATIAL_REL_INTERSECTS;
                query.mosaicRule = "";
                query.sr = 102100;
                query.imageDisplay = 1;
                query.tolerance = 1;
                query.returnGeometry = false;
                query.returnZ = false;
                query.returnM = false;
                query.f = "pjson";

                queryTask.execute(query, function(results) {

                  fullname = results.features[0].attributes["FULL_NAME"];
                  city = results.features[0].attributes["CITY"];
                  street = results.features[0].attributes["STREET"];
                  phone = results.features[0].attributes["PHONE"];
                  website = results.features[0].attributes["WEBSITE"];
                  elec_comp = results.features[0].attributes["ELEC_COMP"];
                  zip = results.features[0].attributes["ZIP"];

                  var utility = encodeURIComponent(fullname + "_" + street + "_" + city + ", MN " + zip + "_" + phone);

                  if (quality == "Poor") {
                    var getstarted = "<p>Location not optimal? Check out:<br /><a href='http://mncerts.org/solargardens' target='_blank'>Community Solar Gardens</a></p>";
                  } else {
                    var getstarted = "<p>Get Started: <a href='http://thecleanenergybuilder.com/directory#resultsType=both&page=0&pageNum=25&order=alphaTitle&proximityNum=60&proximityInput=" + zip + "&textInput=&textSearchTitle=1&textSearchDescription=1&field_established=&field_employees=&field_year=&reload=false&mapSize=large&allResults=false&tids2=&tids3=568&tids4=&tids5=&tids6=' target='_blank'>Contact a Local Installer</a></p>";
                  }

                  var result = '<div style="margin-top:5px;"><strong>UTILITY SERVICE PROVIDER</strong></div><div class="resultsDisplay">' + fullname + ' - <a href="tel:+1-' + phone.slice(1, 4) + '-' + phone.slice(6, 14) + '">' + phone + '</a></p>';
                  var result = result + "</p><p><a href='http://www.dsireusa.org/solar/incentives/index.cfm?re=1&ee=1&spv=1&st=0&srp=0&state=MN' target='_blank'>MN Incentives/Policies for Solar</a></p>" + getstarted + "<p>Report bad data <a href='/bad_data_handler.php?x=" + mp.x + "&y=" + mp.y + "' target='_blank'>here</a>.</p>";


                  document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + result;
                  //console.log(e.mapPoint);
                  point = webMercatorUtils.webMercatorToGeographic(e.mapPoint);
                  resultsiFrameURL = "/report.php?z=" + zip + "&w=" + website + "&long=" + point['x'] + "&lat=" + point['y'] + "&y=" + y.toFixed(2) + "&u=" + utility;
                  //console.log(resultsiFrameURL);
                });
              });


            } else {
              // clicked point is outside of the state
              var result = "<H3><strong>INSOLATION (kWh/m<sup>2</sup>)</strong></H3><p>Total per Year: Unknown**<br />Avg per Day: Unknown**</p><p>**<span id='smText'>This point is out of the study area. Click within the State of Minnesota or try searching for something like 'Target Field'.</span></p><span class='closeSplash'>(X) CLOSE</span> </p>";
              alert("This location is outside of the study area. Please refine your search to be limited to the state of Minnesota.");
            }

          });

          // removes all previous graphics (previous click)
          map.graphics.clear();

          //  This sets a new graphic using the clicked point and the symbol
          var point = e.mapPoint;
          var graphic = new Graphic(point, pinSymbol);
          map.graphics.add(graphic);

          // Store point lat/long
          ptLong = e.mapPoint.y
          ptLat = e.mapPoint.x

        };


      }
    }
  });