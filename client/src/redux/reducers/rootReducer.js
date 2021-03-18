import {pokemonReducer} from "./pokemonReducer";
import {loadReducer} from "./loaderReducer";
import {combineReducers} from "redux";

export const rootReducers = combineReducers({
    pokemons: pokemonReducer,
    load: loadReducer,
})