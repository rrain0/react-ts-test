import React from 'react'

const SomeSvgIc2 = ({color1, color2, color3, color4, size}: {color1:string, color2:string, color3:string, color4:string, size?:number}) => {
    return <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                style={{ width: size, height: size, maxWidth: '100%', maxHeight: '100%' }} >

        <rect x="16" y="57" width="68" height="16" stroke="none" fill={color1} />
        <circle cx="25.5" cy="40.5" r="9.5" stroke="none" fill={color2} />
        <circle cx="50.5" cy="40.5" r="9.5" stroke="none" fill={color3} />
        <circle cx="74.5" cy="40.5" r="9.5" stroke="none" fill={color4} />

    </svg>
}
export default SomeSvgIc2
