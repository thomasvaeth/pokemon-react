var mongoose = require('mongoose');

var PokemonSchema = new mongoose.Schema({
  name: String,
  sprite: String,
  hp: Number,
  height: Number,
  weight: Number,
  national_id: Number,
  attack: Number,
  defense: Number,
  speed: Number,
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
