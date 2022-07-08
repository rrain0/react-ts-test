
## React Memo
https://reactjs.org/docs/react-api.html#reactmemo

Это аналог использования React.PureComponent вместо React.Component у классовых компонент.
По умолчанию метод shouldComponentUpdate() всегда возвращает true и компонента ререндерится и потом сравнивается VDOM.
Если включена мемоизация, то в shouldComponentUpdate() просходит shallow comparsion of props.
Выбор здесь такой - сравнивать отрендеренное дерево (VirtualDOM) или перед этим просто сравнить пропсы.
Скорее всего проще будет сравнить пропсы.
!!! Если прокидываются children, то использовать React.memo бесполезно, т.к. массив всегда новый.
Использовать, чтобы не вызывать лишние ререндеры, напрмер, когда мы внутри компоненты используем стэйт, чтобы менять scroll.

```typescript jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```
React.memo is a higher order component.

If your component renders the same result given the same props, you can wrap it in a call to React.memo for a performance boost in some cases by memoizing the result. 
This means that React will skip rendering the component, and reuse the last rendered result.

React.memo only checks for prop changes. If your function component wrapped in React.memo has a useState, useReducer or useContext Hook in its implementation, it will still rerender when state or context change.

By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.
```typescript jsx
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```
This method only exists as a performance optimization. Do not rely on it to “prevent” a render, as this can lead to bugs.
