import React from 'react'
import { ReactComponent as SomeSvgSvg } from 'src/assets/icons/some-svg-3.svg'

// todo maybe using of css variables will be better

const SomeSvgIc3 = ({color1, color2, color3, color4, size}: {color1:string, color2:string, color3:string, color4:string, size?:number}) => {

    return <SomeSvgSvg
        style={{ width: size, height: size, maxWidth: '100%', maxHeight: '100%' }}
    >
        {/* Define ids in svg file and use them here */}
        <style>{`
            rect {
                fill: ${color1};
            }
            #c1 {
                fill: ${color2};
            }
            #c2 {
                fill: ${color3};
            }
            #c3 {
                fill: ${color4};
            }
        `}</style>
        {/*<rect x="16" y="57" width="68" height="100" stroke="none" />*/}
    </SomeSvgSvg>
}
export default SomeSvgIc3
