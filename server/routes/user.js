const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('elephantdb', 'dumbo', 'peanuts', {
  host: 'localhost',
  dialect: 'postgres',
});

//Define User
var User = sequelize.define('user', {
  username: {type: Sequelize.STRING, unique: true, allowNull: false},
  password: {type: Sequelize.STRING, allowNull: false}
});

//Finds existing user in database after bcrypt hash
router.post('/', function(req, res) {
  console.log('inside find user in database')
  User.findOne({ where: { username: req.body.username } }).then(function(item) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 10);
    if(bcrypt.compareSync(req.body.password, item.dataValues.password)) {
      res.send(req.body.username);
    } else {
      res.send('error');
    }
  });
});

//Creates new user in database after bcrypt hash
router.post('/create', function(req, res) {
  console.log('inside create user in database')
  var hashedPassword = bcrypt.hashSync(req.body.password, 10);
  console.log('hasedPassword: ', hashedPassword)
  sequelize.sync().then(function() {
    User.create({
      username: req.body.username,
      password: hashedPassword,
    }).catch(function(error) {
      // console.error(error);
    });
  });
});

module.exports = router;
