var app = angular.module("RoutingApp", ['ngRoute'])

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


 

app.controller("FileController", function ($scope, PetitionService) {

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

app.controller("ProfileController", function ($scope, UserService, $routeParams) {
    var username = $routeParams.username;
    $scope.username = username;
    $scope.currentUser = UserService.getCurrentUser();
    console.log(username);
});

app.controller("NavController", function ($scope, UserService) {
    $scope.currentUser = null;
    $scope.login = function () {
        var username = $scope.username;
        var password = $scope.password;
        $scope.currentUser = UserService.login(username, password);

        if ($scope.currentUser == null) {
            alert("Incorrect user id or password !");
            $scope.username = null;
            $scope.password = null;
        }
    }

    $scope.logout = function () {
        console.log($scope.currentUser);
         $scope.username=null;
         $scope.password=null;
        $scope.currentUser = null;
      //  $('#loginForm')[0].reset();
    }
});

