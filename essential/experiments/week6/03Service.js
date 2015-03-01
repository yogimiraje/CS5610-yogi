app.factory('PetitionService', function PetitionService($http) {

    var myPetitions = [
         { title: "save the rainforest", petitioner: "Bob Marley", ptext: "Help save the rainforest and adopt a responsible palm oil policy" },
         { title: "Grand Canyon", petitioner: "Alice Damon", ptext: "Stop plans to develop the Grand Canyon" },
         { title: "Genetically Modified Mosquitoes ", petitioner: "Bob Marley", ptext: "Say No to Genetically Modified Mosquitoes Release in the Florida Keys" },
         { title: "Stop the killing of the wolves", petitioner: "Ramon Damon", ptext: "PLEASE STOP KILLING US! President Obama,Sec Sally Jewell, Sec Tom Vilsack,Dir Dan Ashe:Stop the killing of the wolves, canis lupus in the U.S.A." },
         { title: "Oil Spilling", petitioner: "Don Samual", ptext: "Stop Oil & Gas Drilling in the Croatian Adriatic Sea | Stop bušenju nafte i plina u hrvatskom Jadranu" }
          


    ];
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
            if (users[u].username == username && users[u].password == password) {
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
