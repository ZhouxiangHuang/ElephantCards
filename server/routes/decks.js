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
  public: Sequelize.BOOLEAN,
  description: Sequelize.STRING
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
            public: req.body.public,
            description: req.body.description
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
      $or: [{username: req.body.username}, {public: true}]
		}
	}).then(function(decksObj) {
    res.send(decksObj)
	}).catch(function(error) {
				 console.error(error);
	})
});

router.post('/delete', function(req, res) {
  console.log('delete post attempted on: ', req.body.deckId)
		Decks.destroy({
			where: {
				id: req.body.deckId
			}
		});
});

module.exports = router;
