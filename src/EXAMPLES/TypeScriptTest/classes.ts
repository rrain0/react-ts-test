




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
        static #count = 0; // static (private) field
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
    class Lateinit {
        lateinitProperty!: string
    }


    // Narrowing type of super class
    class BaseClassWithCommonType{
        n: number|string = 9
    }
    // DECLARE
    class DerivedClassWithMoreSpecificType extends BaseClassWithCommonType {
       declare n: number // doesn't emit any javascript code - just type narrowing
    }


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


    {
        // upcoming feature
        // Auto-Accessors in Classes
        /*class Person {
            accessor name: string
            constructor(name: string) { this.name = name }
        }*/

        /*
            Under the covers, these auto-accessors "de-sugar"
            to a get and set accessor with an unreachable private property.

            class Person {
                #__name: string;

                get name() {
                    return this.#__name;
                }
                set name(value: string) {
                    this.#__name = name;
                }

                constructor(name: string) {
                    this.name = name;
                }
            }
         */
    }
}

