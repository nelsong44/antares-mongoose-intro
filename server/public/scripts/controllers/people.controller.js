//controller and client-side angular routes
myApp.controller('PeopleController', ['$http', function($http) {
    var vm = this; //attaching to the view model
    vm.newPerson = {};
    //get the data from db and display on page load
    getPeople();

    //request to add a new Person to the db
    vm.addPerson = function() {
      console.log('addPerson being called');
      $http.post('/person', vm.newPerson)
      .then(function(response) {
        console.log('Added person ', response);
        getPeople();
      });//end then
    };//end addPerson

    //request to update specified data for a Person in db
    vm.updatePerson = function(id) {
      console.log('update person with id: ', id);
      var data = {
        location: 'idaho'
      };
      $http.put('/person/' + id, data)
      .then(function(response) {
        getPeople();
      });//end put
    };//end updatePerson

    //request to delete Person from db on button click
    vm.deletePerson = function(id) {
      console.log('delete person with id: ', id);
      $http.delete('/person/' + id)
      .then(function(response) {
        getPeople();
      });//end delete
    };//end deletePerson

    //request to add 100 internet points on button click for Person
    vm.addInternetPoints = function(id, points) {
      console.log('adding 100 internet points for person with id: ', id);
      console.log(points);
      var data = {
        internetPts: points + 100
      };
      $http.put('/person/points/' + id, data)
      .then(function(response) {
        getPeople();
      });//end put
    };//end addInternetPoints

    //function to get all Person documents from db to display on DOM
    function getPeople() {
      $http.get('/person')
      .then(function(response) {
        console.log(response.data);
        vm.people = response.data;
      });//end get
    }//end getPeople

}]);//end controller
