angular
  .module('UpdateFactory', ['ui.router'])
  .factory('UpdateFactory', UpdateFactory);

function UpdateFactory($http, $q, UserFactory) {

  var factory = {};

  factory.updateScore = function(deckId, numCorrect, displayCount) {
    $http.post('/cards/update', {
      id: deckId,
      numCorrect: numCorrect,
      displayCount: displayCount
    }).then(function(res) {
      console.log('score updated with: ', res.data)
      return res.data;
    });
  }

  return factory;

}
