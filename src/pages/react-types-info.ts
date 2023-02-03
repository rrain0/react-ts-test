


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

export {}