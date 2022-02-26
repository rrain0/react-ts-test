
# React Error Boundaries
https://reactjs.org/docs/error-boundaries.html <br/>
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, 
log those errors, and display a fallback UI instead of the component tree that crashed. 
Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

Note<br/>
Error boundaries do not catch errors for:<br/>
<li>Event handlers (learn more)
<li>Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
<li>Server side rendering
<li>Errors thrown in the error boundary itself (rather than its children) </li>

Error boundaries work like a JavaScript `catch {}` block, but for components.

## Using
Only for class component
Use static `getDerivedStateFromError()` to render a fallback UI after an error has been thrown. Use `componentDidCatch()` to log error information.
```typescript jsx
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
```
```typescript jsx
<ErrorBoundary>
    <MyWidget />
</ErrorBoundary>
```
