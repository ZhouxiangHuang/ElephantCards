angular
  .module('MDB.ContentController', ['ui.router'])
  .controller('ContentController', ContentController);

function ContentController($scope, UserFactory) {
  //Receives broadcast to change from landing page to login page on authentication
  $scope.landingPage = 'landing';
  $scope.$on('handleBroadcast', function(event, status) {
    $scope.landingPage = status;
  });
}
