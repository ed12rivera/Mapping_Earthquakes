// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});
// Create the street view tile layer that will be an option for the map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

// Pass the map layers into the layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);
    
// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/ed12rivera/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
    color: "#fffa1",
    weight: 1
}

// Grab the GeoJSON data.
d3.json(torontoHoods).then(function(data) {
    console.log(data, {
        style: myStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Neighborhood: </h3>")
        }
    });
    // Creating a GeoJSON layer with the retrieved data.
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place + "</h3>")
    // };
    L.geoJSON(data).addTo(map);
        // style: myStyle,
});




