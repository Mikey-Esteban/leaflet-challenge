# Assigment 17 - Leaflet.js Geomapping

### Requirements:
* Javascript, HTML5
* Mapbox API Key
    * https://account.mapbox.com/access-tokens/

### Instructions:
* Before running the script, create a file titled "config.js" in "/static/js" directory.
    * Within config.js, add a line that says " var API_KEY = 'API KEY HERE' "
        * Within the quotations, replace "API KEY HERE" with your actual API Key for Mapbox
* After you have the requirements met, run index.html on a live server.
* The map should load automatically with all reported earthquakes within the last 7 days.
* When you click a marker, it will open a tooltip with expanded information on the incident.


### Versions:
#### Level 1:
* Located in Leaflet-Step-1
* Completed submission for assignment.
* Contains:
    * Working map with live data for earthquakes within a 7 day period.
    * Dynamic scaling for marker size and color based on earthquake intensity.
    * Legend that shows ranges for colors.
#### Level 2:
* Located in Leaflet-Step-2
* Completed submission for assignment.
* Contains:
    * Everything in Step 1 modified to be layers that can be turned on/off.
    * A faultline layer that shows the location of tectonic plates
        * Dataset for geojson is included in '/static/data/'
    * Multiple base layers for different views
        * Default base layer is satellite but can be changed in the logic.js

### Credit:
* Earthquake Data
    * https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
* Faultline Data
    * https://github.com/fraxen/tectonicplates
##### need to add your own config.js file (api key) in the static/js directory
* add var API_KEY = "(your own api key)"
