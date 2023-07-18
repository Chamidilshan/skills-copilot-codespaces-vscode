//create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: String,
  comment: String
});
var User = mongoose.model('User', userSchema);
router.get('/comments', function(req, res) {
  console.log("GET comments");
  User.find({}, function(err, users) {
    if (err) throw err;
    console.log(users);
    res.json(users);
  });
});
router.post('/comments', urlencodedParser, function(req, res) {
  console.log("POST comments");
  var newUser = User({
    name: req.body.name,
    comment: req.body.comment
  });
  newUser.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
    res.json(newUser);
  });
});
router.put('/comments/:id', urlencodedParser, function(req, res) {
  console.log("PUT comments");
  User.findById(req.params.id, function(err, user) {
    if (err) throw err;
    user.name = req.body.name;
    user.comment = req.body.comment;
    user.save(function(err) {
      if (err) throw err;
      console.log('User updated successfully!');
      res.json(user);
    });
  });
});
router.delete('/comments/:id', urlencodedParser, function(req, res) {
  console.log("DELETE comments");
  User.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    console.log('User deleted!');
    res.json({ message: 'User deleted!' });
  });
});
module.exports = router;