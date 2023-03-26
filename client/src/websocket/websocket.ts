
export interface IMessageListener {
    event:string
    handler:(arg:any) => void
}

export default class WebSocketController {

    websocket:WebSocket | undefined = undefined
    listeners:IMessageListener[] = []

    constructor() {}

    async init(wsserver:string): Promise<Event> {
        return await new Promise((resolve, reject) => {
            this.websocket = new WebSocket(wsserver)
            this.websocket.onopen = (e: Event) => resolve(e)
        })
    }

    initListeners(): void {
        this.websocket?.addEventListener('message', (e:MessageEvent<any>) => {
            const data = JSON.parse(e.data)
            const _e = data.event
            for(const listener of this.listeners) {
                if(listener.event === _e) listener.handler(data)
            }
        })
    }

    addListener(event:string,handler:(e:any)=>void) {
        this.listeners.push({
            event,
            handler
        })
    }

    send(event:string, data:any): number { 
        try {
            this.websocket?.send(JSON.stringify({event, data}))
            return 1
        } catch(e) {
            console.error(e)
            return 0
        }
    }
}