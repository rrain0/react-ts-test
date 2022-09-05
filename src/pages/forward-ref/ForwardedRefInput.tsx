import React, {InputHTMLAttributes, useImperativeHandle, useRef} from "react";
import useForwardedRef from "./useForwardedRef";



// Ref is function(current) or object{ current }


type ForwardedRefInputProps = JSX.IntrinsicElements['input'] & {
    hasError?: boolean|undefined
}
type ForwardedRefInputRefCustomProps = {
    selectAll: ()=>void
}
type ForwardedRefInputElement = HTMLInputElement & ForwardedRefInputRefCustomProps

const ForwardedRefInput = React.forwardRef<ForwardedRefInputElement, ForwardedRefInputProps>(
    ( { hasError, ...props }, forwardedRef ) => {
        const { value, ...restProps } = props

        // accessing custom property-attribute
        console.log('hasError:', hasError)

        // ref to use
        //const [ref, setRef] = useForwardedRef(forwardedRef)

        const ref = useRef<ForwardedRefInputElement>(null)

        // !!! useImperativeHandle should be used with React.forwardRef.
        // It adds custom props to ref
        useImperativeHandle(forwardedRef, ()=>{
            // adding own functionality to view (input)
            ref.current!.selectAll = ()=>{
                const input = ref.current!
                input.focus()
                input.selectionStart = 0
                input.selectionEnd = input.value.length
            }
            return ref.current!
        }, []) // rendered views won't change without calling render function, so it is ok to actualize ref.current

        return <input
            ref={ref}
            //ref={setRef}
            {...props}/>
    }
)
export default React.memo(ForwardedRefInput)

export type {
    ForwardedRefInputProps,
    ForwardedRefInputElement,
}