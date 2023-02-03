
import css from './ForwardRefButton.scss'
import React from "react";


type Props = React.HTMLAttributes<HTMLButtonElement> & {
    w?: string|number
    h?: string|number
}
const ForwardRefButton = React.memo(React.forwardRef<HTMLButtonElement, Props>(
(
        { w = '100%', h = '100%', ...props },
     ref
) => {
    const { children, style, ...restProps } = props
    return <button className={css.btn} ref={ref}
        style={{
           ...style,
           width: w, height: h,
        }}
        {...restProps}
    >
        { children }
    </button>
}))
export default ForwardRefButton