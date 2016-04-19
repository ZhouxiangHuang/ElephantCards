angular
  .module('MDB.LoginController', ['ui.router'])
  .controller('LoginController', LoginController);

function LoginController($scope, UserFactory) {
  $scope.name = '';
  $scope.errorText = '';
  $scope.signupText = '';
  $scope.loginText = 'Logging in - Click here to create an account.';
  $scope.loggedIn = false;
  $scope.logoutButton = false;

  //Find the User in the Database through user.js routes
  //If $scope.loginText is true - User will log in
  //Otherwise a new user will be created
  $scope.login = function() {
    if($scope.loginText) {
      console.log('login text is displayed')
      UserFactory.fetch($scope.username, $scope.password).success(function(dataResponse) {
        if(dataResponse === 'error') {
          $scope.errorText = 'User/Password is incorrect.'
        } else {
          UserFactory.currentUser = dataResponse;
          $scope.name = 'Hello ' + dataResponse;
          $scope.loggedIn = $scope.logoutButton = true;
          UserFactory.broadcast('createdDecks');
        }
      });
    } else {
      console.log('insdie create')
      UserFactory.create($scope.username, $scope.password);
      $scope.name = 'Hello ' + $scope.username;
      $scope.loggedIn = $scope.logoutButton = true;
      UserFactory.broadcast('createdDecks');
    }
  };


  //Logs out user by using broadcast to change the view
  $scope.logout = function() {
    $scope.name = '';
    $scope.loggedIn = $scope.logoutButton = false;
    UserFactory.broadcast('landing');
  }

  //Toggled Login / Create text on nav.html
  $scope.textHandler = function() {
    if($scope.signupText) {
      $scope.signupText = '';
      console.log('flip 1')
      $scope.loginText = 'Logging in - Click here to create an account.';
    } else {
        console.log('flip 2')
      $scope.signupText = 'Creating an Account - Click here to login in.';
      $scope.loginText = '';
    }
  };
}
