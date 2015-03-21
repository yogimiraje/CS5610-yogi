app.controller('RegisterCtrl', function ($scope, $http, $location,$rootScope)
{
    $scope.sucessfulMessage = false;
    $scope.passwordNotMatchMessage = false;
    $scope.userExistsMessage = false;


    $scope.register = function(newUser){  

        if (newUser.password == newUser.password2) {

            $http.post('/exists', newUser)
            .success(function (response) {

                if (response == 'false'){
                    $http.post("/register", newUser)

                    .success(function (response) {

                        console.log("registered Successfully !");
                        console.log(response);
                        $scope.sucessfulMessage = true;     
                        $scope.passwordNotMatchMessage = false;
                        $scope.userExistsMessage = false;

                        $scope.newuser = null;

                    });
                   }
                else{
                    $scope.userExistsMessage = true;

                    $scope.newuser.userName = null;
                    $scope.newuser.password = null;
                    $scope.newuser.password2 = null;

                }


                });
             
          }
         
        else {
            console.log("password not match !");
            $scope.passwordNotMatchMessage = true;
            $scope.userExistsMessage = false;
            $scope.newuser.password = null;
            $scope.newuser.password2 = null;
        

    }
    }
    
});