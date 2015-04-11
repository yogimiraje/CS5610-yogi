

app.controller('ViewDetailCtrl', function ($scope,$rootScope, $http,$routeParams)
{
	console.log($routeParams);
	console.log('in view detail controller..fetching details for ID:');
	var id = $routeParams.id;
	$scope.donateClicked = false;
    console.log(id);
    $http.get('/rest/loggedin').success(function(user)
    {
		if (user !== '0'){
        	$rootScope.currentUser = user;
        }     
        
    });
    
    var needsData = getNeedsData();
   
    function getNeedsData() {

        $http.get('/rest/details/'+ id)
        .success(function (response) {
        	
         var needDetail = response;
         
         $scope.needDetail = needDetail;
          
      	if(!($scope.needDetail.receivedAmount)){
      		console.log('amount 0')
			$scope.receivedAmount = "0"
		}
		else
		{
			console.log($scope.receivedAmount)
			$scope.receivedAmount =	String(response.need.receivedAmount);
		}
          
      });
    }
    
    
    $scope.donate = function(){
    	console.log("doante clicked");
    	
    	if($rootScope.currentUser){
    		
    		
    			$scope.donateClicked = true;
    		
    		 
    	}
    	else{
    		alert('Please Sign in to donate');
    	}
    	
		 
     }
    
    $scope.cancel = function(){
    	console.log("doante cancelled");
    	$scope.donateClicked = false;
    	
    	$scope.donation = null;
    }
    
    $scope.processDonation = function(){
    	console.log("process donation");
    	$scope.donation.donor = $rootScope.currentUser.username;
    	$scope.donation.donorName = $rootScope.currentUser.first;
    	$scope.donation.receiver = $scope.needDetail.username;
    	$scope.donation.receiverName = $scope.needDetail.name;
    	$scope.donation.totalReceived = $scope.amountReceived + $scope.donation.amount;

    	$scope.donation.date = new Date;
		console.log($scope.donation);
		
		$http.put("/rest/donate", $scope.donation)
        .success(function(response){
            console.log(response);
             
            alert('Donate successfully!!');
            $scope.donation = null;
        });
		
    }
});



