const express = require('express');
const router = express.Router();

const Sequelize = require('sequelize');
const connection = new Sequelize('nepjkxqe', 'nepjkxqe', '5cbkWaflhGil6H-ISFmYojJW21p7BIhI', {
  host: 'pellefant-02.db.elephantsql.com',
  dialect: 'postgres',
});

// deck tables
var Decks = connection.define('decks', {
	username: Sequelize.STRING,
	deckname: Sequelize.STRING,
  public: Sequelize.BOOLEAN
})

// create a new deck, insert into postgres
router.post('/create', function(req,res) {
  // console.log('does this even happen: ', req.body)
    connection.sync().then(function() {
      Decks.findOne({where: {username: req.body.username, deckname: req.body.deckname}})
      .then(function(result) {
        if (result === null) {
          Decks.create({
            username: req.body.username,
            deckname: req.body.deckname,
            public: req.body.public
          }).then(function(newDeck) {
            res.send(newDeck);
          }).catch(function(error) {
            console.error(error);
          })
        }
        else {
          res.send("Deck already exists");
        }
    });
  });
});

// delete a deck
router.post(function(req,res) {
	Decks.destroy({
		where: {
			id: req.body.id
		}
	});

	Cards.findAll({
		where: {
			deckId: req.body.deckId
		}
	}).then(function(cards) {
		cards.forEach(function(card) {
			Cards.destroy({
				where: {
					id: card.id // ??
				}
			})
		})
	})
});

// read all decks of 1 user
router.post('/', function(req, res) {
	console.log('router.post req.body: ', req.body.username);
	Decks.findAll({
		where: {
			username: req.body.username
		}
	}).then(function(decksObj) {
    res.send(decksObj)
	}).catch(function(error) {
				 console.error(error);
	})
});

// INPUT: deleteDeck(32);
module.exports = router;
