
import {useContext, useEffect, useState} from "react";
import { ChatContext } from "./SocketIOChatContext";
import {Link} from "react-router-dom";






// https://social-network.samuraijs.com/


// Работа с голым веб сокетом, где можно обмениваться строками / массивами байтов
// Если сокет стал закрытым, то не нужно вручную удалять листенеры
// + если мы заканчиваем показывать компоненту, которая отвечает за сокет, то надо вручную закрыть сокет


type SocketMsg = {
    message: string
    photo: string
    userId: number
    userName: string
}

const SocketIOChat = () => {

    const [ws, setWs] = useState(undefined as WebSocket|undefined)
    const [wsOpen, setWsOpen] = useState(false)

    useEffect(()=>{
        let socket: WebSocket|undefined
        /*let closeListener = () => {
            console.log("socket was closed")
            setWsOpen(false)
            setTimeout(()=>createChannel(),3000)
        }*/
        function createChannel(){
            socket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            console.log('socket created')

            //socket.addEventListener('close', closeListener)
            socket.onclose = () => {
                console.log("socket was closed")
                setWsOpen(false)
                setTimeout(()=>createChannel(),3000)
            }
            socket.onopen = ()=>setWsOpen(true)

            setWs(socket)

        }
        createChannel()
        return ()=>{
            if (socket){
                socket.onclose = null // need to prevent socket recreation
                //socket.removeEventListener('close', closeListener)
                socket.close()
            }
            debugger
        }
    },[])


    return <ChatContext.Provider value={{webSocket: ws, isWebSocketOpen: wsOpen}}>
        <div>
            <Chat/>
        </div>
        <div>
            <Link to={"/"}>В начало</Link>
        </div>
    </ChatContext.Provider>
}
export default SocketIOChat



const Chat = () => {

    const [messages,setMessages] = useState([] as SocketMsg[])

    const { webSocket: ws, isWebSocketOpen: wsOpen } = useContext(ChatContext)



    // !!!! В таком случае messages всегда будет []. Происходит замыкание на значении []
    /*useEffect(()=>{
        ws.addEventListener('message', ev=>{
            // data приходит в виде строки
            const newMessages = JSON.parse(ev.data)
            setMessages([...messages,...newMessages])
        })
    },[])*/

    useEffect(()=>{
        if (ws && wsOpen) setMessages([])
        let listener
        ws?.addEventListener('message', listener = ev=>{
            const newMessages = JSON.parse(ev.data) // data приходит в виде строки
            setMessages((prevMsgs)=>[...prevMsgs,...newMessages])
        })
        return ()=>ws?.removeEventListener('message', listener)
    },[ws])

    return <div>
        <Messages messages={messages}/>
        <AddMessageForm/>
    </div>
}



const Messages = ({messages}: {messages: SocketMsg[]}) => {
    return <div style={{ height: '90vh', overflowY: 'auto' }}>
        {messages.map((m,i)=><Message msg={m} key={i}/>)}
    </div>
}


const Message = ({msg}:{msg: SocketMsg}) => {
    return <div>
        <img src={msg.photo}/> <b>{msg.userName}</b>
        <br />
        {msg.message}
        <hr/>
    </div>
}


const AddMessageForm = () => {
    const [msg,setMsg] = useState('')

    const { webSocket: ws, isWebSocketOpen: wsOpen } = useContext(ChatContext)

    const sendMsg = () => {
        if (msg && ws) {
            ws.send(msg)
            setMsg('')
        }
    }

    return <div>
        <div>
            <textarea onInput={ev=>setMsg(ev.currentTarget.value)} value={msg}/>
        </div>
        <div>
            <button disabled={!wsOpen} onClick={sendMsg}>Send</button>
        </div>
    </div>
}

