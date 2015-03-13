app.controller("ViewController", function ($scope, UserService) {
    console.log("In View controller ");
    var users = UserService.getUsers(function (response) {
        users = response;

        console.log("In getUesrs");
        console.log(users);
        $scope.users = users;

    });

});