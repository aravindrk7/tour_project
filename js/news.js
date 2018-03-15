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
	var keyword=localStorage.keyword;
	console.log(keyword);
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
			div.innerHTML +='<div class = newsSec><img src="'+imagechange+'" width="100" height="100" alt="sorry no image for this news"></img>'
						+'<div><h1>'+n+
						'</h1><p>'+response.data.articles[i].description+'</p></div>'+ '<a href="'+response.data.articles[i].url+'" target="blank"><input type="button" id ="more" value= "see more"></a></div>';
		}
	})
	.catch(function(error){
		console.log('got an error'+error);
	})

	
}