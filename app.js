var express = require('express');
var app = express();

var hbs = require('hbs');
var bodyParser = require('body-parser');
var request = require('request');
 
// app.set('view engine', 'html');
// app.engine('html', hbs.__express);
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.use(express.static('public'));

app.post('/', function(req,res){
	var postData = req.body.q;
	console.log(postData);
	var options = {
		url: 'https://api.stubhub.com/search/catalog/events/v2?q=' + postData + '&sort=popularity desc',
		headers: {
			'Authorization': 'Bearer BeSGOizYuNzFcNR8AGfaoiSBKMMa'
		}

	};
	function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
				var info = JSON.parse(body);
				var numFound = info.numFound
				if (numFound != 0) {
					var num = info.events.length;
					var eventsArray = info.events;
					 console.log(eventsArray);

					
	    			res.send({events: eventsArray});
	    		} else {
	    			res.render('index', {error: 'There were no events found matching your search.'})
	    		}

				
			} else {
				console.log(error);
				console.log(response);
			}
	}

	request(options, callback);
});






app.listen(8080);
console.log('server listening on port 8080');