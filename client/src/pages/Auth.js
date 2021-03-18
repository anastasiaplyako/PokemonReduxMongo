import React, {useContext, useEffect, useState} from 'react';
import {useHttp,} from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";
import {useDispatch} from "react-redux";
import {resetAll} from "../redux/actions/actions";
import "../style/auth/auth.scss"

export const Auth = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        login: "", password: ""
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        auth.logout();
        dispatch(resetAll());
        try {
            const data = await request('/api/auth/login', "POST", {...form})
            auth.login(data.token, data.userId);
        } catch (e) {
        }
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form});
            message(data.message);
        } catch (e) {
            console.log("e =", e);
        }
    }


    return (
        <div className="first">
            <div className="first__auth">
                <div className="first__auth__input">
                    <input
                        className="input"
                        type='text'
                        id="login"
                        name="login"
                        onChange={changeHandler}
                        placeholder="Login"
                    />
                    <input
                        id="password"
                        className="input"
                        name="password"
                        type='text'
                        onChange={changeHandler}
                        placeholder="Password"
                    />
                </div>
                <div className="first__auth__operations">
                    <button
                        className="first__auth__operations_login"
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Войти
                    </button>
                    <button
                        className="first__auth__operations_register"
                        onClick={registerHandler}
                        disabled={loading}
                    >
                        Регистрация
                    </button>
                </div>
            </div>
        </div>

    )
}