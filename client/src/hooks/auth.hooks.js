import {useState, useCallback, useEffect} from 'react';

const storageName = 'user'
export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setuserId] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setuserId(id);
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken,
        }));
    }, [])

    const logout = useCallback(() => {
        setToken(null);
        setuserId(null);
        localStorage.removeItem(storageName);
    }, [])

    useEffect(() => {
        const userLocalStorage = JSON.parse(localStorage.getItem(storageName));
        if (userLocalStorage && userLocalStorage.token) {
            login(userLocalStorage.token, userLocalStorage.userId);
        }
        setReady(true);
    }, [login])

    return {login, logout, token, userId, ready}
}