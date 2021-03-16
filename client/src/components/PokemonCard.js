import React, {useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/auth.context";

export const PokemonCard = (props) => {
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);
    const pokemon = props.pokemon;
    const isCatch = pokemon.date;
    console.log("pokemon", pokemon.date);
    return (
        <div className="container">
            <p>{pokemon.name}</p>
            <p>{pokemon.id}</p>
            {isCatch && <p>{pokemon.date}</p>}
            {isCatch ? <p>Статус: пойман</p> : <p>Статус: не пойман</p>}
            <img src={`/img/${pokemon.id}.png`} alt={"Покемон"}/>
        </div>
    )
}