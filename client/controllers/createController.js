angular
  .module('CreateController', ['ui.router'])
  .controller('CreateController', CreateController);

function CreateController($scope, $q, DeckFactory, UserFactory) {

  //  Set to true after user submits name for new deck
  $scope.named = false;

  //  FIXME: Username should not be hard-coded in
  $scope.username = UserFactory.currentUser;
  $scope.currentView = '';
  $scope.$on('handleBroadcast', function(event, status) {
    $scope.currentView = status;
  });

  $scope.previousPage = function () {
    $scope.currentView = '';
    DeckFactory.getAllDecks(UserFactory.currentUser);
    UserFactory.broadcast('createdDecks');
  }
  //  Add new deck to decks table in database
  $scope.createDeck = function() {
    // console.log('inside create controller create deck function UserFactory.name: ', UserFactory.currentUser)
    DeckFactory.createDeck(UserFactory.currentUser, $scope.deckname).then(function(response){
      if(response === "Deck already exists") {
        $scope.named = false;
        $scope.deckResponse = response;
      }
      else {
        console.log("This should print");
        $scope.named = true;
      }
    });
  }

  //  Add new card to cards table in database
  $scope.addCard = function() {
    DeckFactory.addCard($scope.newQ, $scope.newA);
    $scope.newQ = $scope.newA = "";
  }



}
