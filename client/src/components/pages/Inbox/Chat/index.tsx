import { observer} from "mobx-react-lite";
import {FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react"
import { Context } from "../../../..";
import { IChat } from "../../../../models/IDirect";
import { IMessage } from "../../../../models/IMessage";
import { IUserMin } from "../../../../models/IUser";
import InboxService from "../../../../services/InboxService";
import { KeyMemoInterface } from "../../../../store/store";
import cl from "../index.module.sass"
import {useObserver} from '../../../../hooks/observer.hook'
import LoaderMini from "../../../UI/LoaderMini";
import {toJS} from "mobx"

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

    const sendMessage = () => {
        if(message !== "" || message !== null) {
            wsc.send('chatroom-message', {chatid: props.config.chatid, msg: message})
            InboxService.storeMsg(props.config.chatid, message)
            setMessage("")
        }
    }

    const loadHistoryFragment = async (c_off:number = offset, fl:boolean = false, c_off_add:number = offset_add): Promise<any> => {
        if(fl) setFragmentLoading(true)
        setLoading(true)
        try {
            const response = await InboxService.getChatHistory(props.config.chatid, (c_off * 25) + c_off_add, 25)
            if(!response.data.history.length) return setCanLoad(false) 
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
            const fragment:IMessage[] = await loadHistoryFragment(0, false, 0)
            if(fragment && fragment.length) {
                setMessages(fragment)
                setCanLoad(true)
            } else { 
                setCanLoad(false)
            }
        } catch(e) {
            console.error(e)
        }
    }   

    const pushChatHistoryFragment = async (c_off:number, c_off_add:number) => {
        const fragment:IMessage[] = await loadHistoryFragment(offset + 1, true, c_off_add)
        if(fragment && fragment.length) {
            setMessages([...fragment, ...messages])
            setScrollFlag(true)
        }
    }

    useObserver(obsElement, canLoad, [offset_add], loading, () => {
        setOffset(offset + 1)
        pushChatHistoryFragment(offset + 1, offset_add)
    })

    useEffect(() => {
        if(!chatLoaded && messages.length) {
            chatRef.current.scrollTo({top: chatRef.current.scrollHeight})
            console.log("true setted")
            setCL(true)
        }
    }, [messages])

    useEffect(() => {
        if(scrollFlag) {
            const ofh = chatRef.current?.offsetHeight
            chatRef.current?.scrollTo({top: ofh})
            setScrollFlag(false)
        }

        if(listMsgFlag) {
            chatRef.current.scrollTo({top: chatRef.current.scrollHeight})
            setListMsgFlag(false)
        }
    }, [scrollFlag, listMsgFlag])


    useEffect(() => {
        if(messageBlank) {
            setMessages([...messages, messageBlank])
            setListMsgFlag(true)
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
        updateChatHistory()

        return () => setCanLoad(false)
    }, [props.config.chatid])

    return (
        <div className={cl.Chat_inner}>
            {canLoad ? "true" : "false"}
            <div className={cl.Chat_info}>
                <img src={props.config.members[0].avatar} className={cl.Chat_avatar}/>
                <span className={cl.Chat_username}>{props.config.members[0].username}</span>
            </div>
            <div className={cl.Chat_messages}>
                <div ref={chatRef} className={cl.Messages_container}>
                    <div ref={obsElement} style={{display: !canLoad ? "none" : "flex"}}>{fragmentLoading && <LoaderMini/>}</div>
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
                                        messages.map((msg:IMessage, i) => 
                                            <div className={`${cl.Message_container} ${msg.owner === store.user.id ? cl.Current : cl.Default}`} key={msg.data}>
                                                <span className={cl.Message_payload}>
                                                    {msg.data}

                                                </span>
                                            </div>
                                        )
                                    :
                                        "No messages"
                    }
                    <span ref={chatContainerRef}></span>
                </div>
                <form className={cl.Messages_form} onSubmit={e => {
                    e.preventDefault()
                    sendMessage()
                    chatRef.current.scrollTo({top: chatRef.current.scrollHeight})
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
                        <span className={cl.Txt}>
                            send
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default observer(Chat)