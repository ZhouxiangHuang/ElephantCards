const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//Import Routes
const users = require('./routes/user');
const decks = require('./routes/decks');
const cards = require('./routes/cards');

app.use(express.static(path.join(__dirname, './../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/users', users);
app.use('/decks', decks);
app.use('/cards', cards);

app.use(express.static(path.join(__dirname, './../client/')));

// render index page
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname + './../client'));
})

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on port 3000");
});
