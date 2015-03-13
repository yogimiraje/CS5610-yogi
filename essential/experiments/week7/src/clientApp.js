var app = angular.module("userApp", []);

app.controller("userController", function ($scope) {
    var users = [
    {
        "firstName": "Rose",
        "lastName": "Samuels",
        "emailID": "rose@gmail.com"
        
    },
     {
         "firstName": "Sam",
         "lastName": "Pitt",
         "emailID": "sampitt@yahoo.com"
         
     },
     {
         "firstName": "Larry",
         "lastName": "Bin",
         "emailID": "lbin@rediff.com"

     }
    ];
    console.log(users)
    $scope.users = users;
});