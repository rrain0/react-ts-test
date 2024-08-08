import React, {useEffect, useRef} from "react";


// It can be used instead of React.useImperativeHandle

// use usual ref from forwarded ref
const useForwardedRef = <E>(forwardedRef?: React.ForwardedRef<E>) => {
  const innerRef = useRef<E|null>(null)
  
  const setRef = (instance: E|null) => {
    innerRef.current = instance
    updateForwardedRef()
  }
  
  const updateForwardedRef = () => {
    if (typeof forwardedRef === 'function'){
      forwardedRef(innerRef.current)
    } else if (forwardedRef && typeof forwardedRef === 'object'){
      forwardedRef.current = innerRef.current
    }
  }
  
  useEffect(()=>{
    updateForwardedRef()
  },[forwardedRef])
  
  // innerRef use to get value as from usual ref: const value = innerRef.current?.value
  // setRef pass to component: <input ref={setRef}/>
  return [innerRef, setRef] as const
}
export default useForwardedRef

// https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd