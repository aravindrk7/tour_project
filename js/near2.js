var map;
var clk=0;
var lt;
var lg;
var output;
//initialize Map
var dirA=[];
var dirB=[];
var ind=0;
var cont=[];
var obj;
var con=[];
var x=0;
var y=0;
var array=[];
var a =[] ,b=[];
function initMap()
{
    map = new google.maps.Map(document.getElementById('map'),
    {


    	center: {lat: 13.08, lng: 80.24330000},
    	zoom: 10,
    	minZoom:4	
	});


// add marker

}
function nearby()
{
	var infowindow;
	var marker;
	var service;
  var lati;
  var longi;
  var place = document.getElementById('slt').value;
  var type = document.getElementById('type').value; 
  console.log(type);
  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    params:{
      address:place,
      key:'AIzaSyAcMJESCDRMdbDsKR161tiQfXIu_R4y-pM'
    }
  })
  .then(function(response){
    output=response;
     lati =output.data.results[0].geometry.location.lat;
    longi=output.data.results[0].geometry.location.lng;
    

console.log(place);
  var pyrmont = new google.maps.LatLng(lati,longi);
  var request = {
    location: pyrmont,
    lat:lati,
    lng:longi,
    radius: '5000',
    type: [type]
  };
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      map.setCenter(pyrmont);
      map.setZoom(14);
      createMarker(results[i]);
        console.log(results[i].name);
    }
  }
}
function createMarker(place) {
        var placeLoc = place.geometry.location;
         marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

          google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, this);
          infowindow.setContent(place.name);
        });

}
  })
  .catch(function(error){
    console.log(error);
  })  
 
}