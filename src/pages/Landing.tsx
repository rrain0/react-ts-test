import React from "react";
import reactLogo from '../assets/icons/react-logo.svg';
import s from './Landing.module.scss';
import {Link} from "react-router-dom";


const Landing = () => {
    return <div className={s.App}>
        <header className={s.AppHeader}>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <div><img src={reactLogo} className={s.AppLogo} alt="logo"/></div>
                <div><p>Edit any file and save to reload.</p></div>
                <div><a className={s.AppLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a></div>
                <div><Link className={s.AppLink} to={"/throw-error"}>Throw Error</Link></div>
                <div><Link className={s.AppLink} to={"/socketio/chat"}>Socket IO test in SamuraiJS Chat</Link></div>
            </div>
        </header>
    </div>
}
export default Landing