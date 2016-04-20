angular
  .module('MDB.ContentController', ['ui.router'])
  .controller('ContentController', ContentController);

function ContentController($scope, UserFactory) {
  //Receives broadcast to change from landing page to login page on authentication
  $scope.landingPage = 'landing';

  $scope.$on('handleBroadcast', function(event, status) {
    $scope.landingPage = status;
  });

  $scope.loginUser = function() {
    $scope.loginError = '';
    UserFactory.fetch($scope.loginUsername, $scope.loginPassword).success(function(dataResponse) {
      if (dataResponse === 'error') {
        $scope.loginError = 'User/Password is incorrect.'
      } else {
        UserFactory.currentUser = dataResponse;
        UserFactory.loggedIn = true;
        UserFactory.broadcast('createdDecks');
      }
    });
  };

  $scope.createUser = function() {
    $scope.createError = '';
    //Need to add a UserFactory function here to validate if username already exists
    UserFactory.create($scope.createUsername, $scope.createPassword).success(function(dataResponse){
      if(dataResponse === 'error'){
        $scope.createError = 'An account with that username already exists.'
      } else {
        UserFactory.currentUser = dataResponse;
        UserFactory.loggedIn = true;
        UserFactory.broadcast('createdDecks');
      }
    });

  }

} //End of ContentController
