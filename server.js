var
express     = require('express'),
routes      = require('./routes'),
http		= require('http'),
app         = express();

// -- Configuration --
app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');


  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.favicon());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});
app.get('/public/index.html', function(req,res){
  // res.send('Twitter Feed now running');
});


app.listen(3000);
console.log('server running on 3000');
