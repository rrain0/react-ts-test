

import React from "react"




// html div props
type HtmlDivProps = React.HTMLAttributes<HTMLDivElement>

// JSX div props
type JsxDivProps = JSX.IntrinsicElements['div']

// html div props with ref
type HtmlDivPropsWithRef = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>


// onClick props
type OnClickHandler = React.MouseEventHandler<HTMLButtonElement>
type OnClickHandler2 = (ev: React.MouseEvent<HTMLButtonElement>)=>void

// inline style props (eg <div style=... />)
type InlineStyle = React.CSSProperties


// children
type ReactNodeType = React.ReactNode
// from docs: type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
// ReactFragment - это <></>


// React Component
type ReactComponent = React.ComponentType
// const component: React.ComponentType = <div/>


export {}