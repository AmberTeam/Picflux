
export interface IMessageListener {
    event:string
    handler:(arg:any) => void
}

export const SOCKET_INTERVAL = 2000
export const RENDER_INTERVAL = 1000

export default class WebSocketController {

    websocket:WebSocket | undefined = undefined
    ws_ready = false
    listeners:IMessageListener[] = []

    async init(wsserver:string): Promise<Event> {
        return await new Promise((resolve, reject) => {
            this.websocket = new WebSocket(wsserver)
            this.websocket.onopen = (e: Event) => {
                this.ws_ready = true
                resolve(e)
            }
        })
    }

    initListeners(): void {
        if(!this.ws_ready) {
            setTimeout(() => this.initListeners(), SOCKET_INTERVAL)
            return
        }

        this.websocket?.addEventListener('message', (e:MessageEvent<any>) => {
            try {
                const data = JSON.parse(e.data)
                const _e = data.event
                for(const listener of this.listeners) {
                    if(listener.event === _e) listener.handler({...data, payload: JSON.parse(data.payload)})
                }
            } catch(e) {
                return
            }
        }, true)
    }

    removeListner(event:string, handler:(e:any) => void): number {
        if(!this.ws_ready) {
            setTimeout(() => this.removeListner(event, handler), SOCKET_INTERVAL)
            return 0
        }

        //this.listeners.filter(ls => ls.event !== event && ls.handler !== handler)
        //this.websocket?.removeEventListener(event, handler, true)
        return 1
    }

    addCustomListener(event:string, handler:any, arg:boolean) {
        if(!this.ws_ready) {
            setTimeout(() => this.addCustomListener(event, handler, arg), SOCKET_INTERVAL)
            return
        }

        this.websocket?.addEventListener(event, handler, arg)
    }

    removeCustomListener(event:string, handler:any, arg:boolean) {
        if(!this.ws_ready) {
            setTimeout(() => this.removeCustomListener(event, handler, arg), SOCKET_INTERVAL)
            return
        }

        this.websocket?.removeEventListener(event, handler, arg)
    }

    addListener(event:string,handler:(e:any)=>void): void {
        if(!this.ws_ready) {
            setTimeout(() => this.addListener(event, handler), SOCKET_INTERVAL)
            return
        }

        this.listeners.push({
            event,
            handler
        })
    }

    send(event:string, data:any): number | undefined {
        if(!this.ws_ready) {
            setTimeout(() => this.send(event, data), SOCKET_INTERVAL)
            return 0 
        }
        
        try {
            this.websocket?.send(JSON.stringify({event, data}))
            return 1
        } catch(e) {
            console.error(e)
            return 0
        }
    }
}