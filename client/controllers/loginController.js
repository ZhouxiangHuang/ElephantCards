angular
  .module('MDB.LoginController', ['ui.router'])
  .controller('LoginController', LoginController);

//might make sense to adjust all of this to NavController or something else more
//symantically logical based on revised scope of nav bar
function LoginController($scope, UserFactory) {

//Listens for change in page... any page will trigger an update of current user and login status
  $scope.$on('handleBroadcast', function(event, status) {
    $scope.name = UserFactory.currentUser;
    $scope.loggedIn = UserFactory.loggedIn;
    $scope.logoutButton = UserFactory.loggedIn;
  });

  //Logs out user by using broadcast to change the view
  $scope.logout = function() {
    UserFactory.currentUser = '';
    UserFactory.loggedIn = false;
    UserFactory.broadcast('landing');
  }

}
