import React, {InputHTMLAttributes, useImperativeHandle, useRef} from "react";
import useForwardedRef from "./useForwardedRef";



// Ref is function(current) or object{ current }


// component props
type ForwardedRefInputProps = JSX.IntrinsicElements['input'] & {
    hasError?: boolean|null|undefined
}
// custom ref props
type ForwardedRefInputRefCustomProps = {
    selectAll: ()=>void
}
// ref props
type ForwardedRefInputElement = HTMLInputElement & ForwardedRefInputRefCustomProps

let ForwardRefInput = React.forwardRef<ForwardedRefInputElement, ForwardedRefInputProps>(
(props, forwardedRef) => {
  // extract props which you do not pass to ref input and pass 'restProps' to it
  let { hasError, children, ...restProps } = props
  // get some props just to observe
  const { value } = props
  hasError ||= undefined

  // accessing custom JSX property
  console.log('accessing hasError:', hasError)
  console.log('accessing value', value)
  
  
  // ref to use
  //const [ref, setRef] = useForwardedRef(forwardedRef)

  
  const ref = useRef<ForwardedRefInputElement>(null)
  // !!! useImperativeHandle should be used with React.forwardRef.
  // It adds custom props to ref
  useImperativeHandle(forwardedRef,
    ()=>{
      // adding own functionality to view (input)
      ref.current!.selectAll = ()=>{
        const input = ref.current!
        input.focus()
        input.selectionStart = 0
        input.selectionEnd = input.value.length
      }
      return ref.current!
    },
   [] // not necessary to put ref.current here
  )

  return <input
    ref={ref}
    //ref={setRef}
    {...restProps}/>
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
