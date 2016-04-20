angular
  .module('DeckFactory', ['ui.router'])
  .factory('DeckFactory', DeckFactory);

function DeckFactory($http, $q, UserFactory) {

  var factory = {};
  //  All decks belonging to the logged in user
  var userDecks = [];

  //  The current deck of cards selected for test
  var deck = {};

  //  The cards in the current deck
  var cardsInDeck = [];

  //  Create a new deck in database
  factory.createDeck = function(username, deckname) {
    return $http.post('/decks/create', {
      username: username,
      deckname: deckname
    }).then(function(res) {
      console.log("deckFactory return from post", res.data);
      if(res.data === "Deck already exists") {
        return new Promise(function(resolve, reject) {
          resolve(res.data);
        });
      }
      else {
      console.log("DeckFactory entered else because data doesn't exist", res.data);
      deck = res.data;
      return new Promise(function(resolve, reject) {
        resolve(res.data);
      });
    }
    });
  }

  //  Add a card to the current deck in the database
  factory.addCard = function(ques, ans) {
    console.log('INSIDE ADDCARD deckID: ', ans)
    $http.post('/cards/create', {
      deckId: deck.id,
      question: ques,
      answer: ans
    }).then(function(res) {
      return res.data;
    });
  }

  factory.getAllDecks = function(user) {

    return new Promise((resolve, reject) => {
      $http.post(
        '/decks', {username: user}
      ).success(function(data) {
        if (data[0] !== undefined) {
          userDecks = data;
        }
        resolve(data);
      }).error(function(err) {
        reject('Error');
      });
    })
  }

  //  Retrieve all cards in the current deck and store in factory
  factory.setDeck = function(index) {
    deck = userDecks[index];
    var allCards = $q.defer();
    $http.post('/cards/read', {deckId: deck.id})
      .success(function(data) {
      console.log('inside set deck http post: ', data)
      cardsInDeck = data;
      allCards.resolve(data);
    }).error(function(err) {
      console.log('error in loading cards')
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
