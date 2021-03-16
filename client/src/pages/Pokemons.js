import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../context/auth.context";
import {useHttp} from "../hooks/http.hooks";
import {PokemonsCard} from "../components/Pokemons";
import config from '../../package.json'
import {Loader} from "../components/Loader";
import '../style/Pokemons.scss'
import '../style/loadMore.scss'
import '../style/loader.scss'

export const Pokemons = () => {
    const {token} = useContext(AuthContext);
    const {request, loading} = useHttp()
    const [pokemons, setPokemons] = useState([{}]);
    const [page, setPage] = useState(1);
    const [displayData, setDisplayData] = useState([{}]);

    const catchPokemon = async (pokemon) => {
        try {
            pokemon.disabled = true;
            await request('/api/img/catch', 'POST', pokemon, {
                Authorization: `Bearer ${token}`
            })
        } catch (e) {
        }
    }

    const loadMore = () => {
        setPage(page + 1)
        setDisplayData(pokemons.slice(0, (page + 1) * 6))
    }

    const getPokemons = useCallback(async () => {
        try {
            const fetchPokemons = await request('/api/img/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setPokemons(fetchPokemons)
            setDisplayData(fetchPokemons.slice(0, 6));
        } catch (e) {
            console.log("err", e)
        }
    }, [token, request])

    useEffect(() => {
        getPokemons().then(r => {
        })
    }, [getPokemons])

    if (loading) {
        return <Loader/>
    }

    return (
        <div className="container">
            {!loading && <div className="container">
                <div className="pokemons">
                    <PokemonsCard
                        pokemons={displayData}
                        enableCatchBtn={true}
                        catchPokemon={catchPokemon}
                    />
                </div>
                <button className="loadMore" onClick={loadMore}>Load more</button>
            </div>
            }
        </div>
    )
}