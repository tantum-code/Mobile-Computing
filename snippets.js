



//import * as papaparse from './papaparse.min.js';



/****************** GPS **************************/



let input = document.querySelector('input');
let textarea = document.querySelector('textarea');


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









var greenIcon = L.icon({
    iconUrl: 'loc.png',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [30, 30], // size of the icon
    //shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
    //shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});














//getLocation()

// Init position auf der Map

//48.585296339032574, 8.012315643345946
var xCord = 48.585296;
var yCord = 8.012315;

var globalVocabCounter = 0;


//var vocabs = fetch("https://github.com/tantum-code/Mobile-Computing/blob/main/hsk1.csv").then((r)=>{r.text().then((d)=>{let CONTENT = d})})

//var data = $.csv.toArrays(vocabs);



var vocs = '';

input.addEventListener('change', () => {
    let files = input.files;

    if(files.length == 0) return;

    const file = files[0];

    let reader = new FileReader();

    reader.onload = (e) => {
        const file = e.target.result;
        const lines = file.split(/\n|\n/);
        vocs = file;
        //var vocs = file;
        //textarea.value = lines.join('\n');


    };

    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);

    //prompt("jaja")



});




//alert("uff");













    



var rad = 200;

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
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Thomas Koch';

const tiles = L.tileLayer(titleUrl,{attribution});
tiles.addTo(map);



voccircle.addTo(map);



var myId = 'abc';

var markers = {
    'def': L.marker([51.441767, 5.470247]).addTo(map),
    'jkl': L.marker([51.441767, 5.490247]).addTo(map)
}
















function randomPoint(num) {

    var radrere = document.getElementById("myInput").value;

    var searchradiusrere = (radrere/111111);

    

    var r = searchradiusrere * Math.sqrt(Math.random());
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

    xCord = e.latlng[0];
    yCord = e.latlng[1];

    var pos = L.marker(e.latlng, {icon: greenIcon});

    pos.id = 'foo';

    markers[myId] = pos;

    pos.addTo(map);
    
    
    //var e = prompt("Ifff");

    //navigator.geolocation.getCurrentPosition(success, error);
    navigator.geolocation.getCurrentPosition.watchPosition(success, error);


}






var array;






function queryFeatures(currentPos, numResults) {

    // Each layer on the map will be checked

    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {

            //find the distance from the GPS coords to the next marker using pythagoras

            var diffX = Math.abs(currentPos[0] - layer.getLatLng().lat);
            var diffY = Math.abs(currentPos[1] - layer.getLatLng().lng);

            var diff = Math.sqrt((Math.pow(diffX,2)+Math.pow(diffY,2)))

            // The distance has to be converted from latlang to meters (roughly)

            var distance = diff * 111111

            // A marker within a distance of 10 meters has been found!
            if (distance <= 10) {
                if (layer.id === 'foo'){
                    // This is the player marker. Don't do anything here
                } else {
                    

                    /* selecting one of the vocabs from the CSV */

                    array = vocs.split(/\r\n|\n/);

                    var len = array.length;

                    var randPo = Math.floor( Math.random() * len) ;

                    while((randPo % 3) != 0){
                        randPo++;
                    }

                    /* Build the three vocab parts from the selected vocab */

                    var vocabulary = array[randPo];

                    var vocA = '';
                    var vocB = '';

                    var aCount = 0;

                    while(vocabulary[aCount] != ','){
                        vocA = vocA + vocabulary[aCount];
                        aCount++;
                    }

                    aCount++;

                    while(vocabulary[aCount] != ','){
                        vocB = vocB + vocabulary[aCount];
                        aCount++;
                    }

                    aCount++;

                    var vocC = vocabulary.slice(aCount);

                    /* Awaiting user input, evaluating and processing the user vocab */

                    var answer = prompt("A: __"  + " B: " +vocB+" C: "+ vocC);
                    
                    if(answer===vocA){
                        alert("Success!");
                        map.removeLayer(layer);


                        globalVocabCounter = globalVocabCounter - 1;

                        if (globalVocabCounter <= 0) {
                            alert("You did it!")
                        }



                    } else {
                        alert("Please try again!");
                    }
                }
            }
         }
    });
}




var entries = '';

function processData(allText) {
    var record_num = 3;  // or however many elements there are in each row
    var allTextLines = allText.split(/\r\n|\n/);
    //var entries = allTextLines[0].split(',');

    entries = allTextLines[0].split(',');
    var lines = [];

    var headings = entries.splice(0,record_num);
    while (entries.length>0) {
        var tarr = [];
        for (var j=0; j<record_num; j++) {
            tarr.push(headings[j]+":"+entries.shift());
        }
        lines.push(tarr);
    }
    //alert("yeeee");
}

    

function getLocation() {
    if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(showPosition, showError);
        //navigator.geolocation.getCurrentPosition.watchPosition(showPosition, showError);
        //geolocation.setTracking(this.checked);
        //navigator.geolocation.getCurrentPosition.watchPosition(showPosition);
        showPosition();
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}







/* Setup vocabs */

function showPosition() {

    
    //map.locate({setView: true, watch: true});

    processData(vocs);

    //prompt(vocs[5]);

    var amountVocs = 0;
    
    amountVocs = prompt("How many Vocabs do you want to chase?");

    globalVocabCounter = globalVocabCounter + amountVocs;



    var inputField = document.getElementById("myInput").value;

    if(isNaN(inputField)){
        alert("Radius input is not a Number!")
    }else{
        for (var i = 1; i <= amountVocs; i++) {
            randomPoint(i);
        }
    }
    
}


if (navigator.geolocation) {

    map.on('locationfound', onLocationFound);
    //map.locate({setView: true, watch: true, maxZoom: 8});
    map.locate({setView: true, watch: true});

    //prompt("Ifff");



} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}


map.on('locationfound', onLocationFound);
//map.locate({setView: true, watch: true, maxZoom: 8});
//map.locate({setView: true, watch: true});







/******************************************************/
/***************** Toggle Visibility, Display None, Display Block ***********/
var togglevisibility = document.querySelector('#btn_visibility');
/* Klick Event Listener hinzufügen */
togglevisibility.addEventListener ('click',
    function() {           // anonyme Funktion
		btn = document.querySelector("#btn_visibility");
		snippets = document.querySelector("#snippets");
		if (btn.innerHTML == "Hide Settings"){
			snippets.style.visibility="hidden";
			btn.innerHTML = "Show Settings";
            snippets.style.display = "none";
		/*} else if(btn.innerHTML == "None"){
			snippets.style.display = "none";
			btn.innerHTML = "Show";*/
		} else{
			btn.innerHTML = "Hide Settings";
			snippets.style.display = "grid";
			snippets.style.visibility = "visible";
		}
    }, 
    true);
/****************************************************************************/	