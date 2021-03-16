import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";

export const PokemonsCard = (props) => {
    console.log("props.img = ", props.pokemons);

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    return (
        props.pokemons.map(pokemon => {
            let imagePath = "/img/" + pokemon.id + ".png"
            if (pokemon.id >= 721) {
                let randomImage = getRandomInt(1, 720);
                imagePath = "/img/" + randomImage + ".png"
            }

            return (
                    <div className="pokemons__card">
                        <NavLink to={`/pokemon/:${pokemon.id}`}>
                            {/*<h1>{pokemon.id}</h1>*/}
                            <img src={imagePath}/>
                            <h5>{pokemon.name}</h5>

                            <button
                                className="pokemons__card__btn"
                                disabled={pokemon.disabled}
                                onClick={() => {
                                    props.catchPokemon(pokemon);
                                }}
                            >Поймать покемона
                            </button>
                        </NavLink>
                    </div>
            )
        })
    )

}