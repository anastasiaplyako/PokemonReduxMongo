const {Router} = require('express');
const Pokemons = require('../models/pokemons');
const CaughtPokemons = require('../models/caughtPokemons');
const router = Router();
const authMiddleware = require("../middleware/auth.middleware");

router.post('/catch', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.userId;
        const pokemon = req.body;
        const isExist = await CaughtPokemons.find({userId: userId, pokemonId: pokemon.id})
        if (isExist.length) {
            return res.status(400).json({
                message: "pokemon already exist"
            })
        }
        const newCaughtPokemon = new CaughtPokemons({
            userId: userId,
            pokemonId: pokemon.id,
            date: Date.now(),
        })
        await newCaughtPokemon.save();
        res.status(200).json({
            message: "Ok!"
        })
    } catch (e) {
        res.status(500).json({
            message: "Error! Try again"
        })
    }
})

router.get('/all', authMiddleware, async (req, res) => {
    try {
        const allPokemons = await Pokemons.find();
        const userId = req.user.userId;
        const existPokemons = await CaughtPokemons.find({userId: userId})
        allPokemons.map((pokemon, index) => {
            const isExist = existPokemons.some(existPokemon => { //TODO delete return
                return existPokemon.pokemonId === pokemon.id
            })
            if (isExist) {
                allPokemons[index].disabled = true;
            }
        })
        res.json(allPokemons);
    } catch (e) {
        res.status(500).json({
            message: "Error! Try again"
        })
    }
})
//idPokemons в req приходит pokemonId
router.get('/pokemon/:id', authMiddleware, async (req, res) => {
    try {
        const resultPokemon = {};
        const idReq = req.params.id.split('').slice(1).join('');
        const userId = req.user.userId;
        const pokemon = await Pokemons.findOne({id: idReq})
        const caughtPokemons = await CaughtPokemons.findOne({userId: userId, pokemonId: idReq})
        resultPokemon.id = pokemon.id;
        resultPokemon.name = pokemon.name;
        if (caughtPokemons) {
            resultPokemon.date = caughtPokemons.date.toDateString();
        }
        res.json(resultPokemon);
    } catch (e) {
        res.status(500).json({
            message: "Error! Try again"
        })
    }
})

//idUser
router.get('/caughtPokemons', authMiddleware, async (req, res) => {
    try {
        const allPokemons = await Pokemons.find();
        const catchPokemons = [];
        const userId = req.user.userId;
        const caughtPokemonsQuery = await CaughtPokemons.find({userId: userId});
        allPokemons.map(pokemon => {
            caughtPokemonsQuery.map(caughtPokemon => {
                    if (caughtPokemon.pokemonId === pokemon.id) {
                        catchPokemons.push({
                            pokemonDate: caughtPokemon.date,
                            pokemonId: caughtPokemon.pokemonId,
                            pokemonName: pokemon.name
                        })
                    }
                }
            )
        })
        res.json(catchPokemons);
    } catch (e) {
        res.status(500).json({
            message: "Error! Try again"
        })
    }
})

module.exports = router