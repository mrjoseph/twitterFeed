(function($, window, undefined){
	var twitterFeed = twitterFeed || {};
	twitterFeed = {
		tweetNum : 10,
		initLoad : true,
		userSearching : false,
		tweetSave : false,
		getTweet: function(searchTerm,tweet_user_id, tweetNum){

			$('#ajax-loader').fadeIn();

			var
			twitterURL = 'http://search.twitter.com/search.json?q='+ searchTerm +'&rpp='+ twitterFeed.tweetNum +'&include_entities=true&result_type=mixed';
			$.ajax({
				url :twitterURL,
				type: 'get',
				dataType: 'jsonp',
				contentType: "application/json",
				success : function(feed){
					twitterFeed.loadTweets(feed);
				}
			});
		},
		removeTweets: function(){
			$('.remove').live('click',function(e){
				e.preventDefault();
				$(this).parent().parent().parent().slideUp(function(){
				});
			});
		},
		wrapLink: function(text){
			var urlRegex = /(https?:\/\/[^\s]+)/g;
			return text.replace(urlRegex, function(url) {
				return '<a href="' + url + '" target="_blank">' + url + '</a>';
			});
		},
		loadTweets: function(feed){
			var tweets = feed.results.length, results = '', i, id, currentTweetCount = $('#tweets-list dl').length, returnString;
			if(twitterFeed.initLoad){
				for(i=0;i<tweets;i++){
					id = feed.results[i].from_user_id_str;
					returnString = twitterFeed.wrapLink(feed.results[i].text);
					results += '<dl style="" class="newTweet" id="'+ feed.results[i].from_user_id_str +'">';
					results += '<dt><span>'+ feed.results[i].from_user +'</span><div class="controls"><a href="" class="remove">remove</a></div></dt>';
					results += '<dd class="image"><img src="'+ feed.results[i].profile_image_url_https +'"to alt="'+  feed.results[i].from_user_name +'"/></dd>';
					results += '<dd class="text">'+ returnString +'</dd>';
					results += '</dl>';
				}
			$('#tweets-list').html(results);
			twitterFeed.tweetNum = twitterFeed.tweetNum + 1;
			}
			if(!twitterFeed.initLoad){
					var n = currentTweetCount + 1;
					returnString = twitterFeed.wrapLink(feed.results[n].text);
					results += '<dl class="newTweet" id="'+ feed.results[n].from_user_id_str +'">';
					results += '<dt><span>'+ feed.results[n].from_user +'</span><div class="controls"><a href="" class="remove">remove</a></div></dt>';
					results += '<dd class="image"><img src="'+ feed.results[n].profile_image_url_https +'"to alt="'+  feed.results[n].from_user_name +'"/></dd>';
					results += '<dd class="text">'+ returnString +'</dd>';
					results += '</dl>';
					$('#tweets-list').append(results);
					$('#tweets-list dl:last-child').hide().fadeIn();


			}
			twitterFeed.initLoad = false;
			$('#ajax-loader').fadeOut();
		},
		getDataFromNode: function(){
			$('#ajax-loader').fadeIn();

			$.ajax({
				url     : '/view',
				type    : 'get',
				dataType: 'json',
				cache: false,
				success : function(data){
					twitterFeed.loadTweets(data);
				}
			});
		},
		init:function(){
			var _this = this;
			$('#loadTweets').on('click',function(e){
				e.preventDefault();
			});
			$(window).scroll(function(){
				if($(window).height() + $(window).scrollTop() >= $(document).height()){
					if (twitterFeed.userSearching){
						_this.getTweet();
						_this.tweetNum ++;
					}
				}
			});
			$('#loadTweets').on('click',function(){
				_this.getTweet();
				_this.tweetNum ++;
			});

			$('#submit').on('click',function(e){
				e.preventDefault();
				var searchVal = $('#tweetSearch').val();
				if(searchVal.length === 0){
					console.log('empty search');
					return false;
				} else {
					twitterFeed.userSearching = true;
					twitterFeed.initLoad = true;
					$('#tweets-list dl').remove();
					twitterFeed.getTweet(searchVal);
					twitterFeed.tweetNum ++;
				}
			});
			$('.save').live('click',function(e){
				e.preventDefault();
				twitterFeed.saveTweets($(this));
			});

			_this.removeTweets();

		}
	};

	$(function(){
		twitterFeed.init();
		//twitterFeed.getDataFromNode();

	});
}(jQuery,window));
