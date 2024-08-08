import React, {useLayoutEffect, useRef} from 'react'
import { ReactComponent as SomeSvgSvg } from 'src/res/icon/some-svg-4.svg'

// USING CSS VARIABLES

const SomeSvgIc4CssProperties = (
    {color1, color2, color3, color4, size}
        : {color1:string, color2:string, color3:string, color4:string, size?:number}) => {

    const svgRef = useRef<SVGSVGElement>(null)
    useLayoutEffect(()=>{
        const svg = svgRef.current
        if (svg) {
            svg.style.setProperty('--first-circle-color', color1)
            svg.style.setProperty('--second-circle-color', color2)
            svg.style.setProperty('--third-circle-color', color3)
            svg.style.setProperty('--rect-color', color4)
        }
    },[color1,color2,color3,color4])

    return <SomeSvgSvg ref={svgRef}
        style={{ width: size, height: size, maxWidth: '100%', maxHeight: '100%' }}
    />
}
export default SomeSvgIc4CssProperties
