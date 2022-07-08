import React, {Suspense, useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from "./components/ErrorBoundary";
import SvgTest from "./pages/SvgTest";
import {typescriptTest} from "./EXAMPLES/TYPESCRIPT-TEST";
import StateAndRefAndLocalReducerTest from "./pages/StateAndRefAndLocalReducerTest";

const SocketIOChat = React.lazy(()=>import("./pages/SocketIOChat")) // React lazy
const ThrowError = React.lazy(()=>import("./pages/ThrowError")) // React lazy
const Landing = React.lazy(()=>import("./pages/Landing")) // React lazy
const Login = React.lazy(()=>import("./pages/Login")) // React lazy
const Profile = React.lazy(()=>import("./pages/Profile")) // React lazy



// Suspense => React lazy

function App() {
useEffect(()=>typescriptTest(),[])
    return <ErrorBoundary>
        <Suspense fallback={<div>{"LOADING>>>"}</div>}> {/* To see "LOADING>>>" use Disable cache & Slow 3G */}
            <Routes>
                <Route path="/landing" element={<Landing/>} />
                <Route path="/throw-error" element={<ThrowError/>} />
                <Route path="/socketio/chat" element={<SocketIOChat/>} />
                <Route path="/samurai/login" element={<Login/>} />
                <Route path="/samurai/profile" element={<Profile/>} />
                <Route path="/svg-test" element={<SvgTest/>} />
                <Route path="/state-and-ref-test" element={<StateAndRefAndLocalReducerTest/>} />
                <Route path='*' element={<Navigate to='/landing'/>} />
            </Routes>
        </Suspense>
    </ErrorBoundary>

}

export default App;
