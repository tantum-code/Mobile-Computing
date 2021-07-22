/****************** GPS **************************/
var x = document.getElementById("p_geoloc");

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
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;	
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

var video = L.map('video').setView([0,0],1);

L.titleLayer('https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=XsJynJkerBUUQwNO3Uqx',{attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'}).addTo(video);


//https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=XsJynJkerBUUQwNO3Uqx



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
