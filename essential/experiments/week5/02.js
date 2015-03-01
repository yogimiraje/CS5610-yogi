var app = angular.module("RoutingApp", ['ngRoute'])


app.controller("RoutingAppController", function ($scope) {
    
    $scope.petition = [];


    $scope.addPetition = function () {
        console.log("hi");

        var newPetition = {
            title: $scope.petition.title,
            petitioner: $scope.petition.name,
            email: $scope.petition.email,
            ptext: $scope.petition.ptext
           
        };
        console.log(newPetition);

        $scope.petition.push(newPetition);

        cosnole.log(petition);
    }

});

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html'
    //        ,controller: 'PhoneListCtrl'
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