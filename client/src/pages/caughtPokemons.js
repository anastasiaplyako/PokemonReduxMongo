import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../context/auth.context";
import {CaughtPokemonsCard} from "../components/CaughtPokemon";
import '../style/pokemons/Pokemons.scss'
import {Loader} from "../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getCaughtPokemons} from "../redux/actions/actions";
import {Auth} from "./Auth";

export const CaughtPokemons = () => {
    const {token} = useContext(AuthContext);
    const dispatch = useDispatch();
    const caughtPokemons = useSelector(state => state.pokemons.caughtPokemons);
    const loading = useSelector(state => state.load.loading);
    const notAuth = useSelector(state => state.load.notAuth);

    useEffect(() => {
        dispatch(getCaughtPokemons(token))
    }, [dispatch, token])

    if (loading) {
        return <Loader/>
    }

    if (notAuth) {
        return <Auth/>
    }

    return (
        <div className="container__caught">
            {caughtPokemons.map(pokemon =>
                <CaughtPokemonsCard key={pokemon.pokemonId} pokemon={pokemon}/>
            )}
        </div>
    )
}