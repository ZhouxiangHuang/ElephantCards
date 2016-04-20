angular
  .module('TestController', ['ui.router'])
  .controller('TestController', TestController);

function TestController($scope, DeckFactory, UserFactory, UpdateFactory) {

  //  The text to display on the card
  $scope.showText;

  //  The index of the current displayed card in deck
  $scope.index = 0;

  //  True when question is to be shown; false for answer
  $scope.showQ = true;
  $scope.currentView = '';
  $scope.deleteCardIndexes = [];

  $scope.$on('handleBroadcast', function(event, status) {
    $scope.currentView = status;
    if(status === 'currentDeck') {
      $scope.deckName = DeckFactory.getDeckname();
      $scope.cards = DeckFactory.loadDeck();
      $scope.numCards = $scope.cards.length;
      $scope.showCard();
    }
  });

  $scope.previousPage = function() {
    $scope.currentView = '';
    UserFactory.broadcast('createdDecks');
  }

  //  Retrieve array of cards and deck name from factory and display first question
  // $scope.getCards = function() {

  $scope.calculateHistory = function(card) {
    if(card.displayCount === 0) return '.....'
    return Math.floor(card.numCorrect / card.displayCount * 100) + '%';
  }


  //  Display the appropriate question or answer
  //  'cardSide' is the text at the top of the card
  $scope.showCard = function() {
    if ($scope.showQ) {
      $scope.cardSide = "Question";
      $scope.showText = $scope.cards[$scope.index].question;
      $scope.history = $scope.calculateHistory($scope.cards[$scope.index]);
    } else {
      $scope.cardSide = "Answer";
      $scope.showText = $scope.cards[$scope.index].answer;
      $scope.history = $scope.calculateHistory($scope.cards[$scope.index]);
    }
  }

  //  Advance the card when user selects 'next', 'correct', or 'incorrect'
  $scope.nextCard = function(correct) {
    console.log('the cards object: ', $scope.cards[0].deckId);
    if (correct === "Y") $scope.cards[$scope.index].numCorrect++;
    if (correct === "Y" || correct === "N") $scope.cards[$scope.index].displayCount++;
    //  TODO: Randomize next card
    if ($scope.index + 1 === $scope.numCards) {
      $scope.index = 0;
      $scope.logCards();
    }
    else ++$scope.index;

    if($scope.deleteCardIndexes.indexOf($scope.index) > -1) {
      console.log('should not happen before a delete')
      if($scope.numCards !== $scope.deleteCardIndexes.length) {
        $scope.nextCard();
      } else {
        $scope.showText = 'This deck is empty, please delete it or add more cards';
      }
    } else {
      //  When next card is shown, text should be the question
      $scope.showQ = true;
      $scope.showCard();
    }


  }


  //  Alternate between question and answer
  $scope.flipCard = function() {
    $scope.showQ = !$scope.showQ;
    $scope.showCard();
  }

  // Update the database with the user's performance details
  $scope.logCards = function() {
    $scope.cards.forEach(function(card) {
      UpdateFactory.updateScore(card.id, card.numCorrect, card.displayCount);
    });
  }

  //delete current card from the deck
  $scope.deleteCard = function() {
    $scope.deleteCardIndexes.push($scope.index);
    UpdateFactory.removeCardFromDeck($scope.cards[$scope.index].id);

  }

  $scope.addMoreCards = function() {
    $scope.currentView = '';
    UserFactory.broadcast('createDeck',  { deckname: $scope.deckName, existingDeck: true });
  }

  $scope.deleteDeck = function() {
    console.log('deleteDeck called');
    $scope.currentView = '';
    var deleteThisDeck = new Promise((resolve, reject) => {
        resolve(UpdateFactory.removeEntireDeck($scope.cards[0].deckId));
      });
    deleteThisDeck.then(data => {
      console.log(data);
      UserFactory.broadcast('createdDecks');
    })

  }

}
