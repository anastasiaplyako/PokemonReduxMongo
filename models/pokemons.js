const {Schema, model} = require("mongoose");

const schema = new Schema({
    id: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    disabled: {type: Boolean}
})

module.exports = model("Pokemons", schema)