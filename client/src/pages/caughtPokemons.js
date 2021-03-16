import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hooks";
import {useAuth} from "../hooks/auth.hooks";
import {AuthContext} from "../context/auth.context";
import {PokemonsCard} from "../components/Pokemons";
import {CaughtPokemonsCard} from "../components/CaughtPokemon";
import '../style/Pokemons.scss'
import {Loader} from "../components/Loader";

export const CaughtPokemons = () => {
    const {token} = useContext(AuthContext);
    console.log("token = ", token);
    const {request, loading} = useHttp()
    const [catchPokemons, setCatchPokemons] = useState([{}]);

    const getPokemons = useCallback(async () => {
        try {
            const fetchPokemons = await request('/api/img/caughtPokemons', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setCatchPokemons(fetchPokemons)
        } catch (e) {
            console.log("err", e)
        }
    }, [token, request])

    useEffect(() => {
        getPokemons().then(r => {
        })
    }, [getPokemons])

    if (loading) {
        return (
            <Loader/>
        )
    }
    
    return (
        <div className="container"> {
            !loading && <div className="pokemons">
                <CaughtPokemonsCard
                    pokemons={catchPokemons}
                    enableCatchBtn={false}
                />
            </div>
        }
        </div>


    )
}