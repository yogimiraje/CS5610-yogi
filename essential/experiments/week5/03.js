var app = angular.module("RoutingApp", ['ngRoute'])


app.controller("FileController", function ($scope,PetitionService) {
        
  
    console.log("starting ");
    $scope.addToPetitions = function () {
        
        var newPetition = {
            title: $scope.petition.title,
            petitioner: $scope.petition.name,
            email: $scope.petition.email,
            ptext: $scope.petition.ptext

        };
        console.log("In file controller ");

    
        console.log(newPetition);
        PetitionService.addToPetitions(newPetition);
        $('#petForm')[0].reset();

    };

});

app.controller("ViewController", function ($scope,PetitionService) {
    console.log("In View controller ");
    var pet = PetitionService.getPetitions();
    
    
    $scope.petitions = pet;
});




app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html'
    
        }).
        
         when('/file', {
             templateUrl: 'partials/file.html',
             controller: 'FileController'
         }).
        when('/view', {
            templateUrl: 'partials/view.html',
            controller: 'ViewController'
        }).
         when('/contact', {
             templateUrl: 'partials/contact.html',

         }).
        otherwise({
            redirectTo: '/home'
        });
  }]);