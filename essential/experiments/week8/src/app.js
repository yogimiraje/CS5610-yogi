var app = angular.module('PassportApp', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/pages/home/home.html',
            controller: 'LoginCtrl'
        })

        
        .when('/view', {
            templateUrl: 'pages/view/view.html'
           
        })

         .when('/register', {
             templateUrl: 'pages/register/register.html',
             controller: 'RegisterCtrl'

         })

         .when('/profile', {
             templateUrl: 'pages/profile/profile.html',
             resolve: {
                 loggedin: checkLoggedin
             }
             
         })

         .when('/settings', {
             templateUrl: 'pages/settings/settings.html',
             resolve: {
                 loggedin: checkLoggedin
             }
             
         })

        .when('/contact', {
            templateUrl: 'pages/contact/contact.html'
             
        })

        .otherwise({
            redirectTo: '/'
        });     
    
    $httpProvider
    .interceptors
    .push(function($q, $location)
    {
        return {
            response: function(response)
            { 
                return response;
            },
            responseError: function(response)
            {
                if (response.status == 401)
                    $location.url('/');
                return $q.reject(response);
            }
        };
    }); 
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
            deferred.resolve();


        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/');
           
        }
    });
    
    return deferred.promise;
};
