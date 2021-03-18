import React from 'react'
import '../style/pokemonCard/pokemonCard.scss'

export const PokemonCard = (props) => {
    const pokemon = props.pokemon;
    const isCatch = pokemon.date;
    return (
        <div className="container__card">
            <div className="card__pokemon">
                <div className="card__img">
                    <img src={`/img/${pokemon.id}.png`} alt={"Покемон"}/>
                </div>
                <div className="card__info">
                    <h3>{pokemon.name}</h3>
                    <p>ID: {pokemon.id}</p>
                    {isCatch && <p> Дата: {pokemon.date}</p>}
                    {isCatch ? <p>Статус: пойман</p> : <p>Статус: не пойман</p>}
                </div>
            </div>
        </div>
    )
}