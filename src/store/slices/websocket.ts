import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import WebSocketActions from "../../enums/WebSocketActions";

interface IListener {
    handler: (event: any) => void,
    event: keyof WebSocketEventMap
}

interface ISendAction {
    event: WebSocketActions
    data: unknown
}

interface IWebSocket {
  webSocket: WebSocket | null
  sendQueue: ISendAction[]
  addListenerQueue: IListener[]
  removeListenerQueue: IListener[]
}

const initialState: IWebSocket = {
    webSocket: null,
    sendQueue: [],
    addListenerQueue: [],
    removeListenerQueue: []
};

const webSocketSlice = createSlice({
    name: "webSocket",
    initialState,
    reducers: {
        create(state, action: PayloadAction<string>) {
            state.webSocket = new WebSocket(action.payload);
            state.webSocket.addEventListener("open", event => {
                console.log(event, {addListenerQueue: state.addListenerQueue, removeListenerQueue: state.removeListenerQueue, sendQueue: state.sendQueue});
                while(state.sendQueue.length) {
                    const sendAction = state.sendQueue.pop();
                    if(sendAction) {
                        state.webSocket?.send(JSON.stringify({ event: sendAction.event, data: sendAction.data }));
                    }
                }
                while(state.addListenerQueue.length) {
                    const listener = state.addListenerQueue.pop();
                    if(listener) {
                        state.webSocket?.addEventListener(listener?.event, listener.handler);
                    }
                }
                while(state.removeListenerQueue.length) {
                    const listener = state.removeListenerQueue.pop();
                    if(listener) {
                        state.webSocket?.removeEventListener(listener.event, listener.handler);
                    }
                }
            });
        },
        addListener(state: IWebSocket, action: PayloadAction<IListener>) {
            if(state.webSocket && state.webSocket?.readyState === state.webSocket?.OPEN) {
                state.webSocket?.addEventListener(action.payload.event, action.payload.handler);
            }
            else {
                state.addListenerQueue.push(action.payload);
            }
        },
        removeListener(state, action: PayloadAction<IListener>) {
            if(state.webSocket && state.webSocket?.readyState === state.webSocket?.OPEN) {
                state.webSocket?.addEventListener(action.payload.event, action.payload.handler);
            }
            else {
                state.removeListenerQueue.push(action.payload);
            }
        },
        send(state, action: PayloadAction<ISendAction>) {
            if(state.webSocket && state.webSocket?.readyState === state.webSocket?.OPEN) {
                state.webSocket?.send(JSON.stringify({ event: action.payload.event, data: action.payload.data }));
            }
            else {
                state.sendQueue.push(action.payload);
            }
        }
    }
});

export const { create, addListener, removeListener, send } = webSocketSlice.actions;
export default webSocketSlice.reducer;