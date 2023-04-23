import { observer} from "mobx-react-lite";
import {FC, useContext, useEffect, useRef, useState} from "react"
import { Context } from "../../../..";
import { IChat } from "../../../../models/IDirect";
import { IMessage } from "../../../../models/IMessage";
import InboxService from "../../../../services/InboxService";
import { IChatStorage } from "../../../../store/store";
import cl from "../index.module.sass"
import {useObserver} from '../../../../hooks/observer.hook'
import LoaderMini from "../../../UI/LoaderMini";
import uuid from 'react-uuid'
import {toJS} from "mobx"
import Message from "./Message";
import MessageList from "./MessageList";

interface ChatProps {
    config:IChat
}

const Chat:FC<ChatProps> = (props:ChatProps) => {

    const {wsc, store} = useContext(Context)

    const obsElement = useRef() as React.MutableRefObject<HTMLDivElement>
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<IMessage[]>([])
    const chatContainerRef = useRef<HTMLDivElement | null>(null)
    const chatRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const [offset, setOffset] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)
    const [canLoad, setCanLoad] = useState<boolean>(false)
    const [chatLoaded, setCL] = useState<boolean>(false)
    const [scrollFlag, setScrollFlag] = useState<boolean>(false)
    const [listMsgFlag, setListMsgFlag] = useState<boolean>(false)
    const [fragmentLoading, setFragmentLoading] = useState<boolean>(false)
    const [messageBlank, setMessageBlank] = useState<IMessage | null>(null)
    const [offset_add, setOffset_add] = useState<number>(0)
    const [test, setTest] = useState<boolean>(false)

    const sendMessage = () => {
        if(message !== " " || message !== null) {
            const msg_construct:IMessage = {
                owner: store.user.id,
                _id: uuid(),
                chatid: props.config.chatid, 
                data: message, 
                id: "",
                seen: 0,
                timestamp: Date.now()
            }
            wsc.send('chatroom-message', {chatid: props.config.chatid, msg: msg_construct})
            InboxService.storeMsg(msg_construct)
            setMessage("")
        }
    }

    const loadHistoryFragment = async (c_off:number = offset, fl:boolean = false, c_off_add:number = offset_add): Promise<any> => {
        if(fl) setFragmentLoading(true)
        setLoading(true)
        try {
            const response = await InboxService.getChatHistory(props.config.chatid, (c_off * 25) + c_off_add, 25)
            if(!response.data.history.length) {
                setCanLoad(false) 
                return store.updateChatConfig({
                    chatid: props.config.chatid, 
                    canLoad: false
                })
            }
            return response.data.history
        } catch(e) {
            console.error(e)
            return null
        } finally {
            if(fl) setFragmentLoading(false)
            setLoading(false)
        }
    }

    const updateChatHistory = async (): Promise<void> => {
        setMessage("")
        setOffset(0)
        setLoading(false)
        setCL(false)
        setOffset_add(0)

        try {
            var storedMessages:IMessage[]
            const storedConfig:IChatStorage | null = store.storeChatConfig({
                chatid: props.config.chatid,
                offset: 0,
                offset_add: 0,
                canLoad: true
            })
            if(storedConfig) {
                storedMessages = storedConfig.messages
                setOffset(storedConfig.config.offset!)
                setOffset_add(storedConfig.config.offset_add!)
                setCanLoad(storedConfig.config.canLoad!)
            } else {
                storedMessages = await loadHistoryFragment(0, false, 0)
                store.updateChatMessages(props.config.chatid, storedMessages)
                if(storedMessages && storedMessages.length) setCanLoad(true)
            }
            if(storedMessages && storedMessages.length) {
                setMessages(storedMessages)
            } else { 
                setMessages([])
                setCanLoad(false)
                store.updateChatConfig({
                    chatid: props.config.chatid, 
                    canLoad: false
                })
            }
        } catch(e) {
            console.error(e)
        }
    }   

    const pushChatMessages = async (c_off:number, c_off_add:number) => {
        const fragment:IMessage[] = await loadHistoryFragment(offset + 1, true, c_off_add)
        if(fragment && fragment.length) {
            store.updateChatMessages(props.config.chatid, [...fragment, ...messages])
            setMessages([...fragment, ...messages])
            setTest(true)
        }
    }

    useObserver(obsElement, canLoad, [offset_add, messages, chatLoaded], loading, () => {
        if(!canLoad || !chatLoaded) return
        setOffset(offset + 1)
        store.updateChatConfig({
            chatid: props.config.chatid,
            offset: offset + 1
        })
        pushChatMessages(offset + 1, offset_add)
    })

    /*useEffect(() => {
        if(!chatLoaded && messages.length) {
            chatRef.current.scrollTo({top: chatRef.current.scrollHeight})
            setCL(true)
        }
    }, [messages])&/

    /*useEffect(() => {
        if(scrollFlag) {
            const ofh = chatRef.current?.offsetHeight
            chatRef.current?.scrollTo({top: ofh})
            setScrollFlag(false)
        }

        if(listMsgFlag) {
            chatRef.current.scrollTo({top: chatRef.current.scrollHeight})
            setListMsgFlag(false)
        }
    }, [scrollFlag, listMsgFlag])*/

    useEffect(() => {
        if(listMsgFlag) {
            chatRef.current.scrollTo({top: chatRef.current.scrollHeight})
            setListMsgFlag(false)
        }
    }, [listMsgFlag])


    useEffect(() => {
        if(messageBlank) {
            store.updateChatMessages(props.config.chatid, [...messages, messageBlank])
            store.updateChatConfig({
                chatid: props.config.chatid,
                offset_add: offset_add + 1
            })
            setMessages([...messages, messageBlank])
            setMessageBlank(null)
            setOffset_add(offset_add + 1)
        }
    }, [messageBlank, offset_add])

    useEffect(() => {
        if(store.isSocketAuth) {
            wsc.send('chatroom-init', {chatid: props.config.chatid, members: [props.config.members[0].id, store.user.id]})
            wsc.addListener('chatroom-message', (e) => {
                if(e.payload.chatid === props.config.chatid) {
                    setMessageBlank(e.payload)
                }
            })
        }

        return () => {
            wsc.removeListner('chatroom-message', (e) => {
                if(e.payload.chatid === props.config.chatid) {
                    setMessageBlank(e.payload)
                }
            })
        }
    }, [props.config, store.isSocketAuth])

    useEffect(() => {
        if(props.config) updateChatHistory()

        return () => setCanLoad(false)
    }, [props.config.chatid])

    return (
        <div className={cl.Chat_inner}>
            <div className={cl.Chat_info}>
                <div className={cl.Info_intro}>
                    <span className={cl.Chat_username}>{props.config.members[0].username}</span>
                </div>
                <div className={cl.Info_params}>
                    <button className={cl.Info_ref}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div className={cl.Chat_messages}>
                <div ref={chatRef} className={cl.Messages_container}>
                    <div ref={obsElement} className={cl.Loader} style={{display: !canLoad ? "none" : "flex"}}>
                        {
                            fragmentLoading &&
                            <LoaderMini/>
                        }
                    </div>
                    {
                        loading && !fragmentLoading
                            ?
                                <div className={cl.Loading_container}> 
                                    <LoaderMini/>
                                    <span>Loading chat history</span>
                                </div>
                            :
                                messages.length 
                                    ? 
                                        <MessageList chatid={props.config.chatid} messages={messages} observer={props.config.members[0]} scrollFactor={listMsgFlag} onRendered={() => {
                                            if(!chatLoaded) {
                                                chatRef.current.scrollTo({top: chatRef.current.scrollHeight})
                                                setCL(true)
                                            }
                                            if(test) {
                                                const ofh = chatRef.current?.offsetHeight
                                                chatRef.current?.scrollTo({top: ofh})
                                                return setTest(false)
                                            }
                                            setListMsgFlag(true)
                                        }}/>
                                    :
                                        "No messages"
                    }
                    <span ref={chatContainerRef}></span>
                </div>
                <form className={cl.Messages_form} onSubmit={e => {
                    if(message === "") return e.preventDefault()
                    e.preventDefault()
                    sendMessage()
                }}>
                    <input 
                        className={cl.Messages_input}
                        value={message} 
                        onChange={e => {

                            setMessage(e.target.value)
                        }}
                        placeholder="Write a message..."
                    />
                    <button 
                        className={cl.Messages_submit}
                        type="submit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className={cl.Ic}>
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default observer(Chat)