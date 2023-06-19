interface IListenerOptions {
    capture?: boolean
    once?: boolean
    passive?: boolean
    signal?: AbortSignal
}

export interface IMessageListener {
    event: string
    handler: EventListener
    options: IListenerOptions
}

export const SOCKET_INTERVAL = 2000;
export const RENDER_INTERVAL = 1000;

export default class WebSocketController {

    websocket: WebSocket | undefined = undefined;
    ws_ready = false;

    async init(wsserver: string): Promise<Event> {
        return new Promise((resolve) => {
            this.websocket = new WebSocket(wsserver);
            this.websocket.addEventListener("open", (event: Event) => {
                this.ws_ready = true;
                resolve(event);
            });
        });
    }

    removeListener<T extends keyof WebSocketEventMap>(event: T, eventHandler: (event: WebSocketEventMap[T]) => void, options: IListenerOptions | undefined = undefined) {
        if (!this.ws_ready) {
            setTimeout(() => this.removeListener(event, eventHandler, options), SOCKET_INTERVAL);
        }
        else {
            this.websocket?.removeEventListener<T>(event, eventHandler, options);
        }
    }
    
    addListener<T extends keyof WebSocketEventMap>(event: T, eventHandler: (event: WebSocketEventMap[T]) => void, options: IListenerOptions | undefined = undefined) {
        if (!this.ws_ready) {
            setTimeout(() => this.addListener(event, eventHandler, options), SOCKET_INTERVAL);
        }
        else {
            this.websocket?.addEventListener<T>(event, eventHandler, options);
        }
    }

    send<T>(event: string, data: T) {
        if (!this.ws_ready) {
            setTimeout(() => this.send(event, data), SOCKET_INTERVAL);
        }
        else {
            this.websocket?.send(JSON.stringify({ event, data }));
        }
    }
}