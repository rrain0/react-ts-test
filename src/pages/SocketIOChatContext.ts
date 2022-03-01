
import { createContext } from "react";


export const ChatContext = createContext<{
    webSocket?: WebSocket
    isWebSocketOpen: boolean
}>({ isWebSocketOpen: false })