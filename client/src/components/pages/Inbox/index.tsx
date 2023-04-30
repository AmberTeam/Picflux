import { observer } from "mobx-react-lite"
import { FC, useCallback, useContext, useEffect, useRef, useState } from "react"
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
import { IMessage } from "../../../models/IMessage"

const InboxPage: FC = () => {
    const {id} = useParams()
    const {wsc, store} = useContext(Context)
    const resizer = useRef() as React.MutableRefObject<HTMLDivElement>
    const chatList = useRef() as React.MutableRefObject<HTMLDivElement>
    const [inboxChats, setInboxChats] = useState<IChat[]>([])
    const [activeChat, setActiveChat] = useState<IChat | null>(null)
    const [chatLoading, setChatLoading] = useState<boolean>(false)
    const [globalSeenHandler, setGlobalSeenHandler] = useState<IMessage[]>([])
    const [userSelectActive, setUserSelectActive] = useState<boolean>(false)

    const loadInbox = useCallback(async (): Promise<void> => {
        const response = await InboxService.getUserInbox()
        console.log(response.data.inbox)
        setInboxChats(response.data.inbox)
    }, [])

    const loadInboxIHistory = async (): Promise<void> => {
        const response = await InboxService.getUserInbox()
        setInboxChats(response.data.inbox)
        setActiveChat(response.data.inbox.find((chat:IChat) => chat.chatid === id) as IChat)
    }

    const createChat = async (user: IUserMin): Promise<void> => {
        for(var i=0;i < inboxChats.length;i++) {
            for(var _i=0;_i < inboxChats[i].members.length;_i++) {
                if(inboxChats[i].members[_i].id === user.id) {
                    setActiveChat(inboxChats[i])
                    window.history.pushState({}, 'onchatselect', '/inbox/' + inboxChats[i].chatid)
                    return
                }
            }
        }
        setChatLoading(true)
        const response = await InboxService.createChat([user.id])
        setChatLoading(false)
        setInboxChats([...inboxChats, response.data])
        setActiveChat(response.data)
        window.history.pushState({}, 'onchatselect', '/inbox/' + response.data.chatid)
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

    const handleResizerResize = (e:MouseEvent) => {
        console.log(e)
        chatList.current.style.width = e.pageX - chatList.current.getBoundingClientRect().left + "px";
    }

    const destroyResizeListener = () => {
        window.removeEventListener('mousemove', handleResizerResize)
    }

    useEffect(() => {
        window.addEventListener('popstate', (e: any) => {
            const pathname = e.target.location.pathname
            if(pathname.includes('/inbox') && !pathname.includes('overview')) onPopState(pathname.replace('/inbox/', ""))
            return
        })

        return () => window.removeEventListener('popstate', () => null)
    }, [inboxChats])

    useEffect(() => {
        resizer.current.addEventListener('mousedown', (e:Event) => {
            e.preventDefault()
            window.addEventListener("mousemove", handleResizerResize);
            window.addEventListener('mouseup', destroyResizeListener)
        })
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

            wsc.addCustomListener('message', (e:any) => {
                const data_p:any = JSON.parse(e.data)
                const messages_p:IMessage[] = JSON.parse(data_p.payload).messages
                if(!messages_p || !messages_p.length || data_p.event !== 'seen') return null
                setGlobalSeenHandler(messages_p)
            }, false)
        }

    }, [store.isSocketAuth])

    return (
        <div className={cl.InboxPage_container}>
            <div className={cl.InboxPage_chatlist} ref={chatList}>
                <UserSelect handler={(user:IUserMin) => createChat(user)} active={userSelectActive} downgradeActive={() => setUserSelectActive(false)}/>
                {
                    inboxChats.map((chat: IChat) => 
                        <ChatListItem chat={chat} key={chat.chatid} handler={(chatid:string) => onChatSelect(chatid)} active={chat.chatid === activeChat?.chatid} globalSeenHandler={globalSeenHandler} default_unread={chat.unread}/>
                    )
                }
                {
                    chatLoading &&
                        <button className={`${cl.ChatListItem_container} ${cl.Active} ${cl.Loading}`}>
                            <LoaderMini/>
                        </button>
                }
            </div>
            <div ref={resizer} className={cl.Resizer}></div>
            <div className={`${cl.Chat_container} ${activeChat ? cl.Active : cl.Select}`}>
                {
                    activeChat
                        ?
                        <Chat config={activeChat}/>
                        :
                        <div className={cl.Select_container}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
                            </svg>
                            <span> 
                                Select chat and start messaging!
                            </span>
                            <button className={cl.SelectBtn} onClick={() => setUserSelectActive(true)}>select or create</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default observer(InboxPage)