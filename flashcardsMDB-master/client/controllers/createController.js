angular
  .module('CreateController', ['ui.router'])
  .controller('CreateController', CreateController);

function CreateController($scope, $q, DeckFactory, UserFactory) {

  //  Set to true after user submits name for new deck
  $scope.named = false;

  //  FIXME: Username should not be hard-coded in
  $scope.username = 'Bob';
  $scope.currentView = '';
  $scope.$on('handleBroadcast', function(event, status) {
    $scope.currentView = status;
  });

  $scope.previousPage = function () {
    $scope.currentView = '';
    UserFactory.broadcast('createdDecks');
  }
  //  Add new deck to decks table in database
  $scope.createDeck = function() {
    $scope.named = true;
    DeckFactory.createDeck($scope.username, $scope.deckname);
  }

  //  Add new card to cards table in database
  $scope.addCard = function() {
    DeckFactory.addCard($scope.newQ, $scope.newA);
    $scope.newQ = $scope.newA = "";
  }

}
