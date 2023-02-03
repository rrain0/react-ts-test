import React, {InputHTMLAttributes, useImperativeHandle, useRef} from "react";
import useForwardedRef from "./useForwardedRef";



// Ref is function(current) or object{ current }


// component props
type ForwardedRefInputProps = JSX.IntrinsicElements['input'] & {
    hasError?: boolean|undefined
}
// custom ref props
type ForwardedRefInputRefCustomProps = {
    selectAll: ()=>void
}
// ref props
type ForwardedRefInputElement = HTMLInputElement & ForwardedRefInputRefCustomProps

let ForwardRefInput = React.forwardRef<ForwardedRefInputElement, ForwardedRefInputProps>(
(
  { hasError, ...props }, forwardedRef
) => {
  const { /*children,*/ value, ...restProps } = props

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
})
ForwardRefInput = React.memo(ForwardRefInput)



export {
  type ForwardedRefInputProps,
  type ForwardedRefInputElement,
  ForwardRefInput as default,
}
/*
export type {
  ForwardedRefInputProps,
  ForwardedRefInputElement,
}*/
