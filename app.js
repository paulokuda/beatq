/*
 * In this example, I put the typical Express stuff first
 * even though I don't use it in the example.  It can serve
 * as a template for your apps if you need Express.
 * Then I put the socket.io specific stuff after
 * It doesn't need to be after, but I'm doing it this
 * way just to make it easier to differentiate the two.
 */

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;


// Normal Express requires...
var dbRoutes = require('./routes/dbRoutes'); 
var messageRoutes = require('./routes/serverSocket.js');
var express = require('express'),
  http = require('http'),
  morgan = require('morgan'),
  app = express();

  

// Set the views directory
app.set('views', __dirname + '/views');
// Define the view (templating) engine
app.set('view engine', 'ejs');
// Log requests
app.use(morgan('tiny'));

// This is where your normal app.get, app.put, etc middleware would go.

// Handle static files
app.use(express.static(__dirname + '/public'));


// app.get('/', function(request, response){
//   response.send('<h1>Hello world</h1>');
// });

app.get("/get/:url?", function(req, response) {

   
});




// app.get('/:collection/:operation', dbRoutes.modify);

nicknames = [];
/*1*/ var httpServer = http.Server(app);
/*2*/ var sio =require('socket.io');
/*3*/ var io = sio(httpServer);
/*4*/ httpServer.listen(50000, function() {console.log('Listening on 50000');});



var gameSockets = require('./routes/serverSocket.js');
gameSockets.init(io);
