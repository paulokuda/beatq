var messageModel = require ('../models/message.js');
var util = require("util");
var mongoClient = require('mongodb').MongoClient;
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * The path part (here "fallTest") is the name of the databas
 */
var url = 'mongodb://localhost:27017/fallTest';
var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});




exports.init = function(io) {
	var totalUsers = 0; // keep track of the number of users


  // When a new connection is initiated
	io.sockets.on('connection', function (socket) {
        ++totalUsers;
        messageModel.incrementTotalUsers(totalUsers, function(crsr){});

        
		console.log('a user connected');

        socket.on('index page', function(){
            console.log("index page event was hit");
            console.log("the message is: ");
            // var totalUsers = messageModel.getTotalUsers();
            console.log("the total users are: " + totalUsers);
            io.sockets.emit('index page', {users: totalUsers});
          
        });

        socket.on('new user', function(msg, callback){
            // console.log(nicknames);
          if (nicknames.indexOf(msg) != -1) { // making sure that the username isn't already in use
            callback(false);
          }
          else {
            callback(true);
            
            socket.nickname = msg;
            nicknames.push(socket.nickname);
            io.sockets.emit('usernames', {nicknames: nicknames, user: socket.nickname});
          }
        });
        // socket.emit('players', { number: currentUsers});
		socket.on('chat message', function(msg){
            // console.log(socket.nickname);
            console.log("message: " + msg);
		  	io.sockets.emit('chat message', { msg: msg, user: socket.nickname});
		  
		});
        socket.on('disconnect', function(data){
            console.log('a user disconnected');
            if (!socket.nickname) {
                return;
            }
            else{
                nicknames.splice(nicknames.indexOf(socket.nickname), 1);
                updateNicknames();
                io.sockets.emit('user left', {user: socket.nickname});
        }
        function updateNicknames() {
            io.sockets.emit('usernames', nicknames);
        }

    })
	});
    
	

}


exports.checkMessage = function(request, response) {
    console.log("the check message method in message.js was hit");
    // tennisArray.push({request.params.player_name, request.params.handed, request.params.ranking})
    // var tennisArray = tennisModel.getArray();
    // console.log("successful call to the getArray method from routes");

    var checkMessage = messageModel.checkMessage(request.params.message);
    response.send(checkMessage);
    // console.log("this is the get player: " + JSON.stringify(getPlayer.length));
    // response.render('index', { 'message': getPlayer });
    // response.send(tennisArray);
}

// exports.getSoundcloudUrl = function(request, response) {
//     // decided against doing server side requests, as everything can be handled from the client-side. also, by doing server to server requests from a users input isn't safe and could cause problems later
// }

