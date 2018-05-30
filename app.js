var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongodb').MongoClient;
var dbUrl = "mongodb://192.168.0.124:27017";
var objectID = require('mongodb').objectID;

app.use(bodyParser.urlencoded({ extended: true}));
 app.use(bodyParser.json());
 app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });
 app.get('/',function(req,res){
     res.send("Hello Nodjs from express.");
 });

 app.listen(3000);
 console.log("My service is listening to port 3000.");
//var db = require('./db'); //ADD THIS LINE
//Add these two line
//var UserController = require('./user/UserController');
//app.use('/users',UserController);
app.get('/display',function(req,res){
    mongoose.connect(dbUrl,function(err,Client){
       if (err) {
           throw err;
       }else{
           //console.log("successfully connected to the database");
           //var dd =Client.db('test');
          // var collections = dd.collection('test');
           //console.log(collections);
           var db = Client.db("local");
          db.collection('test').find(req.query).toArray(function(err,result){
              if (err) res.send(err);
              console.log("successfully connected to the database");
              res.send(result);
          })
       }
       Client.close();
    });
});
app.post('/insert',function(req,res){
    mongoose.connect(dbUrl,function(err,Client){
        if (err){
            throw err;
        }else{
            var obj = {No: req.body.No,Uname: req.body.Uname,Password: req.body.Password};
            var db = Client.db("local");
            db.collection('test').insertOne(obj,function(err,rmm){
               if (err){
                throw err;
               }else{
                res.send(rmm);
                console.log(obj);
               } 
           });
           //res.send({log: "insert success !",data: obj});
           // console .log(obj);
        }
        Client.close();
    });
});
app.get('/show',function(req,res){
    mongoose.connect("mongodb://192.168.0.124:27017",function(err,Client){
        if(err){
            throw err;
        }else{
            var db = Client.db("local");
            db.collection('test').find(req.query).toArray(function(err,result){
                if(err) res.send(err);
                res.send(result);
            })
        }
        Client.close();
    });
});
//module.exports = app;