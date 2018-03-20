
/*var result = `
				<select id="slt">
				<option>${place[1]}</option>
				<option>${localStorage.place1}</option>	
				<option>${localStorage.place2}</option>
				<option>${localStorage.place3}</option>
				<option>${localStorage.end}</option>
				</select>`;
document.getElementById('dropdown').innerHTML = result;*/ 

$(document).ready(function() { 
 
var retrievedData = localStorage.getItem("place");
var place = JSON.parse(retrievedData);

var s = $('<select id="slt"/>'); 

for(var val =1 ;val<place.length;val++) 
{    
 $('<option />', {value: place[val], text: place[val]}).appendTo(s); 
} 

s.appendTo('#dropdown');
}); 

function checkselect(){
	var drp = document.getElementById('slt').value;
	var values = document.getElementsByClassName('chk');
	var val=[];
	console.log(values.length);
	for(var i=0;i<values.length;i++){
		if(values[i].checked){
			val.push(values[i].value);
		}
	}
	console.log(val);
	localStorage.drp = drp;
	localStorage.setItem("val", JSON.stringify(val));
}