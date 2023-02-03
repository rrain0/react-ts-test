



export function typeNarrowing(){

    {
        // satisfies
        type ComponentKey = 'component1' | 'component2' | 'component3'

        const data = {
            component1: 0,
            component2: '',
            component3: 42,
        } satisfies Record<ComponentKey, number | string>

        const a = data.component1.toFixed(1) // type narrowed to number
        const b = data.component2.toUpperCase() // type narrowed to string

        // but if type already narrowed, you can't assign string to number, number to string etc
    }

    {
        // in - type narrowing via in
        /*
            TypeScript 4.9 makes the in operator a little bit more powerful when
            narrowing types that don’t list the property at all. Instead of leaving them as-is,
            the language will intersect their types with Record<"property-key-being-checked", unknown>.

            So in our example, packageJSON will have its type narrowed from unknown to
            object to object & Record<"name", unknown> That allows us to access packageJSON.name
            directly and narrow that independently.
         */

        interface Context {
            packageJSON: unknown
        }
        const tryGetPackageName = function(context: Context): string {
            const packageJSON = context.packageJSON

            // Check to see if we have an object.
            if (packageJSON && typeof packageJSON === 'object'){
                // Check to see if it has a string 'name' property.
                // You can't simply write typeof packageJSON.name === 'string' without in check
                if ('name' in packageJSON && typeof packageJSON.name === 'string'){
                    //const temp = packageJSON.name.toFixed(2) // ERROR: 'toFixed' does not exist on type 'string'
                    return packageJSON.name
                }
                // Check to see if it has a number 'quantity' property.
                if ('quantity' in packageJSON && typeof packageJSON.quantity === 'number'){
                    //const temp = packageJSON.quantity.toUpperCase() // ERROR: 'toUpperCase' does not exist on type 'number'
                    return packageJSON.quantity.toFixed(2)
                }
            }

            return ''
        }
    }

}