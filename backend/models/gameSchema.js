var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
    game: {
        type: String,
        required: true
    },
    minPlayers: Number,
    maxPlayers: Number,
    playerProvidedMaterial: Boolean,
    minPlayTimeInHours:Number
});

module.exports = mongoose.model('Game',gameSchema);