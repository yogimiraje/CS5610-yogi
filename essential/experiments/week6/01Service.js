app.factory('PetitionService', function PetitionService($http) {

    var myPetitions = [];
    console.log("In service");

    var addToPetitions = function (petition) {
        myPetitions.push(petition);
        
        console.log("Added - display from service");
        console.log(petition);
    }

   

    var getPetitions = function () {
        console.log("returning petition");
        return myPetitions;
    }

    return {
        addToPetitions: addToPetitions,
        getPetitions: getPetitions
    }
                                                                                                        
});

app.factory("UserService", function () {
    var currentUser = null;

    var users = [
        { username: "joe", password: "joe" },
        { username: "lucy", password: "lucy" },
        { username: "matt", password: "matt" }
    ]

    var login = function (username, password) {
        for (var u in users) {
            if (users[u].username == username) {
                currentUser = users[u];
                return users[u];
            }
        }
        return null;
    };

    var getCurrentUser = function () {
        return currentUser;
    }

    return {
        login: login,
        getCurrentUser: getCurrentUser
    };
});
