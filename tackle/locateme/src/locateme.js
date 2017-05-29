var createURL = function(latitude, longitude){
	if( latitude === undefined || latitude === null 
			|| longitude === undefined || longitude === null
	)
	{
		return '';	
	}
	else {
		return 'http://maps.google.com?q=' + latitude + ',' + longitude;
	}

// Too naive.
// If we pass in latitude=0, longitude=0, we
// want 'http://maps.google.com?q=0,0'...
// this is a legitimate coordinate in the Gulf of Guinea
// between Angola and Liberia in West Africa... 
//	if( latitude && longitude ){
//		return 'http://maps.google.com?q=' + latitude + ',' + longitude;
//	}
//	else {
//		return '';
//	}

}; /* createUrl() */

// Note that the 'window' object is dependency-injected
// for loose coupling and for ease of testing via
// stubs...
var setLocation = function(window, url){
	window.location = url;
};

var locate = function(){
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

var onError = function(error){
	document.getElementById('error').innerHTML = error.message;
};

var onSuccess = function(position){
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var url = createURL(latitude, longitude);
	window.setLocation(window, url);
};
