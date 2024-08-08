import React, {Suspense, useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from "./components/ErrorBoundary";
import SvgTest from "./pages/SvgTest";
import {typescriptTest} from "src/EXAMPLES/TypeScriptTest/TYPESCRIPT-TEST";
import StateAndRefAndLocalReducerTest from "./pages/StateAndRefAndLocalReducerTest";
import HtmlXmlParsing from "./pages/HtmlXmlParsing";
import StyledComponents from "./pages/StyledComponents/StyledComponents";
import TestForwardedRefInput from "./pages/forward-ref/full-example-input/TestForwardedRefInput";
import ComponentWithExpandableContent from "./components/ComponentWithExpandableContent";
import TestForwardRefButton from "./pages/forward-ref/simple-button/TestForwardRefButton";

const SocketIOChat = React.lazy(()=>import("./pages/SocketIOChat")) // React lazy
const ThrowError = React.lazy(()=>import("./pages/ThrowError")) // React lazy
const Landing = React.lazy(()=>import("./pages/Landing/Landing")) // React lazy
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
        <Route path="/html-xml-parsing" element={<HtmlXmlParsing/>} />
        <Route path="/styled-components" element={<StyledComponents/>} />
        <Route path="/forward-ref">
          <Route path='input' element={<TestForwardedRefInput/>} />
          <Route path='button' element={<TestForwardRefButton/>} />
        </Route>
        <Route path="/test-expandable" element={<ComponentWithExpandableContent/>} />
        <Route path='*' element={<Navigate to='/landing'/>} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
  
}
export default React.memo(App)



