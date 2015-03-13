var app = angular.module("RoutingApp", ['ngRoute'])

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/home', {
            templateUrl: 'partials/home.html'
           
        }).

         when('/register', {
             templateUrl: 'partials/register.html',
             controller: 'RegisterController'
         }).

        when('/view', {
            templateUrl: 'partials/view.html',
            controller: 'ViewController'
        }).

         when('/contact', {
             templateUrl: 'partials/contact.html',

         }).

        
        otherwise({
            redirectTo: '/home'
        });
  }]);

