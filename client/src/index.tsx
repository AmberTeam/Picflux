
import React, { createContext } from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import Store from "./store/store";
import WebSocketController from './websocket/websocket';

interface State {
    store: Store,
    wsc:WebSocketController
}

export const store = new Store();
export const wsc = new WebSocketController()

export const Context = createContext<State>({
    store,
    wsc
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Context.Provider value={{
        store,
        wsc
    }}>
        <App/>
    </Context.Provider>
);
