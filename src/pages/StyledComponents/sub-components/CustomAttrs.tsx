import styled from "styled-components";
//import {useId} from "react";


// todo upgrade to react 18


const CustomAttrs = () => {

    //const id = useId()

    const customAttrs = {
        'data-has-error': 'yes',
        'has-error': 'yes',
        hasError: 'yes',
    }

    return <div>
        {/*<Div hasError>
            <div id={`${id}-asdfg`} {...customAttrs}></div>
        </Div>*/}
    </div>
}
export default CustomAttrs


/*

const Div = styled.div<{ hasError: boolean }>.attrs(p=>({
    'data-has-error': 'no',
    // @ts-ignore
    'data-hasError': p.hasError,
}))`
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
*/
