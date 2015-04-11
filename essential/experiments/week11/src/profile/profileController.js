app.controller('ProfileCtrl', function ($http, $scope, $location,$rootScope,ProfileService)
{
	console.log("In ProfileCtrl ");
	//console.log($rootScope.currentUser);
	
	var id = $rootScope.currentUser._id;
	console.log(id);
	

	ProfileService.profileDetails(id,function(response){
		
		console.log(response);
	
	 if(response.role == "receiver"){
    		$scope.receiver = true;
    		$scope.amount = response.need.amount;
    		 
    		if(!(response.need.receivedAmount)){
    			$scope.receivedAmount = "0"
    		}
    		else
			{
    			$scope.receivedAmount =	String(response.need.receivedAmount);
			}
    }
	 $scope.user = response;
	
	});
	 
	
    $scope.editProfile = function (){
    	
    	 $location.path("/settings");
    }
});