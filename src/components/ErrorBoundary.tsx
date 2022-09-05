import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

// React.Component<Props type, State type>
class ErrorBoundaryClass extends React.Component<{ navigate: NavigateFunction, children?: React.ReactNode },{ hasError: boolean }> {

    constructor(props) {
        super(props);
        this.state = { hasError: false }

        // in callback usual 'function' hasn't this class instance so we need to bind this.
        // Or use arrow function to create a function because they are always NEW and save this value:
        // clearErrorAndGoToStart = () => {...}
        this.clearErrorAndGoToStart = this.clearErrorAndGoToStart.bind(this)
        // experimental es7 (es2016) syntax to bind this:
        //this.clearErrorAndGoToStart = ::this.clearErrorAndGoToStart
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
        console.log('ERROR HAS APPEARED IN ERROR BOUNDARY:\n', error, errorInfo)
    }

    private clearErrorAndGoToStart(){
        this.setState(
            (prevState,props)=>({ hasError: false }), // function updater. No need {...prevState}: The output of the updater is shallowly merged with state.
            ()=>console.log('callback: The error was cleared') // function callback after state will updated
        )
        // or simply:
        this.setState({ hasError: false })
        this.props.navigate('/')
    }

    override render() {
        if (this.state.hasError){
            // You can render any custom fallback UI
            return <>
                <h1>Something went wrong.</h1>
                <button onClick={this.clearErrorAndGoToStart}>Clear error status and go to start</button>
            </>
        }
        return this.props.children
    }

}

// Wrap to use hooks
const ErrorBoundary = (props) => {
    const navigate = useNavigate()
    return <ErrorBoundaryClass {...props} navigate={navigate} />
}

export default ErrorBoundary