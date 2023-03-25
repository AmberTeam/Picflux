


export default class WebSocketController {

    websocket:WebSocket | undefined = undefined

    constructor() {}

    async init(wsserver:string): Promise<Event> {
        return await new Promise((resolve, reject) => {
            this.websocket = new WebSocket(wsserver)
            this.websocket.onopen = (e: Event) => resolve(e)
        })
    }

    send(data:any): number {
        try {
            this.websocket?.send(JSON.stringify(data))
            return 1
        } catch(e) {
            console.error(e)
            return 0
        }
    }
}