var youtube = 'https://www.youtube.com/embed/';
function run(){
	videos.innerHTML = '';
	var imgName = document.getElementById('imgName').value;
	axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet',{
		params:{
			q:imgName,
			maxResults:'20',
			key:'AIzaSyAM5sinrg-1_1sFEAQHsTGktH1XshcBpWE'
		}
	})
	.then(function(response){
		console.log(response);
		for(var i=0;i<response.data.items.length;i++){
			console.log(youtube+response.data.items[i].id.videoId);
			var videos = document.getElementById('videos');
			var result = `<div class = "vid-holder" onclick="openPopup()">
						   	 <a href = "${youtube+response.data.items[i].id.videoId+'?autoplay=1&color=white'}" target = "playhere">
						    	<img src = "${response.data.items[i].snippet.thumbnails.medium.url}">
						   	 	<div class = "content">
						   	 		<h3>${response.data.items[i].snippet.title}</h3>
						   	 		<p>${response.data.items[i].snippet.description}</p>
						   	 	</div>
						   	 </a>	
						  </div>`;
			videos.innerHTML += result; 
		}
	})
	.catch(function(error){
		console.log(error);	
	})
}