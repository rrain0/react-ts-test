


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




function ffsafadsf(){
  const enum Resources {
    supp = 'supp',
    dema = 'dema'
  }
  type supplier = {
    id: number
    name: string
  }
  
  type demat = {
    id : number
    name: string
    agentName: string
  }
  
  {
    // first solution
    interface ResourceToValue {
      [Resources.supp]: supplier[]
      [Resources.dema]: demat[]
    }
    const response: ResourceToValue = { } as ResourceToValue
    response[Resources.supp] = [{id:1, name: 'a'}]
    const supplierData = response[Resources.supp] // type is supplier[]
  }
  {
    // second solution
    interface ResourceToValue {
      [Resources.supp]: supplier[]
      [Resources.dema]: demat[]
    }
    interface CustomMap<T> extends Map<keyof T,T[keyof T]> {
      get<Key extends keyof T>(key: Key): T[Key]
      set<Key extends keyof T>(key: Key, value: T[Key]): this
      
      // you also can override types of other methods
    }
    
    const response = new Map() as CustomMap<ResourceToValue>
    
    response.set(Resources.supp, [{id:1, name: 'a'}])
    
    const supplierData = response.get(Resources.supp) // type is supplier[]
  }
  
}



export function typescriptTest(){
  typesTest()
  typeHelpers()
  genericTest() // Auto const inference
  arraysTest()
  tupleTest()
  keyofTest()
  indexedTypes()
  mappedTypesTest()
  readonlyOptionalConstLateinitSatisfiesAutoaccessor()
  interfaceTest()
  discriminatoryAssociationTest()
  functionsTest()
  functionParametersTest()
  promiseTypes()
  templateStringTypesAsDiscriminants()
  imports()
  privateFieldPresenceChecks()
  declarations()
}

export function typesTest() {
  
  // Поведение типов boolean, string, number, symbol, bigint идентично джаваскриптовскому
  /*
   Примитивные типы:
   number
   string
   boolean
   symbol
   bigint
   */
  let a0: boolean | string | number | symbol | bigint
  a0 = true
  a0 = 'str'
  a0 = 4
  a0 = Symbol('tag')
  
  /*
   Типы-значения и специальные:
   null        - null primitive value
   undefined   - undefined primitive value
   object      - объект без ключей (never) и с неизвестными значениями (unknown)
   Object
   {}          - any non-null & non-undefined value
   []          - array
   Array       - array
   [<type>]    - tuple
   any
   unknown
   {} | null | undefined       - any value (specific value)
   never       - means that field/place for value is exists, but no value can be provided
   ?           - optional - means that field/place for value may not exist
   ...<type>   - vararg / destructuring
   void
   Function
   Awaited     - operation 'await' for type: Awaited<string> is same as Awaited<Promise<string>>
   */
  
  {
    /*
     Обёртки примитивов:
     number Number
     string String
     boolean Boolean
     symbol Symbol
     bigint BigInt
     */
    
    let n: number = 10;
    n = Number('10') // alias id +<value>
    let N: Number = new Number('10')
    //n = N // not allowed
    N = n // number -> Number allowed
    
    let s: string = 'str'
    s = String('str') // alias is ''+<value> or <value>+''
    let S: String = new String('str')
    //s = S // not allowed
    S = s // string -> String allowed
    
    let b: boolean = true
    b = Boolean('') // alias is !!<value>
    let B: Boolean = new Boolean('str')
    //b = B // not allowed
    B = b // boolean -> Boolean allowed
    
    // you cannot invoke Symbol constructor via 'new'
    let sym: symbol = Symbol('tag')
    sym = Symbol.for('key') // symbol from global registry
    let Sym: Symbol = Symbol('tag')
    //sym = Sym // not allowed
    Sym = sym // symbol -> Symbol allowed
    
    // you cannot invoke BigInt constructor via 'new'
    let bi: bigint = 123n
    bi = BigInt('123')
    let BI: BigInt = 1n
    //bi = BI // not allowed
    BI = bi // bigint -> BigInt allowed
  }
  
  let a1: number = 10
  //a1 = "some string" // нельзя
  
  {
    // | - union type - объединение типов - тип значения должен удовлетворять одному из типов объединения
    let a: string | number = "10"
    a = 10
    
    let b: boolean | null // переменная не может быть использована до присваивания + undefined нельзя присвоить
    b = null
  }
  
  {
    // & - intersection type - пересечение типов - тип значения должен удовлетворять сразу всем типам пересечения
    type Obj1 = { id: string, prop: string }
    type Obj2 = { prop: string, name: string }
    let obj: Obj1 & Obj2 = { id: 'id', prop: 'p', name: 'name' }
    
    type Never = null & {} // results in 'never' - no intersections
  }
  
  let a4: undefined
  console.log(a4) // автоматически undefined
  
  let a5: number | undefined
  console.log(a5) // автоматически undefined
  a5 = 8
  console.log(a5)
  
  let a6: null
  //console.log(a6) // нельзя - TS2454: Variable 'a6' is used before being assigned.
  
  
  {
    // unknown - неизвестный тип - с ним ничего нельзя сделать, пока не приведём к другому типу
    // "anything in, nothing out"
    // unknown is a supertype of every other type.
    // переменной с типом unknown можно присвоить любое значение
    // unknown is close in spirit to the union type {}|null|undefined because it accepts null, undefined, and any other type.
    // операции с unknown (| &) приводят к unknown (в отличие от {}|null|undefined)
    let a: unknown = 10
    let b: number = a as number + 89
    console.log(b)
    /*
     let b: string = a as string + 89
     console.log(b)
     console.log(typeof b) // => number - тайпскрипт сломан с помощью unknown :)
     */
    
    let c: unknown
    let d = 10
    c = d
    let e: {}|null|undefined
    e = c
  }
  
  {
    // any - любой тип
    // any - такой же, как и unknown, только его не надо приводить, чтобы что-то сделать
    // операции с any (| &) приводят к any
    let a: any = 89
    a = "89"
  }
  
  
  {
    // Declare a literal
    const stringLiteral: 'test' = 'test'
    const numberLiteral: 5 = 5
    // Symbol literals allow only 'const' or 'readonly static' modifier and value from 'Symbol()' or 'Symbol.for()' methods
    // use 'typeof' to reference it
    const symbolLiteral: unique symbol = Symbol()
  }
  
  
  // автовывод типа
  let a10 = 89 // a10 is number
  
  {
    // ! - non-null assertion
    // assert that it is not null & not undefined
    let a: null|undefined|{ prop: string } = { prop: "p" }
    const getA = () => ({ prop: "p" }) as null|undefined|{ prop: string }
    let prop = getA()!.prop
    
    // ?? - give default value if current value is null|undefined
    a = null
    a = a ?? { prop: "p" }
    // или кратко ??=
    a ??= { prop: "p" }
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
  
  class MyClass {}
  
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
    // {} - любое непустое значение (т.е. не null|undefined), но его тип неизвестен
    let v: {}
    v = 8
    v = 'string'
    v = true
    v = Symbol()
    v = {}
    v = { prop: 'p' }
    v = new String('s')
    v = { toString: ()=>2 } // implicit override: toString вовращает число
    v = new MyClass()
    v = ()=>{}
    //v = null        // not allowed
    //v = undefined   // not allowed
  }
  {
    // Object - любое непустое значение (т.е. не null|undefined) с предопределёнными свойствами:
    // constructor: Function; toString(): string; toLocaleString(): string; valueOf(): Object;
    // hasOwnProperty(v: PropertyKey): boolean; isPrototypeOf(v: Object): boolean; propertyIsEnumerable(v: PropertyKey): boolean;
    let o: Object
    o = 8
    o = 'string'
    o = true
    o = Symbol()
    o = {}
    o = { prop: 'p' }
    o = new String('s')
    //o = { toString: ()=>2 } // implicit override: toString вовращает число // not allowed
    o = new MyClass()
    o = ()=>{}
    //o = null        // not allowed
    //o = undefined   // not allowed
  }
  {
    // object - set - любой объект, не примитив
    // object - get - пустой объект - объект без ключей (never) и с неизвестными значениями (unknown)
    // Можно положить любой объект, но его ключи неизвестны, так что при взятии свойств - он пустой объект.
    // Аналог Record<never, unknown>.
    let o: object
    //o = 8           // not allowed
    //o = 'string'    // not allowed
    //o = true        // not allowed
    //o = Symbol()    // not allowed
    o = {}
    o = { prop: 'p' }
    o = new String('s')
    o = { toString: ()=>2 } // implicit override: toString вовращает число
    o = new MyClass()
    o = ()=>{}
    //o = null        // not allowed
    //o = undefined   // not allowed
  }
  {
    // Пустой объект
    // Record<string, never>
    let o: Record<keyof any, never> = {}
    //let prop = o.a  // not allowed
    //o = { a: 1 }    // not allowed
  }
  {
    // {} | null | undefined - похож на any или unknown, но выражает любое КОНКРЕТНОЕ значение
    // Операции по изменению типа работают как и предполагается
    let o = {} as Exclude<{}|null|undefined, undefined> // остался тип {}|null
    
    // Non-null type
    // If T===null (or undefined) then NonNull is never
    // Else NonNull becomes T without null (and undefined)
    type NonNull<T> = T & {}
    type ObjOrNull = object|null
    type Obj = NonNull<ObjOrNull> // result type is object
  }
  {
    // ? - тип, обозначающие отсутсвие поля в контейнере (объекте или массиве или аргументах функции)
    // Имеет смысл если в tsconfig.json есть "exactOptionalPropertyTypes": true
    // Возвращаемое значение у отсутсвующего поля = undefined
    // Поле которое есть и хранит undefined и поле которого вообще нет отличаются тем,
    // что при переборе свойств у объекта (for..in) или при переборе всех элементов массива (map, forEach) поле значением undefined будет присутвовать всё равно
    let obj: {
      prop: string,
      optionalProp?: string, // или свойства нет или оно хранит строку
      neverProp?: never // свойства которого не может быть, можно испоьзовать чтобы исключить что-нибудь из другого типа
    }
    obj = { prop: 'string' }
    obj = { prop: 'string', optionalProp: 'string' }
    //delete obj.prop // not allowed
    delete obj.optionalProp
    
    let tuple: [never?, string?, number?]
    tuple = []
    tuple = [,,,]
    //tuple = [,,,,] // not allowed
    tuple = [, 'str', 10]
    tuple = [, , 10]
  }
  {
    // Arrays
    let numbers: number[] // any count of number items
    numbers = []
    numbers = [1]
    // numbers = ['str1'] // not allowed
    numbers = [1,2,3,4,5]
    
    let numbers2: Array<number>
    numbers2 = []
    numbers2 = [1]
    // numbers2 = ['str1'] // not allowed
    numbers2 = [1,2,3,4,5]
    
    let numbersOrStrings: (number|string)[] // any count of number|string items
    numbersOrStrings = []
    numbersOrStrings = [1]
    numbersOrStrings = ['str1']
    // numbersOrStrings = [true] // not allowed
    numbersOrStrings = [1,'str2',3,'str4',5]
    
    let withFirstElem: [(number|boolean), ...(number|boolean)[]]
    // withFirstElem = [] // not allowed
    withFirstElem = [1]
    //withFirstElem = ['str1'] // not allowed
    withFirstElem = [false]
    withFirstElem = [1,true,3,false,5]
    
    let withFirstElem2: string[] & { 0: string }
    //withFirstElem2 = [] // not allowed
    withFirstElem2 = ['0','1','2']
    
    let withFirstElem3: Exclude<string[], []>
    //withFirstElem2 = [] // not allowed
    withFirstElem2 = ['0','1','2']
  }
  {
    // void - "пустое" значение - значение, которое, предполагается, что никогда не будет прочитано
    // void похож на unknown
    // void is a special type. under normal circumstances, it is only a supertype of undefined
    // Обычно используется в функциях для обозначения того, что она ничего не возвращает и в дженериках, обозначая отсутсвие типа
    let f = (): void => {} // функция, которая ничего не возвращает (по факту возвращает undefined), но слово return можно опустить
    ;(function(): void {})()
    let a: void = undefined
    // a = 1 // not allowed
    //let b: undefined = a // not allowed
    let c: {}|null|undefined = a
    let p: Promise<void> = new Promise(v=>{})
    let arr: Array<void> = [undefined, undefined]
    let arrOf0: void = arr[0]
  }
  {
    // never - обозначает, что дело до присвоения значения чего-либо с данным типом никогда не дойдёт
    let f: ()=>never = ()=>{ throw new Error('error') } // функция не может закончиться нормально, т.к. кидает исключение
    f = ()=>{ while(true); } // функция не может закончиться нормально, т.к. бесконечный цикл
  }
  {
    // extends - означает, что новый тип содержит не меньше, чем от которого наследуемся
    // extends - только для интерфейсов и классов
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




export function typeHelpers(){
  
  interface User {
    name: string
    email: string
    age: number
    isAdmin: boolean
  }
  
  // 'Pick' only picks selected properties
  type UserSummary = Pick<User, 'name'|'email'>
  const userSummary: UserSummary = {
    name: '',
    email: '',
    //age: 0, // error
    //isAdmin: false, // error
  }
  
  // 'Omit' excludes selected properties
  type UserWithoutEmailAndAge = Omit<User, 'email'|'age'>
  const userWithoutEmailAndAge: UserWithoutEmailAndAge = {
    name: '',
    //email: '', // error
    //age: 0, // error
    isAdmin: false,
  }
  
  function add2(a: number, b: string): [number,number] {
    return [a+2, +b+2]
  }
  
  // 'ReturnType' picks type of function return
  type Add2Result = ReturnType<typeof add2>
  const add2Result: Add2Result = [5,6]
  
  // 'Parameters' picks type of function parameters
  type Add2parameters = Parameters<typeof add2>
  const add2parameters: Add2parameters = [5,'9']
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
  const searchFun = <T extends any>
  ( {objsToSearchIn, valueExtractors, displayValueExtractor, setFound}
    : { objsToSearchIn: T[],
      valueExtractors: ((obj:T)=>any)[],
      displayValueExtractor: (obj:T)=>any,
      setFound: (objsArr:T[])=>void
    }
  ) => {
    setFound(objsToSearchIn)
  }
  
  
  {
    /*
     Type variance:
     ● <T> - no explicit variance - auto detection of variance
     ● <in T> - covariance - parameter only for read from it (in = input parameter)
     You can use T or its parents.
     ● <out T> - contravariance - parameter only for write into it (out = output parameter)
     You can use T or its children.
     ● <in out T> - invariance - parameter for read & write
     You can use only T.
     You shouldn't explicitly specify variance everywhere!!!
     */
    interface Animal { animalStuff: any }
    interface Dog extends Animal { dogStuff: any }
    type Getter<out T> = ()=>T // T is output parameter - write into T and out
    type Setter<in T> = (value: T)=>void // T is input parameter - in and read from T
    interface State<in out T> {
      get: ()=>T
      set: (value: T)=>void
    }
    
    let getterAnimal: Getter<Animal> = function (this: Animal){ return this }
    let getterDog: Getter<Dog> = function (this: Dog){ return this }
    let setterAnimal: Setter<Animal> = function (this: Animal, animal: Animal){  }
    let setterDog: Setter<Dog> = function (this: Dog, dog: Dog){  }
    
    const ga: Getter<Animal> = getterDog
    //const gd: Getter<Dog> = getterAnimal // error
    //const sa: Setter<Animal> = setterDog // error
    const sd: Setter<Dog> = setterAnimal
    
    const state: { internalDog: Dog } & State<Dog> = {
      internalDog: { animalStuff: 'as', dogStuff: 'ds' },
      get: ()=>({ animalStuff: 'bbb', dogStuff: 'aaa' }),
      set(v){ this.internalDog = v },
    }
    const dog = state.get()
  }
  
  
  // TS 5.0+
  // Auto const inference
  // Works for function & class generics
  {
    type HasNames = { names: readonly string[] }
    function getNamesExactly<const T extends HasNames>(arg: T): T["names"] {
    //                       ^^^^^
      return arg.names
    }
    // Note: Didn't need to write 'as const' here
    // Inferred type: const names: readonly ["Alice", "Bob", "Eve"]
    const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] })
    
    
    function passArray<const T extends readonly string[]>(args: T): T {
      return args
    }
    // Note: Didn't need to write 'as const' here
    // Inferred type: const arr: readonly ["a", "b", "c"]
    const arr = passArray(["a", "b" ,"c"])
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
  // Кортеж - массив, в котором каждый элемент имеет свой тип
  const tuple1: [number, string, boolean] = [1234, "str", false]
  const tuple2: [number, string[], undefined, {}] = [1234, ["str"], undefined, {prop: 3}]
  
  console.log(tuple1)
  console.log(tuple2)
  
  // автовыведение типов при взятии из кортежа
  const a1: number = tuple1[0];
  const a2: string = tuple1[1];
  const a3: number | string | boolean = tuple1[2]
  
  
  // readonly tuple
  const readonlyTuple: readonly [string, boolean, number] = ['str', true, 2]
  // readonlyTuple[0] = 'another str' // error
  // readonlyTuple.length = 5 // error
  
  {
    // using empty slots in tuples
    const someTuple1 = [1, 'str', , , true] as const // type is: readonly [1, "str", never?, never?, true?]
    const someTuple2: [number, never?, string?] = [1, , 'str']
    // empty slots in usual array
    const array: (string|undefined)[] = ['str1', , 'str2']
  }
  
  // instead of type [number,string] you can use
  interface NumStrTuple extends Array<number | string> {
    0: number;
    1: string;
    length: 2; // using the numeric literal type '2'
  }
  
  // map tuple to derived types by index
  {
    class Maybe<T> {}
    
    type MaybeTupleInstance = [Maybe<string>, Maybe<number>, Maybe<boolean>]
    
    type MaybeType<T> = T extends Maybe<infer Type> ? Type : never
    type MaybeTypes<Tuple extends [...any[]]> = {
      [Index in keyof Tuple]: MaybeType<Tuple[Index]>
    } & {length: Tuple['length']}
    
    const extractedTypes: MaybeTypes<MaybeTupleInstance> = ['hello', 3, true]
    
    // DOESN'T WORK
    /*type Map<MTI extends Maybe<any>[] = Maybe<any>[], MT extends MaybeTypes<MTI> = MaybeTypes<MTI> > = [MTI,(values: MT)=>void]
    const fun: Map = [
      [new Maybe<string>()],
      ([name])=>{}
    ]*/
  }
  
  // DOESN'T WORK
  // object to array of field names and tuple of values by index of field names
  /*{
    const obj = {
      name: 'name',
      age: 67,
      isUsed: false,
    }
    type FieldArr<O extends object> = [...(keyof O)[]]
    type FieldValues<O extends object, FArr extends [...any[]]> = {
      [Index in (number|symbol) & keyof FArr]: O[FArr[Index]]
    } & {length: FArr['length']}
    type FieldsAndValsConsumer<O extends object, FArr extends FieldArr<O> = FieldArr<O>> = [FArr,(values: FieldValues<O,FArr>)=>void]
    const fun: FieldsAndValsConsumer<typeof obj> = [
      ['name'],
      ([name])=>{}
    ]
  }*/
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


export function indexedTypes(){
  interface StringIndexed{
    // string also implies string|number because number converts to string
    [index: string]: any
  }
  interface StringTemplateIndexed{
    [index: `data-${string}`]: boolean
  }
  interface SymbolOrNumberIndexed{
    [index: symbol|number]: string
  }
  // аналогично примеру выше используя union types
  interface NumberOrStringTemplateIndexed{
    [index: number]: string
    [index: `data-${string}`]: boolean
  }
  
  let a: StringIndexed = { 5: 5, "6": 5 }
  let b: NumberOrStringTemplateIndexed = { 6: "6", 'data-some-prop': true }
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
  // 'as' - saves original string name to make T[Prop]
  type RemoveKindField<T> = {
    [Prop in keyof T as Exclude<Prop,'kind'>]: T[Prop]
  }
  
  
  // add suffixes to all properties of object
  type Suffix<O extends object,Suff extends string> =
    { [Prop in keyof O as Prop extends string ? `${Prop}${Suff}` : never]: O[Prop] }
  
  
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





export function readonlyOptionalConstLateinitSatisfiesAutoaccessor(){
  // readonly can be applied in type or class but not in object literal or array literal
  type ReadonlyPoint = {
    readonly x: number
    readonly y: number
  }
  class Point {
    readonly x = 8
    readonly y = 0
  }
  type ReadonlyPoint2 = Readonly<{ x: number, y: number }> // сделать все свойства объекта readonly
  
  // make object literal readonly point
  const p1 = {
    x: 4,
    y: 5,
  } as ReadonlyPoint
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
  
  // "definite assignment assertion"
  // only for class declaration
  class LateinitProperties {
    x!: number // can't assign undefined directly
    getX2(){ return this.x * this.x } // implicit undefined is ignored
  }
  
  
  // satisfies - object must satisfy specific, but remains as is, not expanding to that type
  {
    type Colors = {
      [prop:string]: string | [number,number,number]
    }
    const actualColors = {
      red: 'red',
      green: [0,255,0],
      blue: '#0000ff',
    } satisfies Colors
    /*
      actual typeof actualColors is {
        red: string
        green: [number, number, number]
        blue: string
      }
    */
  }
  
  
  
  // autoaccessor properties
  {
    class Person {
      accessor name: string;
      constructor(name: string) {
        this.name = name;
      }
    }
    /*
      Under the hood will be generated:
      class Person {
        #__name: string;
        get name() {
          return this.#__name;
        }
        set name(value: string) {
          this.#__name = value;
        }
        constructor(name: string) {
          this.name = name;
        }
      }
    */
  }
  
}




export function interfaceTest() {
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
  
  // Определение вызова через new или просто вызова
  // Т.е. вызов как конструктора или просто вызов как обычной функции
  // С помощью new() нужно типизировать функции-конструкторы вместо class
  interface CallOrConstruct {
    new (s: string): Date; // new CallOrConstruct('2022-05-05')
    (n?: number): number; // CallOrConstruct(2022)
  }
  
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
  
  
  
  interface GetterSetter {
    // types of getter and setter are unrelated
    _bar: number|null
    get bar(): number
    set bar(bar: number|boolean|null|undefined)
  }
  let obj: GetterSetter = {
    _bar: null as number|null,
    get bar():number { return this._bar ?? 0 }, // explicitly type number for return value
    set bar(bar: number|null){ this._bar = bar },
  }
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

export function promiseTypes(){
  
  // Awaited type
  type A = Awaited<Promise<string>>; // A = string
  type B = Awaited<Promise<Promise<number>>>; // B = number
  type C = Awaited<boolean | Promise<number> | PromiseLike<string>>; // C = boolean | number | string
  let c: C
  c = true // ok
  c = 5 // ok
  c = "str" // ok
  //c = undefined // error
  
}

export function templateStringTypesAsDiscriminants(){
  interface Success {
    type: `${string}Success`;
    body: string;
  }
  interface Error {
    type: `${string}Error`;
    message: string
  }
  function handler(r: Success | Error) {
    if (r.type === "HttpSuccess") {
      const token = r.body; // r is Success
    }
  }
}

export async function imports(){
  
  // Importing types
  /*
   import type { BaseType } from "./some-module.js";
   import { someFunc, type BaseType } from "./some-module.js";
   
   // importing of types will be erased in compiled javascript
   
   export class Thing implements BaseType {
   someMethod() {
   someFunc();
   }
   }
   */
  
  
  
  // Assert type of import
  // import obj from "./something.json" assert { type: "json" };
  // In Dynamic import:
  // const obj = await import("./something.json", {  assert: { type: "json" } });
  
}

export function privateFieldPresenceChecks(){
  /*
   One interesting aspect of this feature is that the check #name in other implies
   that other must have been constructed as a Person,
   since there’s no other way that field could be present.
   */
  class Person {
    #name: string;
    constructor(name: string) {
      this.#name = name;
    }
    equals(other: unknown) {
      return other &&
        typeof other === "object" &&
        #name in other && // <- this is new! // After this type of other is narrowed to Person
        this.#name === other.#name;
    }
  }
}



export function declarations() {
  /*
   // DECLARE GLOBAL
   
   declare global {
   function foo(): void;
   }
   
   globalThis.foo = () => {};
   
   */
}


