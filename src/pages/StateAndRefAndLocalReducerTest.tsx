import React, {useReducer, useRef} from "react";
import {useEffect, useState} from "react";
import {stat} from "fs";


/*
    Главное отличие классовой компоненты от функциональной:
    у функциональной в каждом рендере замыкаются свой стейт и пропсы и не меняются,
    в классовой же всегда берутся свежие глобальные стейт и пропсы.

    Функциональная компонента работает на JavaScript замыканиях и всё что создано при очередном рендере, запомнится для него.
 */


const StateAndRefAndLocalReducerTest = () => {
    const [step, setStep] = useState(1)

    return <div>
        <Counter1/>
        <Counter2/>
        <Counter3/>
        <Counter4/>
        <Counter5/>
        <Counter6/>
        <Clock1/>
        <Clock2 step={step}/> <input value={step} onChange={ ev => setStep(+ev.target.value)} />
        <Clock3 step={step}/>
    </div>
}
export default StateAndRefAndLocalReducerTest


// Функциональная компонента работает на JavaScript замыканиях и всё что создано при очередном рендере, запомнится.
// Если быстро нажать кнопку 5 раз, то:
// В функциональной компоненте будет выведено последовательно 1,2,3,4,5.
const Counter1 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count>0) setTimeout(() => {
            console.log(`Counter1: ${count}`);
        }, 3000);
    });

    return <div>
        <p>Counter1 count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
}



// Если быстро нажать кнопку 5 раз, то:
// В классовой компоненте будет выведено последовательно 5,5,5,5,5.
// Потому что в классовой стейт глобален и не привязан к рендеру и указывает на самое свежее значение.
class Counter2 extends React.Component<{}, { count: number }>{
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    override componentDidUpdate() {
        setTimeout(() => {
            console.log(`Counter2: ${this.state.count}`);
        }, 3000);
    }

    override render() {
        return <div>
            <p>Counter2 count: {this.state.count}</p>
            <button onClick={()=>{
                this.setState((prevState,props)=>({ count: this.state.count+1 }))
            }}>
                Click me
            </button>
        </div>
    }
}




// Если быстро нажать кнопку 5 раз, то:
// Будет выведено последовательно 1,2,3,4,5.
// Потому что мы замкнули значение, явно скопировав его в новую переменную в функции componentDidUpdate()
class Counter3 extends React.Component<{}, { count: number }>{
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    override componentDidUpdate() {
        const count = this.state.count
        setTimeout(() => {
            console.log(`Counter3: ${count}`);
        }, 3000);
    }

    override render() {
        return <div>
            <p>Counter3 count: {this.state.count}</p>
            <button onClick={()=>{
                this.setState((prevState,props)=>({ count: this.state.count+1 }))
            }}>
                Click me
            </button>
        </div>
    }
}


// Если быстро нажать кнопку 5 раз, то:
// Будет выведено последовательно 5,5,5,5,5.
// Реф хранит последнее значение и не вызывает перерисовку компоненты при его изменении.
const Counter4 = () => {
    const [count, setCount] = useState(0);
    const latestCount = useRef(count) // реф хранит последнее значение count

    useEffect(() => {
        latestCount.current = count // обновление значения рефа
        if (count>0) setTimeout(() => {
            console.log(`Counter4: ${latestCount.current}`);
        }, 3000);
    });

    return <div>
        <p>Counter4 count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
}



// Если быстро нажать кнопку 5 раз, то:
// Будет выведено последовательно 1,2,3,4,5.
// Напрямую берём свежий стейт из setState(prevState=>{...}).
const Counter5 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let cnt
        setCount(prevCnt => cnt=prevCnt)
        if (count>0) setTimeout(() => {
            console.log(`Counter5: ${cnt}`);
        }, 3000);
    });

    return <div>
        <p>Counter5 count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
}


// Устраняем лишние вызовы эффекта путём передачи массива зависимостей.
// Эффект сработает в самом начале и только тогда, когда хотя бы 1 зависимость изменилась.
// Если быстро нажать кнопку 5 раз, то:
// В функциональной компоненте будет выведено последовательно 1,2,3,4,5.
const Counter6 = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count>0) setTimeout(() => {
            console.log(`Counter6: ${count}`);
        }, 3000);
    },[count]);

    return <div>
        <p>Counter6 count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
}




// using local state reducer to safely change count while changing step
const initialState1 = {
    count: 0,
    step: 1,
}
const reducer = (state,action) => {
    switch (action.type){
        case 'tick': return {
            ...state,
            count: state.count + state.step
        }
        case 'step': return {
            ...state,
            step: action.payload
        }
        default: return state
    }
}
const Clock1 = () => {
    const [state, dispatch] = useReducer(reducer,initialState1)
    const { count, step } = state

    useEffect(() => {
        const id = setInterval(()=>{
            dispatch({ type: 'tick' })
        }, 1000)
        return ()=>clearInterval(id)
    },[]);

    return <div>
        <h1>{count}</h1>
        <input value={step} onChange={ ev => {
            dispatch({
                type: 'step',
                payload: +ev.target.value
            });
        }} />
    </div>
}

// Вынесем step в пропсы
const initialState2 = {
    count: 0,
}
const Clock2 = ({ step = 1 }) => {
    const [state, dispatch] = useReducer(reducer,initialState2)
    const { count } = state

    useEffect(()=>{
        dispatch({ type: 'step', payload: step })
    },[step])

    useEffect(() => {
        const id = setInterval(()=>{
            dispatch({ type: 'tick' })
        }, 1000)
        return ()=>clearInterval(id)
    },[]);

    return <div>
        <h1>{count}</h1>
    </div>
}

// или можно функцию-редьюсер поместить в компонент - будет обновляться вместе с пропсами
const Clock3 = ({ step = 1 }) => {
    const [state, dispatch] = useReducer(reducer,initialState2)
    const { count } = state

    function reducer(state,action) {
        switch (action.type){
            case 'tick': return {
                ...state,
                count: state.count + step
            }
            default: return state
        }
    }

    useEffect(() => {
        const id = setInterval(()=>{
            dispatch({ type: 'tick' })
        }, 1000)
        return ()=>clearInterval(id)
    },[]);

    return <div>
        <h1>{count}</h1>
    </div>
}

/*
    Функции могут по-настоящему включаться в поток данных благодаря использованию useCallback.
    Мы можем сказать, что, если входные данные функции изменились, то и сама функция изменилась.
 */



const API = {
    async fetchArticle(id){ return null }
}

// Отмена асинхронной операции в хуке
function Article({ id }) {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        let didCancel = false;

        async function fetchData() {
            const article = await API.fetchArticle(id);
            if (!didCancel) {
                setArticle(article);
            }
        }

        fetchData();

        return () => {
            didCancel = true; // выставляем флаг, что данные больше не нужны, с помощью замыканий этот флаг будет сохранён
        };
    }, [id]);

    return <></>
}










