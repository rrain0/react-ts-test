import React from "react";
import reactLogo from '../../assets/icons/react-logo.svg';
//import reactLogo from '@ic/react-logo.svg';
import s from './Landing.module.scss';
import {Link} from "react-router-dom";
import styled from "styled-components";


const Landing = () => {
  return <div className={s.App}>
    <header className={s.AppHeader}>
      <div style={{display:'flex', flexDirection: 'column'}}>
        <div><img src={reactLogo} className={s.AppLogo} alt="logo"/></div>
        <div><p>Edit any file and save to reload.</p></div>
        
        {/* old way using <a> */}
        <div><a className={s.AppLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a></div>
        
        {/* new way using styled component based on Link from react-router-dom */}
        <div><Link1 to={"/throw-error"}>Throw Error</Link1></div>
        <div><Link1 to={"/samurai/login"}>Samurai Login</Link1></div>
        <div><Link1 to={"/samurai/profile"}>Samurai Profile</Link1></div>
        <div><Link1 to={"/socketio/chat"}>Socket IO test in SamuraiJS Chat</Link1></div>
        <div><Link1 to={"/svg-test"}>SvgTest</Link1></div>
        <div><Link1 to={"/state-and-ref-test"}>State And Ref Test</Link1></div>
        <div><Link1 to={"/html-xml-parsing"}>HTML & XML Parsing</Link1></div>
        <div><Link1 to={"/styled-components"}>Styled Components</Link1></div>
        <div><Link1 to={"/forward-ref/input"}>Forwarded Ref Input</Link1></div>
        <div><Link1 to={"/forward-ref/button"}>Forwarded Ref Button</Link1></div>
      </div>
    </header>
  </div>
}
export default Landing


// styled component based on Link from react-router-dom
const Link1 = React.memo(styled(Link)`
  color: #61dafb;
`)