app.factory('UserService', function UserService($http) {
    var currentUser = null;

    

    console.log("In Userservice");

   
    var addToUsers = function (newUser) {
       
        $http.post("/rest/user", newUser)
        .success(function (response) {
            return response;

        });


    }
  


    var getUsers = function (callback) {
        $http.get("/rest/user")
        .success(callback);
    }


   
  
    return {
        addToUsers: addToUsers,
        getUsers: getUsers
         
    };
});
