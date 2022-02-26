
# React Code Splitting
https://reactjs.org/docs/code-splitting.html <br/>
Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user,
which can dramatically improve the performance of your app.
Фича позволяет разделять единый собранный бандл на отдельные части и загружать только при необходимости.
### Usual code:
#### Before:
```typescript jsx
import { add } from './math';
console.log(add(16, 26));
```
#### After:
```typescript jsx
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```
### React:
#### Before:
```
import OtherComponent from './OtherComponent';
```
#### After:
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
#### When component is loading, you can show something else.
Place `<Suspnese/>` in any place above lazy component:
```typescript jsx
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
