
import styled from "styled-components";
import React from "react";
import {styledCommon} from "src/common-styles/commonStyled";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    // some additional props
}

// REACT FORWARD REF EXAMPLE
const SelectorOfOtherComponent = React.memo(React.forwardRef<HTMLDivElement, Props>(
    (props, ref) => {
        const { ...restProps } = props
        return <Col>
          <Frame ref={ref} {...restProps} tabIndex={0}>
            <Border/>
            <div>Border reacts on focus event by component reference by ${"{Component}"}:focus &</div>
          </Frame>
          <Frame ref={ref} {...restProps} tabIndex={0}>
            <Border/>
            <div>Border reacts on focus event by component reference by ${"{Component}"}:focus &</div>
          </Frame>
        </Col>
    }))
export default SelectorOfOtherComponent

const Col = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
`

const Frame = styled.div`
  position: relative;
  width: 360px; height: 300px;
  cursor: pointer;
`
const Border = React.memo(styled.div`
  ${styledCommon.absolute};
  pointer-events: none;
  border: 2px dashed #1F8DCD;
  border-radius: 4px;
  
  ${Frame}:focus & {
    border: 4px solid #1F8DCD;
  }
`)


/*
&& - a double ampersand refers to an instance of the component;
this is useful if you're doing conditional styling overrides
and don't want a style to apply to all instances of a particular component
 */
/*
&& - ссылка на текущий экземпляр компоненты
Полезно если внутри styled component есть javascript который по условию возвращает разные стили
*/
/*
Одиночный && - увеличение специфичности (приоритета) css
&& {
  ...high-priority css...
}
 */