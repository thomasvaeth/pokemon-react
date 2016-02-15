var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/pokemon');
app.use('/api/pokemon', require('./controllers/pokemon'));

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, function() {
	console.log('I gotta catch ' + port + ' Pokemon.');
});