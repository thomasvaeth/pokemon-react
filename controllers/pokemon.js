var express = require('express');
var Pokemon = require('../models/pokemon');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Pokemon.find(function(err, pokemon) {
      if (err) return res.status(500).send(err);
      res.send(pokemon);
    });
  })
  .post(function(req, res) {
    Pokemon.create(req.body, function(err, pokemon) {
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
  })
  .put(function(req, res) {
    Pokemon.findByIdAndUpdate(req.params.id, req.body, function(err) {
      if (err) return res.status(500).send(err);
      res.send({'message': 'success'});
    });
  });

module.exports = router;
