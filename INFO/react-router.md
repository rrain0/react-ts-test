

# React Router
https://reactrouter.com/

https://reactrouter.com/docs/en/v6/getting-started/tutorial

## Install
yarn add react-router-dom

## Connect to the browser's URL
```typescript jsx
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootElement
);
```

## Link to
```typescript jsx
import { Link } from "react-router-dom";
<div>
    <Link to="/invoices">Invoices</Link> |{" "}
    {/* You can style Link or in css use tag a {...} to style*/}
    <Link to="/expenses" style={{...}}>Expenses</Link> |{" "}
    <Link to={`/nested/invoices/${invoiceId}`}>Invoices</Link>
    {/* any content to link to */}
    <Link to={`/nested/invoices/${invoiceId}`}>
        <div>...</div>
    </Link>
</div>
```

### Active Links
They can be highlighted if route match to them:<br>
● via `isActive` in props<br>
● via `<a class="active">...</a>` in generated html<br>
```typescript jsx
    <NavLink
        style={({ isActive }) => {
            return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
            }
        }}
        to={`/invoices/${invoice.number}`}
        key={invoice.number}
    >
    // normal string
    <NavLink className="red" />
    // function
    <NavLink className={({ isActive }) => isActive ? "red" : "blue"} />
```

## Routes

```typescript jsx
import { Routes, Route } from "react-router-dom";

<Routes>
    <Route path="/" element={<App/>}>
        <Route path="expenses" element={<Expenses/>}/> {/* => /expenses */}
        <Route path="invoices" element={<Invoices/>}/> {/* => /invoices */}

        {/* Nested Routes */}
        <Route path="/nested" element={<App/>}>
            <Route path="expenses" element={<Expenses/>}/> {/* => /nested/expenses */}
            <Route path="invoices" element={<Invoices/>}> {/* => /nested/invoices */}
                {/* Route Param "invoiceId" */}
                <Route path=":invoiceId" element={<Invoice />} />
                <Route index element={Empty}/> {/* if empty nested path */}
            </Route>
            <Route index element={Empty}/> v{/* if empty nested path */}
        </Route>

        {/* No Match Route */}
        <Route path="*" element={Empty}/>
        {/* if empty nested path, it is equal to path="" */}{/* but it is not exactly */}
        <Route index
               element={
                   <main style={{padding: "1rem"}}>
                       <p>There's nothing here!</p>
                   </main>
               }
        />
    </Route>
</Routes>
```

## Get URL Route Params
```/anypath/:param/anypath```
```typescript jsx
import { useParams } from "react-router-dom";

export default function () {
    let params = useParams();
    let invoiceId = params.invoiceId
    return <></>
}
```

## Get URL Search Params
```/anypath?filter=56```
```typescript jsx
import { useSearchParams } from "react-router-dom";
export default function () {
    let [searchParams, setSearchParams] = useSearchParams();
    let filterParam = searchParams.get("filter") || ""
    let allBrands = searchParams.getAll("brand");
    setSearchParams({ filter: 66 })
    return <></>
}
```

## useLocation
A location looks something like this:
```js
const location = {
    pathname: "/invoices",
    search: "?filter=sa",
    hash: "",
    state: null,
    key: "ae4cz2j"
}
```

## useMatch
Gets selected part of URL.
If selected part ```does not exist``` or ```empty string``` then returns ```undefined```
```typescript jsx
import { useMatch } from "react-router-dom";
function GetSelectedUrlPart() {
  // we are on path '/profile/someId/main'
  // path can be '/profile/someId/main' '/profile/someId/favorite'
  const thisPageBaseUrl = '/profile/someId'
  // lastUrlPart will have value 'main' - that is places instead of ':subPage' selector
  let lastUrlPart = useMatch(thisPageBaseUrl,':subPage')?.params.subPage
  lastUrlPart = useMatch(thisPageBaseUrl,':subPage')?.params[':subPage'.slice(1)]
  
  // '/*' allows nested paths to be
  let somePathSegment = useMath('/profile/:id/*')?.params.id
  
  return <></>
}
```


### Persist search params when nav:
```typescript jsx
import { useLocation, NavLink } from "react-router-dom";
function QueryNavLink({ to, ...props }) {
    let location = useLocation();
    return <NavLink to={to + location.search} {...props} />;
}
```

## Navigate Programmatically
```typescript jsx
import { useNavigate } from "react-router-dom";
export default function() {
    let navigate = useNavigate();
    navigate("/invoices")
    return <></>;
}
```
```typescript jsx
import { Navigate } from "react-router-dom";
export default function() {
    return <Navigate to='/landing' replace={true}/>
}
```
