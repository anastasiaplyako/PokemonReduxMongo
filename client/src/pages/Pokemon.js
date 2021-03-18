import React, {useContext, useEffect} from 'react'
import {PokemonCard} from "../components/PokemonCard";
import {useParams} from 'react-router-dom'
import {AuthContext} from "../context/auth.context";
import {Loader} from "../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getPokemon} from "../redux/actions/actions";

export const Pokemon = () => {
    const pokemonId = useParams().id;
    const {token} = useContext(AuthContext);
    const dispatch = useDispatch();
    const loading = useSelector(state => state.load.loading);
    //this code was not removed on purpose, as it works faster with it
    //
    /* const [pokemon, setPokemon] = useState({});
        const {request, loading} = useHttp()
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
     }, [request, token])*/

    let pokemon = useSelector(state => state.pokemons.pokemon);
    let pokemonDisplay = [];

    useEffect(() => {
            dispatch(getPokemon(pokemonId, token));
        }, [dispatch, pokemonId, token]
    )

    if (loading) {
        return (
            <Loader/>
        )
    }
    let isDown = pokemon.id == pokemonId.split('').slice(1).join('');
    if (isDown) {
        pokemonDisplay = pokemon;
    }

    return (
        <div> {!loading && isDown && <PokemonCard pokemon={pokemonDisplay}/>} </div>
    )
}