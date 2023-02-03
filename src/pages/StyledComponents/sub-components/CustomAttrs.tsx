import styled from "styled-components";
import {useId} from "react";




const CustomAttrs = () => {

    const id = useId()

    const customAttrs = {
        'data-has-error': 'yes',
        'has-error': 'yes',
        hasError: 'yes',
    }

    return <div>
        <Div hasError>
            <div id={`${id}-asdfg`} {...customAttrs}></div>
        </Div>
    </div>
}
export default CustomAttrs



type DivProps = {
    hasError: boolean
}
const Div = styled.div.attrs<DivProps>(p=>({
    'data-has-error': 'no',
    'data-hasError': p.hasError,
}))<DivProps>`
  width: 200px; height: 200px;
  background: red;
  
  
  
  [id$=-asdfg]{
    width: 100px; height: 100px;
    background: green;

    &[haserror=yes] {
      background: blueviolet;
    }
  }
  
  &[data-has-error=no] {
    background: blueviolet;
  }
  
  &[data-hasError] {
    background: aquamarine;
  }
  
`
