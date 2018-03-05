$(window).on('scroll', function(){
	if($(window).scrollTop()){
		$('nav').addClass('black');
	}
	else{
		$('nav').removeClass('black');
	}
})
var n;
function news()
{
	var keyword=document.getElementById('keyword').value;
	axios.get('https://newsapi.org/v2/everything',{
		params:{
			q:keyword,
			from:'2018-01-01',
			sortBy:'popularity',
			apikey:'7ee6e7d450a8429b9aee06daaee1cceb'
		}
	})
	.then(function(response){
		for(var i=0;i<response.data.articles.length;i++)
		{
			console.log(response);
			var imagechange=response.data.articles[i].urlToImage;
			//console.log(response.data.articles[i].urlToImage);
			n=response.data.articles[i].title;
			var div = document.getElementById('news');
			div.innerHTML +='<img src="'+imagechange+'" width="100" height="100" alt="sorry no image for this news"></img>'+'<h1>'+
							n+
							'<br><br>';
		}
	})
	.catch(function(error){
		console.log('got an error'+error);
	})

	
}