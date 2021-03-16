import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Pokemons} from "./pages/Pokemons";
import {CaughtPokemons} from './pages/caughtPokemons';
import {Auth} from "./pages/Auth";
import {PokemonCard} from "./components/PokemonCard";
import {Pokemon} from "./pages/Pokemon";

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/pokemons" exact>
                    <Pokemons/>
                </Route>
                <Route path="/caughtPokemons">
                    <CaughtPokemons/>
                </Route>
                <Route path="/pokemon/:id">
                    <Pokemon/>
                </Route>
                <Redirect to="/pokemons"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}
