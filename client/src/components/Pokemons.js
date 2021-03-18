import React from 'react';
import {Pokemon} from "./Pokemon";

export const PokemonsCard = (props) => {
    return (
        props.pokemons.map(pokemon => {
            return (<Pokemon pokemon={pokemon} key={pokemon.id} catchPokemon={props.catchPokemon}/>)
        })
    )
}