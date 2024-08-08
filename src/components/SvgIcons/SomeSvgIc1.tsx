import React from 'react'
import { ReactComponent as SomeSvgSvg } from '../../res/icon/some-svg-1.svg'

const SomeSvgIc1 = ({color, size}: {color:string, size?:number}) => {
    return <SomeSvgSvg
        style={{ width: size, height: size, maxWidth: '100%', maxHeight: '100%' }}
        stroke={color} fill={color}
    />
}
export default SomeSvgIc1



// My Svg Answer:
// https://qna.habr.com/q/1020812