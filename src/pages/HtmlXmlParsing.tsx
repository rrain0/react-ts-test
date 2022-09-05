import {useEffect, useState} from "react";


const HtmlXmlParsing = () => {

    const [text1] = useState('some simple plain text')
    const [text1Parsed, setText1Parsed] = useState('')
    // ● parse string and serialize to string
    const parseText1 = () => {
        const parser = new DOMParser()
        let preparedText = `<root>${text1}</root>` // need to wrap in some root tag
        let xmlDoc = parser.parseFromString(preparedText, 'text/xml')

        const xmlSerializer = new XMLSerializer()
        let xmlStr = xmlSerializer.serializeToString(xmlDoc) // <root>some simple plain text</root>
        setText1Parsed(xmlStr)
    }
    useEffect(()=>parseText1(),[text1])


    const [text2] = useState('some <i>italic</i> plain<article-image localId="2"/>text more text')
    const [text2Parsed, setText2Parsed] = useState('')
    // ● wrap several elements into tag
    // ● replace element
    const parseText2 = () => {
        const parser = new DOMParser()
        let preparedText = `<root>${text2}</root>` // need to wrap in some root tag
        let xmlDoc = parser.parseFromString(preparedText, 'text/xml')


        const root = xmlDoc.childNodes[0]
        //console.log(root)
        let currentP = undefined as undefined|ChildNode
        for (let i = 0; i<root.childNodes.length; ){
            const ch = root.childNodes[i]
            if (['#text','i','b','mark'].includes(ch.nodeName)){
                if (!currentP){
                    currentP = xmlDoc.createElement('p')
                    root.appendChild(currentP)
                    root.insertBefore(currentP, ch)
                    i++
                }
                currentP.appendChild(ch)
            } else {
                if ('article-image'===ch.nodeName){
                    const el = ch as Element
                    const img = parser.parseFromString(
                        `<img src="localId=${el.attributes["localId"].value}" style="display: block; width: 100%; height: 300px; object-fit: cover;"/>`,
                        'text/xml'
                    ).childNodes[0]
                    root.replaceChild(img, ch)
                }
                currentP = undefined
                i++
            }
        }
        const xmlSerializer = new XMLSerializer()
        let xmlStr = xmlSerializer.serializeToString(xmlDoc) // <root><p>some <i>italic</i> plain</p><img src="localId=2" style="display: block; width: 100%; height: 300px; object-fit: cover;"/><p>text more text</p></root>
        setText2Parsed(xmlStr)
    }
    useEffect(()=>parseText2(),[text2])



    const [text3] = useState(`some <i>italic</i> plain<article-image localId="2"/>text more ${"\n\n"}text`)
    const [text3Parsed, setText3Parsed] = useState('')
    // ● separate text node into several nodes
    /*const parseText3 = () => {
        const parser = new DOMParser()
        let preparedText = `<root>${text3}</root>` // need to wrap in some root tag
        let xmlDoc = parser.parseFromString(preparedText, 'text/xml')


        const root = xmlDoc.childNodes[0]
        //console.log(root)
        for (let i = 0; i<root.childNodes.length; ){
            const ch = root.childNodes[i]
            if (['#text','i','b','mark'].includes(ch.nodeName)){

            }
        }
        const xmlSerializer = new XMLSerializer()
        let xmlStr = xmlSerializer.serializeToString(xmlDoc) // <root><p>some <i>italic</i> plain</p><img src="localId=2" style="display: block; width: 100%; height: 300px; object-fit: cover;"/><p>text more text</p></root>
        setText2Parsed(xmlStr)
    }
    useEffect(()=>parseText3(),[text3])*/


    return <div>
        <div>
            <div>Text 1:</div>
            <div>{text1}</div>
            <div>Text 1 Parsed:</div>
            <div>{text1Parsed}</div>
        </div>
        <div style={{ height: 40 }}/>
        <div>
            <div>Text 2:</div>
            <div>{text2}</div>
            <div>Text 2 Parsed:</div>
            <div>{text2Parsed}</div>
        </div>
        <div style={{ height: 40 }}/>
        <div>
            <div>Text 3:</div>
            <div>{text3}</div>
            <div>Text 3 Parsed:</div>
            <div>{text3Parsed}</div>
        </div>
    </div>
}
export default HtmlXmlParsing