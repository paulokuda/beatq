var util = require("util");
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/beatq';
var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * The path part (here "fallTest") is the name of the database
 */


var Message = {
    // this.x = x;   
    incrementTotalUsers : function(count){
       mongoDB.collection("totalUsers").insert([{count: count}], {
              safe: true
            }, 
            function(err, crsr) {
            if (err) console.log(err);
            console.log("completed mongo insert");
            
            console.log("done with insert callback");
            console.log(crsr);
        });
    }

    // getTotalUsers : function(){
    //     // mongoDB.collection("totalUsers").find().sort({count: -1}).limit(1),
    //     // function(err, crsr) {
    //     //     if (err) console.log(err);
    //     //     console.log("completed mongo get");
            
    //     //     console.log("done with get callback");
    //     //     // console.log(crsr);
    //     // });
    //     // return mongoDB.collection("totalUsers").find().sort({count: -1}).limit(1);
        
    //     mongoDB.collection("totalUsers").find(
    //         {count: 3}, 
    //         {
    //           upsert: true
    //         }, 
    //         function(err, crsr) {
    //           if (err) {console.log("err");}
    //           else {
    //             // callback(crsr);
    //             console.log("found the player");
    //             // console.log("LOLOL");
    //           }
    //     });
    // }



    
                      

    // getSoundcloudUrl : function(msg) {
        
    // }
    // getPlayer : function(tennis_name) {
    //     console.log("get player method was hit in tennis.js");
    //     // if (!tennis_name){
    //     //     console.log("THE PARAMETER IS UNDEFINED");
    //     //     return tennisCollection;
    //     // }
    //     // else{
    //         for (i = 0; i < tennisCollection.length; i++) {
    //             if (tennisCollection[i].tennis_name === tennis_name) {
    //                 console.log("got to the getPlayer method we wanted");
    //                 return tennisCollection[i];
    //             }
    //         }
    //         // // var notFound = "No players match that search";
    //         // return notFound;

    //     // }
    //     console.log(tennisCollection);
    //     return tennisCollection;
    // },
    // deletePlayer : function(tennis_name) {
    //     for (i = 0; i < tennisCollection.length; i++) {
    //         if (tennisCollection[i].tennis_name === tennis_name) {
    //             tennisCollection.splice(i, 1);
    //             return tennisCollection;
    //         }
    //     }
    //     return tennisCollection;
    // },
    // updatePlayer : function(tennis_name, handed, ranking, callback) {
    //     for (i = 0; i < tennisCollection.length; i++) {
    //         console.log("the handed we are looking for is: " + tennisCollection[i].handed);
    //         console.log("the search query is: " + handed);
    //         if (tennisCollection[i].tennis_name === tennis_name) {
    //             // tennisCollection[i][0] = tennis_name;

    //             tennisCollection[i].handed = handed;
    //             tennisCollection[i].ranking = ranking;
    //             return tennisCollection;
    //         }
    //     }
    // },
    // getArray : function(){
    //     return tennisCollection;
    // }
}




 
module.exports = Message;