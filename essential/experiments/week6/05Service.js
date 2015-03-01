app.factory('PetitionService', function PetitionService($http) {

    var allPetitions = [
         { title: "save the rainforest", petitioner: "Lucy Marley", ptext: "Help save the rainforest and adopt a responsible palm oil policy" },
         { title: "Grand Canyon", petitioner: "Joe Damon", ptext: "Stop plans to develop the Grand Canyon" },
         { title: "Genetically Modified Mosquitoes ", petitioner: "Joe Damon", ptext: "Say No to Genetically Modified Mosquitoes Release in the Florida Keys" },
         { title: "Stop the killing of the wolves", petitioner: "Lucy Marley", ptext: "PLEASE STOP KILLING US! President Obama,Sec Sally Jewell, Sec Tom Vilsack,Dir Dan Ashe:Stop the killing of the wolves, canis lupus in the U.S.A." },
         { title: "Oil Spilling", petitioner: "Matt Samual", ptext: "Stop Oil & Gas Drilling in the Croatian Adriatic Sea | Stop bušenju nafte i plina u hrvatskom Jadranu" }
          


    ];
    console.log("In service");

    var addToPetitions = function (petition) {
        allPetitions.push(petition);
        
        console.log(petition);
    }

    var getNoOfPetitions = function () {

        return allPetitions.length;
    }
   

    var getPetitions = function () {
         
        return allPetitions;
    }

    var getPetitionsByIndices = function (indices) {
        var responsePetitions = [];
        for (var i in indices) {
            var petition = allPetitions[indices[i]];
            responsePetitions.push(petition);

        }
        console.log(responsePetitions);
        return responsePetitions;
    }

    return {
        addToPetitions: addToPetitions,
        getPetitions: getPetitions,
        getPetitionsByIndices: getPetitionsByIndices,
        getNoOfPetitions: getNoOfPetitions
    }
                                                                                                        
});

app.factory("UserService", function () {
    var currentUser = null;

    var users = [
        { username: "joe", password: "joe", petitionsFiled: [1, 2] },
        { username: "lucy", password: "lucy", petitionsFiled: [0, 3] },
        { username: "matt", password: "matt", petitionsFiled: [4] }
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

    var addPetitionIndex = function (index, username) {
        for (var u in users) {
            if (users[u].username == username) {
                users[u].petitionsFiled.push(index);
            }

        }
    };

    return {
        login: login,
        getCurrentUser: getCurrentUser,
        addPetitionIndex: addPetitionIndex
    };
});
