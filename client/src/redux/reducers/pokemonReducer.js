import {CAUGHT_POKEMON, GET_POKEMON, GET_POKEMONS, LOAD_MORE, RESET_POKEMON} from "../actions/actionTypes";

const initialState = {
    pokemons: [],
    displayPokemons: [],
    caughtPokemons: [],
    page: 1,
    isInit: false,
    pokemon: {}
};

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS: {
            if (!state.pokemons.length) {
                state.isInit = true;

            }
            return {
                ...state,
                pokemons: action.payload,
                displayPokemons: state.pokemons.concat(action.payload).slice(0, state.page * 6)
            }
        }
        case LOAD_MORE: {
            return {
                ...state,
                page: state.page + 1,
                displayPokemons: state.pokemons.slice(0, (state.page + 1) * 6),
            }
        }
        case CAUGHT_POKEMON: {
            return {
                ...state,
                caughtPokemons: action.payload
            }
        }
        case GET_POKEMON: {
            return {
                ...state,
                pokemon: action.payload
            }
        }
        case RESET_POKEMON: {
            return {
                ...state,
                pokemon: {},
                caughtPokemons: [],
                pokemons: [],
            }
        }
        default: {
            return state;
        }
    }
}

