/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React, { useImperativeHandle, useRef } from 'react'
import styled from '@emotion/styled'
import { TypeUtils } from 'src/utils/common/TypeUtils'
import PartialUndef = TypeUtils.PartialUndef




export type OptionItemCustomProps = PartialUndef<{
  children: React.ReactNode
}>
export type ForwardRefProps = JSX.IntrinsicElements['article']
type RefElement = HTMLDivElement

export type OptionItemProps = OptionItemCustomProps & ForwardRefProps
const OptionItem = React.forwardRef<RefElement, OptionItemProps>(
  (props, forwardedRef)=>{
    const {
      children,
      ...restProps
    } = props
    
    const elemRef = useRef<RefElement>(null)
    useImperativeHandle(forwardedRef, ()=>elemRef.current!,[])
    
    
    return <Frame
      tabIndex={0}
      {...restProps}
      ref={elemRef}
    >
      {children}
    </Frame>
  }
)
export default React.memo(OptionItem)



const Frame = styled.article`
  container: option-item / size;
  height: 50px;
  width: 100%;
  display: grid;
  grid: 'icon title next' 1fr
        'icon value next' 1fr
       / 50px 1fr   40px;
  place-items: center;
  
  // appearance
  cursor: pointer;
  background: none;
`