import React, {useRef} from "react";
import ForwardedRefInput, {ForwardedRefInputElement} from "./ForwardedRefInput";


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

    return <div>
        <ForwardedRefInput ref={inputRef} hasError={false}/>
        <button onClick={selectAll}>Select All</button>
    </div>
}
export default React.memo(TestForwardedRefInput)