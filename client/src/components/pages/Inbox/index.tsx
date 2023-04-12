import { observer } from "mobx-react-lite"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../.."
import { IChat } from "../../../models/IDirect"
import InboxService from "../../../services/InboxService"
import Chat from "./Chat"
import ChatListItem from "./ChatListItem"
import cl from './index.module.sass'


const InboxPage: FC = () => {
    const {id} = useParams()
    const {wsc, store} = useContext(Context)
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
        wsc.send('chatroom-destroy', {chatid: activeChat?.chatid, uid: store.user.id})
        setActiveChat(inboxChats.find((chat:IChat) => chat.chatid === chatid) as IChat)
        window.history.pushState({}, 'onchatselect', '/inbox/' + chatid)
    }

    const onPopState = useCallback((chatid:string): void => {
        wsc.send('chatroom-destroy', {chatid: activeChat?.chatid, uid: store.user.id})
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
        <div className={cl.InboxPage_container}>
            <div className={cl.InboxPage_chatlist}>
                {
                    inboxChats.map((chat: IChat) => 
                        <ChatListItem chat={chat} key={chat.chatid} handler={(chatid:string) => onChatSelect(chatid)} active={chat.chatid === activeChat?.chatid}/>
                    )
                }
            </div>
            <div className={cl.Chat_container}>
                {
                    activeChat
                        ?
                        <Chat config={activeChat}/>
                        :
                        <h1> Select user and start messaging!</h1>
                }
            </div>
        </div>
    )
}

export default observer(InboxPage)