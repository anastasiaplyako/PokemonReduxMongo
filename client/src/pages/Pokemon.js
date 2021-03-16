import React, {useCallback, useContext, useEffect, useState} from 'react'
import {PokemonCard} from "../components/PokemonCard";
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";

export const Pokemon = () => {
    const pokemonId = useParams().id;
    console.log("pokemonId", pokemonId);
    const {token} = useContext(AuthContext);

    const {request, loading} = useHttp()
    const [pokemon, setPokemon] = useState({});

    const getPokemon = useCallback(async () => {
        try {
            const url = `/api/img/pokemon/${pokemonId}`
            const fetchPokemon = await request(url, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log("fetchPokemons = ", fetchPokemon);
            setPokemon(fetchPokemon)
        } catch (e) {
        }
    }, [request, token])

    useEffect(() => {
            getPokemon().then()
        }, [getPokemon]
    )

    if (loading) {
        return (
            <Loader/>
        )
    }

    return (
        <div> {!loading && <PokemonCard pokemon={pokemon}/>} </div>


    )
}