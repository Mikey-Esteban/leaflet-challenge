// Function to determine marker size based on population
function markerSize(magnitude) {
  return magnitude*15000;
}


// Set up color choice function
function markerColor(magnitude) {
  if (magnitude < 1) {
    return "lightgreen";
  }
  else if (magnitude < 2) {
    return "greenyellow";
  }
  else if (magnitude < 3) {
    return "yellow";
  }
  else if (magnitude < 4) {
    return "gold";
  }
  else if (magnitude < 5) {
    return "orange";
  }
  else {
    return "crimson";
  }
}

// This will be run when L.geoJSON creates the point layer from the GeoJSON data.
function createCircleMarker( feature, latlng ){
  // Change the values of these options to change the symbol's appearance
  let options = {
    radius: markerSize(feature.properties.mag),
    fillColor: markerColor(feature.properties.mag),
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }
  // are we using circle or circleMarker function
  return L.circle( latlng, options );
}

// url to grab earthquake data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// perform a d3 get request to the url
d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
})

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
      <h3>Magnitude: ${feature.properties.mag}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: createCircleMarker
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define graymap, streetmap and darkmap layers
  var graymap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
  	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
  	maxZoom: 18
  });

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Gray Map": graymap,
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var map = L.map("map-id", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [graymap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        limits = [0, 1, 2, 3, 4, 5],
        colors = ["lightgreen","greenyellow","yellow","gold","orange","crimson"],
        labels = [];

    // Add min & max
    var legendInfo = "<h1>Magnitude</h1>";

     div.innerHTML = legendInfo;

     limits.forEach(function(limit, index) {
       labels.push(`<li style=\"background-color:${colors[index]}\">${limits[index] + (limits[index + 1] ? ' &ndash; ' + limits[index + 1] + '<br>' : '+')}</li>`);
     });

     div.innerHTML += "<ul>" + labels.join("") + "</ul>";

     return div;
   };
   legend.addTo(map);
}
