import React, {useContext, useEffect, useState} from 'react';
import {useHttp, } from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";


export const Auth = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        login: "", password: ""
    })

    useEffect(() => {
        console.log("error", error)
        message(error);
        clearError();
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", {...form})
            auth.login(data.token, data.userId);
        } catch (e) {
        }
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form});
            message(data.message)
        } catch (e) {
            console.log("eee =", e);
        }

    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card ">
                    <div className="card-content white-text">
                        <div className="input-field">
                            <input
                                id="login"
                                type='text'
                                name="login"
                                onChange={changeHandler}
                            />
                            <label htmlFor="login">Логин</label>
                        </div>
                        <div className="input-field">
                            <input
                                id="password"
                                type='text'
                                name="password"
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn deep-orange lighten-5 black-text"
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Войти
                        </button>
                        <button
                            className="btn deep-orange lighten-5 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}