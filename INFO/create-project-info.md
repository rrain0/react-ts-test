


## 1) CREATE REACT APP

create-react-app TypeScript:
https://create-react-app.dev/docs/adding-typescript/


CREATE NEW PROJECT:
```
npx create-react-app my-app --template typescript
# or
yarn create react-app my-app --template typescript
```

ADD TO EXISTING PROJECT:
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
# or
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```
Next, rename any file to be a TypeScript file (e.g. src/index.js to src/index.tsx) and restart your development server!



## 2) TS CONFIG JSON

add
```
{
  "compilerOptions": {
    "downlevelIteration": true,
    "noImplicitAny": false,
    "allowUnreachableCode": true,
  }
}
```



## 3) RESET CSS

file reset css:
```
* {
    margin: 0;
    box-sizing: border-box;
}
a {
    display: contents;
    text-decoration: none;
}
body {
    background: #f5f5f5;
}
```
and import it in index.tsx:
```
import './reset-css.css';
```


## 4) INSTALL SCSS MODULE COMPILER

SASS чтобы реакт сам компилил scss стили
https://www.npmjs.com/package/sass (старое название Dart SASS)
```
npm install sass --save-dev
# or
yarn add -D sass
```


## 5) PATH ALIASES

React doesn't support path aliases (without third-party plugins)


