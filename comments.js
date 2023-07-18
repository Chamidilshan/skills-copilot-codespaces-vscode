//create web server
var express = require('express');
var app = express();
var fs = require("fs");

//get all comments
app.get('/listComments', function (req, res) {
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

//get comments by id
app.get('/:id', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       comments = JSON.parse( data );
       var comment = comments["comment" + req.params.id] 
       console.log( comment );
       res.end( JSON.stringify(comment));
   });
})

//post new comment
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/addComment', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var newComment = {
          "name" : req.body.name,
          "comment" : req.body.comment
       }
       data["comment" + req.body.id] = newComment;
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

//delete comment by id
app.delete('/deleteComment/:id', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["comment" + req.params.id];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

//put comment by id
app.put('/updateComment/:id', function (req, res) {
   // First read existing comments.
   fs.readFile( __dirname + "/" + "comments.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var newComment = {
          "name" : req.body.name,
          "comment" : req.body.comment
       }
       data["comment" + req.params.id] = newComment;
       console.log( data );
       res.end( JSON