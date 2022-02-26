import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from "./components/ErrorBoundary";

const SocketIOChat = React.lazy(()=>import("./pages/SocketIOChat")) // React lazy
const ThrowError = React.lazy(()=>import("./pages/ThrowError")) // React lazy
const Landing = React.lazy(()=>import("./pages/Landing")) // React lazy



// Suspense => React lazy

function App() {

    return <ErrorBoundary>
        <Suspense fallback={<div>{"LOADING>>>"}</div>}> {/* To see "LOADING>>>" use Disable cache & Slow 3G */}
            <Routes>
                <Route path="/landing" element={<Landing/>} />
                <Route path="/throw-error" element={<ThrowError/>} />
                <Route path="/socketio/chat" element={<SocketIOChat/>} />
                <Route path='*' element={<Navigate to='/landing'/>} />
            </Routes>
        </Suspense>
    </ErrorBoundary>

}

export default App;
