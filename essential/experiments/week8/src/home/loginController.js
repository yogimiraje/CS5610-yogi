app.controller('LoginCtrl', function($scope, $http, $location,$rootScope)
{
    $scope.userloggedin = null;
    $scope.login = function(user)
    {
        
        $http.post('/login', user)
        .success(function(response)
        {
            $rootScope.currentUser = response;
            console.log("Logged in Now-  from client")
            $location.path("/profile");
        })

        .error(function(response)
        {
            $scope.user = null;
            alert('User name and password does not match !');
            
        });
    }


    $scope.logout = ( function () {

        $http.post('/logout')
        .success(function (response) {
            $scope.user = null;
            $rootScope.currentUser = null;
            $location.path("/");
        });
    });

  
});