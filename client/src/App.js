import React from 'react';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hooks";
import {AuthContext} from "./context/auth.context";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    if (!ready) {
        return (
            <Loader/>
        )
    }

    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
            <Router>
                { isAuth && <Navbar/> }
                {routes}
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
