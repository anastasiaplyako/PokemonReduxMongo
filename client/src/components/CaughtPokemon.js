import React from 'react';
import {NavLink} from "react-router-dom";

export const CaughtPokemonsCard = (props) => {

    return (
        props.pokemons.map(pokemon => {
            const imagePath = "/img/" + pokemon.pokemonId + ".png"
            return (
                <div className="pokemons__card">
                    <NavLink to={`/pokemon/:${pokemon.pokemonId}`}>
                        {/*<h1>{pokemon.pokemonId}</h1>*/}
                        <img src={imagePath}/>
                        <h5>{pokemon.pokemonName}</h5>
                    </NavLink>
                </div>
            )
        })
    )

}