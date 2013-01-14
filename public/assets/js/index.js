(function($, window, undefined){
	var twitterFeed = twitterFeed || {};
	twitterFeed = {
		tweetNum : 10,
		initLoad : true,
		userSearching : false,
		getTweet: function(searchTerm){
			$('#ajax-loader').fadeIn();
			var
			//searchTerm = 'drum and bass',
			twitterURL = 'http://search.twitter.com/search.json?q='+ searchTerm +'&rpp='+ twitterFeed.tweetNum +'&include_entities=true&result_type=mixed';
			$.ajax({
				url :twitterURL,
				type: 'get',
				dataType: 'jsonp',
				contentType: "application/json",
				success : function(feed){
					var tweets = feed.results.length, results = '', i, id, currentTweetCount = $('#tweets-list dl').length;
					if(twitterFeed.initLoad){
						for(i=0;i<tweets;i++){
							id = feed.results[i].from_user_id_str;

							results += '<dl style="" class="newTweet" id="'+ feed.results[i].from_user_id_str +'">';
							results += '<dt>'+ feed.results[i].from_user +'<div class="controls"><a href="" class="remove">remove</a> / <a href="" class="save">Save Tweets</a></div></dt>';
							results += '<dd><img src="'+ feed.results[i].profile_image_url_https +'"to alt="'+  feed.results[i].from_user_name +'"/></dd>';
							results += '<dd>'+ feed.results[i].text +'</dd>';
							results += '</dl>';
						}

					$('#tweets-list').html(results);
					twitterFeed.tweetNum = twitterFeed.tweetNum + 1;
					}
					if(!twitterFeed.initLoad){
						var n = currentTweetCount + 1;
						results += '<dl style="" class="newTweet" id="'+ feed.results[n].from_user_id_str +'">';
						results += '<dt>'+ feed.results[n].from_user +'<div class="controls"><a href="" class="remove">remove</a> / <a href="" class="save">Save Tweets</a></div></dt>';
						results += '<dd><img src="'+ feed.results[n].profile_image_url_https +'"to alt="'+  feed.results[n].from_user_name +'"/></dd>';
						results += '<dd>'+ feed.results[n].text +'</dd>';
						results += '</dl>';
						$('#tweets-list').append(results);
						$('#tweets-list dl:last-child').hide().fadeIn();
						//$("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
					}
					twitterFeed.initLoad = false;

					$('#ajax-loader').fadeOut(function(){

						// console.log(id);
					});

				}
			});
		},
		removeTweets: function(){
			$('.remove').live('click',function(e){
				e.preventDefault();
				$(this).parent().parent().parent().fadeOut(function(){
				});
			});
		},
		saveTweets: function(){
			var tweetid = $(this).parent().parent().parent().attr('id');
			console.log(tweetid);
		},
		init:function(){
			var _this = this;
			$('#loadTweets').on('click',function(e){
				e.preventDefault();
			});
			$(window).scroll(function(){
				if($(window).height() + $(window).scrollTop() == $(document).height()){
					if (twitterFeed.userSearching){
						_this.getTweet();
						_this.tweetNum ++;
						console.log(_this.tweetNum);
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
				twitterFeed.saveTweets();
			});

			_this.removeTweets();

		}
	};

	$(function(){
		twitterFeed.init();
	});
}(jQuery,window));
