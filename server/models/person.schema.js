//module for person object being created so we can reuse it over and over
//package up our object prototype to be used as a MODEL/blueprint for all our person objs created

//requires
var mongoose = require('mongoose');
//using Schema as a constructor so needs to be capitalized
var Schema = mongoose.Schema;

//create the schema
var personSchema = new Schema({
  //set data type of each specific property - for data integrity - ensure user input matches data requirements
  name: {type: String, required: true, unique: true},
  location: {type: String},
  dateOfBirth: {type: Date, required: true, unique: true},
  internetPts: {type: Number, default: 1000}
});//end personSchema

//create the model
//model is the data formatted into
//giving us the object to use elsewhere in our code
var Person = mongoose.model('Person', personSchema);

//both lines below are the same, bototne one excluding the above line
//export the model (object) so it's accessible throughout the application
// module.exports = Person;

//or pass in the model var directly:
module.exports = mongoose.model('Person', personSchema);
//can manually name your collection in mongoose as a 3rd parameter
//otherwise mongo will name the colection in the db the plural of the model (first arg passed into export)


// __v in mongoose - tracks version updates of the Schema created
// if change is made by the developer the version number will change
//starts at 0
