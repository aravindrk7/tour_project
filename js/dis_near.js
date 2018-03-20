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


direct();
function direct()
{	
	console.log("hello");
	ind =0;
	var retrievedData = localStorage.getItem("val");
	var vals = JSON.parse(retrievedData);
	console.log(vals);
	var stable = localStorage.drp;
	geocode(stable);
for(var i=0;i<vals.length;i++){
	geocode(vals[i]);
}
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


		var origin1 = {lat: dirA[0], lng: dirB[0]};
        var destination1 = {lat: dirA[ind], lng: dirB[ind]};

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
          	console.log(response); 
          	var div = document.getElementById('dis');
          	console.log(response);
			div.innerHTML += '<div class ="area" ><h1>'+stable+'  to  '+response.destinationAddresses+'</h2> Time :  '+response.rows[0].elements[0].duration.text+'<br>Distance :  '+response.rows[0].elements[0].distance.text+'</div>' ;
          }
      });

		ind++;
	})
	.catch(function(error){
		console.log('got an error'+error);
	});
	
}
	}      
}