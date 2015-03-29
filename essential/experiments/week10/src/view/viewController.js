

app.controller('ViewCtrl', function ($http, $scope, $location, $rootScope)
{

   // $rootScope.currentUser = null;

    console.log("In View controller ");

    
    var needsData = getNeedsData();
     
  
    
    function getNeedsData() {

        $http.get('/need')
        .success(function (response) {

          console.log(response);

          $scope.needsData = response;
          
          
      });

    }


    $scope.viewDetail = function () {

       // $scope.needService = this.need;
      //  console.log($scope.selected);
       
        // var userNeed = this.need;

        $rootScope.needDetail = this.need;
        console.log($rootScope.needDetail);

      
        $location.path("/viewDetail");

        

    };


    //function viewDetail(userName) {

     //   $location.path("/viewDetail");

        /*
        $http.get('/need/user',userName)
       .success(function (response) {

           console.log(response);

           $scope.needsData = response;


       });
       */

   // }
       
        
     /*
    $scope.needsData = function () {

        $http.get('/need')
        .success(function (response) {

            console.log(response);

            return response;

        });
    }
    */

});



