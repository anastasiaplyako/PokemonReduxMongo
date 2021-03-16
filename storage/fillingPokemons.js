let fs = require('fs');
const Pokemons = require("../models/pokemons");
const mongoose = require("mongoose");
const config = require("../config/default.json");

const fillingPokemonsBd = async () => {
    let pokemons = JSON.parse(fs.readFileSync("./db.json", 'utf8'));

    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        pokemons["pokemons"].map(async pokemon => {
            const newPokemon = new Pokemons({
                id: pokemon.id,
                name: pokemon.name,
                disabled: false
            })
            await newPokemon.save();
        })
    } catch (e) {
        console.log("error", e)
    }

}


fillingPokemonsBd().then();

