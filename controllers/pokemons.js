var express = require('express');
var Pokemon = require('../models/pokemon');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Pokemon.find(function(err, pokemon) {
      if (err) return res.status(500).send(err);
      res.send(pokemon);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Pokemon.findOne({national_id: req.params.id}, function(err, pokemon) {
      if (err) return res.status(500).send(err);
      res.send(pokemon);
    });
  });

module.exports = router;
