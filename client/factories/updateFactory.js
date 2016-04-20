angular
  .module('UpdateFactory', ['ui.router'])
  .factory('UpdateFactory', UpdateFactory);

function UpdateFactory($http, $q, UserFactory) {

  var factory = {};

  factory.updateScore = function(cardId, numCorrect, displayCount) {
    $http.post('/cards/update', {
      id: cardId,
      numCorrect: numCorrect,
      displayCount: displayCount
    }).then(function(res) {
      console.log('score updated with: ', res.data)
      return res.data;
    });
  }

  factory.removeCardFromDeck = function(cardId) {
    $http.post('/cards/delete', {
      id: cardId
    })
  }

  factory.removeEntireDeck = function(deckId) {
    $http.post('/decks/delete', {
      deckId: deckId
    }).then(function(){
      return deckId;
    });
    $http.post('/cards/deleteAll', {
      deckId: deckId
    }).then(function(){
      return deckId;
    });
  }

  return factory;

}
