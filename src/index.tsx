
import { createContext } from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import WebSocketController from "./websocket/websocket"

interface State {
    wsc: WebSocketController
}

export const wsc = new WebSocketController()

export const Context = createContext<State>({
    wsc
})

const rootElement = document.getElementById("root")

if(!("ontouchstart" in window)) {
    rootElement?.classList.add("hover")    
}

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(
    <Context.Provider value={{
        wsc: wsc
    }}>
        <App/>
    </Context.Provider>
)
