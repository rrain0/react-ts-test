


/*
    decalre keyword - if you using js library, you can declare some variables from it (it is hint for compiler, nothing added into generated js)
    You can declare class, var, let....

    Declare vs. var

    var creates a new variable. declare is used to tell TypeScript that the variable has been created elsewhere.
    If you use declare, nothing is added to the JavaScript that is generated - it is simply a hint to the compiler.

    For example, if you use an external script that defines var externalModule,
    you would use declare var externalModule to hint to the TypeScript compiler that externalModule has already been set up
 */


/*
    extends class or implements class

    extends class => become its child
    обычное наследование

    implements class => get the abilities of class
    это скорее реализация интерфейса
    здесь класс показывает, что должен иметь класс, его реализующий
    (нужно заново перепределить все функции и прописать все переменные суперкласса)

 */






function getOne(): number { return 1 }




export function typescriptTest(){


    typesTest()
    genericTest()
    arraysTest()
    tupleTest()
    keyofTest()
    conditionalTypesTest()
    mappedTypesTest()
    readonlyOptionalConstTest()
    enumTest()
    interfaceTest()
    discriminatoryAssociationTest()
    constructorInInterfaceTest()
    classTest()
    functionsTest()
    functionParametersTest()
}

export function typesTest() {

    // Поведение типов boolean, string, number, symbol идентично джаваскриптовскому
    let a0: boolean | string | number | symbol = 4

    let a1: number = 10
    //a1 = "some string" // нельзя

    // | - объединение типов - должны присутствовать свойства одного из типов
    let a2: string | number = "10" // это тип объединения => Union Type
    a2 = 10

    let a3: boolean | null // переменная не может быть использована до присваивания + undefined нельзя присвоить
    a3 = null

    let a4: undefined
    console.log(a4) // автоматически undefined

    let a5: number | undefined
    console.log(a5) // автоматически undefined
    a5 = 8
    console.log(a5)

    let a6: null
    //console.log(a6) // нельзя - TS2454: Variable 'a6' is used before being assigned.

    // null и undefined - субтипы - могут быть присвоены любому другому типу (только не в строгом режиме, там это самостоятельные типы)

    // unknown - неизвестный тип - с ним ничего нельзя сделать, пока не приведём к лругому типу
    let a7: unknown = 10
    let a7_1: number = a7 as number + 89
    console.log(a7_1)
    /*
    let a7_1: string = a7 as string + 89
    console.log(a7_1)
    console.log(typeof a7_1) // => number - тайпскрипт сломан с помощью unknown :)
    */

    // any - любой тип
    let a9: any = 89
    a9 = "89"

    // автовывод типа
    let a10 = 89

    {
        // ! - non-null assertion
        // assert that it is not null & not undefined
        let a: null|undefined|{ prop: string } = { prop: "flkldsf" }
        const getA = () => ({ prop: "flkldsf" }) as null|undefined|{ prop: string }
        let prop = getA()!.prop
    }




    // приведение типов (один из защитников типа)
    let a8: string = <string>new String("TypeScript") // приведение обёртки к примитиву


    // & - Intersection type literal - пересечение типов - должны присутствовать свойства всех типов
    interface A {a: number}
    interface B {b: number}
    let ab: A & B = {a: 1, b: 2}
    //var ab: A & B = {a: 1, b: 2, c: "kdfj"} => Error: Object literal may only specify known properties, and 'c' does not exist in type 'A & B'.



    // typeof (один из защитников типа)
    // typeof может определить что это number | string | boolean | symbol | null | undefined | object
    // тип объекта - не определяет
    let stringOrNumber: string | number = 90
    if (typeof stringOrNumber === "string"){
        console.log("stringOrNumber is string")
    } else {
        console.log("stringOrNumber is number") // попадём сюда
    }
    switch (typeof stringOrNumber){
        case "string":console.log("stringOrNumber is string"); break
        default: console.log("stringOrNumber is number"); break // попадём сюда
    }

    // instanceof (один из защитников типа)
    // если перед нами объект - помогает определить его тип
    let a11: any = 78
    if (a11 instanceof Number){ // только для объектов
        console.log("a11 is Number")
    } else {
        console.log("a11 is something else") // попадём сюда, т.к. 78 - примитив number
    }


    // Свой защитник типа => создаём предикат
    class Fish { swim(){} }
    class Bird { fly(){} }
    function isFish(pet: object): pet is Fish { return pet instanceof Fish } // предикат - защитник типа
    let pet: object = new Fish()
    if (isFish(pet)) pet.swim() // теперь компилятор видит, что это Fish и не надо явно приводить


    // Псевдонимы типов
    type RepositoryOwner = string
    type PullRequestNumber = string | number
    type AddressType = {
        city: string
        country: string
    }
    type UserType = {
        sayHello: Function // тип функции - ЛЮБАЯ ФУНКЦИЯ
        name: string
        age?: number
        isSamurai: boolean
        address: AddressType | null
    }

    let a12: RepositoryOwner = "djfkj"
    let user: UserType = {
        sayHello(msg: string = "default msg") { console.log("yo! " + msg) },
        name: "Dimych",
        //age: 32,
        isSamurai: true,
        address: {
            city: "Minsk",
            country: "Belarus"
        }
    }


    // Извлечение типа из объекта
    // ВНИМАНИЕ!! - здесь typeof работает во время компиляции по правилам typescript
    let propertyObject = {
        prop: "property",
        setProperty(prop: string): void { this.prop = prop},
        getProperty(): string { return this.prop },
        append(str: string): string { return this.prop+=str },
        // в том случае, если начальное значение не того типа, который надо, то через as указываем нужные типы
        age: null as number | null
    }
    type PropertyObjectType = typeof propertyObject;
    // будет потребовано наличие всех свойств как в propertyObject - ни больше, ни меньше (больше можно при реализации интерфейса)
    let propertyObject2: PropertyObjectType = {
        prop: "property2",
        setProperty(prop: string): void { this.prop = prop},
        getProperty(): string { return this.prop },
        append(str: string): string { return this.prop+=str },
        age: 67
    }

    let GET_TASKS = "APP/GetTasks"
    type GetTasksActionType = {
        id: number,
        type: typeof GET_TASKS // вместо type: "APP/GetTasks"
    }


    // тип object | Object | {} - любой не примитив - не number | string | boolean | symbol | null | undefined
    // тип включает в себя все JavaScript объекты - предосталяет встроенные методы
    // хз чем отличается object от Object ({} | {...} => Object) - вроде что-то связанное с иерархиями в наследовании...
    //
    // {...} - объект с жёстко фиксированными полями-свойствами
    let a13: object = {ii: 456, id: "id"}
    console.log(a13.toString())
    console.log(a13.hasOwnProperty("ii"))
    a13 = new String("fkj")
    let a14: Object = {ii: 456, id: "id"}
    console.log(a14.toString())
    let a15 = {}
    console.log(a15.toString())
    let a16: {} = {prop: 6} // можно кидать в объект любые свойства
    let a17: {prop: any} = {prop: 6} // теперь можно использовать только указанные свойства (prop)

    {
        // Object это:
        //interface Object {
        // ...

        /** Returns a string representation of an object. */
        //toString(): string;

        /** Returns a date converted to a string using the current locale. */
        //toLocaleString(): string;

        /** Returns the primitive value of the specified object. */
        //valueOf(): Object;

        /**
         * Determines whether an object has a property with the specified name.
         * @param v A property name.
         */
        //hasOwnProperty(v: string): boolean;

        /**
         * Determines whether an object exists in another object's prototype chain.
         * @param v Another object whose prototype chain is to be checked.
         */
        //isPrototypeOf(v: Object): boolean;

        /**
         * Determines whether a specified property is enumerable.
         * @param v A property name.
         */
        //propertyIsEnumerable(v: string): boolean;
        //}
    }


    // Тип void - обозначает, что функция ничего не возвращает
    function printMsg(msg: string): void {
        console.log(msg)
        switch (getOne()){
            case 1: return; // => return undefined
            case 2: return undefined;
            //case 3: return null; // нельзя
            default: throw new Error(msg)
        }
    }
    console.log("printMsg(): " + printMsg("msg")) // => printMsg(): undefined

    // never - функция не может завершиться нормально, нельзя использовать return
    function pitfall(): never {
        if (getOne() === 1){
            throw new Error("pitfall(): never")
        } else {
            while (true);
        }
    }

    // Union of values - задать конкретные допустимые значения
    let strings: "one" | "two" | "three" = "two"
    let values: "one" | 2 | false | {prop: string}
    values = 2
    values = false
    values = {prop: ""}
    //values = 3 // нельзя

    // Тип литерала объекта - но лучше использовать интерфейсы
    let obj4: {prop: string, val: number} = {prop: "abc", val: 78}


    {
        // тип this - определяется типом возвращаемого объекта
        class Animal {
            walk(): this {
                return this
            }
        }
        class Panda extends Animal {
            sleep(){ // this как тип возвращаемого знасения можно не писать - определится сам
                return this
            }
        }
        let panda: Panda = new Panda()
        let isPanda: boolean = (<Animal>panda).walk() instanceof Panda
        console.log("isPanda: " + isPanda)
        let animal: Animal = new Animal()
        isPanda = (<Animal>animal).walk() instanceof Panda
        console.log("isPanda: " + isPanda)
    }


    {
        // keyof - get union of object keys
        type Point = {x: number, y: number}
        type P = keyof Point // "x"|"y"

        type Arrayish = {[n: number]: unknown}
        type A = keyof Arrayish // number

        type Mapish = {[n: string]: boolean}
        type M = keyof Mapish // string|number
        // JavaScript object keys are always coerced to a string, so obj[0] is always the same as obj["0"]
    }



}


export function genericTest() {
    interface A {a: number}
    // дженерики
    function extend<T, U>(a: T, b: U): T & U {
        return Object.assign({}, a, b)
    }
    // Совмещает тип T и U
    const obj1 = extend({one: 1}, {two: 2})
    console.log(obj1)
    const obj2 = extend({one: 1}, <A>{a: 2})
    console.log(obj2)
    const obj3 = extend({one: 1}, {a: 2} as A) // {a: 2} as A аналогично <A>{a: 2}
    console.log(obj3)


    type GenericType<T> = {
        prop: T[]
    }
    type GenericType2<T = string|number> = {
        prop: T[]
    }
    type GenericType3<T extends A> = {
        prop: T[]
    }
    type GenericType4<T> = {
        prop: T[]
    }

    // there is extends but no super
    // <T extends any> is equal <T = any>
    // In ReactComponent <T>, <T = any> are considered as JSX tag => use <T extends any>
    const searchFun = <T extends any>( {objsToSearchIn, valueExtractors, displayValueExtractor, setFound}:
    {objsToSearchIn: T[], valueExtractors: ((obj:T)=>any)[], displayValueExtractor: (obj:T)=>any, setFound: (objsArr:T[])=>void} ) => {
        setFound(objsToSearchIn)
    }

}

export function arraysTest(): void {
    // Массивы
    const arrOfStrings: string[] = ["first", "second", "third"]
    const arrOfNumbersAndStrings: (string | number)[] = ["string", 12]
    const arrOfNumbers: Array<number> = [12, 13]
    const arr: Array<object> = [new Number(12), <Number>12, 12 as Number, {prop: 2}, new String("abc")]

    console.log(arrOfStrings)
    console.log(arrOfNumbersAndStrings)
    console.log(arrOfNumbers)
    console.log(arr)
}

export function tupleTest(): void {
    // Кортежи
    const tuple1: [number, string, boolean] = [1234, "str", false]
    const tuple2: [number, string[], undefined, {}] = [1234, ["str"], undefined, {prop: 3}]

    console.log(tuple1)
    console.log(tuple2)

    // автовыведение типов при взятии из кортежа
    const a1: number = tuple1[0];
    const a2: string = tuple1[1];
    const a3: number | string | boolean = tuple1[2]
}


export function keyofTest() {
    // keyof object
    type Point = { x: number; y: number }
    type P = keyof Point // same as 'x'|'y'


    // keyof array
    type Arrayish = { [n: number]: unknown };
    type A = keyof Arrayish; // same as number

    const arr1 = ['r', 'rr']
    arr1["rrr"] = 'rrr'
    type A2 = keyof typeof arr1 // same as keyof string[]


    // keyof Map
    type Mapish = { [k: string]: boolean };
    type M = keyof Mapish;
}


export function conditionalTypesTest(){
    // https://www.typescriptlang.org/docs/handbook/2/conditional-types.html

    interface Animal { live(): void }
    interface Dog extends Animal { woof(): void }

    type Example1 = Dog extends Animal ? number : string;
    // Example1 is: type Example1 = number
    type Example2 = RegExp extends Animal ? number : string;
    // Example2 is: type Example2 = string



    interface IdLabel { id: number /* some fields */ }
    interface NameLabel { name: string /* other fields */ }

    // объявления перегруженной функции
    function createLabel(id: number): IdLabel;
    function createLabel(name: string): NameLabel;
    function createLabel(nameOrId: string | number): IdLabel | NameLabel;
    // сама функция
    function createLabel(nameOrId: string | number): IdLabel | NameLabel { throw "unimplemented";}

    // объявления можно сократить до:
    type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
    function createLabel2<T extends string | number>(nameOrId: T): NameOrId<T> { throw "unimplemented";}



    // Infer type from context
    // если Type это массив, то Item становится типом элементов этого массива
    type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;
    // Получить тип возвращаемого значения функции (если Fun это функция)
    type GetReturnType<Fun> = Fun extends (...args: never[]) => infer Return ? Return : never

    type Num = GetReturnType<() => number>; // number
    type Str = GetReturnType<(x: string) => string>; // string
    type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>; // boolean[]

    // when typeof overloading function, it gets LAST overload declaration
    type T1 = ReturnType<typeof createLabel> // IdLabel | NameLabel



    // Distributive Conditional Types
    type ToArray<Type> = Type extends any ? Type[] : never;
    type StrArrOrNumArr = ToArray<string | number>; // string[] | number[]

    type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
    type StrArrOrNumArrNotDist = ToArrayNonDist<string | number>; // type StrArrOrNumArr = (string | number)[]
}


export function mappedTypesTest() {
    // https://www.typescriptlang.org/docs/handbook/2/mapped-types.html

    type StringOrNumberKeys = {
        [Prop: string|number]: any
    }

    // make any prop of object of type T optional (+? or simply ?) and readable (-readonly)
    type Optional<T> = {
        -readonly [Prop in keyof T]+?: T[Prop]
    }

    // make any prop of object of type T require (-?) and readonly (+readonly or simply readonly)
    type RequireReadonly<T> = {
        readonly [Prop in keyof T]-?: T[Prop]
    }


    // Remap property names via as (with template literal type `get${Capitalize<string & Prop>}` and intrinsic type Capitalize)
    type Getters<T> = {
        [Prop in keyof T as `get${Capitalize<string & Prop>}`]: () => T[Prop]
    }
    interface Person { name: string; age: number; location: string; }
    type LazyPerson = Getters<Person>
    /*
        LazyPerson is:
        type LazyPerson = {
            getName: () => string;
            getAge: () => number;
            getLocation: () => string;
        }
     */



    // Filter keys
    // Field 'kind' will be excluded because never is produced
    type Exclude<T,U> = T extends U ? never : T // conditional type
    type RemoveKindField<T> = {
        [Prop in keyof T as Exclude<Prop,'kind'>]: T[Prop]
    }

    interface Circle {
        kind: "circle";
        radius: number;
    }
    type KindlessCircle = RemoveKindField<Circle>;
    /*
        KindlessCircle is:
        type KindlessCircle = {
            radius: number;
        }
     */



    // You can map over arbitrary unions, not just unions of string | number | symbol, but unions of any type:
    type EventConfig<Events extends { kind: string }> = {
        [E in Events as E["kind"]]: (event: E) => void;
    }

    type SquareEvent = { kind: "square", x: number, y: number };
    type CircleEvent = { kind: "circle", radius: number };
    type Config = EventConfig<SquareEvent | CircleEvent>
    /*
        Config is:
        type Config = {
            square: (event: SquareEvent) => void;
            circle: (event: CircleEvent) => void;
        }
     */



    // Conditional value type
    type ExtractPII<Type> = {
        [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
    };

    type DBFields = {
        id: { format: "incrementing" };
        name: { type: string; pii: true };
    };
    type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
    /*
        ObjectsNeedingGDPRDeletion is:
        type ObjectsNeedingGDPRDeletion = {
            id: false;
            name: true;
        }
    */

}

export function readonlyOptionalConstTest(){
    // readonly can be applied in type or class but not in object literal or array literal
    type PointType = {
        readonly x: number
        readonly y: number
    }
    class Point {
        readonly x = 8
        readonly y = 0
    }

    // make object literal readonly point
    const p1 = {
        x: 4,
        y:5
    } as PointType
    //p1.x = 7 // not permitted

    // readonly array
    type ReadonlyArrType = readonly number[]
    const arr1 = [5, 6] as ReadonlyArrType
    //arr1[0] = 9 // not permitted

    //const arr2 = ['str', 65] as [string, readonly number] // not permitted readonly here

    // make all readonly and immutable
    const p2 = {
        x: 5,
        y: 5
    } as const

    const p3 = [4, 10] as const


    type OptionalProperties = {
        x?: number // number | undefined
        y?: number // number | undefined
    }

    const f = (a: number, b?:number) => {}
    f(4)
    f(4, undefined)
    f(4, 5)
}


export function conditionalTypes(){

    const f = (c?: number | undefined) => {
        if (c) return {a: c}
        else return {b: 1}
    }

    const c1 = undefined
    const obj = f(c1) as typeof c1 extends undefined ? {b: 1} : {a: typeof c1} // typeof obj is {b: 1}
    //obj.a = 8 // not permitted but b in this case can't be undefined
}




export function enumTest(){
    enum Days {Mon, Tue, Wed, Thu, Fri, Sat, Sun}
    const sun: string = Days[6] // Sun
    const one: number = Days["Tue"] // 1
    const tue: number = Days.Tue
    const fri: Days = Days.Fri
    const thu: Days = 3
    const idxByEnumValue: number = Days.Sat.valueOf() // 5

    console.log(Days)
    console.log(sun) // => Sun
    console.log(one) // => 1 - (as number)
    console.log(tue) // => 1 - (as number)
    console.log(tue === Days.Tue) // => true
    console.log(tue === 1) // => true
    console.log(fri === 4) // => true
    console.log("idxByEnumValue: "+idxByEnumValue) // => 5

    // порядок продолжается от текущего числа если явно присвоить индекс
    enum Days2 {Mon, Tue, Wed=9, Thu, Fri, Sat, Sun}
    let value: string  = Days2[4] // undefined - хотя тип undefined явно не указан, но ошибки не будет

    console.log(Days2)
    console.log(value) // => undefined - (as undefined)

    value+="jjj"
    console.log(value) // => undefinedjjj - (as string)


    enum Directions {Up, Down, Left, Right}
    console.log(Directions) // => {0: 'Up', 1: 'Down', 2: 'Left', 3: 'Right', Up: 0, Down: 1, Left: 2, Right: 3} (as object)
    console.log(Directions.Up) // => 0 (as number)
    console.log(Directions["Up"]) // => 0 (as number)
    console.log(Directions[0]) // => Up (as string)

    const f = (d: Directions)=>{
        console.log(d)
        console.log(Directions[d])
        console.log()
    }
    f(Directions.Down)
    f(1)
}

export function interfaceTest(){
    // Интерфейсы

    // instanceof не применимо к интерфейсам - интерфейс не компилируется в код

    // Именовать интерфейсы принято с "I"
    interface IServer {
        hostname: string
        location: string
        active: boolean
        publicAddress: string
    }
    interface IProp {
        prop: number
        getProp: () => number
        setProp: (prop: number) => void
        increaseProp(add: number): number

        width?: number // необязательное свойство
        readonly color: string // нельзя менять после присвоения значения (const - для переменных, readonly - для свойств)
    }
    // расширение интерфейса
    interface IPropExtended extends IProp {
        decreaseProp: (sub: number) => number
    }

    // реализация интерфейса
    let serverAndProp: IServer & IProp = {
        hostname: "Pikachu",
        location: "RM1",
        active: true,
        publicAddress: "192.168.0.10",

        prop: 60,
        getProp(){ return this.prop },
        setProp(prop){ this.prop = prop },
        increaseProp(add: number): number { return this.prop+=add },

        color: "red",
    }
    let extendedProp: IPropExtended = {
        prop: 60,
        getProp(){ return this.prop },
        setProp(prop){ this.prop = prop },
        increaseProp(add: number): number { return this.prop+=add },
        decreaseProp(add: number): number { return this.prop-=add },

        color: "red",
    }


    // Функциональный интерфейс - Интерфейс определяющий единственную безымянную функцию
    interface FunctionalInterface {
        (str1: string, str2: string): string
        // можно написать ещё безымянные функции, но по итогу это просто будет Union типов в одной функции
    }
    // можно расширить приемлемые типы: string => string | number
    // имена параметров необязательно совпадают - главное совпадение типов
    let fun1: FunctionalInterface = function (s1: string, s2: string | number){ return s1+s2 }

    // интерфейс является и функцией и объектом
    interface Counter {
        (start: number): string
        interval: number
        reset(): void
    }
    function getCounter(): Counter {
        let counter = <Counter>function (start: number){ }
        counter.interval = 123
        counter.reset = ()=>{ }
        return counter
    }
    let c = getCounter()
    c(10)
    c.reset()
    c.interval = 5.0


    // Indexable Types - индексируемые типы
    // Определяется тип ключа и тип значения - можно хранить любое количество элементов
    interface StringArray {
        [idx: number]: string
        // idx может быть string, number, или 2 записи: со string потом с number с одним типом элементов
        // если idx: string - то имена полей интерфейса теперь тоже ключи в этом массиве и должны хранить элементы с типом как в массиве
    }
    let stringArray: StringArray = ["one", "two"]
    let first = stringArray[0]

    // Индексация + свойства
    interface NumberAndStringArray{
        prop: string
        [idx: number]: number
        //[idx: string]: number
        obj: {
            prop: string
        }
    }
    let numberAndStringArray: NumberAndStringArray = {
        prop: "prop",
        obj: {
            prop: "prop"
        }
    }
    numberAndStringArray[5] = 67

    // фактически интерфейс определяет обычный объект, куда можно добавлять свойства (можно им ещё тип any задать)
    interface PropAndStringArray {
        prop: boolean
        [idx: string]: boolean
    }
    let propAndStringArray: PropAndStringArray = {
        prop: true,
        asd: false
    }
    propAndStringArray["abc"] = true
    console.log(propAndStringArray) // выведется объект со свойствами prop, asd, abc

    // 2 необязательных свойства с гарантировано более узким типом в строково индексном интерфейсе
    // если имена свойств не color и не width, то их тип - any
    interface SquareConfig {
        color?: string
        width?: number
        [propName: string]: any
    }
    let squareConfig: SquareConfig = {}
    squareConfig.color = "red"
    squareConfig.width = 78
    squareConfig.opacity = .9
    squareConfig["visible"] = true
    console.log(squareConfig)


    interface Shape { color: string }
    interface Square extends Shape { sideLength: number }
    // тайпскрипт позволил привести объект, хотя его тип не соответсвует...
    let square: Square = <Square>{}; // свойства будут undefined, точнее их просто не будет
    square.color = "blue";
    square.sideLength = 10;
}

// Дискриминирующее объединение
export function discriminatoryAssociationTest() {
    interface Square {
        kind: "square"
        size: number
    }
    interface Rectangle {
        kind: "rectangle"
        width: number
        height: number
    }
    interface Circle {
        kind: "circle"
        radius: number
    }

    function area(shape: Square | Rectangle | Circle): number {
        // kind as "square" | "rectangle" | "circle"
        switch (shape.kind){
            case "square": return shape.size * shape.size
            case "rectangle": return shape.width * shape.height
            case "circle": return Math.PI * shape.radius ** 2
        }
    }
}


export function constructorInInterfaceTest() {
    interface ClockInterface {
        tick(): void
    }
    // любой объект, у которого парметры конструктора такие - подходит под этот интерфейс
    // нельзя просто реализовать этот интерфейс, т.к. constructor находится в статической составляющей класса,
    // а не в экземпляре класса, и он не включён в проверку
    // объект класса потом уже имеет конструктор
    interface ClockConstructor {
        new (hour: number, minute: number): ClockInterface
    }

    class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick(){ console.log("beep beep") }
    }
    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick(){ console.log("tick tock") }
    }

    function createClock(constructr: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new constructr(hour, minute)
    }

    let digitalClock: DigitalClock = createClock(DigitalClock, 6, 43)
    let analogClock: AnalogClock = createClock(AnalogClock, 6, 43)
}


export function classTest() {
    // public protected private
    class Person {
        public name: string // ● public => accessible anywhere
        age: number // default is public

        // Derived class can increase visibility of protected
        protected readonly sex: "male" | "female" // ● protected => accessible in class code and from inheritors

        private job: string // ● private => accessible only in class code
        #hardPrivate = 0 // JavaScript ● hard private field (starts with "#") for ES2021+

        constructor(name: string, age: number, sex: "male" | "female", job: string) {
            this.name = name;
            this.age = age;
            this.sex = sex;
            this.job = job;
        }
    }


    // readonly
    class ReadOnly {
        readonly a
        private readonly b
    }
    const ro1 = new ReadOnly()
    const ro2 = new ReadOnly // you can omit () if zero arguments

    // static
    class Foo {
        static #count = 0; // static field
        static get staticCount() { return Foo.#count } // static getter
        static set staticCount(count) { Foo.#count = count } // static setter
        get count() { return Foo.#count } // getter from private static
        static { // static block
            try {
                const lastInstances = []
                Foo.#count += lastInstances.length;
            }
            catch {}
        }
    }


    // Parameter properties - объявление переменных в конструкторе
    // to make parameter to be property - place public / protected / private / readonly before parameter
    class Triangle {
        constructor(private a: number, protected readonly b: number, private c: number) {
            this.a = a<=0 ? 10 : a;
            // остальные просто присвоятся
        }
    }
    let tri: Triangle = new Triangle(-140, 3, 4)
    console.log(tri) // => Triangle{a: 10, b: 3, c: 4}

    // интерфейс наследует класс - включает все члены класса со всеми модификаторами, но не их реализации
    // если в суперклассе были private или protected поля, то только наследники этого суперкласса смогут реализовать интерфейс
    interface Quadrangle extends Triangle {
        d: number
    }

    // this type means class type
    // fun(a: this): this {...}
    // isSomething(): this is Something { return this instanceof Something }
    class StringBuilder {
        s = ""
        append(s: string): this { // this means StringBuilder type
            this.s += s
            return this
        }
        isStringBuilder(): this is StringBuilder{
            return this instanceof StringBuilder
        }
    }

    class IndexSignature {
        [s: string]: boolean | ((s: string) => boolean);

        check(s: string) {
            return this[s] as boolean;
        }
    }

    // make it lateinit with "!"
    class LateInit {
        lateinitProperty!: string
    }


    // Narrowing type of super class
    class BaseClassWithCommonType{
        n: number|string = 9
    }
    // DECLARE
    //class DerivedClassWithMoreSpecificType extends BaseClassWithCommonType{
    //    declare n: number // doesn't emit any javascript code
    //}


    // abstract class
    abstract class BaseAbstract {
        abstract field
        abstract method()
    }
    class DerivedFromBase extends BaseAbstract {
        field = 0
        method() { }
    }
    // класс есть ссылка на функцию-конструктор этого класса
    function createBaseInstance(ctor: new () => BaseAbstract){
        const instance = new ctor()
        return instance
    }
    let ba: BaseAbstract = createBaseInstance(DerivedFromBase)
    //ba = createBaseInstance(BaseAbstract) // error because abstract


    class Control { private state: any }
    interface SelecetableControl extends Control { select(): void }
    class Button extends Control { select(){} }
    class TextBox { select(){} }
    class Image { select(){}; private state: any}

    let selectableControl: SelecetableControl;
    selectableControl = new Button();
    //selectableControl = new TextBox(); // нельзя - нет свойства private state
    //selectableControl = new Image(); // нельзя - separate declarations of private state
}

export function functionsTest(){

    // explicit this
    class Num {
        n: number = 0

        // explicit this type check
        // will compile into getNumber(){...}
        getNumber(this: Num){ return this.n }
    }
    const num = new Num()
    const getNumber = num.getNumber
    //let n = getNumber() // error: The 'this' context of type 'void' is not assignable to method's 'this' of type 'Num'.

}

export function functionParametersTest(){
    // кидаем в функцию реализацию интерфейса или объект, в котором есть нужные поля
    // ненужные поля объекта не смотрятся
    interface Message {
        message: string
    }

    function printMessage(message: Message) {
        console.log(message.message)
    }
    function printMsg(msg: { message: string }) {
        console.log(msg.message)
    }

    let message: Message = {message: "message from interface"}
    let msg1: {message: string, prop: string} = {message: "message from object", prop: "prop"}
    let msg2 = {message: "message from object", prop: "prop"} // autotype => {message: string, prop: string}
    let msg3: {} = {message: "message from object", prop: "prop"} // type is {}

    printMessage(message)
    printMessage(msg1)
    printMessage(msg2)
    printMessage(<Message>msg3)
    printMessage({message: "message from object", prop: "prop"} as Message) // литерал объекта надо явно приводить к типу
    printMsg(message)
    printMsg(msg1)
    printMsg(msg2)
    printMsg(msg3 as Message)
    printMsg({message: "message from object", prop: "prop"} as {message: string})
}


