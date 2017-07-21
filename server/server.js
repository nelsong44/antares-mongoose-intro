//requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var index = require('./routes/index');
var person = require('./routes/person');
var mongoose = require('mongoose');

/** ---------- MIDDLEWARE ---------- **/
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.json()); // needed for angular requests

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/', index);
app.use('/person', person); //direct to the person route

//create MONGOOSE CONNECTION in server.js, not in specific route file
//route to our local database
//uri - universal resource identifier, url- universal resource locator
//server host, port, name of db
var databaseUri = 'mongodb://localhost:27017/antares';
//making the actual connection to the db
mongoose.connect(databaseUri);

//OPTIONAL - to verify connection
//creating event listerner (on) for a successful connection
mongoose.connection.on('connected', function() {
  console.log('mongoose connected to: ', databaseUri);
});//end connection success

mongoose.connection.on('error', function(err) {
  console.log('mongoose connection error: ', err);
});//end connection error

/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});//end set


//install mongoose
//create connection
//define schema - define the object properties, assign data types of the data being passed back and forth
//complete POST route
