var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017";
var objectID = require('mongodb').objectID;

 app.use(bodyParser.json());

 app.get('/',function(req,res){
     res.send("Hello Nodjs from express.");
 });

 app.listen(3000);
 console.log("My service is listening to port 3000.");
//var db = require('./db'); //ADD THIS LINE
//Add these two line
//var UserController = require('./user/UserController');
//app.use('/users',UserController);
app.get('/show',function(req,res){
    mongoose.connect(dbUrl,function(err,Client){
       if (err) {
           throw err;
       }else{
           console.log("successfully connected to the database");
           //var dd =Client.db('test');
          // var collections = dd.collection('test');
           //console.log(collections);
           var db = Client.db("local");
          db.collection('test').find(req.query).toArray(function(err,result){
              if (err) res.send(err);
              res.send(result);
          })
       }
       Client.close();
    });
});
//module.exports = app;