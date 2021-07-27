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

var te = 0

//import * as turf from '@turf/turf'



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

	document.querySelector("#acc").innerHTML = "X = " + te + "<br>" + "Y = " + ay + "<br>" + "Z = " + az;
}

window.addEventListener("deviceorientation", function(event) {
	document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma;
}, true);
/******************************************************/
/****************** Kamera **************************/
























//getLocation()

// Init position auf der Map

//48.585296339032574, 8.012315643345946
var xCord = 48.585296;
var yCord = 8.012315;









    



var rad = prompt("Radius Meter");

//Radius für das spielfeld
var searchradius = (rad/111111);

// Spielfeld Hinzufügen
var voccircle = L.circle([xCord, yCord], searchradius, {
    weight: 1,
    color: 'blue',
    fillColor: '#cacaca',
    fillOpacity: 0.2
});



function initPosition(e) {
    var radius = e.accuracy / 2;
    
    //L.viewreset();

    /*if (markers.hasOwnProperty(myId)) {
        map.removeLayer(markers[myId]);
    }*/

    
    //markers[myId] = L.marker(e.latlng).addTo(map);
    //L.circle(e.latlng, radius).addTo(map);

    var startcircle = L.circle([position.coords.latitude, position.coords.longitude], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: searchradius
    }).addTo(map);        

    // layersWithin(map, layers, latlng, radiusopt, nullable) → {Array.<object>}

    if (layersWithin(map,markers, e.latlng, 10) != null){
        te = 1;
    }


}








const map = L.map('map').setView([xCord, yCord], 15);
//const titleUrl = 'https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png';
const titleUrl = 'https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=XsJynJkerBUUQwNO3Uqx'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by coder\'s gyan';

const tiles = L.tileLayer(titleUrl,{attribution});
tiles.addTo(map);



voccircle.addTo(map);



var myId = 'abc';

var markers = {
    'def': L.marker([51.441767, 5.470247]).addTo(map),
    'ghi': L.marker([51.441767, 5.480247]).addTo(map),
    'jkl': L.marker([51.441767, 5.490247]).addTo(map)
}
















function randomPoint(num) {



    var r = searchradius * Math.sqrt(Math.random());
    var theta = Math.random() * 2 * Math.PI;

    var x = xCord + r * Math.cos(theta);
    var y = yCord + r * Math.sin(theta);

    var latlng = L.latLng(x, y);


    markers['vo'+num] = L.marker(latlng).addTo(map);
}





















function success(position) {
        
    //$body.addClass('loaded');
    
    var currentPos = [position.coords.latitude,position.coords.longitude];
    
    /*map.setView(currentPos, zoomLevel);

    var myLocation = L.marker(currentPos)
                        .addTo(map)
                        .bindTooltip("you are here")
                        .openTooltip();*/

    queryFeatures(currentPos, 5);
    
        
    /*$findNearest.fadeIn()
        .on('click', function(e) {
            
            $findNearest.fadeOut();
            
            $status.html('finding your nearest locations')
        
            queryFeatures(currentPos, 5);
        
            myLocation.unbindTooltip();
        
            
    });*/

}

function error() {
    alert("Unable to retrieve your location");
}
 










function onLocationFound(e) {
    var radius = e.accuracy / 2;
    
    //L.viewreset();

    if (markers.hasOwnProperty(myId)) {
        map.removeLayer(markers[myId]);
    }

    
    markers[myId] = L.marker(e.latlng).addTo(map);
    //L.circle(e.latlng, radius).addTo(map);



    // layersWithin(map, layers, latlng, radiusopt, nullable) → {Array.<object>}
    //success(e);
    
    
    //var e = prompt("Ifff");

    navigator.geolocation.getCurrentPosition(success, error);



    /*if (layersWithin(map,markers, e.latlng, 20) != null){
        te = 1;
    }*/






}

function queryFeatures(currentPos, numResults) {

    //var a = prompt("Niff");
    

    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {


            //111111
            //var b = prompt("Ra");

            var diffX = Math.abs(currentPos[0] - layer.getLatLng().lat);
            var diffY = Math.abs(currentPos[1] - layer.getLatLng().lng);

            var diff = Math.sqrt((Math.pow(diffX,2)+Math.pow(diffY,2)))


            

            var distance = diff * 111111

            //prompt("Dist" + distance);
            if (markers.hasOwnProperty(myId)){

            } else {
                if (distance <= 10) {

                

                    var c = prompt("Reeeee" + distance);
                // We found a marker at the target lat, lng
                }
            }



         }
    });

    //var d = prompt("End of");

}








    

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
        geolocation.setTracking(this.checked);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    xCord = position.coords.latitude;
    yCord = position.coords.longitude;

    map.locate({setView: true, watch: true});
    
    for (var i = 1; i <= 10; i++) {
        randomPoint(i)
    }
}


if (navigator.geolocation) {

    map.on('locationfound', onLocationFound);
    //map.locate({setView: true, watch: true, maxZoom: 8});
    map.locate({setView: true, watch: true, maxZoom: 8});

    //prompt("Ifff");

    //Aufruf nearness check
    //navigator.geolocation.getCurrentPosition(success, error);

    //map.on('locationfound', initPosition);


    //xCord = position.coords.latitude;
    //yCord = position.coords.longitude;

    /*for (var i = 1; i <= 10; i++) {
        randomPoint()
    }*/



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