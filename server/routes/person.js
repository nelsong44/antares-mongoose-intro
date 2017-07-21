//requires
var express = require('express');
var router = express.Router();
//require the model inside the route it will be used in
var Person = require('../models/person.schema.js');

//requests - CRUD ops - SERVER SIDE ROUTES
//request to update the targeted object in the db
router.put('/:id', function(req, res) {
  console.log('new location: ', req.body);
  //issue all mongoose commands through the schema created (Person)
  Person.findByIdAndUpdate( //passing in objects as the paramaters
    { _id: req.params.id }, //find the object we want to update by targeting its id
    { $set: {location: req.body.location} }, //will only update location, but not overwrite the other existing data in the object
    function(err, data) {
      if(err) {
        console.log('save error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }//end if
    }//end function
  );//end findByIdAndUpdate
});//end put

//request to get all the data from db to display on DOM
router.get('/', function(req, res) {
  Person.find({}, function(err, data) { //find * (same as in mongoose)
    if(err) {
      console.log('find error: ', err);
      res.sendStatus(500);
    } else {
      res.send(data); //array of objects - each obj a document in the collectin in the db
      //res.send(result.rows) - same as
      //the Person model is bound to the people collection
    }
  });//end find
});//end get

//request to store a new Person in the db
router.post('/', function(req, res) {
  console.log('logging the data from person controller: ', req.body);

  var addPerson = new Person(req.body);
  addPerson.save(function(err, data) {
    console.log('saved data: ', data); //data is the Person object just saved in db
    if(err) {
      console.log('save error: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }//end if
  });//end save
});//end post

//request to delete a Person from the db
router.delete('/:id', function(req, res) {
  console.log('delete person with id: ',  req.params.id);
  Person.findByIdAndRemove(
    { _id: req.params.id },
    function(err, data) {
      if(err) {
        console.log('save error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(201);
      }//end if
    }//end function
  );//end findByIdAndRemove
});//end delete

module.exports = router;
