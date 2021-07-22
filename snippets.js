/*import '../ol/ol.css';
import Feature from '../ol/Feature';
import Geolocation from '../ol/Geolocation';
import Map from '../ol/Map';
import Point from '../ol/geom/Point';
import View from '../ol/View';
import {Circle as CircleStyle, Fill, Stroke, Style} from '../ol/style';
import {OSM, Vector as VectorSource} from '../ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from '../ol/layer';*/


/****************** GPS **************************/
var x = document.getElementById("p_geoloc");
var marker = null



function getAccel(){
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            console.log("accelerometer permission granted");
            // Do stuff here
            window.addEventListener('deviceorientation',(event) => {
                // Expose each orientation angle in a more readable way
            rotation_degrees = event.alpha;
            frontToBack_degrees = event.beta;
            leftToRight_degrees = event.gamma;
                
                // Update velocity according to how tilted the phone is
                // Since phones are narrower than they are long, double the increase to the x velocity
            vx = vx + leftToRight_degrees * updateRate*2; 
            vy = vy + frontToBack_degrees * updateRate;
                
                // Update position and clip it to bounds
            px = px + vx*.5;
            if (px > 98 || px < 0){ 
                px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
                vx = 0;
            }

            py = py + vy*.5;
            if (py > 98 || py < 0){
                py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
                vy = 0;
            }
                
            dot = document.getElementsByClassName("indicatorDot")[0]
            dot.setAttribute('style', "left:" + (px) + "%;" +
                                          "top:" + (py) + "%;");
            
        });
    }
});
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        geolocation.setTracking(this.checked);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}



function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
/******************************************************/
/****************** Beschleunigungssensoren **************************/
window.ondevicemotion = function(event) { 
	var ax = event.accelerationIncludingGravity.x
	var ay = event.accelerationIncludingGravity.y
	var az = event.accelerationIncludingGravity.z

	document.querySelector("#acc").innerHTML = "X = " + ax + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
}

window.addEventListener("deviceorientation", function(event) {
	document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma;
}, true);
/******************************************************/
/****************** Kamera **************************/














//getLocation()


var xCord = 51.441767;
var yCord = 5.470247;

/*if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
    geolocation.setTracking(this.checked);

} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
    xCord = position.coords.latitude;
    yCord = position.coords.longitude;
}*/



const map = L.map('map').setView([xCord, yCord], 15);
//const titleUrl = 'https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png';
const titleUrl = 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=XsJynJkerBUUQwNO3Uqx'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by coder\'s gyan';

const tiles = L.tileLayer(titleUrl,{attribution});
tiles.addTo(map);


var myId = 'abc';

var markers = {
    'def': L.marker([51.441767, 5.470247]).addTo(map),
    'ghi': L.marker([51.441767, 5.480247]).addTo(map),
    'jkl': L.marker([51.441767, 5.490247]).addTo(map)
}


/*map.locate({setView: true, watch: true})
        .on('locationfound', function(e){
            var marker = L.marker([e.latitude, e.longitude]).bindPopup('A sua localização');
            var circle = L.circle([e.latitude, e.longitude], e.accuracy/2, {
                weight: 1,
                color: 'blue',
                fillColor: '#cacaca',
                fillOpacity: 0.2
            });
            map.addLayer(marker);
            map.addLayer(circle);
        })
       .on('locationerror', function(e){
            console.log(e);
            alert("Location access denied.");
        })
        .on('loc')*/

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    
    //L.viewreset();

    if (markers.hasOwnProperty(myId)) {
        map.removeLayer(markers[myId]);
    }

    
    markers[myId] = L.marker(e.latlng).addTo(map);
    //L.circle(e.latlng, radius).addTo(map);



}
    

if (navigator.geolocation) {

    map.on('locationfound', onLocationFound);
    //map.locate({setView: true, watch: true, maxZoom: 8});
    map.locate({setView: true, watch: true});
} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}


map.on('locationfound', onLocationFound);
//map.locate({setView: true, watch: true, maxZoom: 8});
//map.locate({setView: true, watch: true});



/*var gl = L.mapboxGL({
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    style: 'https://api.maptiler.com/maps/bright/style.json?key=XsJynJkerBUUQwNO3Uqx'
    }).addTo(map);
//https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=XsJynJkerBUUQwNO3Uqx*/



// Reference to video element.
//var video = document.querySelector("#video");

// Ensure cross-browser functionality.
/**navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => video.srcObject = stream)
  .catch(e => document.querySelector('#camera').innerHTML = "<p>Kamera nicht benutzbar!</p>");**/

/******************************************************/
/***************** Toggle Visibility, Display None, Display Block ***********/
var togglevisibility = document.querySelector('#btn_visibility');
/* Klick Event Listener hinzufügen */
togglevisibility.addEventListener ('click',
    function() {           // anonyme Funktion
		btn = document.querySelector("#btn_visibility");
		snippets = document.querySelector("#snippets");
		if (btn.innerHTML == "Hide"){
			snippets.style.visibility="hidden";
			btn.innerHTML = "None";
		} else if(btn.innerHTML == "None"){
			snippets.style.display = "none";
			btn.innerHTML = "Show";
		} else{
			btn.innerHTML = "Hide";
			snippets.style.display = "grid";
			snippets.style.visibility = "visible";
		}
    }, 
    true);
/****************************************************************************/	