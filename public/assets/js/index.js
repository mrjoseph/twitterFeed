(function($, window, undefined){
	var twitterFeed = twitterFeed || {};
	twitterFeed = {
		tweetNum : 10,
		initLoad : true,
		getTweet: function(num){
			$('#ajax-loader').fadeIn();
			var
			searchTerm = 'Lewis Hamilton',
			twitterURL = 'http://search.twitter.com/search.json?q='+ searchTerm +'&rpp='+ twitterFeed.tweetNum +'&include_entities=true&result_type=mixed';
			$.ajax({
				url :twitterURL,
				type: 'get',
				dataType: 'jsonp',
				contentType: "application/json",
				success : function(feed){
					// console.log(feed.results[twitterFeed.tweetNum + 1]);
					var tweets = feed.results.length, results = '', i, id;
					for(i=0;i<tweets;i++){
						id = feed.results[i].from_user_id_str;

						results += '<dl style="" class="newTweet" id="'+ feed.results[i].from_user_id_str +'">';
						results += '<dt>'+ feed.results[i].from_user +'</dt>';
						results += '<dd><img src="'+ feed.results[i].profile_image_url_https +'"to alt="'+  feed.results[i].from_user_name +'"/></dd>';
						results += '<dd>'+ feed.results[i].text +'</dd>';
						results += '</dl>';
					}
					$('#tweets-list').html(results);
					$('#'+id).hide().fadeIn();
					$('#ajax-loader').fadeOut(function(){
					
						// console.log(id);
					});

				}
			});
		},
		init:function(){
			var _this = this;
			$('#loadTweets').on('click',function(e){
				e.preventDefault();
				console.log(twitterFeed.tweetNum);
				_this.getTweet();
				_this.tweetNum ++;
			});
			$(window).scroll(function(){
				var
				docHeight = $(document).height(),
				winHeight = $(window).height() + 1;
				// console.log('document height:' + docHeight);
				// console.log('window height:' + winHeight);
				if($(window).scrollTop() >= ( docHeight - winHeight)){
					
					_this.getTweet();
					_this.tweetNum = _this.tweetNum + 1;
				}
			});
			_this.getTweet();
		}
	};

	$(function(){
		twitterFeed.init();
	});
}(jQuery,window));