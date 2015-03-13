app.controller("RegisterController", function ($scope, UserService) {

    console.log("in Register Controller ");

    $scope.addToUsers = function(newUser){

        console.log("in Register function add ");
   
        console.log(newUser);
 
        var userData = UserService.addToUsers(newUser);
         $('#regForm')[0].reset();

    };

});