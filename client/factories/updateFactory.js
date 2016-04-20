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

  return factory;

}
