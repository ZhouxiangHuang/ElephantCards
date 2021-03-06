const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const connection = new Sequelize('nepjkxqe', 'nepjkxqe', '5cbkWaflhGil6H-ISFmYojJW21p7BIhI', {
  host: 'pellefant-02.db.elephantsql.com',
  dialect: 'postgres',
});

//Define User
var User = connection.define('user', {
  username: {type: Sequelize.STRING, unique: true, allowNull: false},
  password: {type: Sequelize.STRING, allowNull: false}
});

//Finds existing user in database after bcrypt hash
router.post('/', function(req, res) {

  User.findOne({ where: { username: req.body.username } }).then(function(item) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 10);
    if(item) {
      if(bcrypt.compareSync(req.body.password, item.dataValues.password)) {
        res.send(req.body.username);
      }
      else {
       res.send('error');
     }
    }
     else {
      res.send('error');
    }
  });
});

//Creates new user in database after bcrypt hash
router.post('/create', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 10);
  connection.sync().then(function() {
    User.findOne({where: { username: req.body.username}}).then(function(item){
      if(!item){
        User.create({
          username: req.body.username,
          password: hashedPassword,
        }).catch(function(error) {
          console.error(error);
        });
        res.send(req.body.username);
        }
      else {
        res.send('error');
      }
    });
  });
});

module.exports = router;
