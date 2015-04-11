
app.controller('ContactCtrl', function ($http, $rootScope,LoginService)
{
	console.log("In ContactCtrl controller ");
	
	$rootScope.currentUser = LoginService.chkLogin(function(){
		 console.log($rootScope.currentUser);
	});
	
   
    
});