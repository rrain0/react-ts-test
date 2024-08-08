import React, {useRef} from "react";
import ForwardedRefInput, {ForwardedRefInputElement} from "./ForwardRefInput";


const TestForwardedRefInput = () => {
  
  const inputRef = useRef<ForwardedRefInputElement>(null)
  
  const selectAll = () => {
    inputRef.current?.selectAll()
    setTimeout(()=>{
      const input = inputRef.current
      if (input){
        console.log('input.value:', input.value)
        input.selectionStart = input.value.length
        input.selectionEnd = input.value.length
      }
    }, 3000)
  }
  
  const programmaticallyFireChangeEvent = () => {
    setInputValue(inputRef.current, 'event was programmatically fired')
  }
  
  return <div>
    <ForwardedRefInput ref={inputRef} hasError={false} style={{ width: 300 }}/>
    <button onClick={selectAll}>Select All</button>
    <button onClick={programmaticallyFireChangeEvent}>Programmatically Fire Change Event</button>
  </div>
}
export default React.memo(TestForwardedRefInput)



const setInputValue = (input?: HTMLInputElement|null|undefined, newValue: string = '') => {
  const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
  if (input){
    valueSetter.call(input,newValue)
    const ev = new Event('input', { bubbles: true })
    input.dispatchEvent(ev)
  }
}