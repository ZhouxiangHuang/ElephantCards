angular
  .module('MDB.UserFactory', ['ui.router'])
  .factory('UserFactory', UserFactory);

function UserFactory($http, $rootScope) {

  var user = {};
  user.currentUser = '[username]';
  user.loggedIn = false;

  user.fetch = function(username, password) {
    var user = {username: username, password: password};
    console.log('inside fetch')
    return $http.post('/users', user);
  }

  user.create = function(username, password) {
    var user = {username: username, password: password};
    return $http.post('/users/create', user);
  }

  user.broadcast = function(status) {
    $rootScope.$broadcast('handleBroadcast', status)
  }

  return user;
}
