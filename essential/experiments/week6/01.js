var app = angular.module("RoutingApp", ['ngRoute'])

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

        when('/profile/:username', {
            templateUrl: 'partials/profile.html',
            controller: 'ProfileController'
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


app.controller("FileController", function ($scope,PetitionService) {
        
    //$('#petForm').validate();

    console.log("starting ");
    $scope.addToPetitions = function () {
        
        var newPetition = {
            title: $scope.petition.title,
            petitioner: $scope.petition.name,
            email: $scope.petition.email,
            ptext: $scope.petition.ptext

        };
        console.log("In file controller ");

      //  if (title == null) {
         
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

app.controller("ProfileController", function ($scope, UserService, $routeParams) {
    var username = $routeParams.username;
    $scope.username = username;
    console.log(username);
});

app.controller("NavController", function ($scope, UserService) {
    $scope.currentUser = null;
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        $scope.currentUser = UserService.login(username, password);
    }
});

