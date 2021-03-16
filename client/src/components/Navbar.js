import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {useAuth} from "../hooks/auth.hooks";
import {AuthContext} from "../context/auth.context";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/')
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <ul>
                    <li><NavLink to={"/img"}>pokemons</NavLink></li>
                    <li><NavLink to={"/caughtPokemons"}>caughtPokemons</NavLink></li>
                    <li><a href ="/" onClick={logoutHandler}>logout</a></li>
                </ul>
            </div>
        </nav>
    )
}