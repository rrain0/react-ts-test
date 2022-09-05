
import css from './Button1.module.scss'
import React from "react";


type Props = React.HTMLAttributes<HTMLButtonElement> & {
    w?: string|number
    h?: string|number
}
const Button1 = React.memo(React.forwardRef<HTMLButtonElement, Props>(
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
export default Button1