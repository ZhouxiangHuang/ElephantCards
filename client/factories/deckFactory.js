angular
  .module('DeckFactory', ['ui.router'])
  .factory('DeckFactory', DeckFactory);

function DeckFactory($http, $q) {

  var factory = {};

  //  All decks belonging to the logged in user
  var userDecks = [];

  //  The current deck of cards selected for test
  var deck = {};

  //  The cards in the current deck
  var cardsInDeck = [];

  //  Create a new deck in database
  factory.createDeck = function(username, deckname) {
    $http.post('/decks/create', {
      username: username,
      deckname: deckname
    }).then(function(res) {
      deck = res.data;
      return res.data;
    });
  }

  //  Add a card to the current deck in the database
  factory.addCard = function(ques, ans) {
    $http.post('/cards/create', {
      deckId: deck.id,
      question: ques,
      answer: ans
    }).then(function(res) {
      return res.data;
    });
  }

  //  Retrieve all decks for the logged in user and store in factory
  //  FIXME: Username of "Bob" is currently hard-coded in for testing
  factory.getAllDecks = function(user) {
    var allDecks = $q.defer();
    $http.post(
      '/decks', {username: "Bob"}
    ).success(function(data) {
      userDecks = data;
      allDecks.resolve(data);
    }).error(function(err) {
      allDecks.reject('Error');
    });
    return allDecks.promise;
  }

  //  Retrieve all cards in the current deck and store in factory
  factory.setDeck = function(index) {
    deck = userDecks[index];
    var allCards = $q.defer();
    $http.post('/cards/read', {deckId: deck.id})
      .success(function(data) {
      cardsInDeck = data;
      allCards.resolve(data);
    }).error(function(err) {
      allCards.reject('There was an error loading all cards');
    });
    return allCards.promise;  //  This return may not be necessary
  }

  //  Returns the name of the current deck
  factory.getDeckname = function() {
    return deck.deckname;
  }

  //  Returns the cards in the current deck
  factory.loadDeck = function() {
    return cardsInDeck;
  }

  return factory;
}
