import React, {useCallback, useContext, useEffect} from 'react'
import {AuthContext} from "../context/auth.context";
import {PokemonsCard} from "../components/Pokemons";
import {Loader} from "../components/Loader";
import '../style/pokemons/Pokemons.scss'
import '../style/loadMore/loadMore.scss'
import '../style/loader/loader.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchPokemons, loadMorePokemons, putPokemon} from "../redux/actions/actions"
import {Auth} from "./Auth";

export const Pokemons = () => {
    const dispatch = useDispatch();
    const {token} = useContext(AuthContext);
    const pokemons = useSelector(state => state.pokemons.pokemons);
    const displayPokemons = useSelector(state => state.pokemons.displayPokemons);
    const loading = useSelector(state => state.load.loading);
    const notAuth = useSelector(state => state.load.notAuth);

    const loadMore = useCallback(() => {
        dispatch(loadMorePokemons())
    }, [dispatch])

    const catchPokemon = useCallback((pokemon) => {
        dispatch(putPokemon(pokemon, token));
    }, [dispatch, token])

    useEffect(() => {
        if (!pokemons.length) {
            dispatch(fetchPokemons(token))
        }
    }, [dispatch, token, pokemons.length])

    if (loading) {
        return <Loader/>
    }

    if (notAuth) {
        return <Auth/>
    }

    return (
        <>
            {!loading && <div className="container">
                <div className="pokemons">
                    <PokemonsCard
                        pokemons={displayPokemons}
                        enableCatchBtn={true}
                        catchPokemon={catchPokemon}
                    />
                </div>
                <button className="loadMore" onClick={loadMore}>Load more</button>
            </div>
            }
        </>
    )
}