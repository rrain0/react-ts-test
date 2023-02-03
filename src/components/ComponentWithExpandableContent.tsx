import React, {useState} from "react";

const ComponentWithExpandableContent = () => {
    const [expanded, setExpanded] = useState(false)

    return <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'start',
        padding: 32,
        gap: 32,
    }}>

        { !expanded && <div>Initial content</div> }

        <button onClick={()=>setExpanded(!expanded)}>
            { !expanded ? 'Expand' : 'Collapse' }
        </button>

        { expanded && <div>Additional content</div> }
        { expanded && <div>More additional content</div> }

    </div>
}
export default React.memo(ComponentWithExpandableContent)