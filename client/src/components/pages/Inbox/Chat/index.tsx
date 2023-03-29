import { observer } from "mobx-react-lite";
import {FC, useCallback, useContext, useEffect, useState} from "react"
import { Context } from "../../../..";
import { IChat } from "../../../../models/IDirect";
import { IMessage } from "../../../../models/IMessage";
import { IUserMin } from "../../../../models/IUser";

interface ChatProps {
    config:IChat
}

const Chat:FC<ChatProps> = (props:ChatProps) => {

    const {wsc, store} = useContext(Context)

    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([])
    const [messageBlank, setMBlank] = useState<IMessage | null>(null)

    const loadChatHistory = useCallback(async () => {

    }, [props.config.chatid])

    const sendMessage = () => {
        if(message !== "") {
            wsc.send('chatroom-message', {chatid: props.config.chatid, msg: message})
            setMessage("")
        }
    }

    useEffect(() => {
        if(messageBlank !== null) {
            setMessages([...messages, messageBlank])
            setMBlank(null)
        }
    }, [messages, messageBlank])

    useEffect(() => {
        loadChatHistory()
    }, [props.config])

    useEffect(() => {
        if(store.isSocketAuth) {
            wsc.send('chatroom-init', {chatid: props.config.chatid, members: [props.config.members[0].id, store.user.id]})
            wsc.addListener('chatroom-message', (e) => {
                setMBlank(e.payload)
            })
        }
    }, [props.config, store.isSocketAuth])

    return (
        <div>
            <div>
                <img src={props.config.members[0].avatar} style={{width: 64}}/>
                <span>{props.config.members[0].username}</span>
            </div>
            <div>
                <h2>CHAT</h2>
                <div style={{background: "#000", color: "#0f0", minHeight: 100, minWidth: 100}}>
                    {
                        messages.length 
                            ? 
                                messages.map((msg:IMessage, i) => 
                                    <div key={i}> 
                                        <span style={{fontSize: 14}}>{">"}{msg.data} </span>
                                    </div>
                                )
                            :
                                "No messages"
                    }
                </div>
                <div>
                    <form onSubmit={e => {
                        e.preventDefault()
                        sendMessage()
                    }}>
                        <input name="sus" placeholder="enter message" value={message} onChange={e => setMessage(e.target.value)}/>
                        <button type="submit">send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default observer(Chat)