exports.send =  function(req,res){
	var
	data,
	newData,
	request = require('request'),
	searchTerm = 'magento developer',
	tweetNum = '450',
	file = 'http://search.twitter.com/search.json?q='+ searchTerm +'&rpp='+ tweetNum +'&include_entities=true&result_type=mixed',
	twitterObject = {};

	request(file, function(error, _res, data){
		if(error && res.statusCode == 200){
			console.log(error);
		}
		newData = JSON.parse(data);
		res.json(newData);
	});

};