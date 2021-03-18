import {
    CAUGHT_POKEMON, GET_POKEMON,
    GET_POKEMONS, HIDE_LOADER,
    LOAD_MORE, NOT_AUTH, RESET_POKEMON, SHOW_LOADER
} from './actionTypes'

export const fetchPokemons = (token) => {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await fetch('/api/img/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const fetchPokemons = await response.json();
            if (fetchPokemons.message) {
                dispatch({
                    type: NOT_AUTH
                })
            } else {
                dispatch({
                    type: GET_POKEMONS,
                    payload: fetchPokemons
                })
            }
            dispatch(hideLoader());
        } catch (e) {
            console.log("err", e)
        }

    }
}

export function putPokemon(pokemon, token) {
    return async dispatch => {
        try {
            pokemon.disabled = true;
            pokemon.pokemonId = pokemon.id;
            const response = await fetch('/api/img/catch', {
                method: 'POST',
                body: JSON.stringify(pokemon),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            await response.json();
        } catch (e) {
            console.log("err", e)
        }
    }

}

export function loadMorePokemons() {
    return {
        type: LOAD_MORE
    }
}

export function getCaughtPokemons(token) {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await fetch('/api/img/caughtPokemons', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const fetchPokemons = await response.json();
            dispatch({
                type: CAUGHT_POKEMON,
                payload: fetchPokemons
            })
            dispatch(hideLoader());

        } catch (e) {
            console.log("err", e)
        }

    }
}

export function getPokemon(pokemonId, token) {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await fetch(`/api/img/pokemon/${pokemonId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const fetchPokemon = await response.json();
            dispatch({
                type: GET_POKEMON,
                payload: fetchPokemon
            })
            dispatch(hideLoader());
        } catch (e) {
            console.log("err", e)
        }
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function resetAll() {
    return {
        type: RESET_POKEMON
    }
}

