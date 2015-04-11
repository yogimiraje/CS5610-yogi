

app.controller('ViewCtrl', function ($http, $scope, $location, $rootScope,LoginService)
{
	console.log("In View controller ");

	$rootScope.currentUser = LoginService.chkLogin(function(){
		 console.log($rootScope.currentUser);
	});
	
	
    var needsData = getNeedsData();
     
    function getNeedsData() {
	
	    $http.get('/rest/recipient')
	    .success(function (response) {
	    	
	    	$scope.needsData = response;
	    	console.log(response);  
	  	    });

      }
     
    $scope.viewDetail = function (id) {

      
        console.log('In view controller....routing to view details for ID :');
        console.log(id);
         
     	$location.path('/viewDetail/' + id );
    }
    

});



