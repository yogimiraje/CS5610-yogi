app.factory('LoginService', function LoginService($http) {

	console.log("In LoginService ");

    var chkLogin = function(){
    	
    	$http.get('/rest/loggedin').success(function(user){
    	 
			if (user !== '0'){
	        	return user;
	        }     
        
    	});
    }
	
	return {
        chkLogin: chkLogin 
    }
});
