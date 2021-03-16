const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    userId: {type: String, required: true},
    pokemonId: {type: Number, required: true},
    date: {type: Date, default: null},
})

module.exports = model("CaughtPokemons", schema)