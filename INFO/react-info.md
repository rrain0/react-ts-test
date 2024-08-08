

## ИСПОЛЬОВАНИЕ CSS:

### Использование из файлов
Такой импорт применяется ко всему проекту автоматически если он есть:
```
import '..../css-style.css'
import '..../scss-style.scss'
```


Такой импорт применяется Только там, где использовали,
можно применять только для *.module.css/scss файлов:
```
import css from '..../css-style.module.css'
import scss from '..../scss-style.module.scss'

<div className={css.styleClassName} />
<div className={scss.styleClassName} />
<div className={scss.['style-class-name']} />
```
!!! классы в стилях теперь называть в camelcase т.к. дефис запрещён в имени переменных js


### Inline Styles
style прямо в теге
```<div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem', margin: "5px", width: 100 }}>...</div>```





## React исполняется на устройстве, где он отображает контент
Приложение реакта работает на ЦЕЛЕВОМ компе/телефоне (браузере/приложении),
поэтому ip берётся относительно него, в т.ч. localhost будет считаться на целевом компе,
а не на компе, где сервер реакта (NodeJS)



## Важность использования хуков
В функциональной компоненте любые сайд-эффекты (в т.ч. dispatch(action/thunk)) делаем в хуках (useEffect),
потому что по идеологии компонента должна возврщать другой jsx только при изменении props/localState,
но перерисовываться она может хоть сколько, главное чтобы jsx был один при одинаковых пропсах.
Реакт в dev mode может перерисовывать компоненту 2+ раз просто так!!!



## Правильное изменение state вручную:
Если в state ССЫЛКА на объект не изменилась (либо значение у примитивов (числа, строки, boolean...)), то он считается неизменным и компонента не перерисуется.
Например есть `state`:
```
state = {
    prop1: 1
    substate1: {
        prop1: 2
    },
    substate2: {
        prop3: 3
    },
}
```
Для изменения `prop3` ссылка на `state`, `substate2` должна стать новой + значение/ссылка `prop3` должна измениться:
```
state = {
    ...state, 
    substate2: {
        ...substate2, 
        prop3: 5
    }
}
```
Для изменения `prop1` ссылка на `state` стать новой + значение/ссылка `prop1` должна измениться:
```
state = {
    ...state, 
    prop1: 5
}
```






## Передача URL в props для классовой компоненты - withRouter
1) `connect(mstp, mdtp)(withRouter(Component))`
2) Указываем переменную в `<Route path="profile/:userId?" .... />`
: - начало переменной
? - параметр необязателен
3) достаём `userId` из `props.match.params.userId`




HOC - High Order Component - даёт дополнительный функционал нашей компоненте
(в данном случае перенаправляет на страницу логина если не авторизованы)
(можно внутри написать классовую компоненту вместо функциональной):
```
const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
});
export const withAuthRedirect =
    (Component) =>
        connect(mapStateToPropsForRedirect)(
            (props) => {
                if (!props.isAuth) return <Redirect to={"/login"}/>
                return <Component {...props}/>
        })
```
Использование:
`... = connect(mstp, mdtp)(withAuthRedirect(Component));`



# Обновления состояния компонент
`componentDidMount()` - вызывается после встраивания нового узла в DOM
`componentDidUpdate()` - вызывается после обновления пропсов
`render()` - вызывается после `componentDidUpdate()`
`componentWillUnmount()` - вызывается перед размонтированием компоненты (после удаления реального DOM узла)



ХУКи
Хуки — нововведение в React 16.8, которое позволяет использовать состояние и
другие возможности React без написания классов.
Пользовательский хук — это JavaScript-функция, имя которой начинается с «use» (очень желательно),
и которая может вызывать другие хуки (не обязатиельно).
По факту реакт воспринимает хуки как обычные функции.
Хук НЕЛЬЗЯ юзать в циклах и условных ветвлениях
(т.е. хук должен при каждом рендере вызываться столько, сколько он явно написан в коде).
По факту просто выносят логику из компоненты в удобное место и используются удобным способом.
https://ru.reactjs.org/docs/hooks-reference.html#usecallback

## useEffect:

`componentDidMount()` станет `useEffect(()=>{...}, [])`
Вызовется, когда эта компонента и всё её дерево дочерних компонент отрендерится впервые

`componentDidUpdate` станет `useEffect(()=>{...})`
Вызовется после каждого рендера

`componentDidMount + componentWillUnmount` станет
```
useEffect(
    // чтобы объект листенера был удалён, добавляемый и удаляемый объекты должны быть одинаковы по ссылке
    let someEventListener = () => {}

    // функция выпонится после вмонтирования компоненты (componentDidMount)
    window.addEventListener("mousemove", someEventListener)

    // функция выпонится перед размонтированием компоненты (componentWillUnmount)
    return ()=>window.removeEventListener("mousemove", someEventListener),
    []
)
```
Returned function будет выполняться перед каждым следующим выполнением эффекта + перед размонтированием.

### Массив зависимостей хуков:
`undefined` => эффект после каждого рендера
`[]` => эффект только после первого рендера (после вмонтирования компоненты)
`[deps1, deps2, deps3, ...]` => эффект после ближайшего рендера, когда изменится хотя бы одна из зависимостей deps1, deps2, deps3, ...



!!! Зависимости в массивах всегда сравниваются по ===
можно сделать JSON.stringify({name:'Tom'}) для объектов





`useLayoutEffect` - аналогично `useEffect`, но выполняется после того,
как DOM готов к отрисовке, но перед самой отрисовкой.<br>
https://ru.reactjs.org/docs/hooks-reference.html#uselayouteffect
аналог:
`showChild && <Child />` + `useEffect(() => { setShowChild(true); }, [])`
```typescript jsx
// must NOT be useLayoutEffect so ref from props won't be null
useEffect(
  ()=>{
    const target = props.targetElement.current
    if (target){
      target.addEventListener('pointerdown',showRipple)
      target.addEventListener('pointerup',hideRipple)
      target.addEventListener('pointerout',hideRipple) // 'out' is 'leave' + 'cancel'
      return ()=>{
        target.removeEventListener('pointerdown',showRipple)
        target.removeEventListener('pointerup',hideRipple)
        target.removeEventListener('pointerout',hideRipple)
      }
    }
  },
  [
    props.targetElement.current,
    showRipple, hideRipple,
  ]
)
```



You can hack the useMemo hook to imitate a componentWillMount lifecycle event. Just do:
```typescript jsx
const Component = () => {
   useMemo(() => {
     // componentWillMount events
   },[]);
   useLayoutEffect(() => {
     // componentWillMount events
   },[]);
   useEffect(() => {
     // componentDidMount events
     return () => {
       // componentWillUnmount events
     }
   }, []);
}
```



Simulate constructor in functional components using the useRef hook:
```typescript jsx
function Component(props) {
    const willMount = useRef(true);
    if (willMount.current) {
        console.log('This runs only once before rendering the component.');
        willMount.current = false;
    }

    return (<h1>Meow world!</h1>);
}
```






`useCallback` is able to memorize a function.
`useMemo` is able to memorize an object.

`useCallback`:
```typescript jsx
const fn = useCallback(fn, deps);
const memoiedCallback = useCallback( ()=>doSomething(a,b), [a,b] );
```

useCallback возвращает функцию-колбэк (мемоизированный колбэк), который создаётся заново,
если поменялся хоть один параметр в массиве зависимостей.

`useCallback(fn, deps)` — это эквивалент useMemo(() => fn, deps)

`useMemo`:
```typescript jsx
const val = useMemo(fn, deps);
const memoizedValue = useMemo( ()=>{return computeVal(a,b)}, [a,b] );
```
Возвращает результат переданной ему функции.
При изменении зависимости значение вычисляется заново.





## Context
Context provides a way to pass data through the component tree without having to pass props down
manually at every level.





Перед перерендером реакт спрашивает компоненту, а нужно ли ей обновиться:
```
shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps !== this.props || nextState != this.state
}
```
Если унаследовать компоненту от PureComponent, то там эта проверка автоматически есть








## Как работает React:
JSX преобразовывается в `React.createElement(...)` и создаётся VirtualDOM.
Потом на основе VirtualDOM создаётся/изменяется обычный DOM (`document.createElement(...)`)

Сравнение нового и старого VirtualDOM - Это `Reconciliation` (Согласование).<br>
Reconciliation работает на 2 предположениях:
1) Два элемента с разными типами произведут разные деревья.
2) Разработчик может указать, какие дочерние элементы могут оставаться стабильными между разными рендерами с помощью пропа `key`.


### Пример преобразования JSX в JS:
Код
```typescript jsx
const ItKamasutra = (props) => <div>Hello</div>
const ItIncubator = (props) => <div><ItKamasutra name='Dmitriy'/> </div>
```
будет преобразован в:
```javascript
"use strict";
var ItKamasutra = function ItKamasutra(props) {
    return React.createElement("div", null, "Hello");
}
var ItIncubator = function ItIncubator(props) {
    return React.createElement(
        "div", null, 
        React.createElement(ItKamasutra, { name: "Dmitriy" } ),
        " "
    );
}
```





