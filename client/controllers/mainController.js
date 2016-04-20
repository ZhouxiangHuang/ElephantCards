angular
  .module('MainController', ['ui.router'])
  .controller('MainController', MainController);


function MainController($scope, $state, DeckFactory, UserFactory) {
  $scope.currentView = 'createdDecks';
  //  Retrieves an array of the user's decks from the factory
  $scope.getAllDecks = function() {
    DeckFactory.getAllDecks(UserFactory.currentUser)
      .then(result => {
        $scope.decks = result;
        console.log("getAllDecks result: ", result);
        DeckFactory.userDecks = result;
        $scope.$apply($scope.decks);
    });
  }

  //  Select new deck to load into factory, then redirect to test page
  $scope.setDeck = function(index) {
    console.log('index: ', index);
    DeckFactory.setDeck(index)
      .then(function(data) {
        console.log("then setDeck in MainController");
        console.log("data coming back from DeckFactory", data);
        UserFactory.broadcast('currentDeck');
    });
  }

  //ANDREW BURKE turned this off because it was messing with the TestController.  It seems that it was unneccessary.
  //Broadcasts page on click
  // $scope.currentDeck = function() {
  //   UserFactory.broadcast('currentDeck');
  // }

  //Receives broadcast
  $scope.$on('handleBroadcast', function(event, status) {

    $scope.currentView = status;
    $scope.getAllDecks();
  });


  $scope.createDeck = function() {
    // DeckFactory.setDeck(deckId);
    $scope.currentView = '';
    UserFactory.broadcast('createDeck');
  }

  //  Initialize view
  $scope.getAllDecks();

}
