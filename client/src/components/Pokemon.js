import {NavLink} from "react-router-dom";
import React, {useState} from "react";


const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export const Pokemon = (props) => {

    let imagePath = "/img/" + props.pokemon.id + ".png"
    if (props.pokemon.id >= 721) {
        let randomImage = getRandomInt(1, 720);
        imagePath = "/img/" + randomImage + ".png"
    }
    const [isUpdate, setIsUpdate] = useState(false);

    return (
        <div className="pokemons__card">
            <NavLink to={`/pokemon/:${props.pokemon.id}`}>
                <img src={imagePath} alt="pokemon"/>
                <h5>{props.pokemon.name}</h5>
            </NavLink>
            <button
                className="pokemons__card__btn"
                disabled={props.pokemon.disabled}
                onClick={() => {
                    setIsUpdate(true);
                    props.pokemon.disabled = true;
                    props.catchPokemon(props.pokemon);
                }}
            >{'Поймать покемона'}
            </button>
        </div>
    )
}
