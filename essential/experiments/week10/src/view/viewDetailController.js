

app.controller('ViewDetailCtrl', function ($scope, $rootScope, $http)
{
    
    var needDetail = $rootScope.needDetail;

    console.log(needDetail);

    var userName = needDetail.userName;


    console.log('in view detail controller');
    console.log(userName);
   
});



