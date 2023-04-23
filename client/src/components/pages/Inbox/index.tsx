import { observer } from "mobx-react-lite"
import { FC, useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../.."
import { IChat } from "../../../models/IDirect"
import InboxService from "../../../services/InboxService"
import Chat from "./Chat"
import ChatListItem from "./ChatListItem"
import cl from './index.module.sass'
import UserSelect from "../../UI/UserSelect"
import { IUserMin } from "../../../models/IUser"
import LoaderMini from "../../UI/LoaderMini"


const InboxPage: FC = () => {
    const {id} = useParams()
    const {wsc, store} = useContext(Context)
    const [inboxChats, setInboxChats] = useState<IChat[]>([])
    const [activeChat, setActiveChat] = useState<IChat | null>(null)
    const [chatLoading, setChatLoading] = useState<boolean>(false)

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

    const createChat = async (user: IUserMin): Promise<void> => {
        for(var i=0;i < inboxChats.length;i++) {
            for(var _i=0;_i < inboxChats[i].members.length;_i++) {
                if(inboxChats[i].members[_i].id === user.id) {
                    setActiveChat(inboxChats[i])
                    return
                }
            }
        }
        setChatLoading(true)
        const response = await InboxService.createChat([user.id])
        setChatLoading(false)
        setInboxChats([...inboxChats, response.data])
        setActiveChat(response.data)
    }

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

    useEffect(() => {
        if(store.isSocketAuth) {
            wsc.addListener('chatroom-new', (e) => {
                setInboxChats([...inboxChats, e.payload])
                setActiveChat(e.payload)
            })
        }

    }, [store.isSocketAuth])

    return (
        <div className={cl.InboxPage_container}>
            <div className={cl.InboxPage_chatlist}>
                <UserSelect handler={(user:IUserMin) => createChat(user)}/>
                {
                    inboxChats.map((chat: IChat) => 
                        <ChatListItem chat={chat} key={chat.chatid} handler={(chatid:string) => onChatSelect(chatid)} active={chat.chatid === activeChat?.chatid}/>
                    )
                }
                {
                    chatLoading &&
                        <button className={`${cl.ChatListItem_container} ${cl.Active} ${cl.Loading}`}>
                            <LoaderMini/>
                        </button>
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