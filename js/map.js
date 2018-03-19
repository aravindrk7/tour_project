var map;
var a=[];
var b=[];
var con=[];
var obj;
var array=[];
var y=0;
var dirA=[];
var dirB=[];
var ind=0;
var place = [];
var cont=[];
function initMap()
{
    map = new google.maps.Map(document.getElementById('map'),
    {


    	center: {lat: 13.08, lng: 80.24330000},
    	zoom: 10,
    	minZoom:4	
	});

    obj={
	addmarker:function (props)
	{
		array[y]=props;
		y++;
		var marker=new google.maps.Marker(
	{
		position:array[y-1].coords,
		animation: google.maps.Animation.DROP,
		map:map
	});

		map.panTo(new google.maps.LatLng(array[y-1].coords));

//info window 
if(array[y-1].content)
{
	var infowindow=new google.maps.InfoWindow({
		content:array[y-1].content
	});

	marker.addListener('click',function(){
		infowindow.open(map,marker);
		
	});

}
}
}


/*geocode();
function geocode()
{
	var location=localStorage.place1;
	axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
		params:{
			address:location,
			key:'AIzaSyAcMJESCDRMdbDsKR161tiQfXIu_R4y-pM'
		}
	})
	.then(function(response){
		output=response;
		console.log(response);
		for(var w=0;w<output.data.results.length;w++){
		a[w]=output.data.results[w].geometry.location.lat;
		b[w]=output.data.results[w].geometry.location.lng;
		con[w]=response.data.results[w].formatted_address;
		}
		
		for(i=0,j=0;i<a.length;i++,j++)
		{
			console.log(a[i],b[j]);
		}
				if(output.data.results[0].types[0] == 'country')
				{
					map.panTo(new google.maps.LatLng(a[0],b[0]));	
					map.setZoom(4);
					console.log('i am a country');
				}else{
	for(var q=0;q<output.data.results.length;q++){
	obj.addmarker({coords:{lat:a[q],lng:b[q]},content:con[q]});
	}
}
	})
	.catch(function(error){
		console.log(error);
	})
	
	
}
*/


direct();
function direct()
{	
	ind =0;
	var retrievedData = localStorage.getItem("place");
	var place = JSON.parse(retrievedData);

	console.log(place);
	for(var q=1;q<place.length;q++){
		console.log(place[q]);
		geocode(place[q]); 	
	}
	/*var start = localStorage.start;
	var end =localStorage.end;
	place[0]=localStorage.place1;
	place[1]=localStorage.place2;
	place[2]=localStorage.place3;
geocode(start);
geocode(end);
geocode(place[0]);
geocode(place[1]);
geocode(place[2]);*/
function geocode(area)
{
	var location=area;
	axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
		params:{
			address:location,
			key:'AIzaSyAcMJESCDRMdbDsKR161tiQfXIu_R4y-pM'
		}
	})
	.then(function(response){
		output=response;
		//console.log(response);
		dirA[ind]=output.data.results[0].geometry.location.lat;
		dirB[ind]=output.data.results[0].geometry.location.lng;
		cont[ind]=response.data.results[0].formatted_address;
		ad(dirA[ind],dirB[ind],ind);
		ind++;
	})
	.catch(function(error){
		console.log('got an error'+error);
	});
	
}

function ad(f,g,h){
	dirA[h]=f;
	dirB[h]=g;
	var items = [];
	//geocode(place[0]);
	//geocode(place[1]);
	//geocode(place[2]);
	for(var p=1;p<localStorage.len;p++){
	var a = place[p];
	console.log(a);
		items.push(a);
	}
	var waypoints = [];
	for (var i = 0; i < items.length; i++) {
	    var address = items[i];
	    if (address !== "") {
	        waypoints.push({
	            location: address,
	            stopover: true
        });
    }
}

// get directions
	var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;

directionsDisplay.setMap(map);
calculateAndDisplayRoute(directionsService, directionsDisplay);



function calculateAndDisplayRoute(directionsService, directionsDisplay) {
		var i=0;
		var k=0;
		var sum1 = 0;
		var sum2 = 0;
        directionsService.route({
          origin:{lat: dirA[0], lng: dirB[0]} ,
          destination: {lat: dirA[1], lng: dirB[1]},
          waypoints: waypoints, //an array of waypoints
           optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);

            while(i<response.routes[0].legs.length)
            {
            	var j =Math.floor((response.routes[0].legs[i].distance.value)/1000);
            	var z =Math.floor((response.routes[0].legs[i].duration.value)/3600);
            	sum1 = sum1 + j;
            	sum2 = sum2 + z;
            	//console.log(sum);
				var step = Math.floor((response.routes[0].legs[i].steps.length)/2);
				//console.log(step);
            	//var infowindow2 = new google.maps.InfoWindow();
     	   	    //infowindow2.setContent(response.routes[0].legs[i].distance.text + "<br>" + response.routes[0].legs[i].duration.text + " ");
      			//infowindow2.setPosition(response.routes[0].legs[i].steps[step].end_location);
     	   	    //infowindow2.open(map);
     	    i++;
     		}
     		var div = document.getElementById('dis');
			div.innerHTML ='Distance ->'+sum1+' km<br><br>Duration ->'
											+sum2+' hours';
          } 
          else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
      /*var origin1 = {lat: dirA[0], lng: dirB[0]};
        var destination1 = {lat: dirA[1], lng: dirB[1]};

var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1] ,
          destinations:  [destination1],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          }
          else{
          	var div = document.getElementById('dis');
          	console.log(response);
			div.innerHTML ='Distance ->'+sum+'<br><br>Duration ->'
											+response.rows[0].elements[0].duration.text ;
          }
      });*/
	}      
}
}