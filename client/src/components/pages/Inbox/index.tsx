import { observer } from "mobx-react-lite"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../.."
import { IChat } from "../../../models/IDirect"
import InboxService from "../../../services/InboxService"
import Chat from "./Chat"
import ChatListItem from "./ChatListItem"


const InboxPage = () => {
    const {id} = useParams()
    const [inboxChats, setInboxChats] = useState<IChat[]>([])
    const [userId, setUserId] = useState<string>("")
    const [activeChat, setActiveChat] = useState<IChat | null>(null)

    const loadInbox = useCallback(async (): Promise<void> => {
        const response = await InboxService.getUserInbox()
        console.log(response.data.inbox)
        setInboxChats(response.data.inbox)
    }, [])

    const loadInboxIHistory = useCallback(async (): Promise<void> => {
        const response = await InboxService.getUserInbox()
        setInboxChats(response.data.inbox)
        setActiveChat(response.data.inbox.find((chat:IChat) => chat.chatid === id) as IChat)
    }, [])

    const createChat = useCallback(async (): Promise<void> => {
        const response = await InboxService.createChat([userId])
    }, [userId])

    const onChatSelect = (chatid:string): void => {
        setActiveChat(inboxChats.find((chat:IChat) => chat.chatid === chatid) as IChat)
        window.history.pushState({}, 'onchatselect', '/inbox/' + chatid)
    }

    const onPopState = useCallback((chatid:string): void => {
        setActiveChat(inboxChats.find((chat:IChat) => chat.chatid === chatid) as IChat)
    }, [inboxChats])

    useEffect(() => {
        window.addEventListener('popstate', (e: any) => {
            const pathname = e.target.location.pathname
            if(pathname.includes('/inbox') && !pathname.includes('overview')) onPopState(pathname.replace('/inbox/', ""))
            return
        })

        return () => window.removeEventListener('popstate', () => null)
    }, [inboxChats])

    useEffect(() => {
        switch(id) {
            case 'overview':
                loadInbox()
                break
            default:
                loadInboxIHistory()
                break
        }
    }, [])

    return (
        <div>
            <h1>INBOX</h1>
            <br/>
            <div style={{display: "flex"}}>
                <div>
                    {
                        inboxChats.map((chat: IChat) => 
                            <ChatListItem chat={chat} key={chat.chatid} handler={(chatid:string) => onChatSelect(chatid)}/>
                        )
                    }
                    <button onClick={() => createChat()}>
                        create a new chat
                    </button>
                    <input onChange={e => setUserId(e.target.value)}/>
                </div>
                <div>
                    {
                        activeChat
                            ?
                            <Chat config={activeChat}/>
                            :
                            <h1> Select user and start messaging!</h1>
                    }
                </div>
            </div>
        </div>
    )
}

export default observer(InboxPage)