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