console.log('locateme.js...');

var locate = function() {  

	console.log("locateme.js::locate()...");

	navigator.geolocation.getCurrentPosition(
		function(position){
			var latitude = position.coords.latitude;
			var longitude = position.coords.longitude;

			var url = 'https://maps.google.com/?q=' +
				latitude + ',' + longitude ;

			window.location = url;
		},
		function(err){
			// I don't think this is very loosely coupled,
			// if the API reaches into the browser DOM,
			// but that's just moi...
			document.getElementById('error').innerHTML = 'unable to get your location: ' + err;
		}
	);
};
