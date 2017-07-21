//controller and client-side angular routes
myApp.controller('PeopleController', ['$http', function($http) {
    var vm = this; //attaching to the view model
    vm.newPerson = {};
    //get the data from db and display on page load
    getPeople();

    vm.addPerson = function() {
      console.log('addPerson being called');
      $http.post('/person', vm.newPerson)
      .then(function(response) {
        console.log('Added person ', response);
        getPeople();
      });//end then
    };//end addPerson

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

    vm.deletePerson = function(id) {
      console.log('delete person with id: ', id);
      $http.delete('/person/' + id)
      .then(function(response) {
        getPeople();
      });//end delete
    };//end deletePerson

    function getPeople() {
      $http.get('/person')
      .then(function(response) {
        console.log(response.data);
        vm.people = response.data;
      });//end get
    }//end getPeople

    vm.addInternetPoints = function(id) {
      console.log('adding 100 internet points for person with id: ', id);
    };//end addInternetPoints

}]);//end controller
