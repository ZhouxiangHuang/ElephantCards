angular
  .module('MainController', ['ui.router'])
  .controller('MainController', MainController);


function MainController($scope, $state, DeckFactory, UserFactory) {
  $scope.currentView = 'createdDecks';
  //  Retrieves an array of the user's decks from the factory
  $scope.getAllDecks = function() {
    DeckFactory.getAllDecks()
      .then(function(result) {
        $scope.decks = result;
    });
  }

  //  Select new deck to load into factory, then redirect to test page
  $scope.setDeck = function(index) {
    DeckFactory.setDeck(index)
      .then(function() {
        $state.go('test');
    });
  }


  //Broadcasts page on click
  $scope.currentDeck = function() {
    UserFactory.broadcast('currentDeck');
  }

  //Receives broadcast
  $scope.$on('handleBroadcast', function(event, status) {
    $scope.currentView = status;
  });


  $scope.createDeck = function() {
    // DeckFactory.setDeck(deckId);
    $scope.currentView = '';
    UserFactory.broadcast('createDeck');
  }

  //  Initialize view
  $scope.getAllDecks();

}
