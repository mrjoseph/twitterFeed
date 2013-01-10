(function($, window, undefined){
	var twitterFeed = twitterFeed || {};
	twitterFeed = {
		searchTerm : 'jayz',
		twitterURL : 'http://search.twitter.com/search.json?q=jayz&rpp=5&include_entities=true&result_type=mixed',
		getTweet: function(){
			$.ajax({
				url :this.twitterURL,
				type: 'get',
				dataType: 'jsonp',
				contentType: "application/json",
				success : function(feed){
					console.log(feed.results);
					var tweets = feed.results.length, results = '', i;
					for(i=0;i<tweets;i++){
						results += '<div>'+ feed.results[i].from_user +'</div>';
					}
					$('#tweets-list').html(results);
				}
			});
		},
		init:function(){

		}
	};

	$(function(){
		twitterFeed.getTweet();
	});
}(jQuery,window));