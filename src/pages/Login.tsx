import {useState} from "react";
import * as React from "react";
import {authApi} from "../repo/samuraiApi";


const Login = () => {
    const [login, setLogin] = useState("")
    const [pwd, setPwd] = useState("")

    const onLoginInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(ev.currentTarget.value)
    }
    const onPwdInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setPwd(ev.currentTarget.value)
    }
    const logIn = () => {
        authApi.login(login, pwd, true)
    }

    return <div>
        <div><input value={login} onInput={onLoginInput}/></div>
        <div><input type='password'value={pwd} onInput={onPwdInput}/></div>
        <div><button onClick={logIn}>Login!!!</button></div>
    </div>
}
export default Login