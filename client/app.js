var myApp = angular
  .module('myApp', [
    'ui.router',
    'MDB.LoginController',
    'MDB.UserFactory',
    'MDB.ContentController',
    'TestController',
    'MainController',
    'CreateController',
    'DeckFactory',
    'UpdateFactory'

  ]);

myApp.config(function($stateProvider, $urlRouterProvider){

  //If the user goes beyond the '/' route it will redirect them to '/'
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: "/",
      views: {
        'nav': {
          templateUrl: "partials/nav.html",
          controller: 'LoginController'
        },
        'landing': {
          templateUrl: "partials/landing.html",
          controller: 'ContentController'
        },
        'home': {
          templateUrl: "partials/main.html",
          controller: 'MainController'
        },
        'test': {
          templateUrl: "partials/test.html",
          controller: 'TestController'
        },
        'create': {
          templateUrl: "partials/create.html",
          controller: 'CreateController'
        }
      }
    });
});
