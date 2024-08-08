import SomeSvgIc1 from "src/components/SvgIcons/SomeSvgIc1"
import SomeSvgIc2 from "src/components/SvgIcons/SomeSvgIc2"
import SomeSvgIc3 from "src/components/SvgIcons/SomeSvgIc3"
import LoadingIc from "src/components/SvgIcons/LoadingIc"
import SomeSvgIc4CssProperties from "../components/SvgIcons/SomeSvgIc4CssProperties";


const SvgTest = () => {
    return <div>

        <div style={{width:400, height:200, border: '1px solid red' }}>
            <SomeSvgIc1 color={"blue"} size={50}/>
        </div>
        <div style={{width:200, height:400, border: '1px solid red' }}>
            <SomeSvgIc1 color={"blue"}/>
        </div>
        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <div style={{width:200, height:200, background: 'red'}} />
            <div style={{height:200, background: 'yellow'}}>
                <SomeSvgIc1 color={"blue"}/>
            </div>
        </div>


        <div style={{width:400, height:200, border: '1px solid red' }}>
            <SomeSvgIc2 color1={"blue"} color2={"red"} color3={"black"} color4={"green"} size={50}/>
        </div>
        <div style={{width:200, height:400, border: '1px solid red' }}>
            <SomeSvgIc2 color1={"blue"} color2={"red"} color3={"black"} color4={"green"} />
        </div>
        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <div style={{width:200, height:200, background: 'red'}} />
            <div style={{height:200, background: 'yellow'}}>
                <SomeSvgIc2 color1={"blue"} color2={"red"} color3={"black"} color4={"green"} />
            </div>
        </div>


        <div style={{width:400, height:200, border: '1px solid red' }}>
            <SomeSvgIc3 color1={"gold"} color2={"red"} color3={"blue"} color4={"green"} size={50}/>
        </div>
        <div style={{width:200, height:400, border: '1px solid red' }}>
            <SomeSvgIc3 color1={"gold"} color2={"red"} color3={"blue"} color4={"green"} />
        </div>
        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <div style={{width:200, height:200, background: 'red'}} />
            <div style={{height:200, background: 'yellow'}}>
                <SomeSvgIc3 color1={"gold"} color2={"red"} color3={"blue"} color4={"green"} />
            </div>
        </div>


        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <div style={{width:200, height:100, border: '1px solid red'}}>
                <LoadingIc />
            </div>
            <div style={{width:100, height:200, border: '1px solid red'}}>
                <LoadingIc fill={"gold"} />
            </div>
            <div style={{width:200, height:100, border: '1px solid red'}}>
                <LoadingIc size={60} />
            </div>
            <div style={{width:100, height:200, border: '1px solid red'}}>
                <LoadingIc fill={"gold"} size={60} />
            </div>
        </div>



        <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <div style={{height:200, width:200, background: 'yellow'}}>
                <SomeSvgIc4CssProperties color1={"gold"} color2={"red"} color3={"blue"} color4={"green"} />
            </div>
            <div style={{height:200, width:100, border: '1px solid red'}}>
                <SomeSvgIc4CssProperties color1={"aqua"} color2={"aqua"} color3={"aqua"} color4={"aqua"} />
            </div>
            <div style={{height:100, width:200, border: '1px solid red'}}>
                <SomeSvgIc4CssProperties color1={"aquamarine"} color2={"aquamarine"} color3={"aquamarine"} color4={"aquamarine"} />
            </div>
        </div>

    </div>
}
export default SvgTest