import React from 'react';
import {NavLink} from "react-router-dom";
import '../style/pokemons/Pokemons.scss'

export const CaughtPokemonsCard = (props) => {
    return (
        <div className="pokemons__card">
            <NavLink to={`/pokemon/:${props.pokemon.pokemonId}`}>
                <img src={"/img/" + props.pokemon.pokemonId + ".png"} alt={"pokemon"}/>
                <h5>{props.pokemon.pokemonName}</h5>
            </NavLink>
        </div>
    )
}